<style scoped>
    .notfound {
        color: black;
        text-decoration: line-through;
        margin-right: 10px;
    }

    .found {
        color: black;
        margin-right: 10px;
    }

    .found span:before {
        content: "<";
    }

    .found span:after {
        content: ">";
    }

    .face {
        padding-bottom: 2px;
        padding-left: 2px;
        padding-right: 2px;
        width: 100%;
    }

    .face img {
        width: 100%;
    }

    .loader {
        border: 10px solid #f3f3f3;
        border-radius: 50%;
        border-top: 10px solid #3498db;
        width: 15px;
        height: 15px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<template>
    <b-container>
        <div class="results">
            <!-- MAIN RESULT -->
            <br>
            <b-row>
                <b-col>
                    <h2 style="margin-top:1px;margin-bottom:25px">Results of your game {{ player }}</h2>
                </b-col>
            </b-row>
            <b-row v-if="bothLevelsCompleted == false">
                <b-col>
                    <h2
                            style="margin-top:1px;margin-bottom:5px;color:#FE767C !important"
                    >Both levels need to be completed first !</h2>
                </b-col>
            </b-row>
            <div style="min-height:20px"></div>
            <div v-if="bothLevelsCompleted == true">
                <h4>Your overall duration: {{ durationWithPenalties }} seconds <span>&#127881;</span></h4>
            </div>
            <!-- BUTTONS -->
            <div style="margin-top:20px"></div>
            <center>
                <div v-if="isSavingStatus == true">Saving scores</div>
            </center>
            <center>
                <div v-if="isSavingStatus == true" class="loader"></div>
            </center>
            <b-row v-if="bothLevelsCompleted == true">
                <b-col>
                    <b-button
                            block
                            v-on:click="onStartNewGame"
                            style="margin-right:10px;background-color: black;border-color:#053c9f;"
                    >Start new game
                    </b-button>
                </b-col>
                <b-col>
                    <b-button
                            block
                            v-on:click="onSaveScore"
                            variant="primary"
                            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
                            :disabled="isPlayerAnonymous"
                    ><font color="black">Save score</font></b-button>
                </b-col>
                <b-col>
                    <b-button
                            block
                            v-on:click="onTweet"
                            variant="primary"
                            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
                    ><font color="black">Tweet</font></b-button>
                </b-col>
                <b-col v-if="tweetButtonDisabled == false">
                    <b-button
                            v-if="tweetButtonDisabled == false"
                            v-on:click="onTweetCard"
                            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
                            :disabled="tweetButtonDisabled == true"
                    ><font color="black">{{tweetLabel}}</font></b-button>
                </b-col>
                <b-col>
                    <b-button
                            block
                            v-on:click="onDownloadImage"
                            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
                    ><font color="black">Get game image</font></b-button>
                </b-col>
            </b-row>
            <div style="margin-top:20px"></div>
            <b-row>
                <div style="margin-top:20px"></div>
                <b-col>
                    <center>
                        <b-button
                                v-on:click="onArchitecture"
                                style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
                        ><font color="black">Get more details about the game architecture</font></b-button>
                    </center>
                </b-col>
            </b-row>
            <a id="exportElementHidden" style="display:none"/>
            <!-- MODAL DIALOG-->
            <b-modal ref="modalDialog"
                     hide-footer
                     title="Information">
                <div>
                    <div>{{message}}</div>
                </div>
                <b-btn class="mt-3" @click="hideModal">Close</b-btn>
            </b-modal>
            <b-modal ref="modalDialogError"
                     hide-footer
                     title="Error">
                <div>
                    <div>{{message}}</div>
                    >
                </div>
                <b-btn class="mt-3" @click="hideModalError">Close</b-btn>
            </b-modal>
            <hr>
            <!-- DETAIL RESULTS -->
            <div style="min-height:10x"></div>
            <h4>Result details</h4>
            <b-row>
                <b-col>
                    <h4 style="margin-top:35px;margin-bottom:25px">Level 1: Emotions <span> &#128516;</span></h4>
                </b-col>
            </b-row>
            <div id="capture">
                <!-- EMOTIONS -->
                <b-row>
                    <b-col>
                        <div style="display: table;width:100%">
                            <div style="display: table-row;">
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="happyClass">
                                        <div style="text-align:center"><span>Happy</span></div>
                                        <img
                                                class="face"
                                                id="facehappy"
                                                ref="facehappy"
                                                :src="otherDomainUrl('failed.svg')"
                                        >
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="angryClass">
                                        <div style="text-align:center"><span>Angry</span></div>
                                        <img
                                                class="face"
                                                id="faceangry"
                                                ref="faceangry"
                                                :src="otherDomainUrl('failed.svg')"
                                        >
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="fearClass">
                                        <div style="text-align:center"><span>Fear</span></div>
                                        <img
                                                class="face"
                                                id="facefear"
                                                ref="facefear"
                                                :src="otherDomainUrl('failed.svg')"
                                        >
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="sadClass">
                                        <div style="text-align:center">
                                            <span>Sad</span></div>
                                        <img class="face" id="facesad" ref="facesad" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="surpriseClass">
                                        <div style="text-align:center"><span>Surprise</span></div>
                                        <img
                                                class="face"
                                                id="facesurprise"
                                                ref="facesurprise"
                                                :src="otherDomainUrl('failed.svg')"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <!-- POSES -->
                <b-row>
                    <b-col>
                        <h4 style="margin-top:35px;margin-bottom:5px"></h4>
                    </b-col>
                </b-row>
                <b-row data-html2canvas-ignore="true">
                    <b-col>
                        <h4 style="margin-bottom:20px">Level 2: Poses <span> &#128587;</span></h4>
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
                                        <div style="text-align:center"><span>Capitulation</span></div>
                                        <img class="face" id="pose1" ref="pose1" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="pose2Class">
                                        <div style="text-align:center"><span>No Right Ear</span></div>
                                        <img class="face" id="pose2" ref="pose2" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="pose3Class">
                                        <div style="text-align:center"><span>Dancer</span></div>
                                        <img class="face" id="pose3" ref="pose3" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="pose4Class">
                                        <div style="text-align:center"><span>Elbows</span></div>
                                        <img class="face" id="pose4" ref="pose4" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                                <div style="max-width:100px;display: table-cell;vertical-align: top;">
                                    <div :class="pose5Class">
                                        <div style="text-align:center"><span>Winner</span></div>
                                        <img class="face" id="pose5" ref="pose5" :src="otherDomainUrl('failed.svg')">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <!-- GAME LEVEL DETAILS -->
            <div style="min-height:20px"></div>
            <b-row v-if="bothLevelsCompleted == true">
                <b-col>
                    <h4>Times in game</h4>
                    <div style="min-height:5px"></div>
                    <div style="display: table;width:50%">
                        <div style="display: table-row;">
                            <div style="max-width:5%;display: table-cell;vertical-align: top;"><b>Level</b></div>
                            <div style="max-width:15%;display: table-cell;vertical-align: top;"><b>Duration (secs)</b></div>
                            <div style="max-width:15%;display: table-cell;vertical-align: top;"><b>Not Completed</b></div>
                            <div style="max-width:15%;display: table-cell;vertical-align: top;"><b>Penalty (secs)</b></div>
                        </div>
                        <div style="display: table-row;">
                            <div style="max-width:80px;display: table-cell;vertical-align: top;">1: Emotions</div>
                            <div
                                    style="max-width:80px;display: table-cell;vertical-align: top;"
                            >{{ durationLevelOne }}
                            </div>
                            <div
                                    style="max-width:80px;display: table-cell;vertical-align: top;"
                            >{{ amountNotCompletedEmotions }}
                            </div>
                            <div style="display: table-cell;vertical-align: top;">{{ penaltiyEmotions }}</div>
                        </div>
                        <div style="display: table-row;">
                            <div style="max-width:80;display: table-cell;vertical-align: top;">2: Poses</div>
                            <div
                                    style="max-width:80px;display: table-cell;vertical-align: top;"
                            >{{ durationLevelTwo }}
                            </div>
                            <div
                                    style="max-width:80px;display: table-cell;vertical-align: top;"
                            >{{ amountNotCompletedPoses }}
                            </div>
                            <div style="display: table-cell;vertical-align: top;">{{ penaltiyPoses }}</div>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <!-- DEMO MODE INFORMATION -->
            <div style="margin-top:10px"></div>
            <b-row v-if="this.$store.state.demoMode == true" style="margin-top:10px">
                <b-col>
                    <div
                            style="margin-bottom:2px"><b>Note:</b> In this demo version, the user registration is <b>not supported</b>. The name <b>'Demo Player'</b> is used to your save game scores
                        result in the HighScore list.<br>All taken screenshots stay only in the browser.
                    </div>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    import axios from "axios";
    import html2canvas from "html2canvas";
    import {MomentumOptimizer} from '@tensorflow/tfjs';

    export default {
        mounted() {
            var gameResult = this.getDurationWithPenalties();

            this.$store.commit("setTotalTime", gameResult);
            this.$store.commit("setSavingStatus", false);

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
                tweeting: false,
                message: ""
            };
        },
        computed: {
            tweetLabel: function () {
                let output = "Prepare Twitter Card";
                if (this.$store.state.apis.users.url != "twitter-url-not-defined") {
                    if (this.tweeting == true) {
                        output = "Saving Twitter Card ...";
                    }
                }
                return output;
            },
            bothLevelsCompleted: function () {
                if (
                    this.$store.state.currentGame.emotions.completed == true &&
                    this.$store.state.currentGame.poses.completed == true
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            tweetButtonDisabled: function () {
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
            isPlayerAnonymous: function () {
                return this.$store.state.currentPlayer.isAnonymous;
            },
            isSavingStatus: function () {
                return this.$store.state.saving.status;
            },
            happyClass: function () {
                if (this.$store.state.currentGame.emotions.results.happy == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            angryClass: function () {
                if (this.$store.state.currentGame.emotions.results.angry == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            fearClass: function () {
                if (this.$store.state.currentGame.emotions.results.fear == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            sadClass: function () {
                if (this.$store.state.currentGame.emotions.results.sad == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            surpriseClass: function () {
                if (this.$store.state.currentGame.emotions.results.surprise == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            pose1Class: function () {
                if (this.$store.state.currentGame.poses.results.pose1 == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            pose2Class: function () {
                if (this.$store.state.currentGame.poses.results.pose2 == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            pose3Class: function () {
                if (this.$store.state.currentGame.poses.results.pose3 == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            pose4Class: function () {
                if (this.$store.state.currentGame.poses.results.pose4 == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            pose5Class: function () {
                if (this.$store.state.currentGame.poses.results.pose5 == false) {
                    return "notfound";
                } else {
                    return "found";
                }
            },
            duration: function () {
                return this.getLevelOneDuration() + this.getLevelTwoDuration();
            },
            durationLevelTwo: function () {
                return this.getLevelTwoDuration();
            },
            durationLevelOne: function () {
                return this.getLevelOneDuration();
            },
            amountNotCompletedEmotions: function () {
                return this.getAmountNotCompletedEmotions();
            },
            amountNotCompletedPoses: function () {
                return this.getAmountNotCompletedPoses();
            },
            durationWithPenalties: function () {
                var result = Math.round(((parseFloat(this.getDurationWithPenalties()) * 100) / 100));
                return result;
            },
            penaltiyEmotions: function () {
                return this.getPenaltiyEmotions();
            },
            penaltiyPoses: function () {
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
            onArchitecture() {
                this.$router.push("architecture");
            },
            otherDomainUrl: function (image) {
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
                this.$refs['modalDialog'].show();
            },
            hideModal() {
                this.$refs['modalDialog'].hide();
            },
            showModalError() {
                this.$refs['modalDialogError'].show();
            },
            hideModalError() {
                this.$refs['modalDialogError'].hide();
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

                    if (this.$store.state.highscore.url != "highscore-url-not-defined") {
                        var highscore_url = this.$store.state.highscore.url;
                    }

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
                    this.$store.commit("setSavingStatus", true);

                    axiosService
                        .post(this.$store.state.apis.scores.url, {
                            firstName: firstName,
                            lastName: lastName,
                            gameDate: this.$store.state.currentGame.id,
                            score: this.$store.state.currentGame.totalTimeWithPenalties
                        })
                        .then(function (response) {
                            that.$store.commit("setSavingStatus", false);
                            that.message = "Hello " + firstName + ", your scores data is stored. Take a look in the highscore list.";
                            that.showModal();
                        })
                        .catch(function (error) {
                            console.log("error save scores", error);
                            that.$store.commit("setSavingStatus", false);
                            that.message = "The user's score couldn't be stored. Error: ' " + error + " '";
                            that.showModalError();
                        });
                }
            },
            onStartNewGame() {
                this.$router.push("register");
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
                            .then(function (response) {
                                window.open(
                                    "https://twitter.com/intent/tweet?hashtags=bluecloudmirror,ibm,ibmdeveloper&url=" +
                                    window.location.href +
                                    "&text=Check out Blue Cloud Mirror!",
                                    "_blank"
                                );
                                that.tweeting = false;
                            })
                            .catch(function (error) {
                                console.log(error);
                                that.tweeting = false;
                            });
                    });
                }
            }
        }
    };
</script>

<!-- Loader -->
<style>
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
