// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import Vue from 'vue';

// Faster builds
// Ref: https://vuetifyjs.com/en/features/presets/#compilation-time
import Vuetify from 'vuetify/lib/framework';
import store from '@/store';
import ipfsTheme from './theme';

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
