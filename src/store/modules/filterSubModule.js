// eslint-disable-next-line import/no-named-as-default,max-classes-per-file
import filterDefinitions, { extensions } from '@/components/helpers/filterDefinitions';

class FilterOption {
  constructor(option) {
    Object.assign(this, option);
  }

  label

  slug

  apiValue

  default

  selected

  get text() {
    return this.label;
  }

  get value() {
    return this.slug ?? this.label;
  }
}

class Filter {
  constructor({ items, ...filter }) {
    Object.assign(this, filter);
    this.items = Array.isArray(items)
      ? items.map((filterOption) => new FilterOption(filterOption))
      : Object.keys(items).reduce((p, type) => ({
        ...p,
        [type]: items[type].map((filterOption) => new FilterOption(filterOption)),
      }), {});
    // eslint-disable-next-line no-use-before-define
  }

  label

  slug

  apiKey

  multiple

  // TODO: these methods should probably be turned into getters and mutations
  get options() {
    return Array.isArray(this.items)
      ? this.items
      // eslint-disable-next-line no-use-before-define
      : this.items[filterState.type.selectedSlug];
  }

  /**
   * select one or more options. Expects query parameters object
   * @param { ...queryParameters }
   */
  select({ [this.slug]: selection }) {
    this.options?.forEach((option) => {
      // eslint-disable-next-line no-param-reassign
      option.selected = Array.isArray(selection)
        ? selection.includes(option.slug)
        : selection === option.slug;
    });
  }

  get selectedOptions() {
    return this.options?.filter((option) => option.selected);
  }

  get selectedOption() {
    if (this.multiple) throw Error(`Can't return single value for multiple select: ${this.label}`);
    return this.options?.find((option) => option.selected);
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
 * @returns {unknown[]}
 */
function mapFiltersToApi(filters) {
  const apiValueFormatter = (x) => (x.includes('*') ? x : `"${x}"`);
  return Object.values(filters).map((filter) => {
    // get array of api values for the selected item(s)
    const apiValues = filter.selectedOptions?.flatMap(({ apiValue }) => apiValue || []);
    if (!apiValues?.length) return [];
    // if union is selected, the values are joined by the 'OR' operator
    return filter.apiValuesUnion
      ? [`${filter.apiKey}:(${apiValues.map(apiValueFormatter).join(' OR ')})`]
      : apiValues.map((apiEntry) => `${filter.apiKey}:${apiEntry}`);
  });
}

const filterState = filterDefinitions.reduce((p, definition) => ({
  ...p,
  [definition.slug]: new Filter(definition),
}), {});

export default {
  namespaced: true,
  state: filterState,
  getters: {
    uiFilters: (state) => filterDefinitions
      // the type filter is placed in another component than the other filters.
      .filter(({ slug }) => slug !== 'type')
      // exclude file extension filter when type is 'directories' or 'any'
      .filter(({ slug }) => (!Object.keys(extensions)
        .includes(state.type.items?.find((s) => s.selected)?.slug)
        ? (slug !== 'extensions') : true))
      .map(({ slug }) => state[slug]),
    typeFilter: () => filterDefinitions
      // the type filter is placed outside of the usual filters.
      .filter(({ slug }) => slug === 'type'),
    mapFiltersToApi,
  },
};
