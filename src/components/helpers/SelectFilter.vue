<!--
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@mathijsfietst.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->

<template>
  <v-select
    class="v-select"
    dense
    height="38px"
    :outlined="$vuetify.breakpoint.smAndDown"
    :items="filter.items"
    :label="filter.label"
    :value="filter.value"
    @change="change"
    :chips="filter.multiple"
    :multiple="filter.multiple"
  />
</template>

<script>
import { enterSearchQuery } from '@/helpers/routerHelper';

// TODO: make this a plugin of vue, to avoid the dependency
const changeFilter = (slug) => (value) => enterSearchQuery({ [slug]: value });

export default {
  computed: {
    change() {
      return changeFilter(this.filter.slug);
    },
  },
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-select {
  margin-bottom: 0 !important;
  height: 38px !important
}
</style>
