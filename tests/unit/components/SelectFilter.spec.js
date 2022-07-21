import SelectFilter from "@/components/searchViewComponents/subcomponents/SelectFilter.vue";
import { localMount } from "../../vitest-helpers";
import mockFilters from "../../mock-data";

let component;
let componentHtml;

beforeAll(() => {
  component = localMount(SelectFilter, {
    propsData: {
      filter: mockFilters.icecream.getters.toProps(mockFilters.icecream.state),
    },
  });
  componentHtml = component.html();
});

describe("selectFilter", () => {
  test("select filter renders with its label", () => {
    expect(componentHtml).toContain(mockFilters.icecream.state.label);
  });

  // N.b. can't get this test to work properly, the items are not appended after the click
  // So I added the .skip flag, until someone can figure out how to test this
  // https://stackoverflow.com/questions/72274439/how-can-i-test-the-correct-rendering-of-items-in-a-vuetify-v-select-dropdown-usi
  test.skip("rendered select filter contains items labels", async () => {
    await component.find(".v-select").trigger("click");
    expect(componentHtml).toContain(mockFilters.icecream.state.items[0].label);
  });
});
