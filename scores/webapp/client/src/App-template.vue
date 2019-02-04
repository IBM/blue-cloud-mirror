<template>
  <div id="app">
    <!-- Navigation -->
    <b-navbar toggleable="md" type="dark" style="background-color: #053c9f !important;">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand style="margin-right:40px">Blue Cloud Mirror - IBM Cloud Showcase</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse"> 
          <b-navbar-nav>
            <li class="nav-item">
              <a href="#" class="nav-link">
              <!-- TEXT REPLACE -->
                <a
                  target="_blank"
                  href="GAME_URL"
                  class
                  style="color: white;"
                >Game</a>
              </a>
            </li>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- High score -->
    <b-container>
      <scoreMain/>
      <b-card title="Table description" tag="article" class="mb-2">
        <p
          class="card-text"
        >This is the <b>highscore list</b>.
        </p> 
        <p>You can <b>sort each</b> column in the list and you can <b>filter</b> for <b>text</b> inside this list.</p>
      </b-card>
    </b-container>

    <!-- Footer -->
   <b-container>
      <div style="margin-top:20px;"></div>
      <notchrome></notchrome>
      <b-row>
        <b-col style="text-align:center">
          <div style="margin-top:50px;font-size: smaller;color: darkgray;">Brought to you by the <a target="_blank" style="color:#053c9f" href="https://developer.ibm.com/cities/berlin-de/">IBM Developer Advocacy DACH</a> team</div>
          <div style="margin-top:10px;margin-bottom:20px;font-size: smaller;color: darkgray;">Get the <a target="_blank" style="color:#053c9f" href="https://github.com/nheidloff/blue-cloud-mirror">code</a></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import scoreMain from "./components/scoreMain.vue";
import notchrome from './components/notChrome.vue';
console.log("VUE Environment: ", process.env);

export default {
  name: "app",
  data() {
    return {
       gameurls: gameurls
    };
  },
  components: {
    scoreMain,
    notchrome
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
</script>

<!-- STYLE REMOVED -->
<style>
.mybackground {
   color: #193277 !important;
}
</style>
