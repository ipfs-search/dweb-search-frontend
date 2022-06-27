import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    props: ({ query }) => ({ query: {
        ...query,
        page: Number(query.page),
      }
    }),
    component: () => import('@/components/SearchView.vue'),
  },
  {
    path: '/search/detail/:fileType/:fileHash',
    name: 'Detail',
    props: ({params, query}) => ({
      ...params,
      query: {
        ...query,
        page: Number(query.page),
      },
      selectedIndex: Number(params.selectedIndex),
    }),
    component: () => import('@/components/DetailView.vue'),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
