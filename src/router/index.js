import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // TODO: Pass query elements as props to Search view.
    // https://router.vuejs.org/guide/essentials/passing-props.html#function-mode
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (result.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search-list" */ '../views/Search'),
  },
  {
    path: '/search/detail/:fileType',
    name: 'Detail',
    props: (route) => ({
      fileType: route.params.fileType,
      fileHash: route.hash.slice(1), // slice to remove '#'
    }),
    // route level code-splitting
    // this generates a separate chunk (result.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search-list" */ '../views/Detail'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
export default router;
