// eslint-disable-next-line max-classes-per-file
class BaseFilter {
  constructor(properties) {
    Object.assign(this, {
      label: properties.label,
      slug: properties.slug ?? properties.label,
      apiKey: properties.apiKey,
    });
  }
}

class SelectFilterOption {
  constructor(properties) {
    Object.assign(this, {
      label: properties.label,
      slug: properties.slug ?? properties.label,
      apiValue: properties.apiValue,
      default: properties.default ?? false,
      selected: properties.selected ?? false,
    });
  }

  select(selected) {
    this.selected = Boolean(selected);
  }

  // v-select looks at the 'text' and the 'value' fields of the items
  get text() {
    return this.label;
  }

  get value() {
    return this.slug;
  }

  /**
   * for convenience of using the constructor in an array.map function
   * @param option
   * @returns {SelectFilterOption}
   */
  static generate(option) {
    return new SelectFilterOption(option);
  }
}

export class SelectFilter extends BaseFilter {
  constructor({ options, ...filterProperties }) {
    super(filterProperties);
    this.options = Array.isArray(options) && options.map(SelectFilterOption.generate);
  }

  component = 'SelectFilter'

  /**
   * @returns {*[]}
   */
  get items() {
    return this.options;
  }

  /**
   * select one or more options.
   * @param selection string|string[]
   */
  select(selection) {
    const selected = [selection].flat(); // coerce to array
    this.items.forEach((option) => {
      option.select(selection ? selected.includes(option.slug) : option.default);
    });
    return this;
  }

  get selectedOptions() {
    return this.items.filter((option) => option.selected);
  }

  get value() {
    return this.selectedOptions.map((option) => option.slug);
  }

  get searchApiQuerySnippet() {
    // get array of api values for the selected item(s)
    const apiValues = this.selectedOptions?.flatMap(({ apiValue }) => apiValue || []);
    return apiValues.map((apiValue) => `${this.apiKey}:${apiValue}`);
  }
}

export class MultipleSelectFilter extends SelectFilter {
  get searchApiQuerySnippet() {
    const apiValueFormatter = (x) => (x.includes('*') ? x : `"${x}"`);
    // get array of api values for the selected item(s)
    const apiValues = this.selectedOptions?.flatMap(({ apiValue }) => apiValue || []);
    if (!apiValues.length) return '';
    return `${this.apiKey}:(${apiValues.map(apiValueFormatter).join(' OR ')})`;
  }

  multiple = true
}

export default {
  SelectFilter,
  MultipleSelectFilter,
};
