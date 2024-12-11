import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { localStoragePlugin } from './stores/plugin/storegePlugin';

const pinia = createPinia();
const app = createApp(App);
pinia.use(localStoragePlugin);

app.use(pinia);
app.use(router);

app.mount('#app');
