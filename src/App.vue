<template>
  <div v-if="$route.meta.showNav === undefined ? true : $route.meta.showNav">
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      &nbsp;
      <RouterLink to="/authorize">Go to Authorize</RouterLink>
    </nav>
    <br>
  </div>

  <main>
    <RouterView/>
  </main>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {useTitle} from "@vueuse/core";
import {computed} from "vue";

const route = useRoute();
const title = computed(() => {
  let title = route.meta.title as string | undefined;
  if (title === undefined) {
    title = "OpenTeensID Center";
  } else {
    title += " - OpenTeensID Center"
  }
  return title;
});
useTitle(title)
</script>