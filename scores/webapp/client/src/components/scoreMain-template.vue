<template>
  <div v-bind:style="{ background: activeColor}">
    <div class="vld-parent">
      <!-- Loading -->
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"
      ></loading>
      <!-- Table -->
      <b-table
        striped
        hover
        :responsive="true"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="scores"
        :busy.sync="isBusy"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        @current-change="handleCurrentChange"
        @row-dblclicked="rowDblClickHandler"
      >
        <!-- A virtual column template to show the index-->
        <!--  <template slot="index" slot-scope="data">{{data.index + 1}}</template> -->
      </b-table>
      <!-- Sorting information -->
      <p>
        Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>,
        Total:
        <b>{{ totalRows }}</b>
      </p>
      <br>
      <!-- Display page options and search -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Per page" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"/>
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Vars
var scores = [];
var defaultdate = "1547135645804";
var restGetOptions = {
  dataType: "json",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};
var restPostOptions = {
  dataType: "json",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};

// Const
const axios = require("axios");
const fields = [
  // A virtual column that doesn't exist in items
  //"index",
  { key: "ranking", label: "Ranking", sortable: true },
  { key: "score", label: "Score", sortable: true },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "gameDate", label: "Date", sortable: true }
];

// API URLs
var urlScores = "FUNCTIONS_API_URL/getscorelist"; // TEXT REPLACE
var urlDelete = "FUNCTIONS_API_URL/deletescore"; // TEXT REPLACE

var functionsapi = true;

export default {
  name: "scoreMain",
  data() {
    return {
      // vue definition
      scores: scores, // see: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties
      // loader
      isLoading: false,
      fullPage: true,
      // table
      items: scores,
      fields: fields,
      loading: true,
      errored: false,
      isBusy: false,
      sortBy: null,
      sortDesc: true,
      filter: null,
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      activeColor: "white" //"#ccf5ff" //"lightblue"  // "lightgreen"
    };
  },

  mounted() {
    axios
      .get(urlScores, restGetOptions)
      .then(response => {
        this.isBusy = true;
        this.isLoading = true;
        var returnlist = [];

        // IF functions API is used "JSON.parse(response.data.payload);"
        if (functionsapi) {
          returnlist = JSON.parse(response.data.payload);
        } else {
          returnlist = response.data;
        }

        var rowcount = returnlist.length;
        this.totalRows = rowcount;

        console.log("- Response: \n " + JSON.stringify(response) + "!");
        console.log(
          "- Return list: \n" +
            JSON.stringify(returnlist) +
            "! Rows: " +
            rowcount
        );
        var prettydate = require("pretty-date");
        var list = [];
        var i = 0;
        var highscorerange = 5;
        var lasthighscore = 0;
        var ranking = 0;

        console.log("-> START  ITERATION: !\n");
        for (i = 0; i < rowcount; i++) {
          console.log(
            "-> Return list: \n" + JSON.stringify(returnlist[i]) + "!"
          );

          // Verify the Date format
          var d = new Date(returnlist[i].gameDate);
          if (isNaN(d)) {
            d = defaultdate;
          }
          console.log("-> Prettydate: \n", prettydate.format(d));

          // Mark high score, the first 5 high scores in list
          if (i < highscorerange) {
            if (lasthighscore != returnlist[i].score) {
              lasthighscore = returnlist[i].score;
              ranking = ranking + 1;
            }

            list.push({
              ranking: ranking,
              id: returnlist[i]._id,
              rev: returnlist[i]._rev,
              score: JSON.stringify(returnlist[i].score),
              gameDate: prettydate.format(d),
              firstName: returnlist[i].firstName,
              lastName: returnlist[i].lastName,
              uid: returnlist[i].uid
              //_rowVariant: "success"
            });
          } else {
            if (returnlist[i].score == lasthighscore) {
              ranking = highscorerange;
              list.push({
                ranking: ranking,
                id: returnlist[i]._id,
                rev: returnlist[i]._rev,
                score: JSON.stringify(returnlist[i].score),
                gameDate: prettydate.format(d),
                firstName: returnlist[i].firstName,
                lastName: returnlist[i].lastName,
                uid: returnlist[i].uid
                // _rowVariant: "success"
              });
            } else {
              ranking = ranking + 1;
              list.push({
                ranking: ranking,
                id: returnlist[i]._id,
                rev: returnlist[i]._rev,
                score: JSON.stringify(returnlist[i].score),
                gameDate: prettydate.format(d),
                firstName: returnlist[i].firstName,
                lastName: returnlist[i].lastName,
                uid: returnlist[i].uid
                // _rowVariant: "warning"
              });
            }
          }
        }
        console.log("-> List: \n" + JSON.stringify(list) + "!");
        this.scores = list;
        this.isBusy = false;
        this.isLoading = false;
      })
      .catch(error => {
        alert("Error " + error + "!");
        this.errored = true;
        this.isBusy = false;
        this.isLoading = false;
      })
      .finally(() => {
        this.isBusy = false;
        this.isLoading = false;
      });
  },

  // define methods under the `methods` object
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    onCancel() {
      console.log("User cancelled the loader.");
    },

    // delete row item
    rowDblClickHandler(score, index) {
      console.log("-> Response: \n" + JSON.stringify(score) + " !\n");

      var message =
        "Do you want to delete the score value \n[" +
        score.score +
        "]" +
        "\n[" +
        score.firstName +
        "]" +
        "\n[" +
        score.lastName +
        "] ?";
      ("\n Insert secret to delete:");
      var theSecrect = prompt(message, "YOUR SECRET");
      console.log("Secret: ", theSecrect);

      if (theSecrect != null) {
        var sendData = {
          score: { id: score.id, rev: score.rev, secret: theSecrect }
        };
        axios
          .post(urlDelete, sendData, restPostOptions)
          .then(response => {
            console.log("reponse urlDelete", JSON.stringify(response));
            if (response.data.score.secret != undefined) {
              if (response.data.score.secret === "true") {
                console.log("OK", response.data.score.ok);
                if (response.data.score.ok == true) {
                  //Delete item from list
                  if (index > -1) {
                    this.scores.splice(index, 1);
                    this.isBusy = false;
                    this.isLoading = false;
                  }
                  message =
                    "The value " +
                    "\n[" +
                    score.score +
                    "]" +
                    "\n[" +
                    score.firstName +
                    "]" +
                    "\n[" +
                    score.lastName +
                    "] is deleted!";
                  alert(message);
                } else {
                  this.isBusy = false;
                  this.isLoading = false;
                  alert("SCORE IS NOT DELETED\n" + JSON.stringify(response));
                }
              } else {
                message =
                  "The " +
                  theSecrect +
                  " is not valid! Contact your administrator.";
                alert(message);
              }
            } else {
              alert("SECRET IS NOT DEFINED!");
            }
          })
          .catch(error => {
            alert("Error : " + error.message + "!");
            this.errored = true;
            this.isBusy = false;
            this.isLoading = false;
          })
          .finally(() => {
            console.log("Loading done");
            this.isBusy = false;
            this.isLoading = false;
          });
      } else {
        alert("Canceled");
      }
    },

    handleCurrentChange(val) {
      this.currentRowObject = val;
    }
  },
  components: {
    Loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
