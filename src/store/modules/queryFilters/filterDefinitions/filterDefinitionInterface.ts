export interface filterDefinition {
  label: string;
  slug: string;
  apiKey: string;
  items: {
    title: string;
    value?: string;
    default?: boolean;
    apiValue: string | string[] | undefined;
  }[];
}
