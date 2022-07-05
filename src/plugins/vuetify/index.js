import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

import store from '@/store';
import ipfsTheme from './theme'

export default createVuetify({
  theme: {
    defaultTheme: store.state.localStorage.darkMode ? 'dark' : 'light',
    themes: {
      dark: ipfsTheme,
      light: ipfsTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
