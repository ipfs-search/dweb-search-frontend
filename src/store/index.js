// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import Vue from 'vue';
import Vuex from 'vuex';
import localStorage from '@/store/modules/localStorage';
import { Types } from '@/helpers/typeHelper';
import query from './modules/query';
import SearchResults from './modules/SearchResults';

Vue.use(Vuex);

const storeConfiguration = {
  modules: {
    localStorage,
    query,
    // TODO: Rename 'results' to 'search' to cleanup weird results.results.
    results: {
      namespaced: true,
      modules: {
        [Types.text]: SearchResults(Types.text),
        [Types.images]: SearchResults(Types.images),
        [Types.audio]: SearchResults(Types.audio),
        [Types.video]: SearchResults(Types.video),
        [Types.directories]: SearchResults(Types.directories),
        [Types.other]: SearchResults(Types.other),
      },
    },
  },
  // https://v3.vuex.vuejs.org/guide/strict.html#development-vs-production
  // N.b. this won't work with vite
  strict: process.env.NODE_ENV !== 'production',
};

/**
 * create a store from a configuration and/or deepmerge an override into it.
 * @param configuration
 * @param storeOverrides
 * @returns {Store<{}>}
 */
export function createStore(configuration = storeConfiguration) {
  return new Vuex.Store(configuration);
}

export default createStore();
