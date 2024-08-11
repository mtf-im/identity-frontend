<script setup lang="ts">
import {useUrlSearchParams} from '@vueuse/core'
import {AuthorizeData} from "../types.ts";
import {computed} from "vue";
import {useRouter} from "vue-router";
import axios from 'axios';

const data = computed(() => new AuthorizeData(useUrlSearchParams('hash')));

const router = useRouter();

function cancel() {
  router.back();
}

async function approve() {
  const resp = await axios.post("/api/approve_authorize", {
    client_id: data.value.client_id,
    redirect_uri: data.value.redirect_uri,
    scope: data.value.scope,
  })
  const code = resp.data.code as string;
  console.log(code);
  window.location.assign(data.value.redirect_uri + "?code=" + code);
}

</script>

<template>
  <!--  {{ data }}-->
  <!--  <br>-->
  应用 {{ data.client_id }} 正在请求以下权限:
  <ul>
    <li v-for="x in data.scope">
      {{ x }}
    </li>
  </ul>
  <button v-on:click="cancel">Cancel</button>&nbsp;
  <button v-on:click="approve">Approve</button>
</template>

<style scoped>

</style>