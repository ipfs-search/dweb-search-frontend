import Vue from 'vue';
import VBodyScrollLock from 'v-body-scroll-lock';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.use(VBodyScrollLock);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
