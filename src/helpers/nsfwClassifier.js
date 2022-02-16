import { nsfwThresholds } from '@/helpers/constants/nsfwThresholds';

// for a local setup, typically use: http://localhost:8080/classify
const nsfwApiEndpoint = process?.env?.NSFW_API || 'https://api.ipfs-search.com/v1/nsfw/classify/';

function classify(cid) {
  return fetch(`${nsfwApiEndpoint}${cid}`, {
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
 * @param classification
 * @returns {boolean}
 */
function nsfw(classification) {
  // a missing classification defaults to:
  if (!classification) return false;

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
};
