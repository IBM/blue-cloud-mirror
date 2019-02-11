<template>
  <div class="home">
    <h4 style="margin-top:15px;margin-bottom:25px">Welcome to Blue Cloud Mirror, an IBM Cloud Technology Showcase !</h4>

    <div style="margin-top:15px;">
      In this game players need to show five specific emotions and do five specific poses in two levels. The fastest player wins.
    </div>

    <div style="margin-top:15px;"></div>
    <b-button
      v-on:click="onStartNewGame"
      variant="primary"
      style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Start Game</b-button>
     <b-button
      v-on:click="onGetAccount"
      variant="primary"
      style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Get free IBM Cloud Account</b-button>
     <b-button
      v-on:click="onReadPattern"
      variant="primary"
      style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Read Pattern</b-button>
    <b-button
      v-on:click="onGetTheCode"
      variant="primary"
      style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
    >Get the Code</b-button>

    <div style="margin-top:15px;">
      The game can be used at conferences as conversation starter with developers. It's fun, interactive and uses key technologies of the IBM Cloud.
    </div>
    <div style="margin-top:15px;">
      Visitors at the booth can play anonymously or they can enter their email addresses, names and sign the terms to win some gadgets at the end of the conferences.
    </div>

    <div style="margin-top:35px;"></div>
    <b>Showcase of IBM Cloud Technologies</b>
    <div style="margin-top:15px;">
      The game utilizes various key IBM Cloud technologies to demonstrate the value of the IBM Cloud:
    </div>

    <div style="margin-top:15px;"></div>
    <a target="_blank" style="color:#053c9f" href="diagram-overview.png"><img src="diagram-overview-900.jpeg"/></a>

    <div style="margin-top:15px;">
      The game has three main parts:
    </div>
    <ul>
      <li>Core game: Implemented as web application and via Cloud Functions since it is only used during conferences</li>
      <li>User management service: Implemented via IBM Cloud Private to avoid having the personal data in a public cloud</li>
      <li>Highscore list: Implemented via Cloud Foundry Enterprise Edition to show easy theme adoptions for different conferences</li>
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
    The showcase application has been developed by:
    <ul>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/nheidloff">Niklas Heidloff</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/tsuedbroecker">Thomas Südbröcker</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/harald_u">Harald Uebele</a></li>
    </ul>

    <div style="margin-top:25px;"></div>
    <blockquote class="twitter-tweet" data-link-color="#053c9f"><p lang="en" dir="ltr">Get the Code 👩🏻‍💻👨🏽‍💻: See key <a href="https://twitter.com/hashtag/cloud?src=hash&amp;ref_src=twsrc%5Etfw">#cloud</a> technologies working together in the <a href="https://twitter.com/hashtag/BlueCloudMirror?src=hash&amp;ref_src=twsrc%5Etfw">#BlueCloudMirror</a> sample app <a href="https://t.co/jflvu983XD">https://t.co/jflvu983XD</a></p>&mdash; IBM Developer (@IBMDeveloper) <a href="https://twitter.com/IBMDeveloper/status/1093739953392107520?ref_src=twsrc%5Etfw">February 8, 2019</a></blockquote>

    <div style="margin-top:25px;"></div>
    <img src="blue-cloud-mirror-900.jpeg">
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
    onReadPattern() {
      window.location="https://developer.ibm.com/patterns/cloud-showcase-blue-mirror/";
    },
    onStartNewGame() {
      this.$router.push("start");
    }
  }
}
</script>
