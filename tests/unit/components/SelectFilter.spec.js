import SelectFilterComponent from '@/components/helpers/SelectFilter';
import { localMount } from '../../jest-helpers';
import { mockFilters } from '../../mock-data';

describe('selectFilter', () => {
  it('renders a select filter', () => {
    const wrapper = localMount(SelectFilterComponent, {
      propsData: {
        filter: mockFilters.icecream.getters.rendered(mockFilters.icecream.state),
      },
    });
    const wrapperHtml = wrapper.html();
    expect(wrapperHtml).toContain(mockFilters.icecream.state.label);
    expect(wrapperHtml).toContain(mockFilters.icecream.state.items[0].label);
  });
});
