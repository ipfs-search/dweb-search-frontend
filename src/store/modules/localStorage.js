/**
 * leverage the store to make reactive, type casted localStorage fields
 */

const fields = [
  {
    field: "blurExplicitImages",
    defaultValue: true,
  },
  {
    // TODO: refactor darkmode
    field: "darkMode",
    defaultValue: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  {
    field: "playlist",
    defaultValue: undefined,
  },
];

const pascalize = (s) => s[0].toUpperCase() + s.slice(1);

export default {
  namespaced: true,
  state: Object.fromEntries(
    fields.map(({ field, defaultValue }) => {
      try {
        return [field, JSON.parse(localStorage[field] ?? null) ?? defaultValue];
      } catch (error) {
        console.error("wrong value in localStorage", error);
        localStorage[field] = defaultValue;
        return [field, defaultValue];
      }
    })
  ),
  mutations: Object.fromEntries(
    fields.map(({ field }) => [
      `set${pascalize(field)}`,
      (state, value) => {
        state[field] = value;
        localStorage[field] = JSON.stringify(value);
      },
    ])
  ),
};
