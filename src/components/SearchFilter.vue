<template>
  <span>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <span
          class="m-2 text-body-2"
          v-on="on"
          v-bind="attrs"
        >
          {{ text }} {{ value }}
          <v-icon>
            mdi-menu-down
          </v-icon>
        </span>
      </template>
      <v-list>
        <v-list-item
          v-for="option in options"
          :key="option.value"
          @click="this.$emit('change', option.value)"
        >
          <v-list-item-title class="text-body-2">{{ option.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>

<script>

export default {
  components: {
  },
  model: {
    // Ref: https://vuejs.org/v2/guide/forms.html
    // 'select fields use value as a prop and change as an event'
    prop: 'value',
    event: 'change',
  },
  props: ['text', 'value', 'options']
};
</script>
