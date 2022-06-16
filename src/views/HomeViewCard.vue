<template>
  <v-col
    cols="12"
    md="4"
    sm="6"
  >
    <v-card
      flat
      class="transparent"
    >
      <v-card-text class="text-center">
        <v-icon
          size="42px"
          class="ml-n4 text-ipfsSecondary lighten-1"
        >
          {{ props.icon }}
        </v-icon>
      </v-card-text>
      <v-card-title primary-title>
        <div class="headline">
          {{ props.title }}
        </div>
      </v-card-title>
      <v-card-text>
        {{ props.text }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'mdi-wrench',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})
</script>
