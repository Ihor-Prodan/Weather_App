import { createRouter, createWebHistory } from 'vue-router';
import WeatherApp from '../views/WeatherApp.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherApp,
    },
  ],
});

export default router;
