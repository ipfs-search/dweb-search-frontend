import SelectFilterComponent from '@/components/helpers/SelectFilter';
import {
  selectFilterGenerator, multipleSelectFilterGenerator
} from '@/store/modules/query/filterGenerators';
import { localShallowMount } from '../../jest-helpers';

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

describe('selectFilter', () => {
  it('renders a select filter', () => {
    const wrapper = localShallowMount(SelectFilterComponent, {
      propsData: {
        filter: icecream,
      }
    })
    const wrapperHtml = wrapper.html();
    expect(wrapperHtml).toContain(icecream.label);
    expect(wrapperHtml).toContain(icecream.options[0].label);
  });
});
