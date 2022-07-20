import store from "@/store";
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import { Types } from "@/helpers/typeHelper";
import { localMount } from "../../vitest-helpers";

describe("SearchBar", () => {
  it("renders a filetype select filter", async () => {
    const wrapper = localMount(SearchBar, { store });
    const typeValue = wrapper.get('[data-testid="type-filter-selector-value"]');
    expect(typeValue.text().toLowerCase()).toBe(Types.any);

    store.commit("query/filters/type/setValue", Types.text);
    await wrapper.trigger("change"); // wait for the store value to propagate in the component
    expect(typeValue.text().toLowerCase()).toBe(Types.text);
  });
});
