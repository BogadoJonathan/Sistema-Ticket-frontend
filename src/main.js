import { createApp } from 'vue'
import { createPinia } from 'pinia'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
// axios.defaults.baseURL = 'http://192.168.100.242:8000/api/'
import App from './App.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'



createApp(App)
    .use( createPinia())
    .use(router)
    .use(bootstrap,axios)
    .mount('#app')