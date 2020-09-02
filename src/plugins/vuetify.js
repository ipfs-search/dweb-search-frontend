import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#0e3344',
        secondary: '#00bcd4'
      },
      light: {
        primary: '#0e3344',
        secondary: '#00bcd4'
      }
    }
  }
});
