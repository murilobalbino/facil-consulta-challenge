import { createApp } from 'vue'

import {createRouter, createWebHashHistory} from "vue-router";

import App from './App.vue'
import Home from './pages/Home.vue'
import Store from './store'

const routes = [
    {
        path: "/",
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App)
    .use(router)
    .use(Store)
    .mount('#app')
