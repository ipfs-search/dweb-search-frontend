import SelectFilterComponent from '@/components/helpers/SelectFilter';
import { SelectFilter, MultipleSelectFilter } from '@/store/modules/query/filterClasses';
import { localShallowMount } from '../../jest-helpers';

const icecream = new SelectFilter({
  apiKey: 'icecream',
  label: 'icecream',
  options: [
    { label: 'Pistaccio', apiValue: ['green', 'nuts'], selected: true },
  ],
});
const pizza = new MultipleSelectFilter({
  label: 'pizza',
  apiKey: 'pizza',
  options: [
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
