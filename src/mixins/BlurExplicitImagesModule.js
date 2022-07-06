// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import { computed } from '@vue/composition-api';
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
