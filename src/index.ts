import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from "vue-router";

import './style.css';
import Varlet from '@varlet/ui'
import vuetify from './plugins/vuetify';
import App from './App.vue';
import IndexView from "./views/IndexView.vue";
import '@varlet/ui/es/style'
import AuthorizeView from "./views/AuthorizeView.vue";

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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

app.use(router);
app.use(Varlet);
app.use(vuetify);
app.mount('#app');
