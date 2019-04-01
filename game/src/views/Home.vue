<template>
  <div class="home">
    <h1 style="margin-top:15px;margin-bottom:25px"><p>Welcome to our <b>#BlueCloudMirror</b> game</p></h1>

    <div style="margin-top:15px;">
      Players need to show five <b>emotions</b> and five <b>poses</b> in <b>two levels</b>. 
      The <b>fastest player wins</b>.
    </div>

    <div style="margin-top:15px;">
      <p>The game is designed to be a conversation starter at conferences for developers. Having fun, being interactive and using key technologies of the IBM Cloud at the same time. Developers can play anonymously or they can register themselvs and accept the terms and conditions to get the chance to win gadgets at the end of conferences.</p>
    </div>

    <div style="margin-top:10px;"></div>
    <div style="margin-top:10px;">
    <center><b-button block size="lg" style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;"
      v-on:click="onStartNewGame"
    >Start game</b-button></center>
    </div>

    <div style="margin-top:35px;"></div>
    <h2 style="margin-top:15px;margin-bottom:25px"><b>#BlueCloudMirror</b> is based on three major technologies and architecture parts</h2>

    <b-container class="major-technologies">
      <b-row>
        <b-col>
          <b-card>
            <b-media>
              <b-img slot="aside" v-bind="iconProps" alt="ibm-cloud-functions-icon" wid
              rounded="circle"
              src="ibm-cloud-functions-icon.png"></b-img>
              <h3 class="mt-serverless">Serverless</h3>             
                <li>automated scale up and to zero</li>
                <li>event driven code</li>
                <li>stateless compute</li>
                <p>... and a lot more.</p>
            </b-media>
          </b-card>
        </b-col>
        <b-col>
          <b-link :to="'architecture'"><font color=black>
           <b-card>       
            <b-media right-align vertical-align="center">
              <b-img slot="aside" rounded v-bind="diagramProps" alt="game-serverless" 
              src="game-serverless.png"></b-img>
              <h3 class="mt-game">Game</h3>
              The game uses Serverless for more information click the architecture image.
            </b-media>       
           </b-card>
          </font></b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <b-media>
              <b-img slot="aside" v-bind="iconProps" alt="kubernetes-icon" 
              rounded="circle"
              src="kubernetes-icon.png"></b-img>
              <h3 class="mt-kubernetes">Kubernetes</h3>
              <p>
                <li>container platform</li>
                <li>microservices platform</li>
                <li>portable cloud platform</li> 
                <p>... and a lot more.</p>
            </b-media>
          </b-card>
        </b-col>
        <b-col>
          <b-link :to="'architecture'"><font color=black>
           <b-card>
            <b-media right-align vertical-align="center">
              <b-img slot="aside" rounded v-bind="diagramProps" left alt="users-kubernetes" 
              src="users-kubernetes.png"></b-img>
              <h3 class="mt-users">Users</h3>
              The Users uses Kubernetes for more information click the architecture image.
            </b-media>
           </b-card>
          </font></b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <b-media>
              <b-img slot="aside" v-bind="iconProps" alt="kubernetes-icon" 
              rounded="circle" src="cloud-foundry-icon.png"></b-img>
              <h3 class="mt-cloud-foundry">Cloud Foundry</h3>
                <li>developer productivity first</li> 
                <li>easy build and deploy</li>
                <li>easy integration of services</li>
                <p>... and a lot more.</p>
            </b-media>
          </b-card>
        </b-col>
        <b-col>
          <b-link><font color=black>
           <b-card>
            <b-media right-align vertical-align="center">
              <b-img slot="aside" rounded v-bind="diagramProps" left alt="scores-cloud-foundry" 
              src="scores-cloud-foundry.png"></b-img>
              <h3 class="mt-scores">Scores</h3>
              The Scores uses Cloud Foundry for more information click the architecture image.
            </b-media>
          </b-card>
         </font></b-link>
        </b-col>
      </b-row>
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

