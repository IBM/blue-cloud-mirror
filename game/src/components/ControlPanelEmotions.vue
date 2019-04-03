<template>
  <b-row>
    <b-col>
      <div style="margin-top:30px">
        <div v-if="(isLevelCompleted == false) && (isGaming == false)">
          Welcome <b>{{ player }}</b> &#x1F600;,<br>
          show the five emotions as shown below.<br>
          From left to right. As quickly as you can.<br>
        </div>
        
        <div v-if="isLevelCompleted == true" 
             style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"> Level completed ! <span>&#128077;</span>
        </div>
        
        <div style="margin-top:15px"></div>

        <b-button 
          v-if="(isLevelCompleted == false) && 
                        (isGaming == false)"
          v-on:click="onClickStart" 
          block size="lg" 
          style="background-color: #053c9f !important;border-color:#053c9f !important;" 
          :disabled="isStartButtonDisabled">{{startButtonLabel}}</b-button>
        


        <div style="margin-top:15px" v-if="(isLevelCompleted == false)">
        <progress   v-if="(isLevelCompleted == false)"
                    v-show="false"
                    ref="progressBar"
                    id="progressBar"
                    :value="getDuration" 
                    :max="getDuration"
                    style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"></progress>
        </div>

        <div v-if="(isLevelCompleted == false)">Count down:</div>
        <div v-if="(isLevelCompleted == false)" 
             ref="seconds" id="seconds" style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%">{{getDuration}}</div>


        <div v-if="isLevelCompleted == false" 
             style="margin-top:10px"><b>Note:</b> All taken screenshots stay only in the browser.</div>
        
        <b-button v-if="isLevelCompleted"
          v-on:click="onClickNext"
          block 
          size="lg"
          style="background-color: #053c9f !important;border-color:#053c9f !important;"
        >Time for level 2 ...</b-button>
      </div>
   </b-col>
  </b-row>
</template>

<script>
var inGame = false;
var dontShow = false;

export default {
  name: "controlpanelemotions",
  data() {
    return {
      player: "",
      inGame: inGame
    };
  },
  computed: {
    isGaming(){
      if (this.$store.state.currentGame != undefined){
        if (this.$store.state.currentGame.emotions != undefined){
          if (this.$store.state.currentGame.emotions.ongoing != undefined){
            inGame = this.$store.state.currentGame.emotions.ongoing;
          } else {
            inGame = false;
          }
        } else {
          inGame = false;
        }
      } else {
        inGame = false;
      }
      return inGame;
    },
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
    forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;
        
        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
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
            clearInterval(downloadTimer);
            that.$store.commit("endEmotionsGame", new Date().getTime());           
          }
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>

</style>