import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/app.css';

Vue.config.productionTip = false;

let colors = {
  active: '#1FD4D2',
  success: '#9DEDB2',
  failed: '#FE767C',
  preview: '#FFF',
};

Vue.prototype.$colors = colors;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


