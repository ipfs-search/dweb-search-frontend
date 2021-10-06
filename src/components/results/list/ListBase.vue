<template>
  <v-container
    v-if="$parent.results.total > 0"
  >
    <!--     PAGINATION -->
    <!--    N.b. duplicate code with below-->
    <div
      class="my-16"
      v-if="queryFileType !== 'any' && !$parent.infinite"
    >
      <v-pagination
        v-model="$parent.page"
        :length="$parent.results.page_count"
        total-visible="9"
      />
    </div>
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
          <div><slot name="type" /></div>
          <div v-if="queryFileType === 'any'">
            <a
              class="text-subtitle-1 text-decoration-none text--secondary"
              @click.prevent="setFileType"
            >
              View all
            </a>
          </div>
        </v-subheader>
      </v-col>
    </v-row>

    <v-row dense>
      <slot />
    </v-row>
    <!--     PAGINATION -->
    <!--    N.b. duplicate code with above - thanks Vue v. 2-->
    <div
      class="my-16"
      v-if="queryFileType !== 'any' && !$parent.infinite"
    >
      <v-pagination
        v-model="$parent.page"
        :length="$parent.results.page_count"
        total-visible="9"
      />
    </div>
  </v-container>
</template>

<script>
import SearchMixin from '@/mixins/SearchMixin';

export default {
  mixins: [SearchMixin],
  computed: {
    queryFileType() {
      return this.$route.query.type;
    },
  },
  methods: {
    setFileType() {
      this.search({ type: this.$parent.fileType });
    },
  },
};
</script>
