<template>
    <div class="d-flex justify-content-center align-items-center">
        <b-row class="ml-1 mr-1 content">
            <b-col>
                <action ref="capitulation" title="Capitulation" level="poses" capture="imagePose1" icon="capitulation"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">

            </div>
            <b-col>
                <action ref="norightear" title="No Right Ear" level="poses" capture="imagePose2" icon="norightear"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="dancer" title="Dancer" level="poses" capture="imagePose3" icon="dancer"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="elbows" title="Elbows" level="poses" capture="imagePose4" icon="elbows"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="winner" title="Winner" level="poses" capture="imagePose5" icon="winner"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Action from "./Action";

    const POSE_POSE1 = "capitulation";
    const POSE_POSE2 = "norightear";
    const POSE_POSE3 = "dancer";
    const POSE_POSE4 = "elbows";
    const POSE_POSE5 = "winner";

    export default {
        name: "results-poses",
        components: {Action},
        data() {
            return {};
        },
        computed: {},
        mounted() {

            this.poses = [POSE_POSE1, POSE_POSE2, POSE_POSE3, POSE_POSE4, POSE_POSE5];
            this.index = 0;

            this.currentAction = '';

            this.nextRecognitionTime = 0;

            this.unwatch0 = this.$store.watch(
                state => {
                    return state.currentGame.poses.ongoing
                },
                val => {
                    if (val) {
                        this.selectNextPose();
                    }
                }
            );

            this.unwatch1 = this.$store.watch(
                state => {
                    return state.posesRecognition.lastResult;
                },
                val => {
                    //console.log("state.emotionRecognition.lastResult changed");
                    if (Date.now() > this.nextRecognitionTime) {
                        this.processPoses(val);
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

            selectNextPose() {
                if (this.index < this.poses.length) {
                    let action = this.currentAction = this.poses[this.index++];
                    let icon = this.currentIcon = this.$refs[action];
                    icon.setState('active');
                    this.$store.commit('updateCurrentAction', {action: action, title: icon.title});

                    this.nextRecognitionTime = Date.now() + this.$store.state.posesRecognition.delay;

                    let delay = Math.floor(this.$store.state.time / (6 - this.index)) * 1000;

                    this.timeOut = setTimeout(() => {
                        icon.setState('failed');
                        this.$store.commit('updateLastResult', 'failed');
                        this.selectNextPose();
                    }, delay);
                }
            },
            handleSuccess() {
                this.currentIcon.setState('success');
                this.$store.commit('updateLastResult', 'success');
                clearTimeout(this.timeOut);
                if (this.index < this.poses.length) {
                    this.selectNextPose();
                } else {
                    this.$store.commit("endPosesGame", new Date().getTime());
                }

            },
            processPoses(val) {

                // capitulation
                if (this.currentAction == POSE_POSE1) {
                    if (
                        val[9].score > 0.4 &&
                        val[10].score > 0.4 &&
                        val[1].score > 0.7 &&
                        val[2].score > 0.7
                    ) {
                        if (
                            val[9].position.y > val[1].position.y &&
                            val[10].position.y > val[2].position.y
                        ) {
                            if (
                                this.$store.state.currentGame.poses.results.pose1 == false
                            ) {
                                this.$store.commit(
                                    "successPose1",
                                    this.$store.state.webcam.lastImage
                                );
                                this.handleSuccess();
                            }
                        }
                    }
                } else

                // left ear only
                if (this.currentAction == POSE_POSE2) {
                    if (val[3].score > 0.8 && val[4].score < 0.2) {
                        if (this.$store.state.currentGame.poses.results.pose2 == false) {
                            this.$store.commit(
                                "successPose2",
                                this.$store.state.webcam.lastImage
                            );
                            this.handleSuccess();
                        }
                    }
                } else

                // dance
                if (this.currentAction == POSE_POSE3) {
                    if (
                        val[0].score > 0.7 &&
                        val[10].score > 0.5 &&
                        val[9].score > 0.5
                    ) {
                        if (
                            val[0].position.x > val[10].position.x &&
                            val[0].position.x > val[9].position.x &&
                            val[10].position.y < val[9].position.y
                        ) {
                            if (
                                this.$store.state.currentGame.poses.results.pose3 == false
                            ) {
                                this.$store.commit(
                                    "successPose3",
                                    this.$store.state.webcam.lastImage
                                );
                                this.handleSuccess();
                            }
                        }
                    }
                } else

                // elbows
                if (this.currentAction == POSE_POSE4) {
                    if (
                        val[7].score > 0.7 &&
                        val[8].score > 0.7 &&
                        val[10].score > 0.8 &&
                        val[9].score > 0.7
                    ) {
                        if (this.$store.state.currentGame.poses.results.pose4 == false) {
                            this.$store.commit(
                                "successPose4",
                                this.$store.state.webcam.lastImage
                            );
                            this.handleSuccess();
                        }
                    }
                } else

                // winner
                if (this.currentAction == POSE_POSE5) {
                    let pose5 = this.$refs.pose5;
                    if (!pose5) pose5 = document.getElementById('pose5');
                    if (
                        val[10].score > 0.7 &&
                        val[2].score > 0.7 &&
                        val[9].score < 0.5
                    ) {
                        if (val[10].position.y < val[2].position.y) {
                            if (
                                this.$store.state.currentGame.poses.results.pose5 == false
                            ) {
                                this.$store.commit(
                                    "successPose5",
                                    this.$store.state.webcam.lastImage
                                );
                                this.handleSuccess();
                            }
                        }
                    }
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
