<template>
  <div id="notchrome">
    <div v-if="isChrome == false">
     <b-alert variant="warning" show>Only Chrome on desktops has been tested !</b-alert>
     <div style="margin-top:30px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notchrome",
  data() {
    return {};
  },
  computed: {
    isChrome: function() {
      if (
        window.chrome !== null &&
        typeof window.chrome !== "undefined" &&
        window.navigator.vendor === "Google Inc." &&
        (typeof window.opr !== "undefined") === false &&
        (window.navigator.userAgent.indexOf("Edge") > -1) === false
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>