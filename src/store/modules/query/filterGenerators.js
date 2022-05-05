// eslint-disable-next-line max-classes-per-file
const filterFactory = (state, { setValue }, { rendered, toSearchApi }) => ({
  namespaced: true,
  state,
  mutations: {
    setValue,
  },
  getters: {
    rendered,
    toSearchApi,
  },
});

const selectFilterSetValue = (state, selection) => {
  const selected = [selection]
    .flat() // coerce to array
    .filter((selectedSlug) => state.items.map(({ slug }) => slug).includes(selectedSlug));
  state.items.forEach((item, index) => {
    // If nothing is selected, select the default value
    if (selected.length) {
      state.items[index].selected = (selected.includes(item.slug));
    } else {
      state.items[index].selected = (item.default === true);
    }
  });
};

const selectFilterRendered = ({ items, label }) => ({
  // todo: look into if these properties can be renamed at definition
  items: items.map((item) => ({ text: item.label, value: item.slug })),
  label,
  value: items.find((item) => item.selected)?.slug,
});

const multipleSelectFilterRendered = ({ items, label }) => ({
  ...selectFilterRendered({ items, label }),
  value: items.filter((item) => item.selected)
    .map((item) => item.slug),
});

const selectFilterToSearchApi = (state) => {
  // get array of api values for the selected item(s)
  const apiValue = state.items
    .find((item) => item.selected);
  return [`${state.apiKey}:${apiValue}`];
};

const multipleSelectFilterToSearchApi = (state) => {
  const apiValueFormatter = (x) => (x.includes('*') ? x : `"${x}"`);
  // get array of api values for the selected item(s)
  const apiValues = state.items
    .filter((item) => item.selected)
    .map(({ apiValue }) => apiValue);
  if (!apiValues.length) return '';
  return `${state.apiKey}:(${apiValues.map(apiValueFormatter).join(' OR ')})`;
};

const selectFilterMapState = (filterProperties) => ({
  label: filterProperties.label,
  slug: filterProperties.slug ?? filterProperties.label,
  apiKey: filterProperties.apiKey,
  items: filterProperties.selectionOptions?.map((item) => ({
    label: item.label,
    slug: item.slug || item.label,
    apiValue: item.apiValue,
    default: item.default,
    selected: item.default,
  })),
});

export const selectFilterGenerator = (filterProperties) => filterFactory(
  selectFilterMapState(filterProperties),
  // mutations:
  {
    setValue: selectFilterSetValue,
  },
  // getters:
  {
    rendered: selectFilterRendered,
    toSearchApi: selectFilterToSearchApi,
  },
);

export const multipleSelectFilterGenerator = (filterProperties) => {
  const filter = selectFilterGenerator(filterProperties);

  filter.state.multiple = true;
  filter.getters.rendered = multipleSelectFilterRendered;
  filter.getters.toSearchApi = multipleSelectFilterToSearchApi;

  return filter;
};

export const typeFilterGenerator = (filterProperties) => {
  const filter = selectFilterGenerator(filterProperties);

  filter.getters.toSearchApi = multipleSelectFilterToSearchApi;

  return filter;
};

export default {
  selectFilterGenerator,
  multipleSelectFilterGenerator,
  typeFilterGenerator,
};
