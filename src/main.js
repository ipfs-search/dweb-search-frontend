// Recomendation of babeljs (https://babeljs.io/docs/en/babel-polyfill)
// Todo: see if core-js/regenerator-runtime are still necessary
import 'core-js/stable'; // only stable feature also is possible with only `core-js`
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally
import '@mdi/font/css/materialdesignicons.css'; // https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons

import { createApp } from 'vue';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VueClosable from 'vue-closable';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

const Vue = createApp(App);

Vue.use(VueClosable);

Vue.use(vuetify);

Vue.use(vueFilterPrettyBytes);

Vue.config.productionTip = false;

Vue.use(store);

Vue.use(router);
// putting this here, in stead of in router/index.js, avoids dependency cycles.
router.beforeEach((to, from, next) => {
  store.commit('query/setRouteParams', to.query);
  next();
});

Vue.mount('#app');
