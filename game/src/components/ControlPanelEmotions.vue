<template>

    <!--  <b-row style="">-->
    <!--    <b-col>-->
    <!--      <div style="margin-top:30px">-->
    <!--        <div v-if="(isLevelCompleted == false) && (isGaming == false)">-->
    <!--          Welcome <b>{{ player }}</b> &#x1F600;,<br>-->
    <!--          show the five emotions as shown below.<br>-->
    <!--          From left to right. As quickly as you can.<br>-->
    <!--        </div>-->
    <!--        -->
    <!--        <div v-if="isLevelCompleted == true" -->
    <!--             style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"> Level completed ! <span>&#128077;</span>-->
    <!--        </div>-->
    <!--        -->
    <!--        <div style="margin-top:15px"></div>-->

    <!--        <b-button -->
    <!--          v-if="(isLevelCompleted == false) && -->
    <!--                        (isGaming == false)"-->
    <!--          v-on:click="onClickStart" -->
    <!--          block size="lg" -->
    <!--          style="background-color: #053c9f !important;border-color:#053c9f !important;" -->
    <!--          :disabled="isStartButtonDisabled">{{startButtonLabel}}</b-button>-->
    <!--        -->


    <!--        <div style="margin-top:15px" v-if="(isLevelCompleted == false)">-->
    <!--        <progress   v-if="(isLevelCompleted == false)"-->
    <!--                    v-show="false"-->
    <!--                    ref="progressBar"-->
    <!--                    id="progressBar"-->
    <!--                    :value="getDuration" -->
    <!--                    :max="getDuration"-->
    <!--                    style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"></progress>-->
    <!--        </div>-->

    <!--        <div v-if="(isLevelCompleted == false)">Count down:</div>-->
    <!--        <div v-if="(isLevelCompleted == false)" -->
    <!--             ref="seconds" id="seconds" style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%">{{getDuration}}</div>-->


    <!--        <div v-if="isLevelCompleted == false" -->
    <!--             style="margin-top:10px"><b>Note:</b> All taken screenshots stay only in the browser.</div>-->
    <!--        -->
    <!--        <b-button v-if="isLevelCompleted"-->
    <!--          v-on:click="onClickNext"-->
    <!--          block -->
    <!--          size="lg"-->
    <!--          style="background-color: #053c9f !important;border-color:#053c9f !important;"-->
    <!--        >Time for level 2 ...</b-button>-->
    <!--      </div>-->
    <!--   </b-col>-->
    <!--  </b-row>-->
    <div v-show="state!='game'">
        <div class="content d-flex justify-content-center align-items-center text-white">

            <div v-if="state=='intro'" class="font-size-1_25 m-5">
                <div class="display-1">Level 1</div>
                <div class="display-1 ibm-plex-sans mb-3" style="margin-top: -1rem;">Emotions</div>
                Welcome <b>{{ player }}</b> &#x1F600;,<br>
                show the five emotions as shown below.<br>
                From left to right. As quickly as you can.<br><br>

                <b-button v-if="modelLoaded" outline-white block @click="onClickStart()">Start/</b-button>
                <div v-if="!modelLoaded" class="text-center font-size-1">Loading Model ...</div>
            </div>

            <div v-if="state=='extro'" class="font-size-1_25 m-5">
                <div class="display-1">Level 1</div>
                <div class="display-1 ibm-plex-sans mb-3" style="margin-top: -1rem;">Completed</div>
                <br>
                <b-button outline-white block @click="onClickNext()">Time for level 2 ...</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    var inGame = false;
    var dontShow = false;

    export default {
        name: "controlpanelemotions",
        data() {
            return {
                player: "",
                state: 'intro',
                inGame: inGame
            };
        },
        computed: {
            // isGaming() {
            //     if (this.$store.state.currentGame != undefined) {
            //         if (this.$store.state.currentGame.emotions != undefined) {
            //             if (this.$store.state.currentGame.emotions.ongoing != undefined) {
            //                 inGame = this.$store.state.currentGame.emotions.ongoing;
            //             } else {
            //                 inGame = false;
            //             }
            //         } else {
            //             inGame = false;
            //         }
            //     } else {
            //         inGame = false;
            //     }
            //     return inGame;
            // },
            // startButtonLabel() {
            //     if (!this.$store.state.emotionRecognition.modelLoaded) {
            //         return 'Loading Model }';
            //     } else {
            //         return 'Start /';
            //     }
            // },
            modelLoaded() {
                return this.$store.state.emotionRecognition.modelLoaded;
            },
            //
            // isLevelCompleted: function () {
            //     return this.$store.state.currentGame.emotions.completed;
            // },
            // getDuration: function () {
            //     return this.$store.state.emotionRecognition.duration;
            // },
            // isStartButtonDisabled: function () {
            //     if (this.$store.state.emotionRecognition.modelLoaded == false) {
            //         return true;
            //     } else {
            //         if (this.$store.state.currentGame.emotions.ongoing == true) {
            //             return true;
            //         } else {
            //             if (this.$store.state.currentGame.emotions.completed == true) {
            //                 return true;
            //             } else {
            //                 return false;
            //             }
            //         }
            //     }
            // }
        },
        mounted() {
            if (this.$store.state.currentPlayer.isAnonymous == true) {
                this.player = "secret friend";
            } else {
                this.player = this.$store.state.currentPlayer.firstName;
            }

            this.$store.watch(
                state => {
                    return state.currentGame.emotions.ongoing;
                },
                val => {
                    if (!val) {
                        this.state = 'extro';
                    }
                }
            );
        },
        methods: {
            onClickNext() {
                this.$router.push("poses");
            },
            onClickStart() {
                this.$store.commit("startEmotionsGame", new Date().getTime());
                this.state = 'game';

                let timeleft = this.$store.state.emotionRecognition.duration;
                let downloadTimer = setInterval(() => {
                    timeleft--;
                    this.$store.commit('updateTime', timeleft);
                    if (this.$store.state.currentGame.emotions.completed == true) {
                        clearInterval(downloadTimer);
                    } else {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                            this.$store.commit("endEmotionsGame", new Date().getTime());
                            setTimeout(() => {
                                this.state = 'extro';
                            }, 1000);
                        }
                    }
                }, 1000);
            }
        }
    };
</script>

<style scoped>
    .content {
        height: 80vh;
        background-color: black;
    }


</style>
