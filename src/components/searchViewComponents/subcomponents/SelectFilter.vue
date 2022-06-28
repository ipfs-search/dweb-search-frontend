<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()

import { enterSearchQuery } from '@/helpers/routerHelper';

const props = defineProps({
  filter: {
    type: Object,
      required: true,
  },
})
console.log(props.filter.label, props.filter.value)

const changeFilter = (value) => enterSearchQuery({ [props.filter.slug]: value });
</script>

<template>
  <v-select
    class="v-select"
    height="38px"
    variant="underlined"
    :outlined="smAndDown"
    :items="filter.items"
    :label="filter.label"
    :model-value="filter.value"
    :multiple="filter.multiple"
    @update:modelValue="changeFilter"
  />
</template>

<style lang="scss" scoped>
.v-select {
  margin-bottom: 0 !important;
  height: 38px !important
}
</style>
