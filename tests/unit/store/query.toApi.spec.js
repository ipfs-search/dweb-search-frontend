/*
Spec def:

- we get a list of filters in the state (getter) (this because it is state-dependant)
- the filters' definition is based on the state (getter)
- the values of the filters is stored in the queryparams (and in the state)
- every filter has a unique slug/identifier.
- filters in the queryparams that are non-applicable are still persisted in the store, but not queried
- a filter definition has a transformer method to turn its selection into an API query
- a filter instance indicates, how to display its component
- there are different types of filters, such as multiple select and single select;
- it should be easy to extend/modify behaviour

*/
import { createStore } from '@/store';
import query from '@/store/modules/query';
import mockFilters from '../../mock-data';

let store;
beforeAll(() => {
  store = createStore({
    ...query,
    modules: {
      filters: mockFilters.mockFilterModule,
    },
  });
});

describe('Mapping filters to api query', () => {
  test('multiple select api values are mapped to separate entries separated with a space', () => {
    const pizza = store.getters['filters/pizza/toSearchApi'];
    expect(pizza.split(' '))
      .toIncludeSameMembers(['pizza:mozzerella', 'pizza:tomato', 'pizza:basilicum']);
  });
  test('single select api values are mapped to single value, united with OR', () => {
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    expect(icecreamQuery)
      .toMatch(/^icecream:\(.+ OR .+ OR .+\)$/);
  });
  test('store api getter combines api values', () => {
    const pizzaQuery = store.getters['filters/pizza/toSearchApi'];
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    const apiQuery = store.getters['filters/searchApiQuery'];
    expect(apiQuery).toMatch(pizzaQuery);
    expect(apiQuery).toMatch(icecreamQuery);
  });
  test('when multiple select has nothing selected, it should not appear in API query', () => {

    // N.b. the following line does not work, due to limitation of vuex.
    // store.commit('setRouteParams', { pizza: 'Margherita' });
    // So the following snippet replicates it.
    const routeParams = { pizza: 'Margherita', icecream: [] };
    Object.keys(store.state.filters).forEach((filterSlug) => {
      store.commit(`filters/${filterSlug}/setValue`, routeParams[filterSlug]);
    });
    const pizzaQuery = store.getters['filters/pizza/toSearchApi'];
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    expect(icecreamQuery).toEqual('');
    expect(store.getters['filters/searchApiQuery'])
      .toEqual(pizzaQuery);
  });
});
