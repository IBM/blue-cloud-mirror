<template>
  <div id="app">
    <b-navbar class="ibm-plex-sans" toggleable="md" type="dark" style="background-color: black!important;">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand style="margin-right:40px">Blue Cloud Mirror - IBM Cloud Showcase</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link style="color:white" to="/home">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link style="color:white" to="/register">Register</router-link>
          </b-nav-item>
          <!-- ****NOT IN THE MENU****
          <b-nav-item>
            <router-link style="color:white" to="/emotions">Emotions</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link style="color:white" to="/poses">Poses</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link style="color:white" to="/results">Results</router-link>
          </b-nav-item>
               ****NOT IN THE MENU**** -->
          <b-nav-item>
            <router-link style="color:white" to="/architecture">Architecture</router-link>
          </b-nav-item>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <a
                target="_blank"
                href="https://blue-cloud-mirror-highscore.de-cloudfoundry-check-cl.eu-de.containers.appdomain.cloud/"
                class
                style="color: white;"
              >Highscores</a>
            </a>
          </li>
          <b-nav-item>
            <router-link style="color:white" to="/help">Help</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div>
      <b-container>
        <browserVerification></browserVerification>
      </b-container>
      <router-view class="router-view" />
      <b-container>
      <b-row>
        <b-col style="text-align:center">
          <div style="margin-top:50px;margin-bottom:10px;font-size: smaller;color: darkgray;"><b>Datenschutzinformation</b>
            <br>
            Liebe Nutzerin, lieber Nutzer,
            <br>
            der Schutz Ihrer personenbezogenen Daten ist uns ein großes Anliegen. Im Rahmen dieses Spiels verarbeiten wir (IBM Deutschland GmbH, IBM-Alle 1, 71139 Ehningen) diese Daten wie folgt:
            <br>
            1. Es werden nur Bilddaten erhoben und verarbeitet.
            <br>
            2. Die Bilddaten werden nur lokal auf dem Spielgerät verarbeitet.
            <br>
            3. Die Daten werden ausschließlich zum Zwecke des Spiels genutzt.
            <br>
            4. Die Daten werden nach Ende des Spiels unmittelbar wieder gelöscht.
<br>
            Weitere Informationen finden sie hier <a target="_blank" style="color:#053c9f" href="https://www.ibm.com/privacy/de/de/">https://www.ibm.com/privacy/de/de/</a>.
            </div>
          <div style="margin-top:10px;margin-bottom:10px;font-size: smaller;color: darkgray;">
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="text-align:center">
          <div style="margin-top:50px;margin-bottom:10px;font-size: smaller;color: darkgray;"><b>GDPR Consent for the processing of Personal Data within BlueCloudMirror Showcase:</b>
            <br>
            Data protection and privacy are important to us, which is why we want to ensure transparency.  Your consent to play the IBM BlueCloudMirror game is absolutely freely and voluntarily.
            <br>
            The input of name and e-mail address is voluntary and will not be used in this showcase for any kind of data processing. The photos taken by the player, an essential part of the showcase scenario, are stored and processed only temporarily and locally (within the browser). A transfer via the network (e.g. to an cloud) does not take place.
            <br>
            If you decide that you want your name to appear on the highscore table: The input of name and e-mail address is voluntary and will only be used to create the high score. A further storage and data processing of these data does not take place either. If you just want to have fun and don't want to provide any personal data play anonymously.
            If you decide to participate in the competition (not offered always): The input of name and e-mail address is voluntary as well and will be used to create the high score table (see statement above) and to participate in the raffle of the prize. A further storage and processing of these data does not occur.
            <br>

            </div>
          <div style="margin-top:10px;margin-bottom:10px;font-size: smaller;color: darkgray;">
          </div>
        </b-col>
      </b-row>
       <b-row>
        <b-col style="text-align:center">

            <div style="margin-top:10px"></div>
            <a target="_blank" style="color:#053c9f" href="https://www.ibm.com/privacy/us/en/">IBM Privacy Statement</a> and <a target="_blank" style="color:#053c9f" href="https://www.ibm.com/legal/us/en/">Terms of Use</a>

          <div style="margin-top:10px;margin-bottom:10px;font-size: smaller;color: darkgray;"><a target="_blank" style="color:#053c9f" href="https://www.ibm.com/legal">Imprint / Impressum</a></div>
        </b-col>
      </b-row>
      </b-container>
    </div>

  </div>
</template>


<script>
import browserVerification from '@/components/browserVerification.vue';

export default {
  mounted() {
  },
  components: {
    browserVerification
  }
}
</script>

<style>
.mybackground {
   color: #193277 !important;
}
.router-view {
  min-height: calc(100vh - 3rem);
  padding-bottom: 3rem;

}
</style>
