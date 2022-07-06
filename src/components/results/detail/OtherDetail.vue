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
                :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
              >
                <MediaHeader :file="$props.file" />
                <MetaDataPanel
                  :file="$props.file"
                  :expanded="true"
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
import MetaDataPanel from '@/components/results/detail/helpers/MetaDataPanel';
import MediaHeader from '@/components/results/detail/helpers/MediaHeader';
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
  ],
  components: {
    MetaDataPanel,
    MediaHeader,
  },
};
</script>

<style lang="scss" scoped>

</style>
