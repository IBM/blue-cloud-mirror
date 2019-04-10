<template>
  <div id="browserVerification">
    <div v-if="(isChromeBrowser == false) && (isMobileDevice == false)">
      <b-alert variant="warning" show>Only Chrome on desktop has been tested ! {{browserInfo}} </b-alert>
      <div style="margin-top:30px;"></div>
    </div>
    <div v-if="((isMobileDevice_iOS_safari == false) && (isMobileDevice == true))">
      <b-alert variant="warning" show>Only Safari on iOS has been tested ! {{browserInfo}}</b-alert>
      <div style="margin-top:30px;"></div>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import { isIOS } from 'mobile-device-detect';
import { isSafari } from 'mobile-device-detect';
import { isBrowser } from 'mobile-device-detect';
import { browserVersion } from 'mobile-device-detect';
import { browserName } from 'mobile-device-detect';
export default {
  name: "browserVerification",
  data() {
    return {
    };
  },
  computed: {
    browserInfo: function(){
      var browser_info = "";
      if(isBrowser){
        //browser_info = "Your browser type : " + browserName+ ".v"+ browserVersion;
        return browser_info;
      } else {
        return browser_info;
      }      
    },
    isMobileDevice: function() {
        if (isMobile){
         return true;
        } else {
          return false;
        }
    },
    isMobileDevice_iOS_safari: function() {
      if (isMobile){
        if( isIOS && isSafari) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }    
    },
    isChromeBrowser: function() {
      if (!isMobile) {
        if (
          window.chrome !== null &&
          typeof window.chrome !== "undefined" &&
          window.navigator.vendor === "Google Inc." &&
          (typeof window.opr !== "undefined") === false &&
          window.navigator.userAgent.indexOf("Edge") > -1 === false
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>