<script setup>
import SettingsMenu from '@/components/SettingsMenu.vue';
import AudioDetail from '@/components/results/detail/AudioDetail.vue';
import DocumentDetail from '@/components/results/detail/DocumentDetail.vue';
import { Types } from '@/helpers/typeHelper';

const DetailComponent = {
  [Types.text]: DocumentDetail,
  [Types.audio]: AudioDetail,
  [Types.images]: () => import('@/components/results/detail/ImageDetail.vue'),
  [Types.video]: () => import('@/components/results/detail/VideoDetail.vue'),
  [Types.directories]: () => import('@/components/results/detail/DirectoryDetail.vue'),
  [Types.other]: () => import('@/components/results/detail/OtherDetail.vue'),
};
</script>

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
                  src="/assets/logo-white.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
                <v-img
                  v-else
                  alt="ipfs-search.com logo"
                  contain
                  src="/assets/logo-black.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
              </div>
            </div>
            <v-spacer />

            <settings-menu />

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
      >
        <template #next="{ props }">
          <v-btn
            fab
            small
            @click="props.onClick"
          >
            <v-icon large>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </template>
        <template #prev="{ props }">
          <v-btn
            fab
            small
            @click="props.onClick"
          >
            <v-icon large>
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </template>
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
        >
          <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
          <component
            :is="DetailComponent[fileType]"
            :file="item"
            :active="carouselIndex === index"
          />
        </v-carousel-item>
      </v-carousel>
      <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
      <component
        :is="DetailComponent[fileType]"
        v-else
        :file="singleItem"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { apiMetadataQuery, batchSize } from '@/helpers/ApiHelper';

export default {
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
      default: 0,
    },
  },
  data() {
    return {
      singleItem: undefined,
      carouselIndex: 0,
    };
  },
  computed: {
    items() {
      return store.state.results?.[this.fileType]?.results?.hits;
    },
  },
  watch: {
    /**
     * handle previous/next page loading
     */
    carouselIndex: {
      handler(index, previousIndex) {
        // update the fileHash and the page number in the url
        if (previousIndex) {
          this.$router.replace({
            ...this.$route,
            query: {
              ...this.$route.query,
              page: 1 + Math.floor(index / batchSize),
            },
            params: {
              ...this.$route.params,
              fileHash: this.items[index].hash,
            },
          });
        }

        // handle fetching missing items from the api
        const currentPage = Number(this.$route.query.page);
        if (index + 1 === this.items?.length
          || (index + 1 < this.items?.length && this.items[index + 1] === undefined)) {
          console.debug('last page item: loading items for page', currentPage + 1);
          store.dispatch(`results/${this.fileType}/fetchPage`, { page: currentPage + 1 });
        } else if (index === ((currentPage - 1) * 15) && currentPage > 1) {
          console.debug('first page item: loading items for page', currentPage - 1);
          store.dispatch(`results/${this.fileType}/fetchPage`, { page: currentPage - 1 });
        }
      },
      immediate: true,
    },
  },
  created() {
    if (this.selectedIndex > -1 && this.items[this.selectedIndex]?.hash === this.fileHash) {
      this.$data.carouselIndex = this.selectedIndex;
      this.$data.singleItem = undefined;
    } else {
      store.dispatch(`results/${this.fileType}/fetchPage`, {
        page: Number(this.$route.query.page),
      })
        .then(() => {
          // take index parameter from route props, if available. Else fallback on hash match.
          const index = this.items?.findIndex((item) => item?.hash === this.fileHash);
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
  mounted() {
    window.addEventListener('keydown', this.arrowKeyEventHandler);
  },
  unmounted() {
    window.removeEventListener('keydown', this.arrowKeyEventHandler);
  },
  methods: {
    arrowKeyEventHandler(event) {
      if (event.defaultPrevented) {
        return; // Do nothing if event already handled
      }
      switch (event.code) {
        case 'ArrowLeft':
          this.carouselIndex -= 1;
          break;
        case 'ArrowRight':
          this.carouselIndex += 1;
          break;
        default:
      }
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
