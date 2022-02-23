<template>
  <v-select
    :items="items"
    dense
    :outlined="$vuetify.breakpoint.smAndDown"
    :solo="!$vuetify.breakpoint.smAndDown"
    :label="filterLabel"
    height="38"
    style="margin-bottom: 0 !important; height: 38px !important"
    :value="filterModel"
    @change="onChange"
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
    items: {
      type: Array,
      required: true,
    },
    filterModel: {
      type: [String, Array],
      required: true,
    },
    filterLabel: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
};
</script>
