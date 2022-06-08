import { createVuetify } from 'vuetify';
import store from '@/store';
import ipfsTheme from './theme';

export default createVuetify({
  theme: {
    defaultTheme: store.state.localStorage.darkMode ? 'dark' : 'light',
    themes: {
      dark: ipfsTheme,
      light: ipfsTheme,
    },
  },
});
