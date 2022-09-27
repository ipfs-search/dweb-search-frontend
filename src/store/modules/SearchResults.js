import { apiSearch, batchSize } from "@/helpers/ApiHelper";
import { classify } from "@/helpers/nsfwClassifier";
import { Types } from "@/helpers/typeHelper";

const baseState = {
  error: false,
  loading: false,
  queryString: "",
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

      // Adjust index of hits with page-based offset.
      const newHits = state.results.hits;
      newResults.hits.forEach((hit, n) => {
        const offset = index + n;
        newHits[offset] = hit;
      });

      // Now, copy everything from newResults into state.results but maintain hits and their offset.
      state.results = {
        ...newResults,
        hits: newHits,
      };
    },

    setNsfw(state, { index, classification }) {
      if (!classification) return;
      if (!state.results?.hits?.[index]) return;
      // Add actual classification for debugging purposes
      state.results.hits[index]["nsfwClassification"] = classification;
    },
  },
  getters: {
    /**
     * retrieve cached results (synchronously). N.b. page is 1-based;
     * @param state
     * @returns {function(*, *=)}
     */
    pageResults:
      (state) =>
      (page, perPage = batchSize) => {
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
    async fetchPage({ state, commit, rootGetters, dispatch }, { page = 1, perPage = batchSize }) {
      const batch = page - 1;
      commit("setQuery", rootGetters["query/apiQueryString"](fileType));
      // Return empty if request a non-existent page
      if (state.results?.total <= batch * perPage) return [];
      // if results are already present, just return them.
      const pageResults = state.results?.hits?.slice(batch * perPage, (batch + 1) * perPage);
      if (pageResults?.length > 0 && !pageResults.includes(undefined)) {
        return pageResults;
      }

      // otherwise do api lookup
      commit("setLoading");
      return apiSearch(state.queryString, fileType, batch)
        .then((newResults) => {
          const index = batch * perPage;
          const payload = { newResults, index };
          commit("setResults", payload);
          dispatch("fetchNsfw", payload);
        })
        .catch((error) => {
          commit("setError", { error, batch });
        });
    },
    async fetchNsfw({ commit }, { newResults, index }) {
      if (fileType === Types.images) {
        newResults.hits.forEach((hit, n) => {
          classify(hit)
            .then(({ classification }) => {
              commit(`results/${fileType}/setNsfw`, {
                index: index + n,
                classification,
              });
            })
            .catch(console.error);
        });
      }
    },
  },
});
