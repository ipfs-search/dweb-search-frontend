// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

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
    component: () => import(/* webpackChunkName: "search-list" */ '../views/Search'),
  },
  {
    path: '/search/detail/:fileType/:fileHash',
    name: 'Detail',
    props: (route) => ({
      ...route.params,
      query: route.query,
    }),
    // route level code-splitting
    component: () => import(/* webpackChunkName: "search-detail" */ '../views/Detail'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
