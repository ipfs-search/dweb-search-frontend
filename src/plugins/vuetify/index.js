import { createVuetify } from 'vuetify';
import store from '@/store';
import ipfsTheme from './theme';

export default createVuetify({
  theme: {
    dark: store.state.localStorage.darkMode,
    themes: {
      dark: ipfsTheme,
      light: ipfsTheme,
    },
  },
});
