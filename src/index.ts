import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";

import './style.css';
import Varlet from '@varlet/ui'
import App from './App.vue';
import IndexView from "./views/IndexView.vue";
import '@varlet/ui/es/style'
import AuthorizeView from "./views/AuthorizeView.vue";

// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

const app = createApp(App);

const routes = [
    {
        path: '/',
        component: IndexView,
        meta: { title: "Index" }
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

// const vuetify = createVuetify({
//     components,
//     directives,
// })

app.use(router);
app.use(Varlet);
// app.use(vuetify);
app.mount('#app');

// material
// app.material.theme.register('default', {
//     primary: 'cyan',
//     accent: 'pink'
// })
