<template>
    <!--  <div style="margin-top:0px" class="resultsemotions" id="resultsemotions">-->
    <!--    <div style="display: table;width:100%">-->
    <!--      <div style="display: table-row;">-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="happyClass">-->
    <!--            <div style="text-align:center">Happy</div>-->
    <!--            <img class="face" id="facehappy" ref="facehappy" :src="otherDomainUrl('happy.svg')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="angryClass">-->
    <!--            <div style="text-align:center">Angry</div>-->
    <!--            <img class="face" id="faceangry" ref="faceangry" :src="otherDomainUrl('angry.svg')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="fearClass">-->
    <!--            <div style="text-align:center">Fear</div>-->
    <!--            <img class="face" id="facefear" ref="facefear" :src="otherDomainUrl('fear.svg')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="sadClass">-->
    <!--            <div style="text-align:center">Sad</div>-->
    <!--            <img class="face" id="facesad" ref="facesad" :src="otherDomainUrl('sad.svg')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="surpriseClass">-->
    <!--            <div style="text-align:center">Surprise</div>-->
    <!--            <img class="face" id="facesurprise" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->

    <!--        <div class="h-100" fluid style="background-color: yellow">-->
    <!--            <b-row class="w-100 h-100"style="background-color: green; overflow: hidden" >-->
    <!--                <b-row class="h-100 justify-content-center" xalign-v="center">-->
    <!--                    <b-col>-->
    <!--                        <img class="face" id="facesurprise1" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--                    </b-col>-->
    <!--                    <b-col>-->
    <!--                        <img class="face" id="facesurprise2" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--                    </b-col>-->
    <!--                    <b-col>-->
    <!--                        <img class="face" id="facesurprise3" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--                    </b-col>-->
    <!--                    <b-col>-->
    <!--                        <img class="face" id="facesurprise4" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--                    </b-col>-->
    <!--                    <b-col>-->
    <!--                        <img class="face" id="facesurprise5" ref="facesurprise" :src="otherDomainUrl('surprise.svg')">-->
    <!--                    </b-col>-->
    <!--                </b-row>-->
    <!--            </b-row>-->

    <!--        </div>-->

    <div class="d-flex justify-content-center align-items-center">
        <b-row class="ml-1 mr-1 content">
            <b-col>
                <action ref="happy" title="Happy" icon="happy"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="angry" title="Angry" icon="angry"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="fear" title="Fear" icon="fear"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="sad" title="Sad" icon="sad"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="surprise" title="Surprise" icon="surprise"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Action from "./Action";

    const EMOTION_HAPPY = "happy";
    const EMOTION_ANGRY = "angry";
    const EMOTION_FEAR = "fear";
    const EMOTION_SAD = "sad";
    const EMOTION_SURPRISE = "surprise";

    export default {
        name: "resultsemotions",
        components: {Action},

        data() {
            return {};
        },
        computed: {},
        mounted() {
            this.emotions = [EMOTION_HAPPY, EMOTION_ANGRY, EMOTION_FEAR, EMOTION_SAD, EMOTION_SURPRISE];
            this.index = 0;

            this.currentAction = '';

            this.nextRecognitionTime = 0;

            this.unwatch0 = this.$store.watch(
                state => {
                    return state.currentGame.emotions.ongoing
                },
                val => {
                    if (val) {
                        this.selectNextEmotion();
                    }
                }
            );

            this.unwatch1 = this.$store.watch(
                state => {
                    return state.emotionRecognition.lastResult;
                },
                val => {
                    if (Date.now() > this.nextRecognitionTime) {
                        let action = this.currentAction;
                        if (action === val.label.toLowerCase()) {
                            this.$refs[action].setState('success');
                            this.$store.commit(`success${val.label}`, this.$store.state.emotionRecognition.lastFace);
                            clearTimeout(this.timeOut);
                            if (this.index < this.emotions.length) {
                                this.selectNextEmotion();
                            } else {
                                this.$store.commit("endEmotionsGame", new Date().getTime());
                            }
                        }
                    }
                },
                {
                    deep: true
                }
            );
        },
        beforeDestroy() {
            this.unwatch0();
            this.unwatch1();
        },
        methods: {
            // otherDomainUrl: function (image) {
            //     let otherDomainUrl = this.$store.state.otherDomainUrl;
            //     let output = image;
            //     if ((otherDomainUrl) && (otherDomainUrl != "") && (otherDomainUrl != "other-domain-url-not-defined")) {
            //         output = otherDomainUrl + image;
            //     }
            //     return output;
            // },
            selectNextEmotion() {
                let action = this.currentAction = this.emotions[this.index++];
                let icon = this.$refs[action];
                icon.setState('active');
                this.$store.commit('updateCurrentAction', {action: action, title: icon.title});

                this.nextRecognitionTime = Date.now() + this.$store.state.emotionRecognition.delay;

                let delay = Math.floor(this.$store.state.emotionRecognition.duration / 5) * 1000;

                if (this.index < this.emotions.length) {
                    this.timeOut = setTimeout(() => {
                        icon.setState('failed');
                        this.selectNextEmotion();
                    }, delay);
                }
            }

            /*
            moveToNextEmotionIfTooLong() {
                let now = new Date().getTime();
                let lastTime = this.$store.state.currentGame.emotions.lastSuccess;
                if (lastTime == 0) {
                    lastTime = this.$store.state.currentGame.emotions.startDate;
                }
                let difference = now - lastTime;
                if (difference > this.$store.state.emotionRecognition.skipEmotionAfter) {
                    this.$store.commit("moveToNextEmotion");
                }
            },
            enforceLastEmotionDetectionDelay() {
                let now = new Date().getTime();
                let lastTime = this.$store.state.currentGame.emotions.lastSuccess;
                if (lastTime == 0) {
                    return false;
                } else {
                    let difference = now - lastTime;
                    if (difference > this.$store.state.emotionRecognition.delay) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
             */
        }
    };
</script>

<style scoped>

    .content {
        max-width: 1200px;
    }

    .arrow {
        width: 1.5vw;
        max-width: 30px;
    }

</style>
