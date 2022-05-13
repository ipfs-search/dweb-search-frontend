import {
  multipleSelectFilter,
  selectFilter,
} from '@/store/modules/query/filterGenerators';

const icecream = selectFilter({
  apiKey: 'icecream',
  label: 'icecream',
  selectionOptions: [
    { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
  ],
});

const pizza = multipleSelectFilter({
  label: 'pizza',
  apiKey: 'pizza',
  selectionOptions: [
    { label: 'Margherita', apiValue: ['mozzerella', 'tomato'], selected: true },
    { label: 'Funghi', apiValue: ['mushrooms'], selected: true },
  ],
});

export default {
  icecream,
  pizza,
};
