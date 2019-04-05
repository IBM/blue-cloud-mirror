<template>
  <div class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>faster, the better</b>.
    </div>

    <div style="margin-top:10px;">
    <b-button 
       size="lg" 
       style="height:10%;width:30%;background-color: #053c9f !important;border-color:#053c9f !important;"
       v-on:click="onStartNewGame"
    >Start game</b-button>
    </div>

    <div style="margin-top:35px;"></div>
    <p style="margin-top:15px;margin-bottom:25px">Explore the architecture of <b>#BlueCloudMirror</b></p>

    <b-container class="major-technologies">
      <hr>
      <!-- FUNCTIONS -->
      <b-row id="FUNCTIONS" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <b-link :to="'architecture'" ><font color="black">
          <td style="width:10%; text-align:center; vertical-align:middle"> 
                <b-img  v-bind="iconProps" alt="ibm-cloud-functions-icon" wid
                rounded="circle"
                src="ibm-cloud-functions-icon.png"></b-img>
          </td>
          <td style="width:25%; vertical-align:top">
                <h5 class="mt-serverless">Serverless</h5>             
                  <li>automated scale up and to zero</li>
                  <li>event driven code</li>
                  <li>stateless compute</li>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">Core game</h5>
                  Implemented as serverless web application,
                  <br> since ...
                  <li>it is not accessed 24x7</li>
                  <li>to make developers productive</li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <li>Vue.js</li>
                  <li>TensorFlow.js</li>
                  <li>IBM Cloud Functions based on Apache OpenWhisk</li>
          </td>
          </font></b-link>
          </table>
      </b-row>
      <hr>

      <!-- KUBERNETES -->
      <b-row id="KUBERNETES" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <b-link :to="'architecture'" ><font color="black">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-link :to="'architecture'"><b-img 
                v-bind="iconProps" alt="kubernetes-icon" 
                rounded="circle"
                src="kubernetes-icon.png"></b-img></b-link>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-kubernetes">Kubernetes</h5>
              <li>Container orchestration framework</li>
              <li>Production-grade open source project</li>
              <li>Portable workloads</li> 
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">IBM Watson Studio</h5>
                  The AI models have been trained with IBM Watson Studio,<br>
                  to  ...
                  <li>Leverage resources in the cloud</li>
                  <li>Run training more efficiently</li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <li>IBM Watson Studios</li>
                  <li>TensorFlow</li>
                  <li>Open source models</li>
          </td>
          </font></b-link>
          </table>
      </b-row>
      <hr>

      <!-- CLOUD FOUNDRY -->
      <b-row id="CLOUD_FOUNDRY" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <b-link :to="'architecture'" ><font color="black">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-link :to="'architecture'"><b-img 
                v-bind="iconProps" alt="cloud-foundry-icon" 
                rounded="circle"
                src="cloud-foundry-icon.png"></b-img></b-link>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-cloud-foundry">Cloud Foundry</h5>
              <li>Speed and simplify development</li> 
              <li>Open source project for public and private clouds</li>
              <li>Easy integration of services</li>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-scores">Users service</h5>
                  Scores service and web application <br>
                  Implemented via Cloud Foundry to ...
                  <li>Allow quick theme updates to the web application</li>
                  <li>Allow developers to focus on code rather than infrastructure </li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-scores">Technologies</h5>
                  <li>IBM's Cloud Foundry Enterprise Environment</li>
                  <li>Vue.js</li>
                  <li>IBM Cloudant (NoSQL database)</li>
          </td>
          </font></b-link>
          </table>
      </b-row>
      <hr>

      <!-- WATSON STUDION -->
      <b-row id="WATSON_STUDION" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <b-link :to="'architecture'" ><font color="black">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-link :to="'architecture'"><b-img 
                v-bind="iconProps" alt="watson-studio-icon" 
                rounded="circle"
                src="watson-studio-icon.png"></b-img></b-link>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-watson-studio">IBM Watson Studio</h5>
              <li>Collaboration platform for data focussed tasks</li> 
              <li>Training of AI models</li>
              <li>Tools for end to end AI life cycle</li>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-watson-studio">IBM Watson Studio</h5>
                  The AI models have been trained with IBM Watson Studio,<br>
                  to  ...
                  <li>Leverage resources in the cloud</li>
                  <li>Run training more efficiently</li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-watson-studio">Technologies</h5>
                  <li>IBM Watson Studios</li>
                  <li>TensorFlow</li>
                  <li>Open source models</li>
          </td>
          </font></b-link>
          </table>
      </b-row>

      <!-- Tooltip title specified via prop title -->
      <b-tooltip target="WATSON_STUDION" title="Click for details"></b-tooltip>
      <b-tooltip target="CLOUD_FOUNDRY" title="Click for details"></b-tooltip>
      <b-tooltip target="KUBERNETES" title="Click for details"></b-tooltip>
      <b-tooltip target="FUNCTIONS" title="Click for details"></b-tooltip>

      <hr>
      <b-col>
        <center>
        <b-button
          block
          v-on:click="onLearnMore"
          size="lg" 
          style="height:10%;width:30%;background-color: #FFFFFF !important;border-color:##030303 !important;"     
        ><font color="black">Learn more about the architecture</font></b-button>
        </center>
      </b-col>
    </b-container>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  data(){
    return {
    iconProps: { blank: false, blankColor: '#777', width: 75, height : 75, class: 'm1' },
    diagramProps: { blank: false, blankColor: '#777', width: 300, height : 150, class: 'm2' }
    }
  },
  methods: {
    onStartNewGame() {
      this.$router.push("register");
    },
    onLearnMore() {
      this.$router.push("architecture");
    }
  }
}
</script>

