<script setup>
import ListBase from './BaseList.vue'
import HoverCard from './subcomponents/HoverCard.vue'
import { fileListComposable, fileListProps, imports } from '@/composables/fileListComposable';
import MediaCenterIcon from '@/components/searchViewComponents/subcomponents/MediaCenterIcon.vue';
import { Types } from '@/helpers/typeHelper';

const { durationToColor, mime, prettyBytes } = imports;
const props = defineProps({
  ...fileListProps,
})

const fileType = Types.audio;

const {
  shownHits,
  picsum,
} = fileListComposable(props)
</script>

<template>
  <ListBase
    :file-type="fileType"
  >
    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row dense>
        <v-col
          v-for="(hit, index) in shownHits"
          :key="index"
          class="d-flex child-flex"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="type">
            <v-img
              :src="hit.src || picsum()"
              class="text-white align-end"
              :aspect-ratio="1"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <media-center-icon icon="mdi-music"/>
              <v-icon
                size="64"
                color="white"
                style="opacity: 0.3;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);"
              >
                mdi-music
              </v-icon>

              <v-card-text
                class="text-subtitle-2"
              >
                <span v-html="hit.title"/>
              </v-card-text>
            </v-img>

            <v-card-text class="text-caption text-truncate">
              <div
                class="my-n2 d-block-inline text-truncate"
              >
                  <span
                    :class="durationToColor(hit['last-seen'])"
                  >
                    &#9679;
                  </span>
                <span v-if="hit['last-seen']">
                    Last seen <timeago :datetime="hit['last-seen']" />
                  </span>
                <br>
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
