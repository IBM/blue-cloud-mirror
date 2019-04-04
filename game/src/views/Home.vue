<template>
  <div class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>faster, the better</b>.
    </div>

    <div style="margin-top:10px;">
    <center><b-button 
       block 
       size="lg" 
       style="height:10%;width:30%;background-color: #053c9f !important;border-color:#053c9f !important;"
       v-on:click="onStartNewGame"
    >Start game</b-button></center>
    </div>

    <div style="margin-top:35px;"></div>
    <h2 style="margin-top:15px;margin-bottom:25px">Explore the architecture of #BlueCloudMirror</h2>

    <b-container class="major-technologies">
      <hr>
      <b-row style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle"> 
                <b-link :to="'architecture'"><b-img  v-bind="iconProps" alt="ibm-cloud-functions-icon" wid
                rounded="circle"
                src="ibm-cloud-functions-icon.png"></b-img></b-link>
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
          </table>
      </b-row>
      <hr>
      <b-row style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-link :to="'architecture'"><b-img 
                v-bind="iconProps" alt="kubernetes-icon" 
                rounded="circle"
                src="kubernetes-icon.png"></b-img></b-link>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-kubernetes">Kubernetes</h5>
              <li>container orchestration framework</li>
              <li>production-grade open source project</li>
              <li>portable workloads</li> 
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">Users service</h5>
                  Implemented via on-premises Kubernetes environments to ...
                  <li>avoid storing personal data in a public cloud</li>
                  <li>allow the service to be moved easily on other environments</li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <li>Vue.js</li>
                  <li>TensorFlow.js</li>
                  <li>IBM Cloud Functions based on Apache OpenWhisk</li>
          </td>
          </table>
      </b-row>
      <hr>
      <b-row style="border-style:solid; border-width:0px;">
          <table style="width:100%">
          <td style="width:10%; text-align:center; vertical-align:middle">  
                <b-link :to="'architecture'"><b-img 
                v-bind="iconProps" alt="cloud-foundry-icon" 
                rounded="circle"
                src="cloud-foundry-icon.png"></b-img></b-link>
          </td>
          <td style="width:25%; vertical-align:top">
              <h5 class="mt-kubernetes">Cloud Foundry</h5>
              <li>speed and simplify development</li> 
              <li>open source project for public and private clouds</li>
              <li>easy integration of services</li>
          </td>
          <td style="width:35%; vertical-align:top">    
                  <h5 class="mt-game">Users service</h5>
                  Scores service and web application <br>
                  Implemented via Cloud Foundry to ...
                  <li>allow quick theme updates to the web application</li>
                  <li>allow developers to focus on code rather than infrastructure </li>
          </td>
          <td style="width:35%; vertical-align:top">
                  <h5 class="mt-game">Technologies</h5>
                  <li>IBM's Cloud Foundry Enterprise Environment</li>
                  <li>Vue.js</li>
                  <li>IBM Cloudant (NoSQL database)</li>
          </td>
          </table>
      </b-row>
      <hr>
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
    }
  }
}
</script>

