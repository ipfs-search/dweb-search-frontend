<script setup>
import ListBase from './BaseList.vue'
import HoverCard from './subcomponents/HoverCard.vue'
import { fileListComposable, fileListProps } from '@/composables/fileListComposable';
import ListCardHeader from '@/components/searchViewComponents/subcomponents/genericListCardHeader.vue';
import MediaCenterIcon from '@/components/searchViewComponents/subcomponents/MediaCenterIcon.vue';
import { Types } from '@/helpers/typeHelper';
import { picsum } from '@/helpers/picsum';

const props = defineProps({
  ...fileListProps,
})

const fileType = Types.video;

const {
  shownHits,
} = fileListComposable({ fileType, ...props })

</script>


<template>
  <ListBase
    :file-type="fileType"
  >
    <v-col
      v-for="(hit, index) in shownHits"
      :key="index"
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2 mb-4"
    >
      <hover-card :hit="hit" :index="index" :file-type="fileType">
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            lg="2"
            class="mb-sm-n2 mb-n10 mt-n2"
          >
            <v-img
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              :src="hit.src || picsum()"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <media-center-icon icon="mdi-video"/>
            </v-img>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="9"
            lg="10"
            class="py-sm-0 ml-sm-n6"
          >
            <ListCardHeader :hit="hit" />
          </v-col>
        </v-row>
      </hover-card>
    </v-col>
  </ListBase>
</template>

