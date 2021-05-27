<template>
  <ListBase>
    <template v-slot:type>
      Images ({{ results.hits.length }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row dense>
        <v-col
          v-for="n in 6"
          :key="n"
          class="d-flex child-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-img
            @click="genericDialog()"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import DialogDetailText from '@/components/DialogDetailText.vue';
import { showDialog } from '@/helpers/dialogHelper';
import ListBase from './ListBase.vue';

export default {
  components: {
    ListBase,
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  methods: {
    genericDialog() {
      showDialog(DialogDetailText, {});
    },
  },
};
</script>
