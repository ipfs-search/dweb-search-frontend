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
import './matchMedia.mock';
import filterDefinitions from '@/store/modules/query/filterDefinitions';
import store from '@/store';
import * as matchers from 'jest-extended';

expect.extend(matchers);

jest.mock('@/store/modules/query/filterDefinitions', () => {
  const { SelectFilter, MultipleSelectFilter } = require('@/store/modules/query/filterClasses');
  const icecream = new SelectFilter({
    apiKey: 'icecream',
    slug: 'icecream',
    options: [
      { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
    ],
  });
  const pizza = new MultipleSelectFilter({
    apiKey: 'pizza',
    options: [
      { label: 'Margherita', apiValue: ['mozzerella', 'tomato'], selected: true },
      { label: 'Funghi', apiValue: ['mushrooms'], selected: true },
    ],
  });
  return {
    icecream,
    pizza,
  };
});

describe('Mapping filters to api parameters', () => {
  const icecreamQuery = filterDefinitions.icecream.searchApiQuerySnippet;
  const pizzaQuery = filterDefinitions.pizza.searchApiQuerySnippet;
  test('conjunctive api values are mapped to separate entries', () => {
    expect(icecreamQuery)
      .toIncludeSameMembers(['icecream:nuts', 'icecream:green']);
  });
  test('disjunctive api values are mapped to single value, united with OR', () => {
    expect(pizzaQuery)
      .toMatch(/^pizza:\(.+ OR .+ OR .+\)$/);
  });
  test('store api getter combines api values', () => {
    const searchApiQuery = store.getters['query/filters/searchApiQuery'];
    expect(searchApiQuery).toMatch(pizzaQuery);
    icecreamQuery.forEach((snippet) => {
      expect(searchApiQuery).toMatch(snippet);
    });
    expect(searchApiQuery.length).toEqual([...icecreamQuery, pizzaQuery].join(' ').length);
  });
});
