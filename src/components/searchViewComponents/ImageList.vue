<script setup>
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { useFileListComposable } from "@/composables/useFileListComposable";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
import { Types } from "@/helpers/typeHelper";
import { mdiCog } from "@mdi/js";

const fileType = Types.images;

const { slicedHits } = useFileListComposable({ fileType });

const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <ListBase :file-type="fileType">
    <v-col id="resultsList" cols="12" xl="8" offset-xl="2">
      <v-row dense>
        <v-col v-for="(hit, index) in slicedHits(6)" :key="index" cols="6" sm="4" md="3" lg="2">
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <v-img
              :src="thumbURL(hit.hash, 400, 400, 'image')"
              aspect-ratio="1"
              :class="{ blurExplicit: blurExplicit(hit) }"
              :data-nsfw-classification="JSON.stringify(hit.nsfwClassification)"
              :data-nsfw="hit.nsfw"
              class="rounded grey lighten-2"
              @error="thumbError()"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="ipfsPrimary" />
                </v-row>
              </template>
              <v-tooltip location="bottom" align="center" activator="parent">
                <div>
                  <div v-if="hit.title" v-sane-html="hit.title"></div>
                  <div v-if="blurExplicit(hit)">
                    Blurring explicit content. See settings in menubar under
                    <v-icon color="white" :icon="mdiCog" />
                  </div>
                  <div v-if="hit.nsfwClassification">
                    {{
                      Object.entries(hit.nsfwClassification).reduce(
                        (p, [classifier, value]) =>
                          `${p} ${classifier}: ${Math.round(value * 100)}%`,
                        ""
                      )
                    }}
                  </div>
                  <div v-else>NSFW classification not available</div>
                </div>
              </v-tooltip>
            </v-img>
          </hover-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import urlJoin from "url-join";

const nyatsEndpoint = import.meta.env.VITE_NYATS_API || "https://api.ipfs-search.com/v1/thumbnail/";
const gatewayURL = import.meta.env.VITE_IPFS_GATEWAY || "https://dweb.link";
const nyatsIPNFSRoot =
  import.meta.env.VITE_NYATS_IPNS_ROOT ||
  gatewayURL + "/ipns/12D3KooWPVobDRG9Mdmact3ejSe6UAFP8cevmw35HHR1ZDwCozSo/";

function ipnsThumbnailURL(hash, width, height) {
  const filename = `${hash}-${width}-${height}.webp`;
  return urlJoin(nyatsIPNFSRoot, filename);
}

function generateThumbnailURL(hash, width, height, type) {
  const apiPath = `/ipfs/${hash}/${width}/${height}/?type=${type}`;
  return urlJoin(nyatsEndpoint, apiPath);
}

export default {
  data: () => ({
    thumbNotFound: false,
  }),
  methods: {
    thumbError() {
      this.thumbNotFound = true;
    },
    thumbURL(hash, width, height, type) {
      if (this.thumbNotFound) {
        return generateThumbnailURL(hash, width, height, type);
      }

      return ipnsThumbnailURL(hash, width, height);
    },
  },
};
</script>
