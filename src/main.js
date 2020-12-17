import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

// import { VueMasonryPlugin } from 'vue-masonry';

// Vue.use(VueMasonryPlugin)

import VBodyScrollLock from 'v-body-scroll-lock'

Vue.use(VBodyScrollLock)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
