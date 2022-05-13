/**
 * function to enforce an object to have a specific vuex module shape
 * @param state: holds label, slug, api-key and items for the filter. All of this is stateful.
 * @param setValue: set/select the value of the filter
 * @param toComponentProps: transform to component props
 * @param toSearchApi: transform to a chunk of API input for the search
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
function filterModule({ state, mutations: { setValue }, getters: { toComponentProps, toSearchApi } }) {
  return {
    namespaced: true, state, mutations: { setValue }, getters: { toComponentProps, toSearchApi },
  };
}

/**
 * mutation (setter) for the selection of an item in the (multiple) select filter
 * @param state
 * @param selection
 */
const selectFilterValue = (state, selection) => {
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

const selectFilterToComponentProps = ({ items, label }) => ({
  // items: items.map((item) => ({ text: item.label, value: item.slug })),
  items,
  label,
  value: items.find((item) => item.selected)?.value,
});

const multipleSelectFilterToComponentProps = ({ items, label }) => ({
  items,
  label,
  value: items
    .filter((item) => item.selected)
    .map((item) => item.value),
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

/**
 * map (multiple) select filter definition to state; some defaults need to be set.
 * @param filterProperties
 * @returns {{apiKey: *, label: (string|*), items: unknown[] | undefined, slug: (string|*)}}
 */
const mapDefinitionToState = (filterProperties) => ({
  label: filterProperties.label ?? filterProperties.slug,
  slug: filterProperties.slug,
  apiKey: filterProperties.apiKey,
  items: filterProperties.selectionOptions?.map((item) => ({
    text: item.text ?? item.value,
    value: item.value,
    apiValue: item.apiValue,
    default: item.default,
    selected: item.default, // the default is selected on creation time of the module
  })),
});

export const selectFilter = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    toComponentProps: selectFilterToComponentProps,
    toSearchApi: selectFilterToSearchApi,
  },
});

export const multipleSelectFilter = (filterProperties) => filterModule({
  state: {
    ...mapDefinitionToState(filterProperties),
    multiple: true,
  },
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    toComponentProps: multipleSelectFilterToComponentProps,
    toSearchApi: multipleSelectFilterToSearchApi,
  },
});

/**
 * The typefilter works as a normal select filter, but to transform to search API, the
 * multiple-select transformer is used. Coincidentally this works for the way its values are defined.
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
export const typeFilter = (filterProperties) => {
  const filter = selectFilter(filterProperties);
  return filterModule({
    ...filter,
    getters: {
      ...filter.getters,
      toSearchApi: multipleSelectFilterToSearchApi,
    },
  });
};
