<script setup>
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()
</script>

<template>
  <v-sheet
    :light="!$vuetify.theme.dark"
    height="100%"
    tile
  >
    <v-row
      class="fill-height ma-0 pa-0"
    >
      <div
        style="position: absolute;
                          top: 0;
                          left: 0;
                          bottom: 0;
                          right: 0;"
      >
        <div
          class="inline-block"
          style="height: 100% !important; overflow-y: auto !important;"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                xl="8"
                offset-xl="2"
                :class="mdAndUp ? 'mb-16' : ''"
              >
                <MediaHeader :file="$props.file" />

                <!-- Content -->
                <v-row>
                  <v-col>
                    <iframe
                      style="
                        width: 100%;
                        height: calc(100vh - 200px);
                        border: 1px solid #BDBDBD;
                      "
                      :src="`https://gateway.ipfs.io/ipfs/${$props.file.hash}`"
                    />
                  </v-col>
                </v-row>

                <MetaDataPanel
                  :file="$props.file"
                  test-class="metadatapanel"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';
import MetaDataPanel from '@/components/results/detail/helpers/MetaDataPanel.vue';
import MediaHeader from '@/components/results/detail/helpers/MediaHeader.vue';

export default {
  components: {
    MetaDataPanel,
    MediaHeader,
  },
  mixins: [
    DetailMixin,
  ],
};
</script>

<style lang="scss" scoped>

</style>
