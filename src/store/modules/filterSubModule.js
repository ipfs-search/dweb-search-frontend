// eslint-disable-next-line max-classes-per-file
import filterDefinitions from '@/components/helpers/filterDefinitions';

class FilterOption {
  constructor(option) {
    Object.assign(this, option);
  }

  label

  slug

  apiValue

  default = false

  selected = false

  select(selected) {
    this.selected = Boolean(selected);
  }

  // v-select looks at the 'text' and the 'value' fields of the items
  get text() {
    return this.label;
  }

  get value() {
    return this.slug ?? this.label;
  }

  /**
   * for convenience of using the constructor in an array.map function
   * @param option
   * @returns {FilterOption}
   */
  static generate(option) {
    return new FilterOption(option);
  }
}

class Filter {
  constructor({ options, ...filterProperties }) {
    Object.assign(this, filterProperties);
    this.items = Array.isArray(options)
      ? options.map(FilterOption.generate)
      // reduce serves (here) as a map function for objects
      : Object.entries(options).reduce((p, [selector, optionValues]) => (
        { [selector]: optionValues.map(FilterOption.generate), ...p }), {});
  }

  label

  slug

  apiKey

  apiValuesUnion = false

  multiple = false

  items = []

  /**
   * @returns {*[]}
   */
  get options() {
    return Array.isArray(this.items)
      ? this.items
      // eslint-disable-next-line no-use-before-define
      : this.items[filterState.type?.selectedSlug] || [];
  }

  /**
   * select one or more options.
   * @param selection string|string[]
   */
  select(selection) {
    const selected = [selection].flat(); // coerce to array
    this.options.forEach((option) => {
      option.select(selection ? selected.includes(option.slug) : option.default);
    });
  }

  get selectedOptions() {
    return this.options.filter((option) => option.selected);
  }

  get selectedOption() {
    if (this.multiple) throw Error(`Can't return single value for multiple select: ${this.label}`);
    return this.options.find((option) => option.selected);
  }

  get selectedSlug() {
    return this.selectedOption?.slug;
  }

  get value() {
    return this.multiple
      ? this.selectedOptions.map((option) => option.slug)
      : this.selectedSlug;
  }
}

/**
 * get array of API query entries for all filters
 * @param filterState
 * @returns string[]
 */
function mapFiltersToApi(filters) {
  const apiValueFormatter = (x) => (x.includes('*') ? x : `"${x}"`);
  return Object.values(filters).map((filter) => {
    // get array of api values for the selected item(s)
    const apiValues = filter.selectedOptions?.flatMap(({ apiValue }) => apiValue || []);
    if (!apiValues?.length) return [];
    return filter.apiValuesUnion
      // if apiValuesUnion is selected, the values are joined by the 'OR' operator
      ? [`${filter.apiKey}:(${apiValues.map(apiValueFormatter).join(' OR ')})`]
      : apiValues.map((apiValue) => `${filter.apiKey}:${apiValue}`);
  });
}

const filterState = filterDefinitions.reduce((p, definition) => (
  { [definition.slug]: new Filter(definition), ...p }), {});

export default {
  namespaced: true,
  state: filterState,
  getters: {
    uiFilters: (state) => filterDefinitions.map(({ slug }) => state[slug])
      // the type filter is placed in another component than the other filters.
      .filter(({ slug }) => slug !== 'type')
      // exclude filters that don't have any options
      // such as file extension filter when 'type'-filter is 'any' or 'directories'
      .filter(({ options }) => options.length),
    typeFilter: (state) => state.type,
    mapFiltersToApi,
  },
};
