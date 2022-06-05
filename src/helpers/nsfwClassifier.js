import { nsfwThresholds } from '@/helpers/constants/nsfwThresholds';

export const mimetypeExemptions = ['image/svg+xml'];

// for a local setup, typically use: http://localhost:8080/classify
const nsfwApiEndpoint = import.meta.env.VITE_NSFW_API || 'https://api.ipfs-search.com/v1/nsfw/classify/';

export function classify({ hash, mimetype }) {
  if (mimetypeExemptions.includes(mimetype)) return Promise.resolve({});
  return fetch(`${nsfwApiEndpoint}${hash}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json());
}

/**
 * determine if a certain classification determines graphic content 'not suitable for work'.
 * Return true if it is *not* suitable for work.
 * When no classification is known (yet), defaults to true ('guilty until proven innocent')
 * @param classification
 * @returns {boolean}
 */
export function nsfw(classification) {
  const guiltyUntilProvenInnocent = true;
  // a missing classification defaults to:
  if (!classification) return guiltyUntilProvenInnocent;

  // eslint-disable-next-line no-restricted-syntax
  for (const classifier in nsfwThresholds) {
    if (nsfwThresholds[classifier] < classification[classifier]) {
      return true;
    }
  }
  return false;
}

export default {
  classify,
  nsfw,
  mimetypeExemptions,
};
