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
          :dark="isHome ? $vuetify.theme.dark : !$vuetify.theme.dark"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="blurImages"
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
export default {
  props: {
    isHome: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    blurImages: false,
    darkMode: false,
  }),
};
</script>
