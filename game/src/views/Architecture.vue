<template>
  <b-container class="architecture">
   <h1 style="margin-top:15px;margin-bottom:25px">Explore the <b>#BlueCloudMirror</b> Architecture</h1>
   <br>
   <!-- BUTTONs -->
   <div>
    <b-row>
       <b-col>
        <b-button
          block
          v-on:click="onGetAccount"
          style="background-color: black !important;border-color: black !important;"
        >Get free IBM Cloud Account</b-button>
       </b-col>
      <b-col>
        <b-button
          block
          v-on:click="onReadPattern"
          style="background-color: #FFFFFF;border-color:#030303;"
        ><font color="black">Read code pattern</font></b-button>
      </b-col>
      <b-col>
         <b-button
          block
          v-on:click="onGetTheCode"
          style="background-color: #FFFFFF;border-color:#030303;"
        ><font color="black">Get code from GitHub</font></b-button>
      </b-col>
    </b-row>
   </div>
   <!-- <map></map> -->
   <div style="margin-top:15px; text-align:center;">
   <mapArchitecture></mapArchitecture>
   </div>
   <hr>
   <!-- YouTube -->
   <div style="margin-top:15px;">
    Watch the webinar to understand how the components are used and interact. Select you starting point of the YouTube video.
    <div style="margin-top:15px;"></div>
    <b-row>
      <b-col>     
        <center><iframe
          v-for="data in youtubeJSON"
          v-bind:key="data.width"
          v-bind:width="data.width"
          v-bind:height="data.height"
          v-bind:src="data.src"
          v-bind:frameborder="data.frameborder"
          v-bind:allow="data.allow"
          allowfullscreen
        >
        </iframe></center>
      </b-col>
      <b-col>
          <b-button-group vertical>
          <b-button
            block 
            v-on:click="onYouTubeDemo"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Game demo [5:03 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeMotivation"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Motivation to build #BlueCloudMirror [7:05 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeArchitecture"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Architecture and four main components [8:30 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeSetup"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Setup #BlueCloudMirror in five minutes [13:45 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeTensorFlow"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Three TensorFlow.js visual recognition models [14:37 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeCoreGame"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Architecture of the core game [21:50 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeUsers"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Architecture of the users service [27:20 mins]</font></b-button>
          <div style="margin-top:5px;"></div>
          <b-button
            block 
            v-on:click="onYouTubeScores"
            style="margin-right:10px;background-color: #FFFFFF;border-color:#030303;"
          ><font color="black">Architecture of the scores service [35:38 mins]</font></b-button>
          </b-button-group>     
      </b-col>
    </b-row>
    </div>
    <!-- Follow -->
    <div style="margin-top:15px;"></div>
    <div>
    You had fun and got useful technologies insides?<br>
    Just get in touch with the developers of <b>#BlueCloudMirror</b> on twitter:
    <div style="margin-top:15px;"></div>
      <ul>
        <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/nheidloff">Niklas Heidloff</a></li>
        <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/tsuedbroecker">Thomas Südbröcker</a></li>
        <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/harald_u">Harald Uebele</a></li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
var youtubedata = {
  "0":{
    width:"853",
    height:"480",
    src:"https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=303",
    frameborder:"0",
    allow:"accelerometer; autoplay; encrypted-media; gyroscope;  picture-in-picture",
    allowfullscreen:""
  }
};
import mapArchitecture from './Map.vue';


export default {
  components: {
    mapArchitecture
  },
  data: function () {
    return { 
      youtubeJSON: youtubedata
    }
  },
  methods: {
    onYouTubeDemo() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=303"
    },
    onYouTubeMotivation() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=425"
    },
    onYouTubeArchitecture() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=510"
    },
    onYouTubeSetup() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=825"
    },
    onYouTubeTensorFlow() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=877"
    },
    onYouTubeCoreGame() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=1310"
    },
    onYouTubeUsers() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=1640"
    },
    onYouTubeScores() {
      youtubedata[0].src="https://www.youtube.com/embed/Z4wU03JnEcU?autoplay=1&start=2138"
    },
    onGetTheCode() {
      window.location="https://github.com/ibm/blue-cloud-mirror";
    },
    onGetAccount() {
      window.location="https://ibm.biz/nheidloff";
    },
    onReadPattern() {
      window.location="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/";
    }
  }
}
</script>
