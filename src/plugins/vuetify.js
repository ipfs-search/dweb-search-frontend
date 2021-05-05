import Vue from 'vue';

// Faster builds
// Ref: https://vuetifyjs.com/en/features/presets/#compilation-time
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#0e3344',
        secondary: '#00bcd4',
      },
      light: {
        primary: '#0e3344',
        secondary: '#00bcd4',
      },
    },
  },
});
