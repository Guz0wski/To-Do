import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://to-do-9f3d9.firebaseio.com/'
        })
    }
})