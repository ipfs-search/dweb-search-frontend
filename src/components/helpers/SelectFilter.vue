<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
</script>

<template>
  <v-select
    class="v-select"
    dense
    height="38px"
    :outlined="smAndDown"
    :items="filter.items"
    :label="filter.label"
    :value="filter.value"
    :chips="filter.multiple"
    :multiple="filter.multiple"
    @change="change"
  />
</template>

<script>
import { enterSearchQuery } from '@/helpers/routerHelper';

// TODO: make this a plugin of vue, to avoid the dependency
const changeFilter = (slug) => (value) => enterSearchQuery({ [slug]: value });

export default {
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  computed: {
    change() {
      return changeFilter(this.filter.slug);
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
