import { filterDefinition } from "./filterDefinitionInterface";
import { nsfwThresholds } from "@/helpers/constants/nsfwThresholds";

const adultOnly = (comparator: string) =>
  Object.entries(nsfwThresholds)
    .map(([param, val]) => `nfsw.classification.${param}:${comparator}${val}`)
    .join(" OR ");

export const nsfwFilterDefinition: filterDefinition = {
  label: "NSFW filter",
  slug: "nsfw",
  apiKey: "",
  items: [
    {
      title: "Children friendly",
      value: "children",
      apiValue: adultOnly("<"),
      default: true,
    },
    {
      title: "Adult content only",
      value: "adult",
      apiValue: adultOnly(">="),
    },
    {
      title: "All content",
      value: "all",
      apiValue: "",
    },
  ],
};
