import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from "vue-router";

import i18n from './i18n/i18n.ts'; // 引入 i18n 配置

import './style.css';
import Varlet from '@varlet/ui'
import App from './App.vue';
import IndexView from "./views/IndexView.vue";
import AuthorizeView from "./views/authorize/AuthorizeView.vue";
import '@varlet/ui/es/style'
import LoginView from "./views/auth/LoginView.vue";
import SignUpView from "./views/auth/SignUpView.vue";
import {createPinia} from "pinia";
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

const app = createApp(App);

const routes = [
    {
        path: '/',
        component: IndexView,
        meta: {title: "Index"}
    },
    {
        path: '/authorize',
        component: AuthorizeView,
        meta: {
            title: "Authorize",
            showNav: false
        }
    },
    {
        path: '/auth/signup',
        component: SignUpView,
        meta: {
            title: "Authorize",
            showNav: false
        }
    },
    {
        path: '/auth/login',
        component: LoginView,
        meta: {
            title: "Login",
            showNav: false
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const pinia = createPinia();

app.use(pinia)
app.use(router);
app.use(i18n);
app.use(Varlet);
app.mount('#app');
