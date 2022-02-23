<template>
  <v-select
    dense
    height="38"
    style="margin-bottom: 0 !important; height: 38px !important"
    :outlined="$vuetify.breakpoint.smAndDown"
    :solo="!$vuetify.breakpoint.smAndDown"
    :items="filter.options"
    :label="filter.label"
    :value="filter.value"
    @change="filter.changeHandler"
  >
    <template #selection="{ item }">
      <span class="m-2 text-body-2">
        {{ $vuetify.breakpoint.smAndDown || filterLabel }} {{ item.text }}
      </span>
    </template>
  </v-select>
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
