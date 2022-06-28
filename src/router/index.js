import { createRouter, createWebHashHistory, useRoute } from 'vue-router';
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

/**
 * push new route query and execute searchViewComponents lookup with page=0
 * should be called when a change to the search parameters is requested
 * @param newQuery
 * @param page? 1-based page number.
 * @param method? either 'push' or 'replace', to set router behavior.
 */
export function enterSearchQuery(newQuery, page = 1, method = 'push') {
  router[method]({
    name: 'Search',
    query: {
      ...router.currentRoute.value.query,
      ...newQuery,
      page,
    },
  });
}

