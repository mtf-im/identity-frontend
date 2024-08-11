import {createApp} from 'vue';
import {createRouter, createWebHistory} from "vue-router";

import './style.css';
import App from './App.vue';
import IndexView from "./views/IndexView.vue";

const app = createApp(App);

const routes = [
    {path: '/', component: IndexView},
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

app.use(router);
app.mount('#app');
