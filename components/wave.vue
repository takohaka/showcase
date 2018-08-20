<template>
  <canvas v-parallax="{start: 200, handler}"></canvas>
</template>

<script lang="ts">
import { easeOutQuint, easeInQuint, linear } from "tween-functions";
import { Component, Vue } from "nuxt-property-decorator";
import { Vector } from "~/assets/vector";
import { Canv } from "~/assets/canv";

@Component<Wave>({
  props: {
    flip: Boolean,
    color: String
  }
})
export default class Wave extends Vue {
  private canv: Canv;
  private start: number;
  private duration = 1500;
  public flip: boolean;
  public color: string;
  mounted() {
    this.canv = new Canv(<HTMLCanvasElement> this.$el);
    this.canv.fps = 60;
  }
  handler(event: UIEvent, el: HTMLElement) {
    this.canv.onUpdate(n => {
      const current = Date.now() - this.start;
      if (current > this.duration) {
        this.canv
          .clearAll()
          .waveFill(this.flip, 1)
          .waveLine(this.flip, 1);
        this.canv.stop();
        return;
      }
      const easeOutProgress = easeOutQuint(current, 0, 1, this.duration);
      const easeInProgress = easeInQuint(current, 0, 1, this.duration);
      const linearProgress = linear(current, 0, 1, this.duration)
      this.canv
        .clearAll()
        .strokeStyle(this.color)
        .fillStyle(this.color)
        .context(canv => {
          canv
            .globalAlpha(linearProgress)
            .waveFill(this.flip, easeOutProgress);
            // .waveFill(this.flip, 1);
        })
        .context(canv => {
          const clipFrom = new Vector(this.flip ? (1 - easeOutProgress) * canv.w : 0, 0);
          const clipTo = new Vector(this.flip ? canv.w : easeOutProgress * canv.w, canv.h);
          canv
            .lineWidth(1)
            .clipRect(clipFrom, clipTo)
            .waveLine(this.flip, easeOutProgress);
            // .waveLine(this.flip, 1);
        });
    });
    this.start = Date.now();
    this.canv.start();
    return true;
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
}
</style>
