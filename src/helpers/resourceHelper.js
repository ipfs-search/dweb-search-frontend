/**
 * provide an URL to retrieve an IPFS resource
 * @param hash
 * @returns <string> URL
 */
export function resourceURL(hash) {
  return `https://gateway.ipfs.io/ipfs/${hash}`;
}

export default {
  resourceURL,
};
