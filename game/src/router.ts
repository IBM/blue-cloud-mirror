import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Emotions from './views/Emotions.vue';
import Poses from './views/Poses.vue';
import Results from './views/Results.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/index.html', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
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
