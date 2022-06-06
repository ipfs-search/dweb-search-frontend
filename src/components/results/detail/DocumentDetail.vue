<template>
  <v-sheet
    height="100%"
    tile
    :light="!$vuetify.theme.dark"
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
                :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
              >
                <MediaHeader :file="$props.file" />
                <!-- Text -->
                <v-row>
                  <v-col>
                    <DocumentViewer
                      :file="file"
                      :active="active"
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
import MediaHeader from '@/components/results/detail/helpers/MediaHeader.vue';
import DocumentViewer from '@/components/results/detail/helpers/DocumentViewer.vue';
import MetaDataPanel from '@/components/results/detail/helpers/MetaDataPanel.vue';

export default {
  mixins: [
    DetailMixin,
  ],
  components: {
    MetaDataPanel,
    MediaHeader,
    DocumentViewer,
  },
};
</script>

<style lang="scss" scoped>

</style>
