import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    props: (route) => ({ query: route.query }),
    // route level code-splitting
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/search/detail/:fileType/:fileHash',
    name: 'Detail',
    props: (route) => ({
      ...route.params,
      query: route.query,
    }),
    // route level code-splitting
    component: () => import('@/views/DetailView.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
