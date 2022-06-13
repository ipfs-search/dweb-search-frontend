import { createVuetify } from 'vuetify';

// ToDo: When vuetify3 is out of beta, check what to do with this import.
import 'vuetify/styles'

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
