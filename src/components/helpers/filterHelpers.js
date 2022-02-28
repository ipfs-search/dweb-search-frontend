import { enterSearchQuery } from '@/helpers/routerHelper';
// eslint-disable-next-line import/no-named-as-default
import filters from '@/components/helpers/filters';

const changeFilter = (queryParam) => (value) => enterSearchQuery({ [queryParam]: value });

function filterCreator({
  label, handle, items,
}) {
  return {
    handle,
    label,
    changeHandler: changeFilter(handle),
    items,
  };
}

export default [
  ...filters.map((filter) => filterCreator(filter)),
];
