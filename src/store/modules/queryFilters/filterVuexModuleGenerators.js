//
// This file exports a number of generator functions to create vuex modules, to serve as filters.
// Filters are created by sending a state object (such as from filterDefinitions.js) and the
// appropriate mutations and getters
//
// There a number of standard mutation/getter methods defined for standard filters
//
// The filterModule function explains the shape of the module:
import { Types } from '@/helpers/typeHelper';

/**
 * @param state: holds label, slug, api-key and items for the filter. All of this is stateful.
 * @param setValue: set/select the value of the filter
 * @param toProps: transform the state to component props
 * @param toSearchQuery: transform the state to a chunk of API input for the search
 * @returns {{mutations: {setValue}, state, getters: {toProps, toSearchQuery}}}
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
 * Mutation (setter) for selecting a value in the select filter.
 * Does NOT discriminate between existing and non-existing values.
 * If no selection is given (selection === undefined) it falls back to default value for filter.
 * @param state
 * @param selection
 */
const selectFilterValue = (state, selection) => {
  state.value = selection
    ?? defaultValue(state.items);
};

/**
 * Mutation (setter) for the selection of zero or more items in the multiple select filter.
 * Does NOT discriminate between existing and non-existing values.
 * If no selection is given (selection === undefined) it falls back to default value for filter.
 * @param state
 * @param selection
 */
const selectMultipleFilterValues = (state, selection) => {
  // coerce the selection to an array, otherwise the multiple select bugs on a single entry
  selectFilterValue(state, selection && [selection].flat());
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
 * @returns {{
 * apiKey: *,
 * label: (string), *
 * slug: (string), *
 * value: (string), *
 * items: {text: (string), value: (string), apiValue: (string | string[]), default: (boolean)}[] }}
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

/**
 * Single select filter vuex module generator
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toProps, toSearchQuery}}}
 */
export const selectFilterModule = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    toProps,
    toSearchQuery: selectFilterToSearchApi,
  },
});

/**
 * Multiple select filter vuex module generator
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toProps, toSearchQuery}}}
 */
export const multipleSelectFilterModule = (filterProperties) => filterModule({
  state: {
    ...mapDefinitionToState(filterProperties),
    multiple: true,
  },
  mutations: {
    setValue: selectMultipleFilterValues,
  },
  getters: {
    toProps,
    toSearchQuery: multipleSelectFilterToSearchApi,
  },
});

/**
 * The typefilter acts as a single select component, but to transform to search API, the
 * multiple-select transformer is used, with a parameter of which type. This exception is
 * necessary for requesting multiple filetypes at once (as is the case with the 'any' option)
 * @param filterProperties
 * @returns {{mutations: {setValue}, state, getters: {toProps, toSearchQuery}}}
 */
export const typeFilterModule = (filterProperties) => filterModule({
  state: mapDefinitionToState(filterProperties),
  mutations: {
    setValue: selectFilterValue,
  },
  getters: {
    // for the transformation of the type filter to the search api, we need to know the requested
    // type, because the 'any' type requires each of the available types to be searched.
    toSearchQuery: (state) => (fileType) => (state.value === Types.other && 'NOT ')
      + multipleSelectFilterToSearchApi({ ...state, value: fileType }),
    toProps: ({
      label, slug, items, value, multiple,
    }) => ({
      // coerce value to primitive value (in case it is an array)
      label, slug, items, multiple, value: Array.isArray(value) ? value[0] : value,
    }),
  },
});
