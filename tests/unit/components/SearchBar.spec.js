import store from '@/store';
import SearchBar from '@/components/SearchBar';
import { Types } from '@/helpers/typeHelper';
import { localMount } from '../../jest-helpers';

describe('SearchBar', () => {
  it('renders a select filter', () => {
    const wrapper = localMount(SearchBar, { store });
    const typeValue = wrapper.get('[data-testid="type-filter-selector-value"]')
    expect(typeValue.text().toLowerCase()).toBe(Types.any);
  });
});
