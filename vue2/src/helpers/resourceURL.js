const gatewayURL = 'https://gateway.ipfs.io';

function getResourceURL(hash) {
  return `${gatewayURL}/ipfs/${hash}`;
}

export default getResourceURL;
