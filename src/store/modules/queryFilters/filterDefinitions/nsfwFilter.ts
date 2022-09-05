import { filterDefinition } from "./filterDefinitionInterface";
import { nsfwThresholds } from "@/helpers/constants/nsfwThresholds";

const adultOnly = (comparator: string, join = " ") =>
  Object.entries(nsfwThresholds)
    // FIXME: the ipfs-search index has a typo in nsfw.
    .map(([param, val]) => `nfsw.classification.${param}:${comparator}${val}`)
    .join(join);

export const nsfwFilterDefinition: filterDefinition = {
  label: "Adult content",
  slug: "nsfw",
  apiKey: "",
  items: [
    {
      title: "Suitable for work",
      value: "suitable",
      apiValue: adultOnly("<"),
      default: true,
    },
    {
      title: "Adult content only",
      value: "adult",
      apiValue: `(${adultOnly(">=", " OR ")})`,
    },
    {
      title: "All content",
      value: "all",
      apiValue: "",
    },
  ],
};
