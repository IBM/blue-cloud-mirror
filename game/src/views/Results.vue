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

.face {
  padding-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
  width: 100%;
}
</style>

<template>
  <div class="results">
    <b-row>
      <b-col>
        <h4 style="margin-top:1px;margin-bottom:25px">Results from {{ player }}</h4>
      </b-col>
    </b-row>
    <b-row v-if="bothLevelsCompleted == false">
      <b-col>
        <b
          style="margin-top:1px;margin-bottom:5px;color: #ffc107 !important"
        >Both levels need to be completed first !</b>
      </b-col>
    </b-row>
    <b-row v-if="bothLevelsCompleted == true">
      <b-col>
        <b
          style="margin-top:1px;margin-bottom:15px;"
        >Overall Duration: {{ durationWithPenalties }} Seconds</b>
        <div style="min-height:20px"></div>
        <div style="display: table;width:100%">
          <div style="display: table-row;">
            <div style="max-width:80px;display: table-cell;vertical-align: top;">Level</div>
            <div style="max-width:80px;display: table-cell;vertical-align: top;">Duration (secs)</div>
            <div style="max-width:80px;display: table-cell;vertical-align: top;">Not Completed</div>
            <div style="display: table-cell;vertical-align: top;">Penalty (secs)</div>
          </div>
          <div style="display: table-row;">
            <div style="max-width:80px;display: table-cell;vertical-align: top;">1: Emotions</div>
            <div
              style="max-width:80px;display: table-cell;vertical-align: top;"
            >{{ durationLevelOne }}</div>
            <div
              style="max-width:80px;display: table-cell;vertical-align: top;"
            >{{ amountNotCompletedEmotions }}</div>
            <div style="display: table-cell;vertical-align: top;">{{ penaltiyEmotions }}</div>
          </div>
          <div style="display: table-row;">
            <div style="max-width:80;display: table-cell;vertical-align: top;">2: Poses</div>
            <div
              style="max-width:80px;display: table-cell;vertical-align: top;"
            >{{ durationLevelTwo }}</div>
            <div
              style="max-width:80px;display: table-cell;vertical-align: top;"
            >{{ amountNotCompletedPoses }}</div>
            <div style="display: table-cell;vertical-align: top;">{{ penaltiyPoses }}</div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h4 style="margin-top:35px;margin-bottom:25px">Level 1: Emotions</h4>
      </b-col>
    </b-row>
    <div id="capture">
      <b-row>
        <b-col>
          <div style="display: table;width:100%">
            <div style="display: table-row;">
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="happyClass">
                  <div style="text-align:center">Happy</div>
                  <img
                    class="face"
                    id="facehappy"
                    ref="facehappy"
                    :src="otherDomainUrl('white.jpeg')"
                  >
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="angryClass">
                  <div style="text-align:center">Angry</div>
                  <img
                    class="face"
                    id="faceangry"
                    ref="faceangry"
                    :src="otherDomainUrl('white.jpeg')"
                  >
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="fearClass">
                  <div style="text-align:center">Fear</div>
                  <img
                    class="face"
                    id="facefear"
                    ref="facefear"
                    :src="otherDomainUrl('white.jpeg')"
                  >
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="sadClass">
                  <div style="text-align:center">Sad</div>
                  <img class="face" id="facesad" ref="facesad" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="surpriseClass">
                  <div style="text-align:center">Surprise</div>
                  <img
                    class="face"
                    id="facesurprise"
                    ref="facesurprise"
                    :src="otherDomainUrl('white.jpeg')"
                  >
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 style="margin-top:35px;margin-bottom:5px"></h4>
        </b-col>
      </b-row>
      <b-row data-html2canvas-ignore="true">
        <b-col>
          <h4 style="margin-bottom:20px">Level 2: Poses</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 style="margin-bottom:5px"></h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div style="display: table;width:100%">
            <div style="display: table-row;">
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="pose1Class">
                  <div style="text-align:center">Capitulation</div>
                  <img class="face" id="pose1" ref="pose1" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="pose2Class">
                  <div style="text-align:center">No Right Ear</div>
                  <img class="face" id="pose2" ref="pose2" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="pose3Class">
                  <div style="text-align:center">Dancer</div>
                  <img class="face" id="pose3" ref="pose3" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="pose4Class">
                  <div style="text-align:center">Elbows</div>
                  <img class="face" id="pose4" ref="pose4" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
              <div style="max-width:100px;display: table-cell;vertical-align: top;">
                <div :class="pose5Class">
                  <div style="text-align:center">Winner</div>
                  <img class="face" id="pose5" ref="pose5" :src="otherDomainUrl('white.jpeg')">
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row style="margin-top:40px">
      <b-col>
        <b-button
          v-on:click="onStartNewGame"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Start new Game</b-button>
        <b-button
          v-on:click="onSaveScore"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
          :disabled="isPlayerAnonymous"
        >Save Score</b-button>
        <b-button
          v-on:click="onGetAccount"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Get IBM Cloud Account</b-button>
        <b-button
          v-on:click="onReadPattern"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Read Pattern</b-button>
        <b-button
          v-on:click="onGetTheCode"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Download Code</b-button>
        <b-button
          v-on:click="onDownloadImage"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Download Image</b-button>
        <b-button
          v-on:click="onTweet"
          variant="primary"
          style="margin-right:10px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
        >Tweet</b-button>
        <b-button
          v-if="tweetButtonDisabled == false"
          v-on:click="onTweetCard"
          variant="primary"
          style="margin-right:20px;margin-bottom:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
          :disabled="tweetButtonDisabled == true"
        >{{tweetLabel}}</b-button>
      </b-col>
    </b-row>
    <b-row v-if="this.$store.state.demoMode == true" style="margin-top:10px">
      <b-col>
        <div
          style="margin-bottom:2px"
        >Note: In this demo version, real user names cannot be stored in the highscore list. A user 'Demo Player' is used instead.</div>
      </b-col>
    </b-row>
    <a id="exportElementHidden" style="display:none"/>
    <b-modal ref="modelDialog" hide-footer title="Error saving Scores">
      <div>
        <div>The user's score couldn't be stored.</div>
      </div>
      <b-btn class="mt-3" @click="hideModal">Close</b-btn>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import html2canvas from "html2canvas";

export default {
  mounted() {
    this.$store.commit("setTotalTime", this.getDurationWithPenalties());

    if (this.$store.state.currentPlayer.isAnonymous == true) {
      this.player = "my secret friend";
    } else {
      this.player = this.$store.state.currentPlayer.firstName;
    }

    if (this.$store.state.currentGame.emotions.results.happy == true) {
      let facehappy = this.$refs.facehappy;
      facehappy.src = this.$store.state.currentGame.emotions.results.imageHappy;
    }
    if (this.$store.state.currentGame.emotions.results.angry == true) {
      let faceangry = this.$refs.faceangry;
      faceangry.src = this.$store.state.currentGame.emotions.results.imageAngry;
    }
    if (this.$store.state.currentGame.emotions.results.fear == true) {
      let facefear = this.$refs.facefear;
      facefear.src = this.$store.state.currentGame.emotions.results.imageFear;
    }
    if (this.$store.state.currentGame.emotions.results.sad == true) {
      let facesad = this.$refs.facesad;
      facesad.src = this.$store.state.currentGame.emotions.results.imageSad;
    }
    if (this.$store.state.currentGame.emotions.results.surprise == true) {
      let facesurprise = this.$refs.facesurprise;
      facesurprise.src = this.$store.state.currentGame.emotions.results.imageSurprise;
    }
    if (this.$store.state.currentGame.poses.results.pose1 == true) {
      let facepose1 = this.$refs.pose1;
      facepose1.src = this.$store.state.currentGame.poses.results.imagePose1;
    }
    if (this.$store.state.currentGame.poses.results.pose2 == true) {
      let facepose2 = this.$refs.pose2;
      facepose2.src = this.$store.state.currentGame.poses.results.imagePose2;
    }
    if (this.$store.state.currentGame.poses.results.pose3 == true) {
      let facepose3 = this.$refs.pose3;
      facepose3.src = this.$store.state.currentGame.poses.results.imagePose3;
    }
    if (this.$store.state.currentGame.poses.results.pose4 == true) {
      let facepose4 = this.$refs.pose4;
      facepose4.src = this.$store.state.currentGame.poses.results.imagePose4;
    }
    if (this.$store.state.currentGame.poses.results.pose5 == true) {
      let facepose5 = this.$refs.pose5;
      facepose5.src = this.$store.state.currentGame.poses.results.imagePose5;
    }
  },
  data() {
    return {
      player: "",
      tweeting: false
    };
  },
  computed: {
    tweetLabel: function() {
      let output = "Prepare Twitter Card";
      if (this.$store.state.apis.users.url != "twitter-url-not-defined") {
        if (this.tweeting == true) {
          output = "Saving Twitter Card ...";
        }
      }
      return output;
    },
    bothLevelsCompleted: function() {
      if (
        this.$store.state.currentGame.emotions.completed == true &&
        this.$store.state.currentGame.poses.completed == true
      ) {
        return true;
      } else {
        return false;
      }
    },
    tweetButtonDisabled: function() {
      if (this.$store.state.demoMode == true) {
        return true;
      } else {
        if (this.$store.state.apis.users.url != "twitter-url-not-defined") {
          if (this.bothLevelsCompleted == false) {
            return true;
          } else {
            if (this.tweeting == true) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return true;
        }
      }
    },
    isPlayerAnonymous: function() {
      return this.$store.state.currentPlayer.isAnonymous;
    },
    happyClass: function() {
      if (this.$store.state.currentGame.emotions.results.happy == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    angryClass: function() {
      if (this.$store.state.currentGame.emotions.results.angry == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    fearClass: function() {
      if (this.$store.state.currentGame.emotions.results.fear == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    sadClass: function() {
      if (this.$store.state.currentGame.emotions.results.sad == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    surpriseClass: function() {
      if (this.$store.state.currentGame.emotions.results.surprise == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    pose1Class: function() {
      if (this.$store.state.currentGame.poses.results.pose1 == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    pose2Class: function() {
      if (this.$store.state.currentGame.poses.results.pose2 == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    pose3Class: function() {
      if (this.$store.state.currentGame.poses.results.pose3 == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    pose4Class: function() {
      if (this.$store.state.currentGame.poses.results.pose4 == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    pose5Class: function() {
      if (this.$store.state.currentGame.poses.results.pose5 == false) {
        return "notfound";
      } else {
        return "found";
      }
    },
    duration: function() {
      return this.getLevelOneDuration() + this.getLevelTwoDuration();
    },
    durationLevelTwo: function() {
      return this.getLevelTwoDuration();
    },
    durationLevelOne: function() {
      return this.getLevelOneDuration();
    },
    amountNotCompletedEmotions: function() {
      return this.getAmountNotCompletedEmotions();
    },
    amountNotCompletedPoses: function() {
      return this.getAmountNotCompletedPoses();
    },
    durationWithPenalties: function() {
      return this.getDurationWithPenalties();
    },
    penaltiyEmotions: function() {
      return this.getPenaltiyEmotions();
    },
    penaltiyPoses: function() {
      return this.getPenaltiyPoses();
    }
  },
  methods: {
    onGetTheCode() {
      window.location = "https://github.com/ibm/blue-cloud-mirror";
    },
    onGetAccount() {
      window.location = "https://ibm.biz/nheidloff";
    },
    onTweet() {
      window.location =
        "https://twitter.com/intent/tweet?hashtags=BlueCloudMirror,IBMDeveloper&text=Check%20out%20the%20IBM%20Cloud%20showcase%20https://blue-cloud-mirror.mybluemix.net";
    },
    onReadPattern() {
      window.location =
        "https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/";
    },
    otherDomainUrl: function(image) {
      let otherDomainUrl = this.$store.state.otherDomainUrl;
      let output = image;
      if (
        otherDomainUrl &&
        otherDomainUrl != "" &&
        otherDomainUrl != "other-domain-url-not-defined"
      ) {
        output = otherDomainUrl + image;
      }
      return output;
    },
    showModal() {
      this.$refs.modelDialog.show();
    },
    hideModal() {
      this.$refs.modelDialog.hide();
    },
    getPenaltiyEmotions() {
      return this.getAmountNotCompletedEmotions() * 2;
    },
    getPenaltiyPoses() {
      return this.getAmountNotCompletedPoses() * 2;
    },
    getDurationWithPenalties() {
      let penalityOne = this.getAmountNotCompletedEmotions() * 2;
      let penalityTwo = this.getAmountNotCompletedPoses() * 2;
      return (
        this.getLevelOneDuration() +
        this.getLevelTwoDuration() +
        penalityOne +
        penalityTwo
      );
    },
    getLevelOneDuration() {
      let levelOneStart = this.$store.state.currentGame.emotions.startDate;
      let levelOneEnd = this.$store.state.currentGame.emotions.endDate;
      let levelOneDuration = levelOneEnd - levelOneStart;
      if (
        levelOneDuration >
        this.$store.state.emotionRecognition.duration * 1000
      ) {
        levelOneDuration = this.$store.state.emotionRecognition.duration * 1000;
      }
      return levelOneDuration / 1000;
    },
    getLevelTwoDuration() {
      let levelTwoStart = this.$store.state.currentGame.poses.startDate;
      let levelTwoEnd = this.$store.state.currentGame.poses.endDate;
      let levelTwoDuration = levelTwoEnd - levelTwoStart;
      if (
        levelTwoDuration >
        this.$store.state.posesRecognition.duration * 1000
      ) {
        levelTwoDuration = this.$store.state.posesRecognition.duration * 1000;
      }
      return levelTwoDuration / 1000;
    },
    getAmountNotCompletedEmotions() {
      let amount = 0;
      if (this.$store.state.currentGame.emotions.results.happy == false)
        amount++;
      if (this.$store.state.currentGame.emotions.results.angry == false)
        amount++;
      if (this.$store.state.currentGame.emotions.results.fear == false)
        amount++;
      if (this.$store.state.currentGame.emotions.results.sad == false) amount++;
      if (this.$store.state.currentGame.emotions.results.surprise == false)
        amount++;
      return amount;
    },
    getAmountNotCompletedPoses() {
      let amount = 0;
      if (this.$store.state.currentGame.poses.results.pose1 == false) amount++;
      if (this.$store.state.currentGame.poses.results.pose2 == false) amount++;
      if (this.$store.state.currentGame.poses.results.pose3 == false) amount++;
      if (this.$store.state.currentGame.poses.results.pose4 == false) amount++;
      if (this.$store.state.currentGame.poses.results.pose5 == false) amount++;
      return amount;
    },
    onSaveScore() {
      if (this.$store.state.apis.scores.url != "scores-url-not-defined") {
        let email = "demo@email.com";
        let firstName = "Demo";
        let lastName = "Player";
        if (this.$store.state.demoMode == false) {
          firstName = this.$store.state.currentPlayer.firstName;
          lastName = this.$store.state.currentPlayer.lastName;
        }
        const axiosService = axios.create({
          timeout: 10000,
          headers: {
            accept: "application/json",
            "content-type": "application/json"
          }
        });

        let that = this;
        axiosService
          .post(this.$store.state.apis.scores.url, {
            firstName: firstName,
            lastName: lastName,
            gameDate: this.$store.state.currentGame.id,
            score: this.$store.state.currentGame.totalTimeWithPenalties
          })
          .then(function(response) {
            that.$router.push("start");
          })
          .catch(function(error) {
            console.log(error);
            that.showModal();
          });
      }
    },
    onStartNewGame() {
      this.$router.push("start");
    },
    onDownloadImage() {
      html2canvas(document.querySelector("#capture")).then(canvas => {
        let imageEncoded = canvas.toDataURL("image/png");
        let exportElement = document.getElementById("exportElementHidden");
        exportElement.setAttribute("href", imageEncoded);
        exportElement.setAttribute("download", "blue-cloud-mirror.png");
        exportElement.click();
      });
    },
    onTweetCard() {
      if (this.$store.state.apis.users.url != "twitter-url-not-defined") {
        this.tweeting = true;
        const axiosService = axios.create({
          timeout: 50000,
          headers: {
            "Content-Type": "application/json"
          }
        });

        let that = this;
        html2canvas(document.querySelector("#capture")).then(canvas => {
          let imageEncoded = canvas.toDataURL("image/png");

          imageEncoded = imageEncoded.substring(
            imageEncoded.indexOf(",") + 1,
            imageEncoded.length
          );
          axiosService
            .post(this.$store.state.apis.twitter.url, {
              image: imageEncoded
            })
            .then(function(response) {
              window.open(
                "https://twitter.com/intent/tweet?hashtags=bluecloudmirror,ibm,ibmdeveloper&url=" +
                  window.location.href +
                  "&text=Check out Blue Cloud Mirror!",
                "_blank"
              );
              that.tweeting = false;
            })
            .catch(function(error) {
              console.log(error);
              that.tweeting = false;
            });
        });
      }
    }
  }
};
</script>