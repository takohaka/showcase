<template>
  <div>
    <canvas></canvas>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
  </div>
</template>

<script>
import { Canv } from "~/assets/canv";

export default {
  data() {
    return {
      canv: null,
    }
  },
  mounted() {
    this.canv = new Canv(this.$el.querySelector('canvas'));
    this.canv.fps = 60
    this.canv.fillStyle("#0af")
      .clearAll()
      .onUpdate(i => {
        this.canv
          .clearAll()
          .context(canv => {
            canv.sin(i);
          });
      });
  },
  methods: {
    start() {
      this.canv.start();
    },
    stop() {
      this.canv.stop();
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 500px;
}
</style>
