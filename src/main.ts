import { createApp } from 'vue'

import Maska from 'maska'

import App from './App.vue'

import Router from './router'
import Store from './store'

createApp(App)
    .use(Router)
    .use(Store)
    .use(Maska)
    .mount('#app')
