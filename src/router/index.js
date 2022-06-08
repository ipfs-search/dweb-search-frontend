import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';

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

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
