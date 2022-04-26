import store from '@/store';
import { Types } from '../../../src/helpers/typeHelper';

describe('Filters', () => {
  it('type filter functioning', () => {
    expect(store.getters['query/filters/typeFilter'].value.toLowerCase()).toBe(Types.any);
    store.commit('query/setRouteParams', { type: Types.text });
    expect(store.getters['query/filters/typeFilter'].value.toLowerCase()).toBe(Types.text);
    // you cannot inject invalid values into the store
    store.commit('query/setRouteParams', { type: 'nonsense' });
    expect(store.getters['query/filters/typeFilter'].value.toLowerCase()).toBe(Types.text);
  });
});
