import { createStore } from "vuex";
import localStorage from "@/store/modules/localStorage";
import { Types } from "@/helpers/typeHelper";
import playlist from "./modules/playlist.js";
import query from "./modules/query";
import SearchResults from "./modules/SearchResults";

export default createStore({
  modules: {
    localStorage,
    playlist,
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
        [Types.unfiltered]: SearchResults(Types.unfiltere),
      },
    },
  },
  // https://v3.vuex.vuejs.org/guide/strict.html#development-vs-production
  strict: !import.meta.env.PROD,
});
