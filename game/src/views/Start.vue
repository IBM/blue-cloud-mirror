<template>
  <div class="about">
    <h4 v-if="this.$store.state.demoMode == false" style="margin-bottom:25px">Enter your Data if you want to win a Prize</h4>
    <h4 v-if="this.$store.state.demoMode == true" style="margin-bottom:25px">Enter your Data to save Scores in the HighScore List</h4>
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
            v-model="form.firstname"
            placeholder="Enter first name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2" label="Last Name:" label-for="exampleInput2">
          <b-form-input
            id="exampleInput2"
            required
            type="text"
            v-model="form.lastname"
            placeholder="Enter last name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="exampleGroup5">
          <b-form-checkbox
            id="checkbox1"
            v-model="form.checked"
            value="accepted"
            unchecked-value="not_accepted"
          >I accept the terms <div style="margin-top:10px;margin-bottom:10px;font-size: smaller;color: darkgray;"><a target="_blank" style="color:#053c9f" href="https://www.ibm.com/privacy/us/en/">IBM Privacy Statement</a> and <a target="_blank" style="color:#053c9f" href="https://www.ibm.com/legal/us/en/">Terms of Use</a></div></b-form-checkbox>
        </b-form-group>
        <p v-if="errors.length > 0">
          <b style="color: #ffc107 !important">Please accept the terms.</b>
        </p>
        <div v-if="this.$store.state.demoMode == true" style="margin-bottom:10px">Note: In this demo version, registration with real user information is not supported. A user 'Demo Player' is used instead.</div>
        <b-button type="submit" variant="primary" style="margin-right:10px;background-color: #053c9f !important;border-color:#053c9f !important;">Let's go</b-button>
      </b-form>
      <div></div>
      <div style="margin-top: 40px;">I just want to have fun and don't want to provide my data.</div>
      <b-button
        v-on:click="onClickAnonymous"
        variant="primary"
        style="margin-right:10px;margin-top:13px;background-color: #053c9f !important;border-color:#053c9f !important;"
      >Play anonymously</b-button>
    </div>
    <b-modal ref="modelDialog" hide-footer title="Error saving User Data">
      <div >
        <div>The user data couldn't be stored.</div>
      </div>
      <b-btn class="mt-3" @click="hideModal">Close</b-btn>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      submitClicked: false,
      form: {
        email: "",
        firstName: "",
        lastName: "",
        checked: []
      }
    };
  },
  computed: {
    errors() {
      const errs = [];
      if (this.submitClicked === true) {
        if (!this.form.checked) {
          errs.push("sign terms");
        } else {
          if (!this.form.checked.includes("accepted")) {
            errs.push("sign terms");
          }
        }
      }
      return errs;
    }
  },
  mounted() {
    this.form.email = "";
    this.form.firstName = "";
    this.form.lastName = "";
    this.form.checked = [];
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
    this.$store.commit("clearCurrentPlayer");
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
          firstName: this.form.firstname,
          lastName: this.form.lastname,
          email: this.form.email
        };

        if (this.$store.state.apis.users.url != "users-url-not-defined") {
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
            firstName = this.form.firstname;
            lastName = this.form.lastname;
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

