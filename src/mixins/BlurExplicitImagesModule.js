import { computed } from '@vue/composition-api';
import store from '@/store';
import nsfwClassifier from '@/helpers/nsfwClassifier';

export const blurExplicitImages = computed({
  get() {
    return store.state.localStorage.blurExplicitImages;
  },
  set(value) {
    store.commit('localStorage/setBlurExplicitImages', value);
  },
});

export function blurExplicit({ nsfwClassification }) {
  return blurExplicitImages.value && nsfwClassifier.nsfw(nsfwClassification);
}

export default {
  blurExplicit,
  blurExplicitImages,
};
