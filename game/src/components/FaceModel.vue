<template>
  <div>
    <img id="lastcapturedimage" ref="lastcapturedimage">
  </div>
</template>

<script>
import * as faceapi from "face-api.js";

export default {
  name: "facemodel",
  data() {
    return {};
  },
  mounted() {
    let otherDomainUrl = this.$store.state.otherDomainUrl;
    let url = "models/face/tiny_face_detector_model-weights_manifest.json";
    if (
      otherDomainUrl &&
      otherDomainUrl != "" &&
      otherDomainUrl != "other-domain-url-not-defined"
    ) {
      url = otherDomainUrl + url;
    }
    faceapi.nets.tinyFaceDetector.load(url);

    this.$store.watch(
      state => {
        return state.webcam.lastImage;
      },
      val => {
        //console.log("state.webcam.lastImage changed");
        if (this.$store.state.currentGame.emotions.ongoing == true) {
          this.image = this.$refs.lastcapturedimage;
          if (this.image) {
            this.image.src = val;

            if (this.isFaceDetectionModelLoaded()) {
              let inputSize = 512;
              let scoreThreshold = 0.5;
              const options = new faceapi.TinyFaceDetectorOptions({
                inputSize,
                scoreThreshold
              });
              faceapi.detectSingleFace(this.image, options).then(result => {
                if (result) {
                  this.$store.commit("updateLastFaceRecognitionResult", result);

                  let canvasElementId = "videooverlaycanvas";
                  this.canvas = document.getElementById(canvasElementId);
                  let results = [result];
                  if (this.canvas) {
                    this.canvas.width = this.$store.state.webcam.width;
                    this.canvas.height = this.$store.state.webcam.height;
                    let resizedDetections = results.map(res =>
                      res.forSize(
                        this.$store.state.webcam.width,
                        this.$store.state.webcam.height
                      )
                    );
                    //faceapi.drawDetection(this.canvas, resizedDetections, { withScore: false });
                  }
                }
              });
            }
          }
        }
      },
      {
        deep: true
      }
    );
  },
  methods: {
    getCurrentFaceDetectionNet() {
      return faceapi.nets.tinyFaceDetector;
    },
    isFaceDetectionModelLoaded() {
      return !!this.getCurrentFaceDetectionNet().params;
    }
  }
};
</script>

<style scoped>
#lastcapturedimage {
  display: none;
}
</style>