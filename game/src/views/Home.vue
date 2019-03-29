<template>
  <div class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Players need to show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>fastest player wins</b>.
    </div>

    <div style="margin-top:15px;">
      <p>The game is designed to be a conversation starter at conferences for developers. Having fun, being interactive and using key technologies of the IBM Cloud at the same time. Developers can play anonymously or can they register themselvs and accept the terms and conditions to get the chance to win gadgets at the end of conferences.</p>
    </div>

    <div style="margin-top:10px;"></div>
    <div style="margin-top:10px;">
    <center><b-button block variant="primary"
      v-on:click="onStartNewGame"
    >Start game</b-button></center>
    </div>

    <div style="margin-top:35px;"></div>
    <h5 style="margin-top:15px;margin-bottom:25px"><b>IBM Cloud Technologies</b></h5>
    <div style="margin-top:15px;">
      The following diagram shows a simplified overview of used IBM Cloud technologies. <a target="_blank" style="color:#053c9f" href="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/">For more technology and implementation details visit IBM Developer Pattern of <b>#BlueCloudMirror</b> </a>:
    </div>

    <div style="margin-top:15px;"></div>
    <center><a target="_blank" style="color:#053c9f" href="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/"><img src="diagram-overview-900.jpeg" lt="ICON" style="width: 40%;max-height: 40%" /></a></center>

    <div style="margin-top:15px;">
      The <b>#BlueCloudMirror</b> has three main parts:
    </div>
    <ul>
      <li><a target="_blank" style="color:#053c9f" href="https://github.com/IBM/blue-cloud-mirror/blob/master/game/README.md"><b>Core game:</b></a>Implemented as web application and via Cloud Functions since it is only used during conferences</li>
      <li><a target="_blank" style="color:#053c9f" href="https://github.com/IBM/blue-cloud-mirror/blob/master/users/README.md"><b>User management service:</b></a> Implemented via IBM Cloud Private to avoid having the personal data in a public cloud</li>
      <li><a target="_blank" style="color:#053c9f" href="https://github.com/IBM/blue-cloud-mirror/blob/master/scores/README.md"><b>Highscore list:</b></a> Implemented via Cloud Foundry Enterprise Edition to show easy theme adoptions for different conferences</li>
    </ul>
    <div style="margin-top:15px;">
     Used technologies:
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
    You had fun and got useful technologies insides?
    Just follow the developers of <b>#BlueCloudMirror</b> on twitter:
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
