import store from '@/store';
import { Types } from '@/helpers/typeHelper';

describe('Filters', () => {
  it('type filter functioning', () => {
    let typeFilterValue = store.getters['query/filters/type/toProps'].value;
    if (Array.isArray(typeFilterValue)) {
      typeFilterValue = typeFilterValue[0];
    }
    expect(typeFilterValue?.toLowerCase()).toBe(Types.any);
    store.commit('query/setRouteParams', { type: Types.text });
    expect(store.getters['query/filters/type/toProps'].value?.toLowerCase()).toBe(Types.text);
  });
});
