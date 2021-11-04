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
                <!-- Image -->
                <v-row>
                  <v-col>
                    <div
                      class="image-container"
                      :style="{'background-image': `url(${resourceURL})`}"
                    />
                  </v-col>
                  <v-col />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import DetailMixin from '@/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
  ],
};
</script>

<style lang="scss" scoped>
.image-container {
  position: absolute;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
</style>
