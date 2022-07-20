<script setup>
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { fileListComposable, imports } from "@/composables/fileListComposable";
import MediaCenterIcon from "@/components/searchViewComponents/subcomponents/MediaCenterIcon.vue";
import { mdiMusic } from "@mdi/js";
import { Types } from "@/helpers/typeHelper";
import { picsum } from "@/helpers/picsum";

const { durationToColor, mime, prettyBytes } = imports;
const fileType = Types.audio;

const { slicedHits } = fileListComposable({ fileType });
</script>

pageHits.value.slice(0,
<template>
  <ListBase :file-type="fileType">
    <v-col cols="12" xl="8" offset-xl="2">
      <v-row dense>
        <v-col
          v-for="(hit, index) in slicedHits(6)"
          :key="index"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <v-img
              :src="hit.src || picsum()"
              class="text-white align-end"
              :aspect-ratio="1"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <media-center-icon :icon="mdiMusic" />
              <v-card-text class="text-subtitle-2">
                <span v-html="hit.title" />
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
