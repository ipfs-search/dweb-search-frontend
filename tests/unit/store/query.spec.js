// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import store from '@/store';
import { Types } from '@/helpers/typeHelper';

describe('Filters', () => {
  it('type filter functioning', () => {
    const typeFilterValue = store.getters['query/filters/type/toProps'].value;
    expect(typeFilterValue?.toLowerCase()).toBe(Types.any);
    store.commit('query/setRouteParams', { type: Types.text });
    expect(store.getters['query/filters/type/toProps'].value?.toLowerCase()).toBe(Types.text);
  });
});
