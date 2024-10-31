import {createRouter, createWebHashHistory, RouteLocationRaw, RouteRecordRaw} from "vue-router";
import IndexView from "./views/IndexView.vue";
import AuthorizeView from "./views/authorize/AuthorizeView.vue";
import SignUpView from "./views/auth/SignUpView.vue";
import LoginView from "./views/auth/LoginView.vue";
import {checkLogin} from "./utils.ts";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: IndexView,
        meta: {
            title: "Index"
        }
    },
    {
        path: '/authorize',
        component: AuthorizeView,
        meta: {
            title: "Authorize",
            showNav: false,
            requiresAuth: true,
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

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// RequiresAuth handler
router.beforeEach((to): boolean | RouteLocationRaw => {
    if (!to.meta.requiresAuth) return true;
    if (checkLogin()) return true;
    return {
        path: "/auth/login",
        query: {for: to.fullPath},
    };
})
