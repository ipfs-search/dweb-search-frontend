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
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
        >
          <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
          <component
            :is="DetailComponent[fileType]"
            :file="item"
          />
        </v-carousel-item>
      </v-carousel>
      <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
      <component
        v-else
        :is="DetailComponent[fileType]"
        :file="singleItem"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { Types, DetailComponent } from '@/helpers/typeHelper';
import { apiMetadataQuery, batchSize } from '@/helpers/ApiHelper';
import BlurExplicitImagesMixin from '@/mixins/BlurExplicitImagesMixin';
import SettingsMenu from '@/components/SettingsMenu';

export default {
  mixins: [
    BlurExplicitImagesMixin,
  ],
  components: [
    SettingsMenu,
  ],
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
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
      Types,
      DetailComponent,
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
        if (index === this.items?.length - 1
          || (index < this.items?.length - 1 && this.items[index + 1] === undefined)) {
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
