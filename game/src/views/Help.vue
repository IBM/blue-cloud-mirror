<template>
  <b-container class="help">
    <h1 style="margin-top:15px;margin-bottom:25px"><p><b>#BlueCloudMirror</b> help</p></h1>

    <div style="margin-top:15px;">
      Players need to show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>fastest player wins</b>.
    </div>

    <div style="margin-top:15px;">
      <p>The game is designed to be a conversation starter at conferences for developers. Having fun, being interactive and using key technologies of the IBM Cloud at the same time. Developers can play anonymously or can they register themselvs and accept the terms and conditions to get the chance to win gadgets at the end of conferences.</p>
    </div>
    <div style="margin-top:10px;">
      <p>Just watch the YouTube video to see how the game works.</p>
    </div>
    <div style="margin-top:10px;">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/jkDWoHjMAig" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

    <div style="margin-top:15px;"></div>
    You had fun and got useful technologies insides?
    Just follow the developers of <b>#BlueCloudMirror</b> on twitter:
    <ul>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/nheidloff">Niklas Heidloff</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/tsuedbroecker">Thomas Südbröcker</a></li>
      <li><a target="_blank" style="color:#053c9f" href="https://twitter.com/harald_u">Harald Uebele</a></li>
    </ul>
    </b-container>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  data(){
    return {
    imageProps: { blank: false, blankColor: '#777', width: 75, height : 75, class: 'm1' }
    }
  },
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
