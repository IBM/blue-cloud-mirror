<template>
  <div class="home">
    <center><h4 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h4></center>

    <center><div style="margin-top:15px;">
      Players need to show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>fastest player wins</b>.
    </div></center>

    <div style="margin-top:10px;"></div>
    <div style="margin-top:10px;">
    <center><b-button
      v-on:click="onStartNewGame"
      style="margin-right:10px;font-size:30px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Start game</b-button></center>
    </div>
    <div style="margin-top:10px;"></div>
    <center><div style="margin-top:10px;">
    <b-button
      v-on:click="onTweet"
      style="margin-right:12px;font-size:17px;background-color: #038f9f;border-color:#038f9f;"
    >Share on Twitter</b-button>
    <b-button
      v-on:click="onGetAccount"
      style="margin-right:12px;background-color: #038f9f;border-color:#038f9f;"
    >Get free IBM Cloud Account</b-button>
     <b-button
      v-on:click="onReadPattern"
      style="margin-right:12px;background-color: #038f9f;border-color:#038f9f ;"
    >Read pattern</b-button>
    <b-button
      v-on:click="onGetTheCode"
      style="margin-right:12px;background-color: #038f9f;border-color:#038f9f;"
    >Download code</b-button>
    </div></center>

    <div style="margin-top:15px;">
      The game is designed to be a conversation starter at conferences for developers. Having fun, being interactive and using key technologies of the IBM Cloud at the same time.
    </div>
    <div style="margin-top:15px;">
      Developers can <font size="+1"><b>play anonymously</b></font> or can they register themselvs and accept the terms and conditions to get the chance to win gadgets at the end of conferences.
    </div>

    <div style="margin-top:35px;"></div>
    <h5 style="margin-top:15px;margin-bottom:25px"><b>IBM Cloud Technologies</b></h5>
    <div style="margin-top:15px;">
      The following diagram shows the used IBM Cloud technologies. <a target="_blank" style="color:#053c9f" href="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/">For more just visit the IBM Developer Pattern of the game</a>:
    </div>

    <div style="margin-top:15px;"></div>
    <a target="_blank" style="color:#053c9f" href="diagram-overview.png"><img src="diagram-overview-900.jpeg"/></a>

    <div style="margin-top:15px;">
      The game has three main parts:
    </div>
    <ul>
      <li><font size="+1"><b>Core game:</b></font> Implemented as web application and via Cloud Functions since it is only used during conferences</li>
      <li><font size="+1"><b>User management service:</b></font> Implemented via IBM Cloud Private to avoid having the personal data in a public cloud</li>
      <li><font size="+1"><b>Highscore list:</b></font> Implemented via Cloud Foundry Enterprise Edition to show easy theme adoptions for different conferences</li>
    </ul>
    <div style="margin-top:15px;">
      This is a list of used technologies:
    </div>
    <ul>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/">IBM Cloud</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://www.ibm.com/cloud/private">IBM Cloud Private</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/openwhisk">IBM Cloud Functions</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/cfadmin/create">IBM Cloud Foundry Enterprise Edition</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog?search=runtime">IBM Cloud Foundry Public Applications</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog/services/cloud-object-storage">IBM Cloud Object Storage</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog/services/api-connect">IBM API Connect</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog/services/secure-gateway">IBM Secure Gateway</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://dataplatform.cloud.ibm.com/">IBM Watson Studio</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog/services/app-id">IBM App ID</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://cloud.ibm.com/catalog/services/cloudant">IBM Cloudant</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://couchdb.apache.org/">Apache CouchDB</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://js.tensorflow.org">TensorFlow.js</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://vuejs.org/">Vue.js</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://github.com/kubernetes/minikube">Minikube</a></li>
    </ul>

    <div style="margin-top:15px;"></div>
    If you had fun and you got useful technologies insides, just follow the developer of <b>#BlueCloudMirror</b> on twitter:
    <ul>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/nheidloff">Niklas Heidloff</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/tsuedbroecker">Thomas Südbröcker</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/harald_u">Harald Uebele</a></li>
    </ul>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  methods: {
    onGetTheCode() {
      window.location="https://github.com/ibm/blue-cloud-mirror";
    },
    onGetAccount() {
      window.location="https://ibm.biz/nheidloff";
    },
    onTweet() {
      window.location="https://twitter.com/intent/tweet?hashtags=BlueCloudMirror,IBMDeveloper&text=Check%20out%20the%20IBM%20Cloud%20showcase%20https://blue-cloud-mirror.mybluemix.net";
    },
    onReadPattern() {
      window.location="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/";
    },
    onStartNewGame() {
      this.$router.push("start");
    }
  }
}
</script>
