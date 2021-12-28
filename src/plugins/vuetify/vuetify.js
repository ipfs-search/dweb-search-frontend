import Vue from 'vue';

// Faster builds
// Ref: https://vuetifyjs.com/en/features/presets/#compilation-time
import Vuetify from 'vuetify/lib/framework';

import ipfsTheme from './theme';
import store from '@/store';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: store.state.localStorage.darkMode,
    themes: {
      dark: ipfsTheme,
      light: ipfsTheme,
    },
  },
});
