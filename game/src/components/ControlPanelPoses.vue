<template>
    <div v-show="state!='game'">
        <div class="content d-flex justify-content-center align-items-center text-white">

            <div v-if="state=='intro'" class="font-size-1 m-5 text-left">

                <div v-if="firstLevelCompleted">
                    <div class="display-4">Level 2</div>
                    <div class="display-4 ibm-plex-sans mb-3" style="margin-top: -1rem;">Poses</div>
                    <webcam class="webcam"/>
                    Ok, it is time for the second level ! <span>&#128526;</span> <br>
                    Do the five poses as shown below.<br>
                    From left to right. As quickly as you can.<br><br>

                    <b-button v-if="modelLoaded" outline-white block @click="onClickStart()">Start/</b-button>
                    <div v-if="!modelLoaded" class="text-center font-size-1">Loading Model ...</div>
                </div>

                <div v-else>
                    Howdy, hold your horses, buddy <span>&#127943; &#128513;</span><br>
                    You have to play level 1 first!<br><br>
                    <b-button v-if="modelLoaded" outline-white block @click="onClickBack()">Go to level 1 ...</b-button>
                </div>
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
    import Webcam from "./WebCam";
    var value = false;
    export default {
        name: "controlpanelposes",
        components: {Webcam},
        data() {
            return {
                player: "",
                state: 'intro',
            };
        },
        computed: {
            modelLoaded() {
                return this.$store.state.posesRecognition.modelLoaded;
            },
            firstLevelCompleted() {
                return this.$store.state.currentGame.emotions.completed;
            }
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
                            this.state = 'extro';
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

    .webcam {
        margin-bottom: 1rem;
        max-height: 350px;
    }
</style>
