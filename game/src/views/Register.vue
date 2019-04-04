<template>
  <div class="about">
    <div style="margin-top:15px;"></div>
    <h2 v-if="this.$store.state.demoMode == false" style="margin-bottom:25px">I want the chance to win a prize</h2>
    <div v-if="this.$store.state.demoMode == true" style="margin-bottom:10px">
      <h2 style="margin-bottom:25px">Demo version</h2>
      In this demo version, the user registration is <b>not supported</b>. The name <b>'Demo Player'</b> is used to your save game scores result in the HighScore list. Changes in the input fields will not be reflected in the game and HighScore.</div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="exampleInputGroup1" label="EMail:" label-for="exampleInput1">
          <b-form-input
            id="exampleInput1"
            type="email"
            required
            v-model="form.email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2" label="First Name:" label-for="exampleInput2">
          <b-form-input
            id="exampleInput2"
            required
            type="text"
            v-model="form.firstName"
            placeholder="Enter first name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3" label="Last Name:" label-for="exampleInput3">
          <b-form-input
            id="exampleInput3"
            required
            type="text"
            v-model="form.lastName"
            placeholder="Enter last name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="exampleGroup5">
          <b-form-checkbox
            id="checkbox1"
            v-model="form.checked"
            value="accepted"
            unchecked-value="not_accepted"
          >I accept the terms</b-form-checkbox>
        </b-form-group>
        <p v-if="errors.length > 0">
          <b style="color: #ffc107 !important">Please accept the terms.</b>
        </p>
        <div style="margin-right:30px; margin-left:30px">
          <center>
          <b-button
          block 
          size="lg"
          type="submit" 
          style="height:10%;width:30%; background-color: #FFFFFF !important;border-color:black !important;"><font color="black">Play</font></b-button>
          </center>
        </div>
      </b-form>
      <div></div>
    </div>
    <b-modal ref="modelDialog" hide-footer title="Error saving User Data">
      <div >
        <div>The user data couldn't be stored.</div>
      </div>
      <b-btn class="mt-3" @click="hideModal">Close</b-btn>
    </b-modal>
    <div style="margin-top:15px;"></div>
    <div style="margin-right:30px; margin-left:30px">
      <center><b-button
          block 
          size="lg"
          style="height:10%;width:30%;background-color: #053c9f !important;border-color:#053c9f !important;"
          v-on:click="onClickAnonymous"
        >Play anonymously</b-button>
      </center>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      submitClicked: false,
      form: {
        email: 'demo@email.com',
        firstName: 'Demo',
        lastName: 'User',
        checked: []
      }
    };
  },
  computed: {
    errors() {
      const errs = [];
      if (this.submitClicked === true) {
        if (!this.form.checked && (this.$store.state.demoMode == false)) {
          errs.push("sign terms");
        } else {
          if (!this.form.checked.includes("accepted") && (this.$store.state.demoMode == false)) {
            errs.push("sign terms");
          }
        }
      }
      return errs;
    }
  },
  mounted() {

    if (this.$store.state.demoMode == false) {
      this.form.email = "";
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.checked = [];
      this.show = false;
      this.$nextTick(() => {
          this.show = true;
      });
      this.$store.commit("clearCurrentPlayer");
    } else {
      this.form.email = "demo@email.com";
      this.form.firstName = "Demo";
      this.form.lastName = "Player";
      this.show = false;
      //this.$store.commit("updateCurrentPlayer");
    }
    
  },
  methods: {
    showModal () {
      this.$refs.modelDialog.show()
    },
    hideModal () {
      this.$refs.modelDialog.hide()
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.submitClicked = true;

      if (this.errors.length === 0) {
        const player = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            email: this.form.email
        };

        if ((this.$store.state.apis.users.url != "users-url-not-defined") &&
            (this.$store.state.demoMode == false)) {
          const axiosService = axios.create({
            timeout: 10000,
            headers: {
              "Content-Type": "application/json"
            }
          });

          let that = this;
          let email = "demo@email.com";
          let firstName = "Demo";
          let lastName = "Player";
          if (this.$store.state.demoMode == false) {
            firstName = this.form.firstName;
            lastName = this.form.lastName;
            email = this.form.email;
          }
          axiosService
            .post(this.$store.state.apis.users.url, {
              firstName: firstName,
              lastName: lastName,
              email: email,
              signedTerms: "true",
              registrationDate: new Date().getTime()
            })
            .then(function(response) {
              that.$store.commit("clearCurrentPlayer");
              that.$store.commit("updateCurrentPlayer", player);
              that.$router.push("emotions");
            })
            .catch(function(error) {
              console.log(error);
              that.$store.commit("clearCurrentPlayer");
              that.showModal();
            });
        } else {
          this.$store.commit("clearCurrentPlayer");
          this.$store.commit("updateCurrentPlayer", player);
          this.$router.push("emotions");
        }
      }
    },
    onClickAnonymous(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.checked = [];
      this.$nextTick(() => {
        this.show = true;
      });

      this.$store.commit("clearCurrentPlayer");
      this.$router.push("emotions");
    }
  }
};
</script>

