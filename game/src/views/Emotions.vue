<template>
    <div class="emotions">

        <controlpanelemotions />

        <facemodel/>
        <emotionmodel/>

        <b-row v-show="gameIsRunning" no-gutters>
            <b-col class="action-container" lg="6" md="12">
               <webcam/>
            </b-col>
            <b-col lg="6" class="action-container">
                <action-preview/>
            </b-col>
        </b-row>

        <resultsemotions class="results"/>

        <level-label v-show="gameIsRunning" level="1"/>
        <time-label v-show="gameIsRunning"/>
    </div>
</template>

<script>
    import webcam from '@/components/WebCam.vue';
    import facemodel from '@/components/FaceModel.vue';
    import emotionmodel from '@/components/EmotionModel.vue';
    import resultsemotions from '@/components/ResultsEmotions.vue';
    import controlpanelemotions from '@/components/ControlPanelEmotions.vue';
    import ActionPreview from "@/components/ActionPreview";
    import LevelLabel from "@/components/LevelLabel";
    import TimeLabel from "../components/TimeLabel";

    export default {
        components: {
            TimeLabel,
            LevelLabel,
            ActionPreview,
            webcam,
            facemodel,
            emotionmodel,
            resultsemotions,
            controlpanelemotions
        },
        name: "emotions",
        data() {
            return {
                captures: []
            };
        },
        mounted() {
            this.$store.commit('updateLastResult', '');
        },
        computed: {
            gameIsRunning() {
                return this.$store.state.currentGame.emotions.ongoing;
            }
        },
        methods: {}
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

    .emotions {
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
</style>
