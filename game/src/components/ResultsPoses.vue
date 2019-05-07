<template>
    <!--  <div style="margin-top:30px" class="resultsposes" id="resultsposes">-->
    <!--    <div style="display: table;width:100%">-->
    <!--      <div style="display: table-row;">-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="pose1Class">-->
    <!--            <div style="text-align:center">Capitulation</div>-->
    <!--            <img class="face" id="pose1" ref="pose1" :src="otherDomainUrl('capitulation.png')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="pose2Class">-->
    <!--            <div style="text-align:center">No Right Ear</div>-->
    <!--            <img class="face" id="pose2" ref="pose2" :src="otherDomainUrl('norightear.png')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="pose3Class">-->
    <!--            <div style="text-align:center">Dancer</div>-->
    <!--            <img class="face" id="pose3" ref="pose3" :src="otherDomainUrl('dancer.png')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="pose4Class">-->
    <!--            <div style="text-align:center">Elbows</div>-->
    <!--            <img class="face" id="pose4" ref="pose4" :src="otherDomainUrl('elbows.png')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="max-width:100px;display: table-cell;vertical-align: top;">-->
    <!--          <div :class="pose5Class">-->
    <!--            <div style="text-align:center">Winner</div>-->
    <!--            <img class="face" id="pose5" ref="pose5" :src="otherDomainUrl('winner.png')">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
    <div class="d-flex justify-content-center align-items-center">
        <b-row class="ml-1 mr-1 content">
            <b-col>
                <action ref="capitulation" title="Capitulation" icon="capitulation"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="norightear" title="No Right Ear" icon="norightear"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="dancer" title="Dancer" icon="dancer"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="elbows" title="Elbows" icon="elbows"/>
            </b-col>
            <div class="align-self-center arrow">
                <img class="arrow" src="/arrow.svg">
            </div>
            <b-col>
                <action ref="winner" title="Winner" icon="winner"/>
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
                        this.processPoses();
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
            selectNextPose() {
                let action = this.currentAction = this.poses[this.index++];
                let icon = this.$refs[action];
                icon.setState('active');
                this.$store.commit('updateCurrentAction', {action: action, title: icon.title});

                let delay = Math.floor(this.$store.state.posesRecognition.duration / 5) * 1000;

                this.nextRecognitionTime = Date.now() + this.$store.state.posesRecognition.delay;

                if (this.index < this.poses.length) {
                    this.timeOut = setTimeout(() => {
                        icon.setState('failed');
                        this.selectNextPose();
                    }, delay);
                }
            },
            processPoses() {
                // capitulation
                if (this.$store.state.currentGame.poses.currentPose == POSE_POSE1) {
                    let pose1 = this.$refs.pose1;
                    if (!pose1) pose1 = document.getElementById('pose1');
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
                                pose1.src = this.$store.state.webcam.lastImage;
                            }
                        }
                    }
                }

                // left ear only
                if (this.$store.state.currentGame.poses.currentPose == POSE_POSE2) {
                    let pose2 = this.$refs.pose2;
                    if (!pose2) pose2 = document.getElementById('pose2');
                    if (val[3].score > 0.8 && val[4].score < 0.2) {
                        if (this.$store.state.currentGame.poses.results.pose2 == false) {
                            this.$store.commit(
                                "successPose2",
                                this.$store.state.webcam.lastImage
                            );
                            pose2.src = this.$store.state.webcam.lastImage;
                        }
                    }
                }

                // dance
                if (this.$store.state.currentGame.poses.currentPose == POSE_POSE3) {
                    let pose3 = this.$refs.pose3;
                    if (!pose3) pose3 = document.getElementById('pose3');
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
                                pose3.src = this.$store.state.webcam.lastImage;
                            }
                        }
                    }
                }

                // elbows
                if (this.$store.state.currentGame.poses.currentPose == POSE_POSE4) {
                    let pose4 = this.$refs.pose4;
                    if (!pose4) pose4 = document.getElementById('pose4');
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
                            pose4.src = this.$store.state.webcam.lastImage;
                        }
                    }
                }

                // winner
                if (this.$store.state.currentGame.poses.currentPose == POSE_POSE5) {
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
                                pose5.src = this.$store.state.webcam.lastImage;
                            }
                        }
                    }
                }
            }
            /* moveToNextPoseIfTooLong() {
                 let now = new Date().getTime();
                 let lastTime = this.$store.state.currentGame.poses.lastSuccess;
                 if (lastTime == 0) {
                     lastTime = this.$store.state.currentGame.poses.startDate;
                 }
                 let difference = now - lastTime;
                 if (difference > this.$store.state.posesRecognition.skipPoseAfter) {
                     this.$store.commit("moveToNextPose");
                 }
             },
             enforceLastEmotionDetectionDelay() {
                 let now = new Date().getTime();
                 let lastTime = this.$store.state.currentGame.poses.lastSuccess;
                 if (lastTime == 0) {
                     return false;
                 } else {
                     let difference = now - lastTime;
                     if (difference > this.$store.state.posesRecognition.delay) {
                         return false;
                     } else {
                         return true;
                     }
                 }
             }*/
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
