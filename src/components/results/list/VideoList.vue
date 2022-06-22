<script setup>
import { fileListComposable, fileListProps } from './fileListComposable';
import ListCardHeader from '@/components/results/list/subcomponents/genericListCardHeader.vue';
import ListBase from './BaseList.vue'
import MediaCenterIcon from '@/components/results/list/subcomponents/MediaCenterIcon.vue';

const props = defineProps(fileListProps)

const {
  shownHits,
  goToDetailPage
} = fileListComposable(props)

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
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          v-if="hit"
          :elevation="isHovering ? 12 : 2"
          @click="goToDetailPage(index)"
          v-bind="props"
        >
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
                :src="hit.src"
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
        </v-card>
      </v-hover>
    </v-col>
  </ListBase>
</template>

