<template>
    <div v-show="state!='game'">
        <div class="content d-flex justify-content-center align-items-center text-white">

            <div v-if="state=='intro'" class="font-size-1 m-5">
                <div class="display-4">Level 1</div>
                <div class="display-4 ibm-plex-sans mb-3" style="margin-top: -1rem;">Emotions</div>
                <webcam class="webcam"/>
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
    import Webcam from "./WebCam";

    var inGame = false;
    var dontShow = false;

    export default {
        name: "controlpanelemotions",
        components: {Webcam},
        data() {
            return {
                player: "",
                state: 'intro',
                inGame: inGame
            };
        },
        computed: {

            modelLoaded() {
                return this.$store.state.emotionRecognition.modelLoaded;
            },

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
