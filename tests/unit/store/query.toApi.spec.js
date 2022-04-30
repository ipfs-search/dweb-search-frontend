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
import Vuex from 'vuex'

jest.mock('@/store/modules/query/filterDefinitions', () => {
  const {
    selectFilterGenerator,
    multipleSelectFilterGenerator,
  } = require('@/store/modules/query/filterGenerators');
  const icecream = selectFilterGenerator({
    apiKey: 'icecream',
    label: 'icecream',
    slug: 'icecream',
    selectionOptions: [
      { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
    ],
  });
  const pizza = multipleSelectFilterGenerator({
    label: 'pizza',
    apiKey: 'pizza',
    slug: 'pizza',
    selectionOptions: [
      { label: 'Margherita', apiValue: ['mozzerella', 'tomato'], selected: true },
      { label: 'Funghi', apiValue: ['mushrooms'], selected: true },
    ],
  });
  return {
    icecream,
    pizza,
  };
});

describe('Mapping filters to api query', () => {
  test('conjunctive api values are mapped to separate entries', () => {
    const icecreamQuery = filterDefinitions.icecream.searchApiQuerySnippet;
    expect(icecreamQuery)
      .toIncludeSameMembers(['icecream:nuts', 'icecream:green']);
  });
  test('disjunctive api values are mapped to single value, united with OR', () => {
    const pizzaQuery = filterDefinitions.pizza.searchApiQuerySnippet;
    expect(pizzaQuery)
      .toMatch(/^pizza:\(.+ OR .+ OR .+\)$/);
  });
  test('store api getter combines api values', () => {
    const pizzaQuery = filterDefinitions.pizza.searchApiQuerySnippet;
    const icecreamQuery = filterDefinitions.icecream.searchApiQuerySnippet;
    const searchApiQuery = store.getters['query/filters/searchApiQuery'];
    expect(searchApiQuery)
      .toMatch(pizzaQuery);
    icecreamQuery.forEach((snippet) => {
      expect(searchApiQuery)
        .toMatch(snippet);
    });
    expect(searchApiQuery.length)
      .toEqual([...icecreamQuery, pizzaQuery].join(' ').length);
  });
  test('when multiple select has nothing selected, its query will be empty', () => {
    const icecreamQuery = filterDefinitions.icecream.searchApiQuerySnippet;
    store.commit('query/setRouteParams', { icecream: 'Pistaccio' });
    expect(filterDefinitions.pizza.searchApiQuerySnippet).toEqual('');
    expect(store.getters['query/filters/searchApiQuery'])
      .toEqual(icecreamQuery.join(' '));
  });
});
