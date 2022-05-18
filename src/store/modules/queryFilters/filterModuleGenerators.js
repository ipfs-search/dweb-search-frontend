/**
 * function to enforce an object to have a specific vuex module shape
 * @param state: holds label, slug, api-key and items for the filter. All of this is stateful.
 * @param setValue: set/select the value of the filter
 * @param toComponentProps: transform to component props
 * @param toSearchQuery: transform to a chunk of API input for the search
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchQuery}}}
 */
function filterModule({ state, mutations: { setValue }, getters: { toProps, toSearchQuery } }) {
  return {
    namespaced: true, state, mutations: { setValue }, getters: { toProps, toSearchQuery },
  };
}

const defaultValue = (items) => items
  .filter((item) => item.default)
  .map((item) => item.value ?? item.text);

/**
 * Mutation (setter) for the selection of one or more items in the (multiple) select filter.
 * Does not discriminate between existing and non-existing values.
 * If no selection is given (selection === undefined) it falls back to default value for filter.
 * @param state
 * @param selection
 */
const selectFilterValue = (state, selection) => {
  state.value = selection
    ?? defaultValue(state.items);
};

const selectFilterToSearchApi = (state) => {
  const value = Array.isArray(state.value) ? state.value[0] : state.value;
  const { apiValue } = state.items.find((item) => item.value === value);
  if (Array.isArray(apiValue)) {
    return apiValue.map((entry) => `${state.apiKey}:${entry}`).join(' ');
  }
  return `${state.apiKey}:${apiValue}`;
};

const multipleSelectFilterToSearchApi = (state) => {
  const apiValueFormatter = (x) => (x.includes('*') ? x : `"${x}"`);
  const value = [state.value].flat(); // coerces the value to an array type
  // get array of api values for the selected item(s)
  const apiValues = state.items
    .filter((item) => value.includes(item.value))
    .flatMap(({ apiValue }) => apiValue);
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
  value: defaultValue(items),
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
    toSearchQuery: selectFilterToSearchApi,
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
    toSearchQuery: multipleSelectFilterToSearchApi,
  },
});

/**
 * The typefilter works as a normal select filter, but to transform to search API, the
 * multiple-select transformer is used. Coincidentally this works for the way its values are defined.
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toComponentProps, toSearchQuery}}}
 */
export const typeFilter = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    // for the transformation of the type filter to the search api, we need to know the requested
    // type, because the 'any' type requires each of the available types to be searched.
    toSearchQuery: (state) => (fileType) => multipleSelectFilterToSearchApi({
      ...state,
      value: fileType,
    }),
    toProps,
  },
});
