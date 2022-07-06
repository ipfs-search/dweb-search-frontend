// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import {
  multipleSelectFilterModule,
  selectFilterModule,
} from '@/store/modules/queryFilters/filterVuexModuleGenerators';
import filterSubModule from '@/store/modules/queryFilters/filterSubModule';

/**
 * icecream is multiple select; you can have select 0 or more flavors
 * @type {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
const icecream = multipleSelectFilterModule({
  apiKey: 'icecream',
  label: 'icecream',
  items: [
    { text: 'Pistachio', apiValue: 'pistachio', default: true },
    { text: 'Chocolate', apiValue: 'chocolate', default: true },
    { text: 'Mango', apiValue: 'mango', default: true },
    { text: 'Stracciatella', apiValue: ['chocolate', 'vanilla'], default: true },
  ],
});

/**
 * you can only choose 1 pizza
 * @type {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
const pizza = selectFilterModule({
  label: 'pizza',
  apiKey: 'pizza',
  items: [
    { text: 'Margherita', apiValue: ['mozzerella', 'tomato', 'basilicum'], default: true },
    { text: 'Funghi', apiValue: 'mushrooms' },
  ],
});

const mockFilterModule = {
  ...filterSubModule,
  modules: {
    icecream,
    pizza,
  },
};

export default {
  icecream,
  pizza,
  mockFilterModule,
};
