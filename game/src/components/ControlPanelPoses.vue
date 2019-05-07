<template>
    <!--   <b-row>-->
    <!--    <b-col>-->
    <!--        <div style="margin-top:30px">-->
    <!--&lt;!&ndash;          <div v-if="firstLevelCompleted == false">&ndash;&gt;-->
    <!--          <div v-if="false">-->
    <!--            <div>Howdy, hold your horses, buddy <span>&#127943; &#128513;</span></div>-->
    <!--            <div style="margin-top:15px"></div>-->
    <!--            <div>You have to play level 1 first</div>-->
    <!--            <div style="margin-top:15px"></div>-->
    <!--            <b-button v-on:click="onClickBack" -->
    <!--                      block -->
    <!--                      size="lg"-->
    <!--                      style="background-color: #053c9f !important;border-color:#053c9f !important;">Go to level 1 ...</b-button>-->
    <!--          </div>-->
    <!--&lt;!&ndash;          <div v-if="firstLevelCompleted == true">&ndash;&gt;-->
    <!--          <div v-if="true">-->
    <!--            <div v-if="(isLevelCompleted == false) && (isGaming == false)">Ok, it is time for the second level ! <span>&#128526;</span> <br>-->
    <!--            Do the five poses as shown below.<br>-->
    <!--            From left to right. As quickly as you can.<br></div>-->
    <!--            -->
    <!--            <div style="margin-top:15px"></div>-->
    <!--            -->
    <!--            <div v-if="isLevelCompleted" -->
    <!--                 style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%">Level and game completed !<span>&#128170;</span></div>-->
    <!--            <div style="margin-top:15px"></div>-->
    <!--            -->
    <!--            <b-button-->
    <!--              v-if="(isLevelCompleted == false) && (isGaming == false)"-->
    <!--              v-on:click="onClickStart"-->
    <!--              block -->
    <!--              size="lg"-->
    <!--              style="background-color: #053c9f !important;border-color:#053c9f !important; margin-left:10px"-->
    <!--              :disabled="isStartButtonDisabled"-->
    <!--            >{{startButtonLabel}}</b-button>-->
    <!--                        -->
    <!--            <div style="margin-top:15px" v-if="(isLevelCompleted == false)">-->
    <!--            <progress  -->
    <!--                v-if="(isLevelCompleted == false)"-->
    <!--                v-show="false"-->
    <!--                ref="progressBarPoses"            -->
    <!--                id="progressBarPoses"-->
    <!--                :value="getDuration"-->
    <!--                :max="getDuration"-->
    <!--                style="background-color: #FFFFFF !important;border-color:##FFFFFF !important; font-size:300%"-->
    <!--            ></progress>-->
    <!--            </div>-->

    <!--            <div v-if="(isLevelCompleted == false)">Count down:</div>-->

    <!--            <div v-if="(isLevelCompleted == false)" -->
    <!--                ref="secondsPoses"-->
    <!--                id="secondsPoses"-->
    <!--                style="background-color: #FFFFFF !important;border-color:#FFFFFF !important; font-size:300%"  -->
    <!--                >{{getDuration}}</div>-->
    <!--        -->
    <!--            <div v-if="isLevelCompleted == false" -->
    <!--             style="margin-top:10px"><b>Note:</b> All taken screenshots stay only in the browser.</div>-->

    <!--            <b-button-->
    <!--              v-if="isLevelCompleted"-->
    <!--              v-on:click="onClickNext"-->
    <!--              block -->
    <!--              size="lg"-->
    <!--              style="background-color: #053c9f !important;border-color:#053c9f !important; margin-left:10px"-->
    <!--            >Show game results ...</b-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--     </b-col>-->
    <!--  </b-row>-->

    <div v-show="state!='game'">
        <div class="content d-flex justify-content-center align-items-center text-white">

            <div v-if="state=='intro'" class="font-size-1_25 m-5 text-left">
                <div class="display-1">Level 2</div>
                <div class="display-1 ibm-plex-sans mb-3" style="margin-top: -1rem;">Poses</div>
                Ok, it is time for the second level ! <span>&#128526;</span> <br>
                Do the five poses as shown below.<br>
                From left to right. As quickly as you can.<br><br>

                <b-button v-if="modelLoaded" outline-white block @click="onClickStart()">Start/</b-button>
                <div v-if="!modelLoaded" class="text-center font-size-1">Loading Model ...</div>
            </div>

            <div v-if="state=='extro'" class="font-size-1_25 m-5">
                <div class="display-1">Level 2</div>
                <div class="display-1 ibm-plex-sans mb-3" style="margin-top: -1rem;">Completed</div>
                <br>
                <b-button outline-white block @click="onClickNext()">Show game results ...</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    var value = false;
    export default {
        name: "controlpanelposes",
        data() {
            return {
                player: "",
                state: 'intro',
            };
        },
        computed: {
            // isGaming() {
            //     if (this.$store.state.currentGame != undefined) {
            //         if (this.$store.state.currentGame.poses != undefined) {
            //             if (this.$store.state.currentGame.poses.ongoing != undefined) {
            //                 value = this.$store.state.currentGame.poses.ongoing;
            //             } else {
            //                 value = false;
            //             }
            //         } else {
            //             value = false;
            //         }
            //     } else {
            //         value = false;
            //     }
            //     return value;
            // },

            modelLoaded() {
                return this.$store.state.posesRecognition.modelLoaded;
            },

            // startButtonLabel() {
            //     if (this.$store.state.posesRecognition.modelLoaded == false) {
            //         return 'Loading Model ...';
            //     } else {
            //         return 'Start level 2';
            //     }
            // },
            firstLevelCompleted() {
                return this.$store.state.currentGame.emotions.completed;
            }, // isLevelCompleted: function () {
            //     return this.$store.state.currentGame.poses.completed;
            // },

            // getDuration: function () {
            //     return this.$store.state.posesRecognition.duration;
            // },
            // isStartButtonDisabled: function () {
            //     if (this.$store.state.posesRecognition.modelLoaded == false) {
            //         return true;
            //     } else {
            //         if (this.$store.state.currentGame.poses.ongoing == true) {
            //             return true;
            //         } else {
            //             if (this.$store.state.currentGame.poses.completed == true) {
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
                    return state.currentGame.poses.ongoing;
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
                this.$router.push("results");
            },
            onClickBack() {
                this.$router.push("emotions");
            },
            onClickStart() {
                this.$store.commit("startPosesGame", new Date().getTime());
                this.$emit('gameStarted');
                this.state = 'game';

                let timeleft = this.$store.state.posesRecognition.duration;
                let downloadTimer = setInterval(() => {
                    timeleft--;
                    this.$store.commit('updateTime', timeleft);
                    if (this.$store.state.currentGame.poses.completed == true) {
                        clearInterval(downloadTimer);
                    } else {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                            this.$store.commit("endPosesGame", new Date().getTime());
                            setTimeout(()=>{
                                this.$emit('gameEnded');
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
