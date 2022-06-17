<template>
  <div>
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
          >
            mdi-cog
          </v-icon>
        </v-btn>
      </template>

      <v-card
        class="mx-auto"
      >
        <v-list
          density="compact"
        >
          <v-list-item
          >
            <v-list-item-title>
              <v-switch
                v-model="blurExplicitImages"
                label="Blur explicit images"
                color="ipfsPrimary"
              />
            </v-list-item-title>
          </v-list-item>

          <v-list-item
          >
            <v-list-item-title>
              <v-switch
                v-model="darkMode"
                label="Enable dark mode"
                color="ipfsPrimary"
              />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import theme from '@/plugins/vuetify/theme';
import { blurExplicitImages } from '@/mixins/BlurExplicitImagesModule';

export default {
  setup() {
    return { blurExplicitImages };
  },
  computed: {
    cogwheelColor() {
      // On detail page, in light theme, the top bar is white. So a dark icon is needed.
      // The detail page primary color is grey
      if (this.$route.name === 'Detail' && !this.$store.state.localStorage.darkMode) {
        return theme.primary;
      }
      // The home page banner is white, the home page primary color is called ipfs-primary
      if (this.$route.name === 'Home') return theme.ipfsPrimary;
      return 'white';
    },
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
