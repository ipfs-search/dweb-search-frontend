<template>
  <v-select
    dense
    height="38"
    style="margin-bottom: 0 !important; height: 38px !important"
    :outlined="$vuetify.breakpoint.smAndDown"
    :items="filter.items"
    :label="filter.label"
    :value="$store.state.query.filters[filter.handle]"
    @change="filter.changeHandler"
    :chips="filter.multiple"
    :multiple="filter.multiple"
  />
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
};
</script>
