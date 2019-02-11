<template>
  <div>
    <div v-if="isLevelCompleted == false">Welcome, {{ player }} !</div>
    <div v-if="isLevelCompleted">Level completed !</div>
    <div style="margin-top:15px"></div>
    <b-button v-if="isLevelCompleted == false"
      v-on:click="onClickStart"
      variant="primary"
      style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
      :disabled="isStartButtonDisabled"
    >{{startButtonLabel}}</b-button>
    <div style="margin-top:15px"></div>
    <progress v-show="false" :value="getDuration" :max="getDuration" ref="progressBar" id="progressBar"> </progress>
    <div v-if="isLevelCompleted == false">Seconds left:</div>
    <div v-if="isLevelCompleted == false" ref="seconds" id="seconds">{{getDuration}}</div>
    <div v-if="isLevelCompleted == false" style="margin-top:15px;font-size:smaller">Show the five emotions as shown below.</div>
    <div v-if="isLevelCompleted == false" style="font-size:smaller">From left to right. As quickly as you can.</div>
    <div v-if="isLevelCompleted == false" style="font-size:smaller; margin-top:10px">Note: The taken screenshots are only available in the browser and not saved.</div>
    <b-button v-if="isLevelCompleted"
      v-on:click="onClickNext"
      variant="primary"
      style="margin-top:15px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Play Level 2 ...</b-button>
  </div>
</template>

<script>
export default {
  name: "controlpanelemotions",
  data() {
    return {
      player: ""
    };
  },
  computed: {
    startButtonLabel() {
      if (this.$store.state.emotionRecognition.modelLoaded == false) {
        return 'Loading Model ...';
      }
      else {
        return 'Start';
      }
    },
    isLevelCompleted: function() {
      return this.$store.state.currentGame.emotions.completed;
    },
    getDuration: function() {
      return this.$store.state.emotionRecognition.duration;
    },
    isStartButtonDisabled: function() {
      if (this.$store.state.emotionRecognition.modelLoaded == false) {
        return true;
      } else {
        if (this.$store.state.currentGame.emotions.ongoing == true) {
          return true;
        } else {
          if (this.$store.state.currentGame.emotions.completed == true) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  },
  mounted() {
    if (this.$store.state.currentPlayer.isAnonymous == true) {
      this.player = "secret friend";
    } else {
      this.player = this.$store.state.currentPlayer.firstName;
    }
  },
  methods: {
    onClickNext() {
      this.$router.push("poses");
    },
    onClickStart() {
      this.progressBar = this.$refs.progressBar;
      this.seconds = this.$refs.seconds;
      this.$store.commit("startEmotionsGame", new Date().getTime());

      let timeleft = this.$store.state.emotionRecognition.duration;
      let timer = this.$store.state.emotionRecognition.duration;
      let that = this;
      let downloadTimer = setInterval(function() {
        that.progressBar.value = timer - --timeleft;
        that.seconds.textContent = timer - that.progressBar.value;
        if (that.$store.state.currentGame.emotions.completed == true) {
          clearInterval(downloadTimer);
        } else {
          if (timeleft <= 0) {
            that.$store.commit("endEmotionsGame", new Date().getTime());
            clearInterval(downloadTimer);
          }
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>

</style>