<!--
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@mathijsfietst.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->

<template>
  <div>
    <v-menu
      :close-on-content-click="true"
      :nudge-width="200"
      offset-x
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            :color="cogwheelColor"
          >
            mdi-cog
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="blurExplicitImages"
              />
            </v-list-item-action>
            <v-list-item-title>Blur explicit images</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="darkMode"
              />
            </v-list-item-action>
            <v-list-item-title>Enable dark mode</v-list-item-title>
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
