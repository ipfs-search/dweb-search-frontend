<script setup>
import { mdiMusic } from "@mdi/js";
import { useDisplay } from "vuetify";
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { useFileListComposable, imports } from "@/composables/useFileListComposable";
import MediaCenterIcon from "@/components/searchViewComponents/subcomponents/MediaCenterIcon.vue";
import { Types } from "@/helpers/typeHelper";
import { picsum } from "@/helpers/picsum";
import { fileTitle, fileAuthor } from "@/helpers/fileHelper.js";

const { xs, smAndDown, mdAndDown } = useDisplay();
const { durationToColor, mime, prettyBytes } = imports;
const fileType = Types.audio;

const { slicedHits } = useFileListComposable({ fileType });
</script>

pageHits.value.slice(0,
<template>
  <ListBase :file-type="fileType">
    <v-col cols="12" xl="8" offset-xl="2">
      <v-row dense>
        <v-col
          v-for="(hit, index) in slicedHits(xs ? 2 : smAndDown ? 6 : mdAndDown ? 8 : 12)"
          :key="index"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <v-img
              :src="hit.src || picsum({ seed: hit.hash })"
              class="text-white align-content-stretch"
              :aspect-ratio="1"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title
                class="d-flex align-start text-wrap line"
                style="font-size: medium; line-height: 1.4rem"
              >
                <span v-sane-html="fileTitle(hit)" />
              </v-card-title>
              <media-center-icon :icon="mdiMusic" />
              <v-card-text class="align-end">
                <span v-if="fileAuthor(hit)" v-sane-html="fileAuthor(hit)" />
                <span v-if="fileAuthor(hit) && hit?.metadata?.metadata?.['xmpDM:album']"> - </span>
                <span
                  v-if="hit?.metadata?.metadata?.['xmpDM:album']"
                  v-sane-html="hit.metadata?.metadata?.['xmpDM:album']"
                  class="font-italic"
                />
              </v-card-text>
            </v-img>

            <v-card-text class="text-caption text-truncate">
              <div class="my-n2 d-block-inline text-truncate">
                <span :class="durationToColor(hit['last-seen'])"> &#9679; </span>
                <span v-if="hit['last-seen']">
                  Last seen <timeago :datetime="hit['last-seen']" />
                </span>
                <br />
                <span v-if="hit.size">Size {{ prettyBytes(hit.size) }}</span>
                <span v-if="hit.mimetype"> | {{ mime.getExtension(hit.mimetype) }}</span>
              </div>
            </v-card-text>
          </hover-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>
