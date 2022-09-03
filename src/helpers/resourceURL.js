const gatewayURL = import.meta.env.VITE_IPFS_GATEWAY || "https://gateway.ipfs.io";

export default function getResourceURL(hash) {
  const resourcePath = `/ipfs/${hash}`;
  return new URL(resourcePath, gatewayURL).toString();
}
