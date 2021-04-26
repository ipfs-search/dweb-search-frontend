import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'SearchResults',
    // route level code-splitting
    // this generates a separate chunk (result.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search-results" */ '../views/SearchResults.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  // Propagate queryset to search store; route is the single source of truth.

  // Ref: https://github.com/vuejs/vuex-router-sync/blob/master/src/index.ts#L62
  // Note that the reference has something about time traveling.

  store.commit('search/setRouteParams', to.query);
});

export default router;
