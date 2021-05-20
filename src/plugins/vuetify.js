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
        ipfsPrimary: '#0e3344',
        ipfsSecondary: '#00bcd4',
        primary: '#78909C',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      light: {
        ipfsPrimary: '#0e3344',
        ipfsSecondary: '#00bcd4',
        primary: '#78909C',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
