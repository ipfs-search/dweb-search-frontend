import { computed } from "vue";
import store from "@/store";
import { mimetypeExemptions, nsfw } from "@/helpers/nsfwClassifier";
import "@/scss/blurExplicitImages.scss";

export const useBlurExplicit = () => ({
  blurExplicitImages: computed({
    get() {
      return store.state.localStorage.blurExplicitImages;
    },
    set(value) {
      store.commit("localStorage/setBlurExplicitImages", value);
    },
  }),

  blurExplicit: ({ mimetype, nsfwClassification }) => {
    if (mimetypeExemptions.includes(mimetype)) return false;
    return store.state.localStorage.blurExplicitImages && nsfw(nsfwClassification);
  },
});
