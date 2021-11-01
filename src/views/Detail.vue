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
        :continuous="false"
      >
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
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
import store from '@/store';

export default {
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
    this.primaryPage = Number(this.$route.query.page) || 0;
  },
  components: {
    // TODO: make detail pages hese seperate pages in stead of loading all types at once.
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
        // TODO: Fix issues with duplicate results

        // TODO: Change page_size to pageSize in store.
        // eslint-disable-next-line camelcase
        const { page_size } = this.$store.state.results[this.fileType].results;

        // eslint-disable-next-line camelcase
        const page = this.primaryPage + Math.floor(index / page_size);

        this.$router.replace({
          ...this.$route,
          query: {
            ...this.$route.query,
            ...page,
          },
          params: {
            ...this.$route.params,
            fileHash: this.items[index].hash,
          },
        });
      },
    },
    detailType() {
      return this.$store.state.query.type;
    },
  },
  watch: {
    carouselIndex: {
      handler(index) {
        const page = Number(this.$route.query.page);
        if (index === this.items.length - 1) {
          console.debug('last item: loading items for page', page + 1);
          this.$store.dispatch(`results/${this.$props.fileType}/getResults`, page + 1);
        } else if (index === 0 && page > 1) {
          console.debug('first item: loading items for page', page - 1);
          this.$store.dispatch(`results/${this.$props.fileType}/getResults`, {
            page: page - 1,
            prepend: true,
          }).then(() => {
            this.primaryPage -= 1;
          });
        }
      },
      immediate: true,
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
