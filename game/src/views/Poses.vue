<template>
  <div class="poses">
    <h2 style="margin-top:15px;margin-bottom:25px">Level 2 (of 2): Poses</h2>
    <div>
      <img id="lastcapturedimage" ref="lastcapturedimage">
    </div>
    <b-row>
      <b-col style="min-width: 520px;">
        <webcam></webcam>
      </b-col>
      <b-col style="text-align:center">
        <controlpanelposes></controlpanelposes>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <results-poses></results-poses>
      </b-col>
    </b-row>
  </div>
</template>
 
<script>
import webcam from "@/components/WebCam.vue";
import resultsPoses from "@/components/ResultsPoses.vue";
import * as posenet from "@tensorflow-models/posenet";
import controlpanelposes from "@/components/ControlPanelPoses.vue";

export default {
  components: {
    webcam,
    resultsPoses,
    controlpanelposes
  },
  name: "poses",
  mounted() {
    let that = this;
    this.loadModel().then(poseNet => {
      that.net = poseNet;
      that.loaded = true;
      that.$store.commit("setPosesRecognitionModelLoaded");
    });

    this.$store.watch(
      state => {
        return state.webcam.lastImage;
      },
      val => {
        //console.log("state.webcam.lastImage changed");
        if (this.$store.state.posesRecognition.modelLoaded == true) {
          this.image = this.$refs.lastcapturedimage;
          if (this.image) {
            this.image.src = val;

            const imageScaleFactor = 0.5;
            const outputStride = 16;
            const flipHorizontal = false;
            if (this.loaded == true) {
              this.net
                .estimateSinglePose(
                  this.image,
                  imageScaleFactor,
                  flipHorizontal,
                  outputStride
                )
                .then(result => {
                  //console.log(result);
                  let poses = [];
                  poses.push(result);

                  let canvasElementId = "videooverlaycanvas";
                  this.canvas = document.getElementById(canvasElementId);
                  let ctx = this.canvas.getContext("2d");
                  ctx.clearRect(
                    0,
                    0,
                    this.$store.state.webcam.width,
                    this.$store.state.webcam.height
                  );

                  poses.forEach(({ score, keypoints }) => {
                    this.$store.commit(
                      "updateLastPosesRecognitionResult",
                      keypoints
                    );
                  });
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
    async loadModel() {
      const mobileNetModel = await this.loadMobileNetModel();
      return new posenet.PoseNet(mobileNetModel);
    },
    async loadMobileNetModel() {
      let otherDomainUrl = this.$store.state.otherDomainUrl;
      let url = "models/poses/";
      if (
        otherDomainUrl &&
        otherDomainUrl != "" &&
        otherDomainUrl != "other-domain-url-not-defined"
      ) {
        url = otherDomainUrl + url;
      }
      const checkpointLoader = new posenet.CheckpointLoader(url);
      const variables = await checkpointLoader.getAllVariables();
      return new posenet.MobileNet(
        variables,
        posenet.mobileNetArchitectures[100]
      );
    }
  },
  data() {
    return {
      net: {},
      loaded: false
    };
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
#lastcapturedimage {
  display: none;
}
</style>