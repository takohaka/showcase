<template>
  <div id="playerElement" style="width:100%; height:0; padding:0 0 56.25% 0"></div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: "//player.wowza.com/player/latest/wowzaplayer.min.js"}
      ]
    }
  },
  mounted() {
    WowzaPlayer.create('playerElement',
      {
        "license":"PLAY2-7rJuG-bmemr-Buajc-6TNau-zyhZC",
        "title":"試験放送！！",
        "description":"",
        "sourceURL":"http%3A%2F%2F54.249.97.127%3A1935%2Flive%2FmyStream%2Fplaylist.m3u8",
        "autoPlay":false,
        "volume":"75",
        "mute":false,
        "loop":false,
        "audioOnly":false,
        "uiShowQuickRewind":true,
        "uiQuickRewindSeconds":"30"
      }
    );
  }
}
</script>
