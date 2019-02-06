<template>
  <div>
    <div v-if="firstLevelCompleted == false">
      <div>Howdy, hold your horses, buddy :)</div>
      <div style="margin-top:15px"></div>
      <div>Play level 1 first</div>
      <div style="margin-top:15px"></div>
      <b-button v-on:click="onClickBack" variant="primary" style="margin-top:15px;background-color: #053c9f !important;border-color:#053c9f !important;">Play Level 1 ...</b-button>
    </div>
    <div v-if="firstLevelCompleted == true">
      <div v-if="isLevelCompleted == false">Ok, here comes the second level !</div>
      <div v-if="isLevelCompleted">Level completed !</div>
      <div style="margin-top:15px"></div>
      <b-button
        v-if="isLevelCompleted == false"
        v-on:click="onClickStart"
        variant="primary"
        style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        :disabled="isStartButtonDisabled"
      >{{startButtonLabel}}</b-button>
      <div style="margin-top:15px"></div>
      <progress
        v-show="false"
        :value="getDuration"
        :max="getDuration"
        ref="progressBarPoses"
        id="progressBarPoses"
      ></progress>
      <div v-if="isLevelCompleted == false">Seconds left:</div>
      <div v-if="isLevelCompleted == false" ref="secondsPoses" id="secondsPoses">{{getDuration}}</div>
      <div
        v-if="isLevelCompleted == false"
        style="margin-top:15px;font-size:smaller"
      >Do the five poses as shown below.</div>
      <div
        v-if="isLevelCompleted == false"
        style="font-size:smaller"
      >From left to right. As quickly as you can.</div>
      <div v-if="isLevelCompleted == false" style="font-size:smaller; margin-top:10px">Note: The taken screenshots are only available in the browser and not saved.</div>
      <b-button
        v-if="isLevelCompleted"
        v-on:click="onClickNext"
        variant="primary"
        style="margin-top:15px"
      >Show Results ...</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "controlpanelposes",
  data() {
    return {
      player: ""
    };
  },
  computed: {
    startButtonLabel() {
      if (this.$store.state.posesRecognition.modelLoaded == false) {
        return 'Loading Model ...';
      }
      else {
        return 'Start';
      }
    },
    firstLevelCompleted() {
      return this.$store.state.currentGame.emotions.completed;
    },
    isLevelCompleted: function() {
      return this.$store.state.currentGame.poses.completed;
    },
    getDuration: function() {
      return this.$store.state.posesRecognition.duration;
    },
    isStartButtonDisabled: function() {
      if (this.$store.state.posesRecognition.modelLoaded == false) {
        return true;
      } else {
        if (this.$store.state.currentGame.poses.ongoing == true) {
          return true;
        } else {
          if (this.$store.state.currentGame.poses.completed == true) {
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
      this.$router.push("results");
    },
    onClickBack() {
      this.$router.push("emotions");
    },
    onClickStart() {
      this.progressBar = this.$refs.progressBarPoses;
      this.seconds = this.$refs.secondsPoses;
      this.$store.commit("startPosesGame", new Date().getTime());

      let timeleft = this.$store.state.posesRecognition.duration;
      let timer = this.$store.state.posesRecognition.duration;
      let that = this;
      let downloadTimer = setInterval(function() {
        that.progressBar.value = timer - --timeleft;
        that.seconds.textContent = timer - that.progressBar.value;
        if (that.$store.state.currentGame.poses.completed == true) {
          clearInterval(downloadTimer);
        } else {
          if (timeleft <= 0) {
            that.$store.commit("endPosesGame", new Date().getTime());
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