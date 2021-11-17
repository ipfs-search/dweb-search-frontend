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
        v-if="!singleItem"
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
        v-else
        :is="componentType"
        :file="singleItem"
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
import { apiMetadataQuery, pageSize } from '../helpers/ApiHelper';

export default {
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
  },
  created() {
    this.$data.singleItem = {
      hash: this.fileHash,
    };

    if (this.selectedIndex > -1 && this.items[this.selectedIndex]?.hash === this.fileHash) {
      this.$data.carouselIndex = this.selectedIndex;
      this.$data.singleItem = undefined;
    } else {
      store.dispatch(`results/${this.fileType}/fetchPage`, {
        page: Number(this.$route.query.page) - 1,
      })
        .then(() => {
          // take index parameter from route props, if available. Else fallback on hash match.
          const index = this.items.findIndex((item) => item?.hash === this.fileHash);
          if (index > -1) {
            this.$data.carouselIndex = index;
            this.$data.singleItem = undefined;
          } else {
            console.debug(`No items matching ${this.fileHash}; requesting metadata.`);
            apiMetadataQuery(this.fileHash)
              .then((metadata) => {
                this.singleItem = metadata;
              });
          }
        })
        .catch(console.error);
    }
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
    selectedIndex: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      singleItem: undefined,
      carouselIndex: 0,
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
      return store.state.results?.[this.fileType]?.results?.hits;
    },
  },
  watch: {
    /**
     * handle previous/next page loading
     */
    carouselIndex: {
      handler(index) {
        const page = Number(this.$route.query.page);

        if (index === this.items.length - 1
          || (index < this.items.length - 1 && this.items[index + 1] === undefined)) {
          console.debug('last page item: loading items for page', page + 1);
          store.dispatch(`results/${this.fileType}/fetchPage`, { page });
        } else if (index === ((page - 1) * 15) && page > 1) {
          console.debug('first page item: loading items for page', page - 1);
          store.dispatch(`results/${this.fileType}/fetchPage`, { page: page - 2 });
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * handle route setting when carousel index changes
     * Note that the case is different than with the watch above, which fires upon page load as well
     * @param index
     */
    onCarouselIndexChange(index) {
      // change the fileHash and the page number in the url
      this.$router.replace({
        ...this.$route,
        query: {
          ...this.$route.query,
          page: 1 + Math.floor(index / pageSize),
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
