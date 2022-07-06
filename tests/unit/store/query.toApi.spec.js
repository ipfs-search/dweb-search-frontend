import { createStore } from '@/store';
import mockFilters from '../../mock-data';

describe('Mapping filters to api query', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        filters: mockFilters.mockFilterModule,
      },
    });
  });

  test('multiple select api values are mapped to separate entries separated with a space', () => {
    const pizza = store.getters['filters/pizza/toSearchQuery'];
    expect(pizza.split(' '))
      .toIncludeSameMembers(['pizza:mozzerella', 'pizza:tomato', 'pizza:basilicum']);
  });
  test('single select api values are mapped to single value, united with OR', () => {
    const icecreamQuery = store.getters['filters/icecream/toSearchQuery'];
    expect(icecreamQuery)
      .toMatch(/^icecream:\(.+ OR .+ OR .+\)$/);
  });
});
