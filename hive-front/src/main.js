import './plugins/axios'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MainView from '@/views/MainView.vue'
import router from './router'
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(MainView)

app.use(createPinia())
app.use(router)
app.use(Vue3SocialSharingPlugin);
app.mount('#app')