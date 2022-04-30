import {
  multipleSelectFilterGenerator,
  selectFilterGenerator
} from '@/store/modules/query/filterGenerators';

const icecream = selectFilterGenerator({
  apiKey: 'icecream',
  label: 'icecream',
  selectionOptions: [
    { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
  ],
});

const pizza = multipleSelectFilterGenerator({
  label: 'pizza',
  apiKey: 'pizza',
  selectionOptions: [
    { label: 'Margherita', apiValue: ['mozzerella', 'tomato'], selected: true },
    { label: 'Funghi', apiValue: ['mushrooms'], selected: true },
  ],
});

export const mockFilters = {
  icecream,
  pizza,
};
