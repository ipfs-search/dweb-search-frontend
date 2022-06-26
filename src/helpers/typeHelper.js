// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only


export const Types = {
  any: 'any',
  text: 'text',
  audio: 'audio',
  images: 'images',
  video: 'video',
  directories: 'directories',
  other: 'other',
};

export const searchTypes = Object.values(Types);

export default {
  searchTypes,
  Types,
};
