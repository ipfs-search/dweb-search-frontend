<template>
  <v-dialog
    v-model="dialog"
    scrollable
  >
    <v-card
      tile
      flat
      class="dialogCard"
    >
      <v-sheet elevation="2">
        <v-card-title class="pa-0">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" xl="8" offset-xl="2" class="d-flex align-center justify-space-between py-2">
                <!-- <div class="text-body-1" style="width: 80%">
                  <slot name="dialog-detail-title"></slot>
                </div> -->
                <div style="width: 80%">&nbsp;</div>
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
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" xl="8" offset-xl="2">
              <slot name="dialog-detail-content"></slot>
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