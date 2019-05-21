<template>
    <div class="poses">
        <controlpanelposes/>

        <div>
            <img id="lastcapturedimage" ref="lastcapturedimage">
        </div>


        <b-row v-show="gameIsRunning" no-gutters>
            <b-col class="action-container" lg="6" md="12">
                <webcam/>
            </b-col>
            <b-col lg="6" class="action-container">
                <action-preview/>
            </b-col>
        </b-row>

        <level-label v-show="gameIsRunning" level="2"/>
        <time-label v-show="gameIsRunning"/>

        <results-poses class="results" style="z-index: 10;"/>
    </div>
</template>

<script>
    import webcam from "@/components/WebCam.vue";
    import resultsPoses from "@/components/ResultsPoses.vue";
    import * as posenet from "@tensorflow-models/posenet";
    import controlpanelposes from "@/components/ControlPanelPoses.vue";
    import LevelLabel from "@/components/LevelLabel";
    import TimeLabel from "@/components/TimeLabel";
    import ActionPreview from "@/components/ActionPreview";

    export default {
        components: {
            ActionPreview,
            TimeLabel,
            LevelLabel,
            webcam,
            resultsPoses,
            controlpanelposes
        },
        name: "poses",
        data() {
            return {
                net: {},
                loaded: false
            };
        },
        computed: {
            gameIsRunning() {
                return this.$store.state.currentGame.poses.ongoing;
            }
        },
        mounted() {
            this.$store.commit('updateLastResult', '');
            let that = this;
            this.loadModel().then(poseNet => {
                that.net = poseNet;
                that.loaded = true;
                that.$store.commit("setPosesRecognitionModelLoaded");
            });

            this.$store.watch(
                state => {
                    return state.webcam.lastImage;
                },
                val => {
                    //console.log("state.webcam.lastImage changed");
                    if (this.$store.state.posesRecognition.modelLoaded == true) {
                        this.image = this.$refs.lastcapturedimage;
                        if (this.image) {
                            this.image.src = val;

                            const imageScaleFactor = 0.5;
                            const outputStride = 16;
                            const flipHorizontal = false;
                            if (this.loaded == true) {
                                this.net
                                    .estimateSinglePose(
                                        this.image,
                                        imageScaleFactor,
                                        flipHorizontal,
                                        outputStride
                                    )
                                    .then(result => {
                                        let poses = [];
                                        poses.push(result);

                                        poses.forEach(({score, keypoints}) => {
                                            this.$store.commit(
                                                "updateLastPosesRecognitionResult",
                                                keypoints
                                            );
                                        });
                                    });
                            }
                        }
                    }
                },
                {
                    deep: true
                }
            );
        },
        methods: {
            async loadModel() {
                const mobileNetModel = await this.loadMobileNetModel();
                return new posenet.PoseNet(mobileNetModel);
            },
            async loadMobileNetModel() {
                let otherDomainUrl = this.$store.state.otherDomainUrl;
                let url = "models/poses/";
                if (
                    otherDomainUrl &&
                    otherDomainUrl != "" &&
                    otherDomainUrl != "other-domain-url-not-defined"
                ) {
                    url = otherDomainUrl + url;
                }
                const checkpointLoader = new posenet.CheckpointLoader(url);
                const variables = await checkpointLoader.getAllVariables();
                return new posenet.MobileNet(
                    variables,
                    posenet.mobileNetArchitectures[100]
                );
            }
        }

    };
</script>

<style scoped>

    .results {
        height: calc(20vh - 3rem);
        background-color: black;
    }

    .action-container {
        height: 80vh;
    }

    .poses {
        position: relative;
        height: calc(100vh - 3rem);
        min-width: 500px;
    }

    @media (max-width: 992px) {
        .action-container {
            height: 40vh;
        }

        .results {
            height: calc(20vh - 3rem);
        }
    }

    #lastcapturedimage {
        display: none;
    }
</style>
