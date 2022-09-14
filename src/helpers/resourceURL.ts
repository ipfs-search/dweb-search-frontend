const gatewayURL = "https://gateway.ipfs.io";

function getResourceURL(hash: string) {
  return `${gatewayURL}/ipfs/${hash}`;
}

export default getResourceURL;
