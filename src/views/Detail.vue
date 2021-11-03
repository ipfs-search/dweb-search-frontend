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
        v-if="carouselIndex > -1"
        v-model="carouselIndex"
        height="100%"
        hide-delimiters
        hide-delimiter-background
        :continuous="false"
        @change="onCarouselIndexChange"
      >
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
        >
          <component
            :is="componentType"
            :file="item"
          />
        </v-carousel-item>
      </v-carousel>
      <component
        :is="componentType"
        v-else-if="item"
        :file="item"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { Types } from '../helpers/typeHelper';
import ImageDetail from '../components/results/detail/ImageDetail';
import DocumentDetail from '../components/results/detail/DocumentDetail';
import DirectoryDetail from '../components/results/detail/DirectoryDetail';
import VideoDetail from '../components/results/detail/VideoDetail';
import AudioDetail from '../components/results/detail/AudioDetail';

export default {
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
    this.primaryPage = Number(this.$route.query.page) || 0;
  },
  created() {
    this.$data.carouselIndex = this.items.findIndex((item) => item.hash === this.fileHash);
    /*
    // fetch requested detail page directly from the api if not available in paginated results

    if (index === -1) {
      console.debug(`No items matching ${this.fileHash}; requesting directly from API`);
      // eslint-disable-next-line vue/no-async-in-computed-properties
      apiSearch(this.$props.fileHash, this.$props.fileType)
        .then((results) => {
          if (results.error) throw results.error;
          console.debug('results', results);
          this.$data.item = results?.hits[0];
        })
        .catch(console.error);
    }
    */
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
  data() {
    return {
      item: null,
      carouselIndex: -1,
    };
  },
  computed: {
    componentType() {
      switch (this.$props.fileType) {
        case Types.text:
          return DocumentDetail;
        case Types.images:
          return ImageDetail;
        case Types.directories:
          return DirectoryDetail;
        case Types.video:
          return VideoDetail;
        case Types.audio:
          return AudioDetail;
        default:
          return null;
      }
    },
    items() {
      return store.state.results[this.fileType].results.hits;
    },
    detailComponent() {
      return store.state.query.type;
    },
  },
  watch: {
    carouselIndex: {
      handler(index) {
        // load next page if end of page is reached
        // TODO: refactor getResults to have more consistent behavior and update this watch
        const page = Number(this.$route.query.page);
        if (index === this.items.length - 1) {
          console.debug('last carousel item: loading items for page', page + 1);
          store.dispatch(`results/${this.$props.fileType}/getResults`, page + 1);
        } else if (index === 0 && page > 1) {
          console.debug('first carousel item: loading items for page', page - 1);
          store.dispatch(`results/${this.$props.fileType}/getResults`, {
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
    onCarouselIndexChange(index) {
      // change the fileHash and the page number in the url
      console.debug('carousel index change: update url');
      this.$router.replace({
        ...this.$route,
        query: {
          ...this.$route.query,
          page: this.primaryPage + Math.floor(index / store.state.results[this.fileType].results.page_size),
        },
        params: {
          ...this.$route.params,
          fileHash: this.items[index].hash,
        },
      });
    },
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
