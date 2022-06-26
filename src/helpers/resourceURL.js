// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only



const gatewayURL = 'https://gateway.ipfs.io';

function getResourceURL(hash) {
  return `${gatewayURL}/ipfs/${hash}`;
}

export default getResourceURL;
