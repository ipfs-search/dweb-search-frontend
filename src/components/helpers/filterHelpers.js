import { enterSearchQuery } from '@/helpers/routerHelper';
// eslint-disable-next-line import/no-named-as-default
import filterDefinitions from '@/components/helpers/filterDefinitions';

const changeFilter = (queryParam) => (value) => {
  console.log('change filter:', queryParam, value);
  return enterSearchQuery({ [queryParam]: value });
};

function filterCreator({
  label, queryParam, apiKey, items, multiple,
}) {
  return {
    apiKey,
    queryParam,
    label,
    changeHandler: changeFilter(queryParam),
    items,
    multiple,
  };
}

export default [
  ...filterDefinitions.map((filter) => filterCreator(filter)),
];
