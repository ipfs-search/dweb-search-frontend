import store from '@/store';
import { Types } from '@/helpers/typeHelper';

describe('Filters', () => {
  it('type filter functioning', () => {
    console.log(store.getters);
    expect(store.getters['query/filters/type/toProps'].value?.toLowerCase()).toBe(Types.any);
    store.commit('query/setRouteParams', { type: Types.text });
    expect(store.getters['query/filters/type/toProps'].value?.toLowerCase()).toBe(Types.text);
    // you cannot inject invalid values into the store; fallback to default
    store.commit('query/setRouteParams', { type: 'nonsense' });
    expect(store.getters['query/filters/type/toProps'].value?.toLowerCase()).toBe(Types.any);
  });
});
