<template>
  <div class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>faster, the better</b>.
    </div>

    <div style="margin-top:15px;">
    <b-button 
       size="lg" 
       style="height:10%;width:30%;background-color: #053c9f !important;border-color:#053c9f !important;"
       v-on:click="onStartNewGame"
    >Start game</b-button>
    </div>

    <div style="margin-top:15px;"></div>
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
                <table style="width:100%; cellspacing:; cellpadding:">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Automated scale up and to zero</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Event driven code</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Stateless compute</blockquote></td>
                  </tr>
                </table>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">Core game</h5>
                  Implemented as serverless web application, since ...
                  <br>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>it is not accessed 24x7</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>to make developers productive</blockquote></td>
                  </tr>
                  </table>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Vue.js</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>TensorFlow.js</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>IBM Cloud Functions based on Apache OpenWhisk</blockquote></td>
                  </tr>
                  </table>
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
              <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Container orchestration framework</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Production-grade open source project</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Portable workloads</blockquote></td>
                  </tr>
              </table>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">IBM Watson Studio</h5>
                  The AI models have been trained with IBM Watson Studio, to ...
                  <br>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Leverage resources in the cloud</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Run training more efficiently</blockquote></td>
                  </tr>
                  </table> 
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>IBM Watson Studios</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>TensorFlow</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Open source models</blockquote></td>
                  </tr>
                  </table> 
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
              <table style="width:100%">
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>Speed and simplify development</blockquote></td>
              </tr>
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>source project for public and private clouds</blockquote></td>
              </tr>
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>Easy integration of services</blockquote></td>
              </tr>
              </table>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-scores">Users service</h5>
                  Scores service and web application
                  Implemented via Cloud Foundry to ...<br>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Allow quick theme updates to the web application</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Allow developers to focus on code rather than infrastructure</blockquote></td>
                  </tr>
                  </table>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-scores">Technologies</h5>
                                    <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>IBM's Cloud Foundry Enterprise Environment</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Vue.js</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>IBM Cloudant (NoSQL database)</blockquote></td>
                  </tr>
                  </table>
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
              <table style="width:100%">
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>Collaboration platform for data focussed tasks</blockquote></td>
              </tr>
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>Training of AI models</blockquote></td>
              </tr>
              <tr>
                  <td style="width:3%; vertical-align:top"><li></li></td>
                  <td style="width:97%; vertical-align:top"><blockquote>Tools for end to end AI life cycle</blockquote></td>
              </tr>
              </table>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-watson-studio">IBM Watson Studio</h5>
                  The AI models have been trained with IBM Watson Studio, to ...
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Leverage resources in the cloud</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Run training more efficiently</blockquote></td>
                  </tr>
                  </table>              
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-watson-studio">Technologies</h5>
                  <table style="width:100%">
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>BM Watson Studios</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>TensorFlow</blockquote></td>
                  </tr>
                  <tr>
                      <td style="width:3%; vertical-align:top"><li></li></td>
                      <td style="width:97%; vertical-align:top"><blockquote>Open source models</blockquote></td>
                  </tr>
                  </table>
          </td>
          </font></b-link>
          </table>
      </b-row>

      <!-- Tooltip title specified via prop title -->
      <b-tooltip target="WATSON_STUDION" title="Click for details in architecture"></b-tooltip>
      <b-tooltip target="CLOUD_FOUNDRY" title="Click for details in architecture"></b-tooltip>
      <b-tooltip target="KUBERNETES" title="Click for details in architecture"></b-tooltip>
      <b-tooltip target="FUNCTIONS" title="Click for details in architecture"></b-tooltip>

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

