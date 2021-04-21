<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :max-width="$vuetify.breakpoint.mdAndUp ? '70vw' : 'none'"
  >
    <v-card
      tile
      flat
      class="dialogCard"
      style="min-height: 100vh !important;"
    >
      <v-sheet
        elevation="2"
        style="z-index: 2 !important;"
      >
        <v-card-title class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12" xl="8" offset-xl="2" class="d-flex align-center justify-space-between py-2">
                <!-- <div class="text-body-1" style="width: 80%">
                  placeholder title or logo
                </div> -->
                <div>&nbsp;</div>
                <v-btn
                  icon
                  @click="hideDialog()"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
      </v-sheet>

      <v-card-text class="pa-0 mymodal" v-body-scroll-lock="modalIsOpen">
        <v-container class="py-3">
          <v-row>
            <v-col cols="12" xl="8" offset-xl="2">
              <slot name="dialog-detail"></slot>
            </v-col>
          </v-row>
        </v-container>
        </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { hideDialog } from '@/helpers/dialogHelper.js';

export default {
  data() {
    return {
      dialog: true,
      modalIsOpen: false,
    }
  },

  methods: {
    hideDialog,
  },

  mounted() {
    this.$set(this, 'modalIsOpen', true)
  },

  beforeDestroy() {
    this.$set(this, 'modalIsOpen', false)
  },

}
</script>

<style lang="scss" scoped>
.mymodal {
  -webkit-overflow-scrolling: touch;
}
</style>