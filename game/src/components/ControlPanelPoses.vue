<template>
   <b-row>
    <b-col>
        <div style="margin-top:30px">
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
            <div v-if="(isLevelCompleted == false) && (isGaming == false)">Ok, it is time for the second level ! <span>&#128526;</span> <br>
            Do the five poses as shown below.<br>
            From left to right. As quickly as you can.<br></div>
            
            <div style="margin-top:15px"></div>
            
            <div v-if="isLevelCompleted" 
                 style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%">Level and game completed !<span>&#128170;</span></div>
            <div style="margin-top:15px"></div>
            
            <b-button
              v-if="(isLevelCompleted == false) && (isGaming == false)"
              v-on:click="onClickStart"
              block 
              size="lg"
              style="background-color: #053c9f !important;border-color:#053c9f !important; margin-left:10px"
              :disabled="isStartButtonDisabled"
            >{{startButtonLabel}}</b-button>
            
            <div style="margin-top:15px"></div>
            
            <div v-if="(isLevelCompleted == false)">
              <progress
                v-show="false"
                ref="progressBarPoses"            
                id="progressBarPoses"
                :value="getDuration"
                :max="getDuration"
                style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"
              ></progress>
            </div>

            <div v-if="(isLevelCompleted == false)">Count down:</div>

            <div v-if="(isLevelCompleted == false)" 
                ref="secondsPoses"
                id="secondsPoses"
                style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%"  
                >{{getDuration}}</div>
        
            <div v-if="isLevelCompleted == false" 
             style="margin-top:10px"><b>Note:</b> All taken screenshots stay only in the browser.</div>

            <b-button
              v-if="isLevelCompleted"
              v-on:click="onClickNext"
              block 
              size="lg"
              style="background-color: #053c9f !important;border-color:#053c9f !important; margin-left:10px"
            >Show game results ...</b-button>
          </div>
        </div>
     </b-col>
  </b-row>
</template>

<script>
var value = false;
export default {
  name: "controlpanelposes",
  data() {
    return {
      player: ""
    };
  },
  computed: {
      isGaming(){
        if (this.$store.state.currentGame != undefined){
          if (this.$store.state.currentGame.poses != undefined){
            if (this.$store.state.currentGame.poses.ongoing != undefined){
                value = this.$store.state.currentGame.poses.ongoing;
            } else {
              value = false;
            }
          } else {
            value = false;
          }
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
        return 'Start level 2';
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