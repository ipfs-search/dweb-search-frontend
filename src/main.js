// Recomendation of babeljs (https://babeljs.io/docs/en/babel-polyfill)
// Todo: see if core-js/regenerator-runtime are still necessary
import 'core-js/stable'; // only stable feature also is possible with only `core-js`
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally
import '@mdi/font/css/materialdesignicons.css'; // https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons

import './VueComposition';
import Vue from 'vue';
import VueTimeago from 'vue-timeago';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VueClosable from 'vue-closable';
import App from './App';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.use(VueClosable);

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

// putting this here, in stead of in router/index.js, avoids dependency cycles.
router.beforeEach((to, from, next) => {
  store.commit('query/setRouteParams', to.query);
  next();
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
