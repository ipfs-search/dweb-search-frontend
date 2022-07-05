<script setup>
import { computed } from 'vue';
import { useBlurExplicit } from '@/composables/BlurExplicitImagesComposable';
import { mdiCog } from '@mdi/js'
const { blurExplicitImages } = useBlurExplicit()

import { useTheme } from 'vuetify'
const theme = useTheme()
import { useRoute } from 'vue-router'
const route = useRoute()

const cogwheelColor = computed(() => {
  if (route.name === 'Detail' && !theme.current.value.dark) {
    return theme.primary;
  }
  if (route.name === 'Home') return theme.ipfsPrimary;
  return 'white';
})
</script>

<template>
  <v-menu
    location="start"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <v-icon
          :color="cogwheelColor"
          :icon="mdiCog"
        />
      </v-btn>
    </template>
    <v-card
      class="mx-auto"
    >
      <v-list class="bg-white">
        <v-list-item>
          <v-switch
            v-model="blurExplicitImages"
            label="Blur explicit images"
            color="ipfsPrimary"
            hide-details
          />
        </v-list-item>
        <v-list-item>
          <v-switch
            v-model="darkMode"
            label="Enable dark mode"
            color="ipfsPrimary"
            hide-details
          />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  computed: {
    // TODO: Fix this!
    darkMode: {
      get() { return this.$store.state.localStorage.darkMode; },
      set(value) {
        this.$vuetify.theme.dark = value;
        this.$store.commit('localStorage/setDarkMode', value);
      },
    },
  },
};
</script>


