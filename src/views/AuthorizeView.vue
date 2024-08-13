<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { AuthorizeParams, ClientInfo } from "../types.ts";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { StyleProvider, Themes } from '@varlet/ui';

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
}, { immediate: true })

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

// get scope detail
function get_scope_detail(scope: string) {
    switch (scope) {
        case 'openid':
            return {
                "title": "OpenID",
                "desc": "The OpenID of your account",
                "icon": "card-account-details",
                "danger": 0
            };
        case 'profile':
            return {
                "title": "Profile",
                "desc": "Your profile information",
                "icon": "account-circle",
                "danger": 0
            };
        case 'email':
            return {
                "title": "Email",
                "desc": "Your email address",
                "icon": "email",
                "danger": 0
            };
        case 'phone':
            return {
                "title": "Phone",
                "desc": "Your phone number",
                "icon": "phone",
                "danger": 0
            };
        case 'address':
            return {
                "title": "Address",
                "desc": "Your address",
                "icon": "map-marker",
                "danger": 1
            };
        default:
            return {
                "title": "Unknown",
                "desc": "Unknown scope",
                "icon": "help",
                "danger": 2
            };
    }
}
var scope_detail = [];
for (let i = 0; i < data.scope.split(' ').length; i++) {
    scope_detail.push(get_scope_detail(data.scope.split(' ')[i]));
}

// Theme
// StyleProvider(Themes.md3Dark);
</script>

<template>
    <var-space id="mainbox" :size="[10, 10]" justify="space-between">
        <div v-if="info.status === 0">
            Loading...
        </div>
        <div id="authbox" v-else-if="error === ''">
            <var-paper id="area-avatar" :radius="3">
                <var-space align="center" justify="center">
                    <var-avatar src="https://openteens.org/img/logo/build/circle.png" class="var-elevation--2" />
                    <var-loading type="wave" />
                    <var-avatar src="https://openteens.org/img/logo/build/circle.png" class="var-elevation--2"
                        :round="false" />
                </var-space>
            </var-paper>

            <var-paper id="area-authorize" :elevation="2" :radius="8">
                应用 <span class="app-name">{{ info.app_name }}</span> 正在请求以下权限:

                <var-divider />

                <div v-for="x in scope_detail">
                    <var-cell border :icon="x.icon" :title="x.title" :description="x.desc"
                        :class="'permfield-dangerlv--' + x.danger">
                        <template #extra>
                            <var-icon name="information" />
                        </template>
                    </var-cell>
                </div>

                <var-divider />

                <var-row>
                    <var-col :span="11">
                        <var-button block v-on:click="cancel">Cancel</var-button>
                    </var-col>
                    <var-col :span="2"></var-col>
                    <var-col :span="11">
                        <var-button block type="primary" v-on:click="approve">Approve</var-button>
                    </var-col>
                </var-row>
            </var-paper>
        </div>
        <div v-else>
            Error: {{ error }}
        </div>
    </var-space>
</template>

<style scoped>
.app-name {
    font-weight: bold;
    color: var(--color-info);
}

.var-paper {
    margin: 30px;
    padding: 20px;
}

.var-avatar {
    background-color: transparent;
}

.permfield-dangerlv--0 {}

.permfield-dangerlv--1 {
    color: var(--color-warning);
}

.permfield-dangerlv--2 {
    color: var(--color-danger);
}

.permfield-dangerlv--3 {
    background-color: var(--color-danger);
    color: white;
}
</style>