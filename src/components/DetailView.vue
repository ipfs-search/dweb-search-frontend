<script setup>
import AudioDetail from "@/components/detailViewComponents/AudioDetail.vue";
import DocumentDetail from "@/components/detailViewComponents/DocumentDetail.vue";
import ImageDetail from "@/components/detailViewComponents/ImageDetail.vue";
import VideoDetail from "@/components/detailViewComponents/VideoDetail.vue";
import DirectoryDetail from "@/components/detailViewComponents/DirectoryDetail.vue";
import OtherDetail from "@/components/detailViewComponents/GenericDetail.vue";

import { Types } from "@/helpers/typeHelper";

const DetailComponent = {
  [Types.text]: DocumentDetail,
  [Types.audio]: AudioDetail,
  [Types.images]: ImageDetail,
  [Types.video]: VideoDetail,
  [Types.directories]: DirectoryDetail,
  [Types.other]: OtherDetail,
  [Types.unfiltered]: OtherDetail,
};
</script>

<template>
  <v-carousel
    v-if="!singleItem"
    v-model="$data.carouselIndex"
    height="100%"
    hide-delimiters
    hide-delimiter-background
    :continuous="false"
  >
    <v-carousel-item v-for="(item, index) in items" :key="index">
      <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
      <component
        :is="DetailComponent[fileType]"
        :file="item"
        :active="index === $data.carouselIndex"
      />
    </v-carousel-item>
  </v-carousel>
  <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components-->
  <component :is="DetailComponent[fileType]" v-else :file="singleItem" />
</template>

<script>
import store from "@/store";
import { apiMetadataQuery, batchSize } from "@/helpers/ApiHelper";

export default {
  props: {
    fileType: {
      type: String,
      default: "",
    },
    fileHash: {
      type: String,
      default: "",
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      singleItem: {
        hash: this.$props.fileHash,
      },
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
        if (
          index + 1 === this.items?.length ||
          (index + 1 < this.items?.length && this.items[index + 1] === undefined)
        ) {
          console.debug("last page item: loading items for page", currentPage + 1);
          store.dispatch(`results/${this.fileType}/fetchPage`, { page: currentPage + 1 });
        } else if (index === (currentPage - 1) * 15 && currentPage > 1) {
          console.debug("first page item: loading items for page", currentPage - 1);
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
      store
        .dispatch(`results/${this.fileType}/fetchPage`, {
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
            apiMetadataQuery(this.fileHash).then((metadata) => {
              this.singleItem = metadata;
            });
          }
        })
        .catch(console.error);
    }
  },
  mounted() {
    window.addEventListener("keydown", this.arrowKeyEventHandler);
  },
  unmounted() {
    window.removeEventListener("keydown", this.arrowKeyEventHandler);
  },
  methods: {
    arrowKeyEventHandler(event) {
      if (event.defaultPrevented) {
        return; // Do nothing if event already handled
      }
      switch (event.code) {
        case "ArrowLeft":
          this.carouselIndex -= 1;
          break;
        case "ArrowRight":
          this.carouselIndex += 1;
          break;
        default:
      }
    },
  },
};
</script>
