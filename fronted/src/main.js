// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'

import './assets/style/reset.css'

import VueJsonp from 'vue-jsonp'

Vue.config.productionTip = false
Vue.use(VueCookies)


Vue.use(VueJsonp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})