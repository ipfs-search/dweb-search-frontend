import { filterDefinition } from "./filterDefinitionInterface";
import { nsfwThresholds } from "@/helpers/constants/nsfwThresholds";

export const nsfwFilterDefinition: filterDefinition = {
  label: "NSFW filter",
  slug: "nsfw",
  apiKey: "",
  items: [
    {
      title: "Children friendly",
      value: "children",
      apiValue: Object.entries({ porn: 0.15 })
        .map(([param, val]) => `nsfw.classification.${param}:<${val}`)
        .join(" AND "),
      default: true,
    },
    {
      title: "Adult content only",
      value: "adult",
      apiValue: Object.entries(nsfwThresholds)
        .map(([param, val]) => `nsfw.classification.${param}:>=${val}`)
        .join(" "),
    },
    {
      title: "All content",
      value: "all",
      apiValue: "",
    },
  ],
};
