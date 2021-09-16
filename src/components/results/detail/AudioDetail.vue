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
                <!-- Content -->
                <div>
                  <MediaHeader
                    :file="$props.file"
                  />

                  <v-row test-class="audiovisual">
                    <!-- Left - video or preview image with title and subcaption above -->
                    <v-col
                      cols="12"
                      md="7"
                    >
                      <!-- Previewed video or image that goes along with the played audio track -->
                      <v-row>
                        <v-col>
                          <v-img
                            src="https://picsum.photos/510/300?random"
                            aspect-ratio="1.7"
                          >
                            <v-btn
                              large
                              fab
                              color="black"
                              @click="startPlayer"
                              style="
                                opacity: 0.5;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);"
                            >
                              <v-icon
                                size="42"
                                color="white"
                              >
                                mdi-play
                              </v-icon>
                            </v-btn>
                          </v-img>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!--                    &lt;!&ndash; Right - list with related audio files first one is playing &ndash;&gt;-->
                    <!--                    <v-col-->
                    <!--                      cols="12"-->
                    <!--                      md="5"-->
                    <!--                    >-->
                    <!--                      <v-list-->
                    <!--                        two-line-->
                    <!--                        class="mt-n2"-->
                    <!--                      >-->
                    <!--                        <template v-for="(item, index) in items">-->
                    <!--                          <v-subheader-->
                    <!--                            v-if="item.header"-->
                    <!--                            :key="item.header"-->
                    <!--                            v-text="item.header"-->
                    <!--                          />-->

                    <!--                          <v-divider-->
                    <!--                            v-else-if="item.divider"-->
                    <!--                            :key="index"-->
                    <!--                          />-->

                    <!--                          <v-list-item-->
                    <!--                            class="d-flex"-->
                    <!--                            v-else-->
                    <!--                            :key="item.title"-->
                    <!--                            @click="startPlayer(item.title)"-->
                    <!--                            :class="item.title === selected ? 'highlight' : ''"-->
                    <!--                          >-->
                    <!--                            <v-list-item-avatar-->
                    <!--                              size="42"-->
                    <!--                              tile-->
                    <!--                            >-->
                    <!--                              <v-img :src="item.avatar">-->
                    <!--                                &lt;!&ndash; <v-icon-->
                    <!--                                  v-if="(item.title === selected) && !paused"-->
                    <!--                                  size="24"-->
                    <!--                                  color="white"-->
                    <!--                                  style="opacity: 0.9;-->
                    <!--                                    position: absolute;-->
                    <!--                                    top: 50%;-->
                    <!--                                    left: 50%;-->
                    <!--                                    transform: translate(-50%, -50%);"-->
                    <!--                                >-->
                    <!--                                  mdi-pause-->
                    <!--                                </v-icon>-->
                    <!--                                <v-icon-->
                    <!--                                  v-if="(item.title === selected) && paused"-->
                    <!--                                  size="24"-->
                    <!--                                  color="white"-->
                    <!--                                  style="opacity: 0.9;-->
                    <!--                                    position: absolute;-->
                    <!--                                    top: 50%;-->
                    <!--                                    left: 50%;-->
                    <!--                                    transform: translate(-50%, -50%);"-->
                    <!--                                >-->
                    <!--                                  mdi-play-->
                    <!--                                </v-icon> &ndash;&gt;-->
                    <!--                              </v-img>-->
                    <!--                            </v-list-item-avatar>-->
                    <!--                            <v-list-item-content>-->
                    <!--                              <v-list-item-title-->
                    <!--                                v-html="item.title"-->
                    <!--                                :class="item.title === selected ? 'ipfsSecondary&#45;&#45;text text&#45;&#45;lighten-1' : ''"-->
                    <!--                              />-->
                    <!--                              <v-list-item-subtitle-->
                    <!--                                v-html="item.subtitle"-->
                    <!--                              />-->
                    <!--                            </v-list-item-content>-->
                    <!--                          </v-list-item>-->
                    <!--                        </template>-->
                    <!--                      </v-list>-->
                    <!--                    </v-col>-->
                    <v-col>
                      <MetaDataPanel
                        :file="$props.file"
                        test-class="metadatapanel"
                      />
                    </v-col>
                  </v-row>
                </div>

                <v-sheet
                  v-if="true"
                  height="100"
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
import MediaHeader from '@/components/results/detail/MediaHeader';
import MetaDataPanel from '@/components/results/detail/MetaDataPanel';
// import graveDigger from '@/assets/examples_player_audio_rave_digger.mp3';

export default {

  components: {
    MetaDataPanel,
    MediaHeader,
  },

  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    startPlayer() {
      this.$store.dispatch('player/selectAudioFile', this.file);
    },
  },
  data() {
    return {
      /* eslint-disable */
      // items: [
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      //     title: 'Brunch this weekend?',
      //     subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      //     title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      //     subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      //     title: 'Oui oui',
      //     subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      //     title: 'Birthday gift',
      //     subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      //     title: 'Recipe to try',
      //     subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      //     title: 'Summer BBQ 1<span class="grey--text text--lighten-1">4</span>',
      //     subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      //     title: 'Oui oui aa',
      //     subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      //     title: 'Summer BBQ 2<span class="grey--text text--lighten-1">4</span>',
      //     subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      //   },
      //   { divider: true, inset: false },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      //     title: 'Oui oui oui',
      //     subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      //   },
      //   { divider: true, inset: false },
      // ],
    };
  },

};
</script>

<style lang="scss" scoped>
.highlight {
  background: rgba(100, 100, 100, 0.1);
  // border: 1px solid lighten(grey, 10);
}
</style>
