<template>
  <b-container class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>faster, the better</b>.
    </div>

    <div style="margin-top:15px;">
    <b-button 
       size="lg" 
       style="height:10%;width:30%;background-color: black !important;border-color:black !important;"
       v-on:click="onStartNewGame"
    >Start game</b-button>
    </div>

    <div style="margin-top:15px;"></div>
    <p style="margin-top:15px;margin-bottom:25px">Explore the architecture of <b>#BlueCloudMirror</b></p>

    <b-container class="major-technologies">
      <!-- FUNCTIONS -->
      <b-link :to="'architecture'" style="text-decoration:none;decoration:none;"><font color="black">
      <b-row id="FUNCTIONS" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle"> 
                <b-img  v-bind="iconProps" alt="ibm-cloud-functions-icon" wid
                rounded="circle"
                src="ibm-cloud-functions-icon.png"></b-img>
          </td>
          <td style="width:25%; vertical-align:top">
                <h5 class="mt-serverless">Serverless</h5>
                <ul style="margin-right: 20px">
                    <li>Automated scale up and to zero</li>
                    <li>Event driven code</li>
                    <li>Stateless compute</li>
                </ul>
          </td>
          <td style="width:35%; vertical-align:top">    
                <h5 class="mt-game">Core game</h5>
                Implemented as serverless web application, since ...
                <ul style="margin-right: 20px">
                    <li>Automated scale up and to zero</li>
                    <li>Event driven code</li>
                    <li>Stateless compute</li>
                </ul>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <ul style="margin-right: 20px">
                    <li>Vue.js</li>
                    <li>TensorFlow.js</li>
                    <li>IBM Cloud Functions based on Apache OpenWhisk</li>
                  </ul>
          </td>
          </table>
      </b-row>
      </font></b-link>
      <hr>

      <!-- KUBERNETES -->
      <b-link :to="'architecture'" style="decoration:none; text-decoration:none;"><font color="black">
      <b-row id="KUBERNETES" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-img 
                v-bind="iconProps" alt="kubernetes-icon" 
                rounded="circle"
                src="kubernetes-icon.png"></b-img>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-game">Kubernetes</h5>
              <ul style="margin-right: 20px">
                    <li>Container orchestration framework</li>
                    <li>Production-grade open source project</li>
                    <li>Portable workloads</li>
              </ul>
          </td>
          <td style="width:35%; vertical-align:top"> 
              <h5 class="mt-game">Users service</h5>
              Implemented via on-premises Kubernetes environments to ...
              <ul style="margin-right: 20px">
                    <li>Avoid storing personal data in a public cloud</li>
                    <li>Allow the service to be moved easily on other environments</li>
                    <li>Allow the service to be moved easily on other environments</li>
              </ul>
          </td>
          <td style="width:35%; vertical-align:top:">
              <h5 class="mt-game">Technologies</h5>
               <ul style="margin-right: 20px">
                     <li>IBM Cloud Private</li>
                     <li>Other Kubernetes environments like Minikube</li>
                     <li>IBM Secure Gateway</li>
               </ul>
          </td>
          </table>
      </b-row>
      </font></b-link>
      <hr>

      <!-- CLOUD FOUNDRY -->
      <b-link :to="'architecture'" style="decoration: none; text-decoration:none;"><font color="black"> 
      <b-row id="CLOUD_FOUNDRY" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-img 
                v-bind="iconProps" alt="cloud-foundry-icon" 
                rounded="circle"
                src="cloud-foundry-icon.png"></b-img>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-game">Cloud Foundry</h5>
              <ul style="margin-right: 20px">
                    <li>Speed and simplify development</li>
                    <li>Source project for public and private clouds</li>
                    <li>Easy integration of services</li>
              </ul>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-scores">Scores service</h5>
                  Scores service and web application
                  Implemented via Cloud Foundry to ...
                  <ul style="margin-right: 20px">
                    <li>Allow quick theme updates to the web application</li>
                    <li>Allow developers to focus on code rather than infrastructure</li>
                 </ul>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-scores">Technologies</h5>
                  <ul style="margin-right: 20px">
                    <li>IBM's Cloud Foundry Enterprise Environment</li>
                    <li>Vue.js</li>
                    <li>IBM Cloudant (NoSQL database)</li>
                 </ul>
          </td>
          </table>
      </b-row>
      </font></b-link>
      <hr>

      <!-- WATSON STUDION -->
      <b-link :to="'architecture'" style="text-decoration:none;" ><font color="black">
      <b-row id="WATSON_STUDION" style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-img 
                v-bind="iconProps" alt="watson-studio-icon" 
                rounded="circle"
                src="watson-studio-icon.png"></b-img>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-scores">IBM Watson Studio</h5>
              <ul style="margin-right: 20px">
                    <li>Collaboration platform for data focussed tasks</li>
                    <li>Training of AI models</li>
                    <li>Tools for end to end AI life cycle</li>
              </ul>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-watson-studio">IBM Watson Studio</h5>
                  The AI models have been trained with IBM Watson Studio, to ...
                  <ul style="margin-right: 20px">
                    <li>Leverage resources in the cloud</li>
                    <li>Run training more efficiently</li>
                  </ul>              
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-watson-studio">Technologies</h5>
                  <ul style="margin-right: 20px">
                    <li>IBM Watson Studios</li>
                    <li>TensorFlow</li>
                    <li>Open source models</li>
                  </ul> 
          </td>
          </table>
      </b-row>
      </font></b-link>
    
      <!-- Tooltip title specified via prop title -->
      <b-tooltip target="WATSON_STUDION" title="Get more details in the architecture page"></b-tooltip>
      <b-tooltip target="CLOUD_FOUNDRY" title="Get more details in the architecture page"></b-tooltip>
      <b-tooltip target="KUBERNETES" title="Get more details in the architecture page"></b-tooltip>
      <b-tooltip target="FUNCTIONS" title="Get more details in the architecture page"></b-tooltip>

      <b-col>
        <center>
        <b-button
          block
          v-on:click="onLearnMore"
          size="lg" 
          style="height:10%;width:30%;background-color: #FFFFFF !important;border-color:#030303 !important;"
        ><font color="black">Learn more about the architecture</font></b-button>
        </center>
      </b-col>
    </b-container>
    </b-container>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  data(){
    return {
    iconProps: { blank: false, blankColor: '#777', width: 60, height : 60, class: 'm1' }
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

<style scoped>
html {
  min-height: 100%;
  min-width: 100%;
}
</style>

