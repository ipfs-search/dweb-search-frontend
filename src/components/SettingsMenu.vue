<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="white">mdi-cog</v-icon>
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
import BlurExplicitImagesMixin from '@/mixins/BlurExplicitImagesMixin';

export default {
  mixins: [
    BlurExplicitImagesMixin,
  ],
  computed: {
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
