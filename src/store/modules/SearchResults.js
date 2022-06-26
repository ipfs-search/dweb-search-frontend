// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only


import Vue from 'vue';
import { apiSearch, batchSize } from '@/helpers/ApiHelper';
import { classify } from '@/helpers/nsfwClassifier';
import { Types } from '@/helpers/typeHelper';

const baseState = {
  error: false,
  loading: false,
  queryString: '',
  results: {
    hits: [],
  },
};

export default (fileType) => ({
  namespaced: true,
  state: () => ({
    ...baseState,
  }),
  mutations: {
    setLoading(state, loading = true) {
      state.loading = loading;
    },
    setError(state, error) {
      state.loading = false;
      state.error = error;
    },
    setQuery(state, queryString) {
      if (state.queryString !== queryString) {
        state.error = false;
        state.loading = false;
        state.results = {
          hits: [],
        };
        state.queryString = queryString;
      }
    },
    setResults(state, { newResults, index }) {
      state.loading = false;
      newResults.hits.forEach((hit, n) => {
        state.results.hits[index + n] = hit;
        if (fileType === Types.images) {
          classify(hit)
            .then(({ classification }) => {
              this.commit(`results/${fileType}/setNsfw`, {
                index: index + n,
                classification,
              });
            });
        }
      });

      state.results = {
        ...newResults,
        hits: state.results.hits,
      };
      return newResults.hits;
    },

    setNsfw(state, { index, classification }) {
      if (!classification) return;
      if (!state.results?.hits?.[index]) return;
      // Add actual classification for debugging purposes
      Vue.set(state.results.hits[index], 'nsfwClassification', classification);
    },
  },
  getters: {
    /**
     * retrieve cached results (synchronously). N.b. page is 1-based;
     * @param state
     * @returns {function(*, *=)}
     */
    pageResults: (state) => (page, perPage = batchSize) => {
      const batch = page - 1;
      const pageResults = state.results?.hits?.slice(batch * perPage, (batch + 1) * perPage);
      return pageResults || [];
    },
    loading: (state) => state.loading,
    error: (state) => state.error,
    resultsTotal: (state) => state.results.total || 0,
    hits: (state) => state.results.hits || [],
  },
  actions: {
    /**
     * fetch the page from cache or from API for current query from url
     * @param page: 1-based page
     * @param perPage
     * @returns {Promise<*>}
     */
    async fetchPage({
      state, commit, rootGetters,
    }, {
      page = 1, perPage = batchSize,
    }) {
      const batch = page - 1;
      commit('setQuery', rootGetters['query/apiQueryString'](fileType));
      // Return empty if request a non-existent page
      if (state.results?.total <= batch * perPage) return [];
      // if results are already present, just return them.
      const pageResults = state.results?.hits?.slice(batch * perPage, (batch + 1) * perPage);
      if (pageResults?.length > 0 && !pageResults.includes(undefined)) {
        return pageResults;
      }

      // otherwise do api lookup
      commit('setLoading');
      return apiSearch(state.queryString, fileType, batch, perPage)
        .then((newResults) => commit('setResults', { newResults, index: batch * perPage }))
        .catch((error) => {
          commit('setError', { error, batch, perPage });
        });
    },
  },
});
