import { getNames } from "@cospired/i18n-iso-languages";
import { filterDefinition } from "./filterDefinitionInterface";

const languageOptions = Object.entries(getNames("en"))
  .map(([alpha2, name]) => ({
    title: name,
    value: alpha2,
    apiValue: alpha2,
  }))
  .sort((a, b) => (a.title < b.title ? 1 : -1)); // alphabetize

export const languageFilterDefinition: filterDefinition = {
  label: "Language",
  slug: "language",
  apiKey: "language.language",
  items: [
    {
      title: "Any",
      apiValue: undefined,
      default: true,
    },
    ...languageOptions,
  ],
};
