<template>
    <LanguageSwitch />
    <div v-if="$route.meta.showNav === undefined ? false : $route.meta.showNav">
        <nav>
            <RouterLink to="/">Go to Home</RouterLink>
            &nbsp;
            <RouterLink to="/authorize">Go to Authorize</RouterLink>
            &nbsp;
            <RouterLink to="/auth/login">Go to Login</RouterLink>
            &nbsp;
            <RouterLink to="/auth/signup">Go to Sign Up</RouterLink>
        </nav>
        <br />
    </div>

    <main>
        <RouterView />
    </main>
</template>
<script setup lang="ts">
import { useLocalStorage, useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";
import LanguageSwitch from "./components/LanguageSwitch.vue";
import i18n from "./i18n/i18n.ts";

const route = useRoute();
const title = computed(() => {
    let title = route.meta.title as string | undefined;
    if (title === undefined) {
        title = "MtF.im Identity Center";
    } else {
        title += " - MtF.im ID Center";
    }
    return title;
});

useLocalStorage("locale", i18n.global.locale);

useTitle(title);
</script>
