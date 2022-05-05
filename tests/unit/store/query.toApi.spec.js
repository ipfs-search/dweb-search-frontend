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
import filterDefinitions from '@/store/modules/query/filterDefinitions';
import { createStore, mergeStoreConfigurations } from '@/store';
import filterSubModule from '@/store/modules/query/filterSubModule';
import query from '@/store/modules/query';
import mockFilters from '../../mock-data';

let store;

describe('Mapping filters to api query', () => {
  beforeAll(() => {
    const filters = mergeStoreConfigurations(filterSubModule, {
      modules: {
        pizza: mockFilters.pizza,
        icecream: mockFilters.icecream,
      },
    });
    store = createStore(query, {
      modules: {
        filters,
      },
    });
  });
  test('conjunctive api values are mapped to separate entries', () => {
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    expect(icecreamQuery)
      .toIncludeSameMembers(['icecream:nuts', 'icecream:green']);
  });
  test('disjunctive api values are mapped to single value, united with OR', () => {
    const pizzaQuery = store.getters['filters/pizza/toSearchApi'];
    expect(pizzaQuery)
      .toMatch(/^pizza:\(.+ OR .+ OR .+\)$/);
  });
  test('store api getter combines api values', () => {
    const pizzaQuery = store.getters['filters/pizza/toSearchApi'];
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    const apiQuery = store.getters['filters/searchApiQuery'];
    expect(apiQuery)
      .toMatch(pizzaQuery);
    icecreamQuery.forEach((snippet) => {
      expect(apiQuery)
        .toMatch(snippet);
    });
    expect(apiQuery.length)
      .toEqual([...icecreamQuery, pizzaQuery].join(' ').length);
  });
  test('when multiple select has nothing selected, its query will be empty', () => {
    const icecreamQuery = store.getters['filters/icecream/toSearchApi'];
    store.commit('setRouteParams', { icecream: 'Pistaccio' });
    expect(filterDefinitions.pizza.searchApiQuerySnippet).toEqual('');
    expect(store.getters['filters/searchApiQuery'])
      .toEqual(icecreamQuery.join(' '));
  });
});
