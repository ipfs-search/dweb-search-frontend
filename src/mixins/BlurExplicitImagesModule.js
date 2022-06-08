import { computed } from 'vue';
import store from '@/store';
import { mimetypeExemptions, nsfw } from '@/helpers/nsfwClassifier';

export const blurExplicitImages = computed({
  get() {
    return store.state.localStorage.blurExplicitImages;
  },
  set(value) {
    store.commit('localStorage/setBlurExplicitImages', value);
  },
});

export function blurExplicit({ mimetype, nsfwClassification }) {
  if (mimetypeExemptions.includes(mimetype)) return false;
  return blurExplicitImages.value && nsfw(nsfwClassification);
}

export default {
  blurExplicit,
  blurExplicitImages,
};
