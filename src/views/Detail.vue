<template>
  <div>
    <v-app-bar
      app
      class="px-4"
      height="56"
    >
      <v-container
        fluid
        class="px-0 align-start"
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0 d-flex justify-space-between align-center"
          >
            <div
              class="ml-2"
            >
              <div
                class="d-flex align-center"
                style="cursor: pointer;"
                @click="goHome"
              >
                <v-img
                  v-if="$vuetify.theme.dark"
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-white.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
                <v-img
                  v-else
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-black.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
              </div>
            </div>
            <v-spacer />
            <v-btn
              icon
              @click="closeDetail"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <div
      class="detail"
      style="position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;"
    >
      <v-carousel
        v-model="carouselIndex"
        height="100%"
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="item in items"
          :key="item.hash"
        >
          <ImageDetail
            v-if="fileType === 'images'"
            :file="item"
          />
          <DirectoryDetail
            v-if="fileType === 'directories'"
            :file="item"
          />
          <DocumentDetail
            v-if="fileType === 'text'"
            :file="item"
          />
          <AudioDetail
            v-if="fileType === 'audio'"
            :file="item"
          />
          <VideoDetail
            v-if="fileType === 'video'"
            :file="item"
          />
        </v-carousel-item>

        <!-- Static carousel items from original swiper just for reference -->
        <!-- <v-carousel-item
          v-for="(color, i) in colors"
          :key="color"
        >
          <v-sheet
            :color="color"
            height="100%"
            tile
          >
            <v-row
              class="fill-height ma-0 pa-0"
              align="center"
              justify="center"
            >
              <div class="text-h2">
                Slide {{ i + 1 }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item> -->
      </v-carousel>
    </div>
  </div>
</template>

<script>
import AudioDetail from '@/components/results/detail/AudioDetail';
import DocumentDetail from '@/components/results/detail/DocumentDetail';
import VideoDetail from '@/components/results/detail/VideoDetail';
import DirectoryDetail from '@/components/results/detail/DirectoryDetail';
import ImageDetail from '@/components/results/detail/ImageDetail';
import SearchMixin from '@/mixins/SearchMixin';
import store from '@/store';
import FileListMixin from '@/mixins/FileListMixin';

export default {
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
  },
  mixins: [SearchMixin, FileListMixin],
  components: {
    VideoDetail,
    DocumentDetail,
    AudioDetail,
    ImageDetail,
    DirectoryDetail,
  },
  props: {
    fileType: {
      type: String,
      default: '',
    },
    fileHash: {
      type: String,
      default: '',
    },
  },
  computed: {
    items() {
      return this.$store.state.results[this.fileType].results.hits;
    },
    carouselIndex: {
      get() {
        return this.items.findIndex((item) => item.hash === this.fileHash);
      },
      set(index) {
        const { hash } = this.items.findIndex((item) => item.hash === this.fileHash) > -1
          ? this.items[index]
          : this.fileHash;
        // FIXME:
        // !! note that here Vue router needs to be circumvented because it lacks functionality to
        // !! change the url without re-rendering the component associated with the route
        // this thread describes the issue and has been closed after 5 years
        // mentioning there is a solution in vue-router v4:
        // https://github.com/vuejs/vue-router/issues/703
        if (hash !== undefined) {
          // eslint-disable-next-line no-restricted-globals
          history.replaceState(null, null, `${window.location.href.split('#')[0]}#${hash}`);
        }
        // I.e. the following snippet does not work properly:
        /*
        this.$router.replace({
          ...this.$route,
          hash: `#${hash}`,
        });
        */
      },
    },
    detailType() {
      return this.$store.state.query.type;
    },
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
    closeDetail() {
      const { query } = this.$route;
      this.$router.replace({
        name: 'Search',
        query,
      });
    },
  },
};
</script>

<style lang="scss">

</style>
