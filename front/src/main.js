import axios from "axios";
import {
    createApp
} from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import {
    loadFonts
} from "./plugins/webfontloader";
import router from "./router";
import store from "./store/store.js"
// import VueNativeSock from 'vue-native-websocket-vue3'
// import store from './store/store'
// import {
//     SOCKET_ONOPEN,
//     SOCKET_ONCLOSE,
//     SOCKET_ONERROR,
//     SOCKET_ONMESSAGE,
//     SOCKET_RECONNECT,
//     SOCKET_RECONNECT_ERROR,
// } from './stoer/mutation-types'

// const mutations = {
//     SOCKET_ONOPEN,
//     SOCKET_ONCLOSE,
//     SOCKET_ONERROR,
//     SOCKET_ONMESSAGE,
//     SOCKET_RECONNECT,
//     SOCKET_RECONNECT_ERROR,
// }

loadFonts();

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = store;

// app.use(VueNativeSock, "", {
// store: store,
// mutations: mutations
// })

app.use(vuetify).use(router).use(store).mount("#app");