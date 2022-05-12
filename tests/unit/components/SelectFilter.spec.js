import SelectFilterComponent from '@/components/helpers/SelectFilter';
import { localMount } from '../../jest-helpers';
import mockFilters from '../../mock-data';

let component;
let componentHtml;

beforeAll(() => {
  component = localMount(SelectFilterComponent, {
    propsData: {
      filter: mockFilters.icecream.getters.rendered(mockFilters.icecream.state),
    },
  });
  componentHtml = component.html();
});

describe('selectFilter', () => {
  test('select filter renders with its label', () => {
    expect(componentHtml)
      .toContain(mockFilters.icecream.state.label);
  });

  test('rendered select filter contains items labels', () => {
    console.log('before', component.html());
    component.find('.v-input__slot').trigger('click');
    console.log('after', component.html());
    expect(componentHtml).toContain(mockFilters.icecream.state.items[0].label);
  });
});
