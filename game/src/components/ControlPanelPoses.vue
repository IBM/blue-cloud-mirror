<template>
   <b-row>
    <b-col>
        <div>
          <div v-if="firstLevelCompleted == false">
            <div>Howdy, hold your horses, buddy <span>&#127943; &#128513;</span></div>
            <div style="margin-top:15px"></div>
            <div>You have to play level 1 first</div>
            <div style="margin-top:15px"></div>
            <b-button v-on:click="onClickBack" 
                      block 
                      size="lg"
                      style="background-color: #053c9f !important;border-color:#053c9f !important;">Go to level 1 ...</b-button>
          </div>
          <div v-if="firstLevelCompleted == true">
            <div v-if="(isLevelCompleted == false) && (isGaming == false)">Ok, it is time for the second level ! <span>&#128526;</span></div>
            <div
              v-if="(isLevelCompleted == false) && (isGaming == false)"
              style="margin-top:15px;font-size:smaller"
            >Do the five poses as shown below.</div>
            <div
              v-if="(isLevelCompleted == false) && (isGaming == false)"
              style="font-size:smaller"
            >From left to right. As quickly as you can.</div>
            <div style="margin-top:15px"></div>
            <div v-if="isLevelCompleted" 
                 style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%">Level and game completed !<span>&#128170;</span></div>
            <div style="margin-top:15px"></div>
            <b-button
              v-if="(isLevelCompleted == false) && (isGaming == false)"
              v-on:click="onClickStart"
              block 
              size="lg"
              style="background-color: #053c9f !important;border-color:#053c9f !important;"
              :disabled="isStartButtonDisabled"
            >{{startButtonLabel}}</b-button>
            <div style="margin-top:15px"></div>
            <progress
              v-show="false"
              ref="progressBarPoses"            
              id="progressBarPoses"
              :value="getDuration"
              :max="getDuration"
              style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"
            ></progress>
            <div v-if="(isLevelCompleted == false) && (isGaming == false)">Count down:</div>
            <div v-if="(isLevelCompleted == false) && (isGaming == false)" 
             ref="seconds" style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%" id="secondsPoses">{{getDuration}}</div>
            <div v-if="(isLevelCompleted == false) && (isGaming == false)" style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%" ref="secondsPoses" id="secondsPoses">{{getDuration}}</div>
        
            <div v-if="isLevelCompleted == false" style="font-size:smaller; margin-top:10px"><b>Note:</b> All taken screenshots stay only in the browser.</div>
            <b-button
              v-if="isLevelCompleted"
              v-on:click="onClickNext"
              block 
              size="lg"
              style="background-color: #053c9f !important;border-color:#053c9f !important;"
            >Show game results ...</b-button>
          </div>
        </div>
     </b-col>
  </b-row>
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
    isGaming(){
      var value = false;
      if (this.$store.state.currentGame != undefined){
        value = this.$store.state.currentGame.poses.ongoing;
      } else {
        value = false;
      }
      return value;
    },
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