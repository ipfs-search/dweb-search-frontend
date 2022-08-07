import { filterDefinition } from "./filterDefinitionInterface";

export const sizeFilterDefinition: filterDefinition = {
  label: "Size",
  slug: "size",
  apiKey: "size",
  items: [
    {
      title: "0-10mb",
      apiValue: ["<=10485760"],
    },
    {
      title: "10-100mb",
      apiValue: [">10485760", "<=104857600"],
    },
    {
      title: "100mb-1gb",
      apiValue: [">104857600", "<=1073741824"],
    },
    {
      title: "1gb+",
      value: ">1gb",
      apiValue: [">1073741824"],
    },
    {
      title: "Any",
      apiValue: [],
      default: true,
    },
  ],
};
