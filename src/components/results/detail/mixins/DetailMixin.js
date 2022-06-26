// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only


import getResourceURL from '@/helpers/resourceURL';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    resourceURL() { return getResourceURL(this.file.hash); },
  },
};
