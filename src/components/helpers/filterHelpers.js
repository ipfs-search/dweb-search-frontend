import { enterSearchQuery } from '@/helpers/routerHelper';
import store from '@/store';
// eslint-disable-next-line import/no-named-as-default
import filterDefinitions from '@/components/helpers/filterDefinitions';

const changeFilter = (queryParam) => (value) => enterSearchQuery({ [queryParam]: value });

function filterCreator({
  label, queryParam, apiKey, items, multiple,
}) {
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
  ...filterDefinitions.map((filter) => filterCreator(filter)),
];
