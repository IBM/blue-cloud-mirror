<template>
  <div class="emotions">
    <h2 style="margin-top:15px;margin-bottom:25px">Level 1 (of 2): Emotions</h2>
    <b-row>
      <b-col style="min-width: 520px;">        
        <webcam></webcam>
        <facemodel></facemodel>
        <emotionmodel></emotionmodel> 
      </b-col>
      <b-col style="text-align:center">
        <controlpanelemotions></controlpanelemotions>
      </b-col>
    </b-row>
    <b-row>      
      <b-col>
        <resultsemotions></resultsemotions>
      </b-col>
    </b-row>
  </div>
</template>
 
<script>
import webcam from '@/components/WebCam.vue';
import facemodel from '@/components/FaceModel.vue';
import emotionmodel from '@/components/EmotionModel.vue';
import resultsemotions from '@/components/ResultsEmotions.vue';
import controlpanelemotions from '@/components/ControlPanelEmotions.vue';

export default {
  components: {
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
  methods: {
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
</style>