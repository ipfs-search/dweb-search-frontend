<template>
  <v-select
    class="v-select"
    dense
    height="38px"
    :outlined="$vuetify.breakpoint.smAndDown"
    :items="filter.options"
    :label="filter.label"
    :value="filter.value"
    @change="change"
    :chips="filter.multiple"
    :multiple="filter.multiple"
  />
</template>

<script>
import { enterSearchQuery } from '@/helpers/routerHelper';

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
