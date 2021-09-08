<template>
  <v-card>
    <v-img
      :alt="item.title"
      :src="thumbURL(item.hash, 234, 234,'image')"
      @error="thumbError()"
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
  </v-card>
</template>

<script>
import ListItemMixin from '@/mixins/ListItemMixin';

export default {
  mixins: [ListItemMixin],
};
</script>
