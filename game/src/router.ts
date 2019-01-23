import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Start from './views/Start.vue';
import Emotions from './views/Emotions.vue';
import Poses from './views/Poses.vue';
import Results from './views/Results.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/about' },
    { path: '/index.html', redirect: '/about' },
    {
      path: '/about',
      name: 'about',
      component: Home,
    },
    {
      path: '/start',
      name: 'start',
      component: Start,
    },
    {
      path: '/emotions',
      name: 'emotions',
      component: Emotions,
    },
    {
      path: '/poses',
      name: 'poses',
      component: Poses,
    },
    {
      path: '/results',
      name: 'results',
      component: Results,
    }
  ],
});
