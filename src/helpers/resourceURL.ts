import router from "@/router";

const gatewayURL = "https://gateway.ipfs.io";

function getResourceURL(hash: string) {
  if(router?.currentRoute.value.query?.nativeIpfs !== 'false' && router?.currentRoute.value.query?.nativeIpfs !== undefined) {
    return `ipfs://${hash}`
  }
  return `${gatewayURL}/ipfs/${hash}`;
}

export default getResourceURL;
