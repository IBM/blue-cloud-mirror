<template>
  <div>
    <div style="position: relative;display: table-cell;vertical-align: top;">
        <video
      ref="video"
      id="video"
      v-on:play="onPlay"
      :width="this.$store.state.webcam.width"
      :height="this.$store.state.webcam.height"
      muted
      playsinline style=" -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        "
    ></video>
    <canvas style="position: absolute;top: 0;left: 0;"
      ref="videooverlaycanvas"
      id="videooverlaycanvas"
      :width="this.$store.state.webcam.width"
      :height="this.$store.state.webcam.height"
    ></canvas>       
               </div>    
    <canvas
      ref="capturecanvas"
      id="capturecanvas"
      :width="this.$store.state.webcam.width"
      :height="this.$store.state.webcam.height"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "webcam",
  components: {
  },
  data() {
    return { 
    };
  },
  mounted() {
    this.video = this.$refs.video;
    this.videooverlaycanvas = this.$refs.videooverlaycanvas;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {} }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  },
  methods: {
    onPlay(event) {
      if (this.video.paused || this.video.ended)
        return setTimeout(() => this.onPlay());

      this.capturecanvas = this.$refs.capturecanvas;
      let capturecanvas = this.capturecanvas
        .getContext("2d")
        .drawImage(
          this.video,
          0,
          0,
          this.$store.state.webcam.width,
          this.$store.state.webcam.height
        );

      if ((this.$store.state.currentGame.emotions.ongoing == true) || (this.$store.state.currentGame.poses.ongoing == true)) {
        this.$store.commit("updateLastImage", this.capturecanvas.toDataURL("image/png"));
      }

      setTimeout(() => this.onPlay(), this.$store.state.webcam.delay);
    }
  }
};
</script>

<style scoped>
#capturecanvas {
  display: none;
}
</style>