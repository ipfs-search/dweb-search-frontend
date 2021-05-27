<template>
  <ListBase>
    <template v-slot:type>
      Audio ({{ results.hits.length }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row
        dense
      >
        <v-col
          v-for="hit in results.hits"
          :key="hit.hash"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-img
              :src="hit.src"
              class="white--text align-end"
              :aspect-ratio="1"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
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
              <v-card-title
                class="text-subtitle-1 font-weight-bold"
                v-html="hit.title"
              />
              <v-card-subtitle
                class="white--text text-body-2"
                v-html="hit.description"
              />
            </v-img>

            <v-card-subtitle class="text-caption text-truncate">
              <div class="my-n2">
                <span class="red--text">Last seen {{ hit['last-seen'] }} </span><br>
                <span v-if="hit.size">Size {{ hit.size }}</span>
              </div>
            </v-card-subtitle>
          </v-card>
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
