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
import filterSubModule, { Filter } from '@/store/modules/query/filterSubModule';
import { Types } from '@/helpers/typeHelper';

const { mapFiltersToApi } = filterSubModule.getters;

const pizza = new Filter({
  apiKey: 'pizza',
  apiValuesUnion: true,
  options: [
    { label: 'Margherita', apiValue: ['mozzerella', 'tomato'], selected: true },
    { label: 'Funghi', apiValue: ['mushrooms'], selected: true },
  ],
});
const icecream = new Filter({
  apiKey: 'icecream',
  slug: 'icecream',
  options: [
    { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
  ],
});
const type = new Filter({
  apiKey: 'filetype',
  slug: 'type',
  options: [
    { label: Types.text, slug: Types.text, apiValue: 'pdf' },
    { label: Types.images, slug: Types.images, apiValue: 'jpeg' },
  ],
});

describe('Mapping filters to api parameters', () => {
  it('conjunctive api values are mapped to separate entries', () => {
    const result = (mapFiltersToApi({ icecream, type }))();
    expect(result).toStrictEqual(['icecream:green', 'icecream:nuts']);
  });
  it('disjunctive api values are mapped to single value, united with OR', () => {
    const result = (mapFiltersToApi({ pizza, type }))();
    expect(result).toHaveLength(1);
    expect(result[0]).toMatch(/^pizza:\(.+ OR .+ OR .+\)$/);
  });
  it('coerces filetype explicitly', () => {
    const result = (mapFiltersToApi({ pizza, type }))(Types.text);
    expect(result).toHaveLength(2);
    expect(result).toContain('filetype:pdf');
  });
});
