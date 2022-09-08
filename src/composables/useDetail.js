import { computed } from "vue";
import getResourceURL from "@/helpers/resourceURL";

export const detailProps = {
  file: {
    type: Object,
    required: true,
  },
};

export function useDetail(props) {
  const resourceURL = computed(() => getResourceURL(props.file.hash));

  const videoOptions = computed(() => ({
    controls: true,
    sources: [
      {
        src: resourceURL.value,
        type: props.file.mimetype,
      },
    ],
    fluid: true,
  }));

  return { resourceURL, videoOptions };
}
