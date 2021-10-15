// Mixin providing querystring-based navigation for search based on store.

// import store from '@/store';

// Todo: delete this file
// Leaving this file here for now, for reference in code reviewing last refactor
export default {

  mounted() {
    // Set vuex query from route query parameters
    // store.commit('query/setRouteParams', this.$route.query);
    // this.dispatch_search();
  },

  // methods: {
  //   dispatch_search() {
  //     // TODO: Move to store, perhaps.
  //     // This logic might belong in store.
  //     switch (store.state.query.type) {
  //       // TODO: Use modular/centralised type list here!
  //       case 'text':
  //         store.dispatch('results/text/getResults');
  //         break;
  //       case 'images':
  //         store.dispatch('results/images/getResults');
  //         break;
  //       case 'audio':
  //         store.dispatch('results/audio/getResults');
  //         break;
  //       case 'video':
  //         store.dispatch('results/video/getResults');
  //         break;
  //       case 'directories':
  //         store.dispatch('results/video/getResults');
  //         break;
  //       default:
  //         // 'any'
  //         store.dispatch('results/text/getResults');
  //         store.dispatch('results/images/getResults');
  //         store.dispatch('results/audio/getResults');
  //         store.dispatch('results/video/getResults');
  //         store.dispatch('results/directories/getResults');
  //     }
  //   },
  // },
  // beforeRouteEnter(to, from, next) {
  // Perform search after update
  // N.b. this is not the ideal moment to load everything anymore!
  // this.dispatch_search();
  // next();
  // },
};
