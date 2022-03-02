import { computed } from '@vue/composition-api';
import { enterSearchQuery } from '@/helpers/routerHelper';
import store from '@/store';
// eslint-disable-next-line import/no-named-as-default
import filterDefinitions, { extensions } from '@/components/helpers/filterDefinitions';
import { Types } from '@/helpers/typeHelper';

const changeFilter = (queryParam) => (value) => enterSearchQuery({ [queryParam]: value });

/**
 * hacky-choppy function to deal with special cases around filter definitions
 * and filter modifiers based on store values
 * @param label
 * @param queryParam
 * @param apiKey
 * @param items
 * @param multiple
 * @returns {{apiKey, multiple, changeHandler: (function(*): void), queryParam, label, value: string[], items: (*|{length})}}
 */
export function filterCreator({
  label, queryParam, apiKey, items, multiple,
}) {
  // multiple-select filters will choke if they get a string value
  // the store gets a string value if the router sees only 1 entry
  let value = store.state.query.filters[queryParam];
  if (multiple && typeof value === 'string') {
    value = [value];
  }
  // special case for file extensions;
  // could be generalized if more filters are added based on the setting of other filters
  const selectItems = !items.length ? extensions[store.state.query.type] : items;

  return {
    apiKey,
    queryParam,
    label,
    changeHandler: changeFilter(queryParam),
    value,
    items: selectItems,
    multiple,
  };
}

export default computed(() => filterDefinitions
  // the type filter is placed outside of the usual filters.
  .filter(({ queryParam }) => queryParam !== 'type')
  .filter(({ queryParam }) => ([Types.directories, Types.any].includes(store.state.query.type)
    ? (queryParam !== 'extensions') : true))
  .map((filter) => filterCreator(filter)));
