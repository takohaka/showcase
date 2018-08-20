<template>
  <div class="container">
    <div class="bg">
      <div style="position: realtive;">
        <wave :flip="true" color="#2fbfff" class="wave wave1" />
        <wave :flip="false" color="#fff" class="wave wave2" />
      </div>
    </div>
    <div class="contents">
      <section>
        <p>wave</p>
      </section>
      <section v-parallax="{start: 600, handler: handler}">
          <div class="item" :class="{show}"></div>
          <div class="item" :class="{show}"></div>
          <div class="item" :class="{show}"></div>
          <div class="item" :class="{show}"></div>
      </section>
      <section v-parallax="{start: 600, handler: handler2}">
          <div class="item" :class="{show: show2}"></div>
          <div class="item" :class="{show: show2}"></div>
          <div class="item" :class="{show: show2}"></div>
          <div class="item" :class="{show: show2}"></div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import wave from "~/components/wave.vue";

@Component({
  components: { wave }
})
export default class WavePage extends Vue {
  private show: boolean = false;
  private show2: boolean = false;
  scrollToTop = true;
  handler(event, el) {
    this.show = true;
    return true;
  }
  handler2(event, el) {
    this.show2 = true;
    return true;
  }
}
</script>

<style scoped>
.container {
  transform-style: preserve-3d;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}
.bg {
}
.contents {
}
section {
  max-width: 1200px;
  margin: 0 auto;
  height: 600px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 15px;
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease-out 0s;
}
@media only screen and (max-width: 600px) {
  .item {
    width: 100px;
    height: 100px;
  }
}
section:nth-child(2),
section:nth-child(3) {
  height: 1300px;
}
section:nth-child(3) .item {
  background: #2fbfff;
  transform: translateX(-50px);
}
section .item:nth-child(2) {
  transition-delay: 0.2s;
}
section .item:nth-child(3) {
  transition-delay: 0.4s;
}
section .item:nth-child(4) {
  transition-delay: 0.6s;
}
section .item.show {
  opacity: 1;
  transform: translateX(0);
}
.wave {
  position: absolute;
  left: 0;
}
.wave1 {
  height: 2600px;
  top: 600px;
}
.wave2 {
  top: 1900px;
  height: 1300px;
}
</style>
