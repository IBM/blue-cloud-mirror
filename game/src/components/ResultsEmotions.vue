<template>
  <div style="margin-top:30px" class="resultsemotions" id="resultsemotions">
    <div style="display: table;width:100%">
      <div style="display: table-row;">
        <div style="max-width:100px;display: table-cell;vertical-align: top;">
          <div :class="happyClass">
            <div style="text-align:center">Happy</div>
            <img class="face" id="facehappy" ref="facehappy" :src="otherDomainUrl('happy.png')">
          </div>
        </div>
        <div style="max-width:100px;display: table-cell;vertical-align: top;">
          <div :class="angryClass">
            <div style="text-align:center">Angry</div>
            <img class="face" id="faceangry" ref="faceangry" :src="otherDomainUrl('angry.png')">
          </div>
        </div>
        <div style="max-width:100px;display: table-cell;vertical-align: top;">
          <div :class="fearClass">
            <div style="text-align:center">Fear</div>
            <img class="face" id="facefear" ref="facefear" :src="otherDomainUrl('fear.png')">
          </div>
        </div>
        <div style="max-width:100px;display: table-cell;vertical-align: top;">
          <div :class="sadClass">
            <div style="text-align:center">Sad</div>
            <img class="face" id="facesad" ref="facesad" :src="otherDomainUrl('sad.png')">
          </div>
        </div>
        <div style="max-width:100px;display: table-cell;vertical-align: top;">
          <div :class="surpriseClass">
            <div style="text-align:center">Surprise</div>
            <img class="face" id="facesurprise" ref="facesurprise" :src="otherDomainUrl('surprise.png')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const EMOTION_HAPPY = "Happy";
const EMOTION_ANGRY = "Angry";
const EMOTION_FEAR = "Fear";
const EMOTION_SAD = "Sad";
const EMOTION_SURPRISE = "Surprise";

export default {
  name: "resultsemotions",
  data() {
    return {};
  },
  computed: {
    happyClass: function() {
      if ((this.$store.state.currentGame.emotions.currentEmotion == EMOTION_HAPPY) && 
        (this.$store.state.currentGame.emotions.ongoing == true)) {
          return "active";
      }
      if (this.$store.state.currentGame.emotions.results.happy == true) {
          return "found";
      }
      else {
        return "notfound";
      }
    },
    angryClass: function() {
      if ((this.$store.state.currentGame.emotions.currentEmotion == EMOTION_ANGRY) && 
        (this.$store.state.currentGame.emotions.ongoing == true)) {
          return "active";
      }
      if (this.$store.state.currentGame.emotions.results.angry == true) {
          return "found";
      }
      else {
        return "notfound";
      }
    },
    fearClass: function() {
            if ((this.$store.state.currentGame.emotions.currentEmotion == EMOTION_FEAR) && 
        (this.$store.state.currentGame.emotions.ongoing == true)) {
          return "active";
      }
      if (this.$store.state.currentGame.emotions.results.fear == true) {
          return "found";
      }
      else {
        return "notfound";
      }
    },
    sadClass: function() {
            if ((this.$store.state.currentGame.emotions.currentEmotion == EMOTION_SAD) && 
        (this.$store.state.currentGame.emotions.ongoing == true)) {
          return "active";
      }
      if (this.$store.state.currentGame.emotions.results.sad == true) {
          return "found";
      }
      else {
        return "notfound";
      }
    },
    surpriseClass: function() {
            if ((this.$store.state.currentGame.emotions.currentEmotion == EMOTION_SURPRISE) && 
        (this.$store.state.currentGame.emotions.ongoing == true)) {
          return "active";
      }
      if (this.$store.state.currentGame.emotions.results.surprise == true) {
          return "found";
      }
      else {
        return "notfound";
      }
    }
  },
  mounted() {
    this.$store.watch(
      state => {
        return state.emotionRecognition.lastResult;
      },
      val => {
        //console.log("state.emotionRecognition.lastResult changed");

        this.moveToNextEmotionIfTooLong();

        if (this.enforceLastEmotionDetectionDelay() == false) {
          if (
            this.$store.state.currentGame.emotions.currentEmotion ==
            EMOTION_HAPPY
          ) {
            let facehappy = this.$refs.facehappy;
            if (!facehappy) facehappy = document.getElementById('facehappy');
            if (val.label == "Happy") {
              if (
                this.$store.state.currentGame.emotions.results.happy == false
              ) {
                this.$store.commit(
                  "successHappy",
                  this.$store.state.emotionRecognition.lastFace
                );
                facehappy.src = this.$store.state.emotionRecognition.lastFace;
              }
            }
          }
        }
        if (this.enforceLastEmotionDetectionDelay() == false) {
          if (
            this.$store.state.currentGame.emotions.currentEmotion ==
            EMOTION_ANGRY
          ) {
            let faceangry = this.$refs.faceangry;
            if (!faceangry) faceangry = document.getElementById('faceangry');
            if (val.label == "Angry") {
              if (
                this.$store.state.currentGame.emotions.results.angry == false
              ) {
                this.$store.commit(
                  "successAngry",
                  this.$store.state.emotionRecognition.lastFace
                );
                faceangry.src = this.$store.state.emotionRecognition.lastFace;
              }
            }
          }
        }
        if (this.enforceLastEmotionDetectionDelay() == false) {
          if (
            this.$store.state.currentGame.emotions.currentEmotion ==
            EMOTION_FEAR
          ) {
            let facefear = this.$refs.facefear;
            if (!facefear) facefear = document.getElementById('facefear');
            if (val.label == "Fear") {
              if (
                this.$store.state.currentGame.emotions.results.fear == false
              ) {
                this.$store.commit(
                  "successFear",
                  this.$store.state.emotionRecognition.lastFace
                );
                facefear.src = this.$store.state.emotionRecognition.lastFace;
              }
            }
          }
        }
        if (this.enforceLastEmotionDetectionDelay() == false) {
          if (
            this.$store.state.currentGame.emotions.currentEmotion == EMOTION_SAD
          ) {
            let facesad = this.$refs.facesad;
            if (!facesad) facesad = document.getElementById('facesad');
            if (val.result[3].percent > 0.7) {
              if (this.$store.state.currentGame.emotions.results.sad == false) {
                this.$store.commit(
                  "successSad",
                  this.$store.state.emotionRecognition.lastFace
                );
                facesad.src = this.$store.state.emotionRecognition.lastFace;
              }
            }
          }
        }
        if (this.enforceLastEmotionDetectionDelay() == false) {
          if (
            this.$store.state.currentGame.emotions.currentEmotion ==
            EMOTION_SURPRISE
          ) {
            let facesurprise = this.$refs.facesurprise;
            if (!facesurprise) facesurprise = document.getElementById('facesurprise');
            if (val.result[4].percent > 0.7) {
              if (
                this.$store.state.currentGame.emotions.results.surprise == false
              ) {
                this.$store.commit(
                  "successSurprise",
                  this.$store.state.emotionRecognition.lastFace
                );
                facesurprise.src = this.$store.state.emotionRecognition.lastFace;
              }
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
    otherDomainUrl: function(image) {
      let otherDomainUrl = this.$store.state.otherDomainUrl;
      let output = image;
      if ((otherDomainUrl) && (otherDomainUrl != "") && (otherDomainUrl != "other-domain-url-not-defined")) {
        output = otherDomainUrl + image;
      }
      return output;
    },
    moveToNextEmotionIfTooLong() {
      let now = new Date().getTime();
      let lastTime = this.$store.state.currentGame.emotions.lastSuccess;
      if (lastTime == 0) {
        lastTime = this.$store.state.currentGame.emotions.startDate;
      }
      let difference = now - lastTime;
      if (difference > this.$store.state.emotionRecognition.skipEmotionAfter) {
        this.$store.commit("moveToNextEmotion");
      }
    },
    enforceLastEmotionDetectionDelay() {
      let now = new Date().getTime();
      let lastTime = this.$store.state.currentGame.emotions.lastSuccess;
      if (lastTime == 0) {
        return false;
      } else {
        let difference = now - lastTime;
        if (difference > this.$store.state.emotionRecognition.delay) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
};
</script>

<style scoped>
.notfound {
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
  margin-right: 10px;
  border-radius: 0.25rem;
}
.found {
  color: #155724;
  margin-right: 10px;
  background-color: #d4edda;
  border-color: #c3e6cb;
  border-radius: 0.25rem;
}
.completed {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  border-radius: 0.25rem;
  margin-right: 10px;
  margin-bottom: 20px;
}
.notcompleted {
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #c3e6cb;
  border-radius: 0.25rem;
  margin-right: 10px;
  margin-bottom: 20px;
}

@keyframes active {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.active {
  color: white;
  animation: active 1s linear infinite;
  background-color: #053c9f !important;
  border-color: #c3e6cb;
  border-radius: 0.25rem;
  margin-right: 10px;
  margin-bottom: 20px;
}

.face {
  padding-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
  width: 100%;
}
</style>