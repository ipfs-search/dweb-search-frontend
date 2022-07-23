<script setup>
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { useFileListComposable } from "@/composables/useFileListComposable";
import CardContent from "@/components/searchViewComponents/subcomponents/genericCardContent.vue";
import MediaCenterIcon from "@/components/searchViewComponents/subcomponents/MediaCenterIcon.vue";
import { mdiVideo } from "@mdi/js";
import { Types } from "@/helpers/typeHelper";
import { picsum } from "@/helpers/picsum";

const fileType = Types.video;

const { slicedHits } = useFileListComposable({ fileType });
</script>

<template>
  <ListBase :file-type="fileType">
    <v-col v-for="(hit, index) in slicedHits(3)" :key="index" cols="12" xl="8" offset-xl="2">
      <hover-card :hit="hit" :index="index" :file-type="fileType">
        <v-row>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-img
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              :src="hit.src || picsum()"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <media-center-icon :icon="mdiVideo" />
            </v-img>
          </v-col>
          <v-col cols="12" sm="8" md="9" lg="10" class="py-sm-0 ml-sm-n6">
            <CardContent :hit="hit" />
          </v-col>
        </v-row>
      </hover-card>
    </v-col>
  </ListBase>
</template>
