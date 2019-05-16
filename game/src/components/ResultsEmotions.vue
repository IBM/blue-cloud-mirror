<template>
    <div class="d-flex justify-content-center align-items-center text-white">
        <b-row class="ml-1 mr-1 content">
            <b-col>
                <action ref="happy" title="Happy" level="emotions" capture="imageHappy" icon="happy"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="angry" title="Angry" level="emotions" capture="imageAngry" icon="angry"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="fear" title="Fear" level="emotions" capture="imageFear" icon="fear"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="sad" title="Sad" level="emotions" capture="imageSad" icon="sad"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="surprise" title="Surprise" level="emotions" capture="imageSurprise" icon="surprise"/>
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
                            this.$store.commit('updateLastResult', 'success');
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

            selectNextEmotion() {
                if (this.index < this.emotions.length) {
                    let action = this.currentAction = this.emotions[this.index++];
                    let icon = this.$refs[action];
                    icon.setState('active');
                    this.$store.commit('updateCurrentAction', {action: action, title: icon.title});

                    this.nextRecognitionTime = Date.now() + this.$store.state.emotionRecognition.delay;

                    let delay = Math.floor(this.$store.state.time / (6 - this.index)) * 1000;
                    if (delay <= 0) delay = Math.floor(this.$store.state.emotionRecognition.duration / 5);

                    this.timeOut = setTimeout(() => {
                        icon.setState('failed');
                        this.$store.commit('updateLastResult', 'failed');
                        this.selectNextEmotion();
                    }, delay);
                }
            }
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
