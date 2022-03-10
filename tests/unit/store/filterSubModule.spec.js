import filterSubModule, { Filter } from '@/store/modules/filterSubModule';

const pizza = new Filter({
  apiKey: 'pizza',
  apiValuesUnion: true,
  options: [
    {
      label: 'Margherita',
      apiValue: ['mozzerella', 'tomato'],
      selected: true,
    },
    {
      label: 'Funghi',
      apiValue: ['mushrooms'],
      selected: true,
    },
  ],
});
const icecream = new Filter({
  apiKey: 'icecream',
  options: [
    {
      label: 'Pistaccio',
      apiValue: ['green', 'nuts'],
      selected: true,
    },
  ],
});

describe('Mapping filters to api parameters', () => {
  it('conjunctive api values are mapped to separate entries', () => {
    const result = filterSubModule.getters.mapFiltersToApi({ icecream });
    expect(result).toStrictEqual(['icecream:green', 'icecream:nuts']);
  });
  it('disjunctive api values are mapped to single value, united with OR', () => {
    const result = filterSubModule.getters.mapFiltersToApi({ pizza });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatch(/^pizza:\(.+ OR .+ OR .+\)$/);
  });
});
