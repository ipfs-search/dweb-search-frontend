import { filterDefinition } from "./filterDefinitionInterface";

export const lastSeenFilterDefinition: filterDefinition = {
  label: "Last seen",
  slug: "last_seen",
  apiKey: "last-seen",
  items: [
    {
      title: "<24hr",
      apiValue: "[ now-24h/h TO *]",
    },
    {
      title: "<7d",
      apiValue: "[ now/h-7d TO *]",
    },
    {
      title: "<30d",
      apiValue: "[ now/d-30d TO *]",
      default: true,
    },
    {
      title: "Any",
      apiValue: "*",
    },
  ],
};
