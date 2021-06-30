import Vue from 'vue';
import VueTimeago from 'vue-timeago';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VBodyScrollLock from 'v-body-scroll-lock';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.use(VBodyScrollLock);

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  // locales: {
  //   'zh-CN': require('date-fns/locale/zh_cn'),
  //   ja: require('date-fns/locale/ja')
  // }
});

Vue.use(vueFilterPrettyBytes);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
