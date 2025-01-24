import './plugins/axios'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MainView from '@/views/MainView.vue'
import router from './router'

const app = createApp(MainView)

app.use(createPinia())
app.use(router)

app.mount('#app')