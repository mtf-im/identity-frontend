<script setup lang="ts">
import {useUrlSearchParams} from '@vueuse/core'
import {AuthorizeParams, ClientInfo} from "../types.ts";
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import axios from 'axios';

const data = useUrlSearchParams<AuthorizeParams>('hash');
const info = ref({
  "status": 0,
  "id": -1,
  "app_name": "",
  "app_desc": "",
  "client_id": "",
  "allowed_scopes": "",
  "redirect_uri": ""
} as ClientInfo);

watch(() => data.client_id, async () => {
  try {
    const resp = await axios.get(`/api/client/${data.client_id}/info`);
    info.value = resp.data;
  } catch (e) {
    info.value = {
      "status": 500,
      "id": -1,
      "app_name": "",
      "app_desc": "",
      "client_id": "",
      "allowed_scopes": "",
      "redirect_uri": ""
    };
  }
}, {immediate: true})

const router = useRouter();

function cancel() {
  router.back();
}

async function approve() {
  const resp = await axios.post("/api/approve_authorize", {
    client_id: data.client_id,
    redirect_uri: data.redirect_uri,
    scope: data.scope,
  })
  const code = resp.data.code as string;
  console.log(code);
  window.location.assign(data.redirect_uri + "?code=" + code);
}

const error = computed(() => {
  if (info.value.status === 404) return 'Invalid client_id';
  if (info.value.status === 500) return 'Internal Server Error';
  if (info.value.status != 200) return `Abnormal Error Code: ${info.value.status}`;
  if (data.redirect_uri != info.value.redirect_uri) return 'Invalid redirect_uri';
  const allowed_scopes = info.value.allowed_scopes.split(" ");
  const requested_scopes = data.scope.split(" ");
  for (let i = 0; i < requested_scopes.length; i++) {
    if (!allowed_scopes.includes(requested_scopes[i])) return 'Invalid scope ' + requested_scopes[i];
  }
  return '';
})

</script>

<template>
  <div v-if="info.status === 0">
    Loading...
  </div>
  <div v-else-if="error === ''">
    应用 {{ info.app_name }} 正在请求以下权限:
    <ul>
      <li v-for="x in data.scope.split(' ')">
        {{ x }}
      </li>
    </ul>
    <button v-on:click="cancel">Cancel</button>&nbsp;
    <button v-on:click="approve">Approve</button>
  </div>
  <div v-else>
    Error: {{ error }}
  </div>
</template>

<style scoped>

</style>