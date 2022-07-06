// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

/**
 * leverage the store to make reactive, type casted localStorage fields
 */

const fields = [
  {
    field: 'blurExplicitImages',
    defaultValue: true,
  },
  {
    field: 'darkMode',
    // TODO: add third option for: system settings
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches,
  },
];

const pascalize = (s) => s[0].toUpperCase() + s.slice(1);

export default {
  namespaced: true,
  state: Object.fromEntries(fields.map(({ field, defaultValue }) => [
    field,
    // N.b. to make more types possible than boolean alone, some magic needs to be done here.
    defaultValue ? localStorage[field] !== 'false' : localStorage[field] === 'true',
  ])),
  mutations: Object.fromEntries(fields.map(({ field }) => [
    `set${pascalize(field)}`,
    (state, value) => {
      state[field] = value;
      localStorage[field] = value;
    },
  ])),
};
