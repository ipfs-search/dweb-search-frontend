import { enterSearchQuery } from '@/helpers/routerHelper';
import store from '@/store';
// eslint-disable-next-line import/no-named-as-default
import filterDefinitions from '@/components/helpers/filterDefinitions';

const changeFilter = (queryParam) => (value) => enterSearchQuery({ [queryParam]: value });

export function filterCreator({
  label, queryParam, apiKey, items, multiple,
}) {
  // multiple select filters will choke if they get a string value
  let value = store.state.query.filters[queryParam];
  if (multiple && typeof value === 'string') {
    value = [value];
  }
  return {
    apiKey,
    queryParam,
    label,
    changeHandler: changeFilter(queryParam),
    value,
    items,
    multiple,
  };
}

export default [
  ...filterDefinitions
    // the type filter is placed outside of the usual filters.
    .filter(({ queryParam }) => queryParam !== 'type')
    .map((filter) => filterCreator(filter)),
];
