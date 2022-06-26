// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only


import router from '@/router';

/**
 * push new route query and execute search lookup with page=0
 * should be called when a change to the search parameters is requested
 * @param newQuery
 * @param page? 1-based page number.
 * @param method? either 'push' or 'replace', to set router behavior.
 */
export function enterSearchQuery(newQuery, page = 1, method = 'push') {
  router[method]({
    name: 'Search',
    query: {
      ...router.currentRoute.query,
      ...newQuery,
      page,
    },
  });
}

export default {
  enterSearchQuery,
};
