// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

// https://stackoverflow.com/a/65275641/2380702
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Vuetify from 'vuetify';

Vue.use(VueCompositionApi);
Vue.use(Vuetify);
