import Vue from 'vue';
import VBodyScrollLock from 'v-body-scroll-lock';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.use(VBodyScrollLock);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
