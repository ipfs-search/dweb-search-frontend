/**
 * function to enforce an object to have a specific vuex module shape
 * @param state: holds label, slug, api-key and items for the filter. All of this is stateful.
 * @param setValue: set/select the value of the filter
 * @param toComponentProps: transform to component props
 * @param toSearchApi: transform to a chunk of API input for the search
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
function filterModule({ state, mutations: { setValue }, getters: { toProps, toSearchApi } }) {
  return {
    namespaced: true, state, mutations: { setValue }, getters: { toProps, toSearchApi },
  };
}

/**
 * mutation (setter) for the selection of an item in the (multiple) select filter
 * @param state
 * @param selection
 */
const selectFilterValue = (state, selection) => {
  state.value = selection;
};

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
const mapDefinitionToState = ({
  label, slug, apiKey, items,
}) => ({
  label: label ?? slug,
  slug: slug ?? label,
  apiKey,
  items: items?.map((item) => ({
    text: item.text ?? item.value,
    value: item.value ?? item.text,
    apiValue: item.apiValue,
    default: item.default,
  })),
  value: items.filter((item) => item.default).map((item) => item.value ?? item.text),
});

/**
 * toProps getter, used to transform the state into props for the filter component
 * @param { ...state }
 * @returns {{multiple, label, items, value, slug}}
 */
const toProps = ({
  label, slug, items, value, multiple,
}) => ({
  label, slug, items, value, multiple,
});

export const selectFilter = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    toProps,
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
    toProps,
    toSearchApi: multipleSelectFilterToSearchApi,
  },
});

/**
 * The typefilter works as a normal select filter, but to transform to search API, the
 * multiple-select transformer is used. Coincidentally this works for the way its values are defined.
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchApi}}}
 */
export const typeFilter = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    toSearchApi: multipleSelectFilterToSearchApi,
    toProps,
  },
});
