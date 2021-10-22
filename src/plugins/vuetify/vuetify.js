import Vue from 'vue';

// Faster builds
// Ref: https://vuetifyjs.com/en/features/presets/#compilation-time
import Vuetify from 'vuetify/lib/framework';

import ipfsTheme from './theme';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: ipfsTheme,
      light: ipfsTheme,
    },
  },
});
