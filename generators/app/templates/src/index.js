import './index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'

import './components/app-header'
import './components/app-nav'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router
})
