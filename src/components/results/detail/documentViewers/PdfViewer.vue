<template>
  <div>
    <v-alert
      border="left"
      color="red lighten-2"
      v-if="error"
    >
      <i>Error loading preview</i>
    </v-alert>
    <v-alert
      border="left"
      color="blue lighten-4"
      v-if="loading"
    >
      <i>Loading preview</i>
      <v-progress-linear
        :value="$data.progress * 100"
      />
    </v-alert>
    <pdf
      :src="$props.src"
      @num-pages="$data.pageCount = $event"
      @page-loaded="$data.currentPage = $event"
      @loaded="$data.loading = false"
      @progress="$data.progress = $event"
      @error="$data.error = $event"
      :page="$data.currentPage > 0 && $data.currentPage"
    />
    <div class="text-center">
      <v-pagination
        v-model="$data.currentPage"
        :length="$data.pageCount"
        :total-visible="7"
      />
    </div>
  </div>
</template>

<script>

// FIXME: it seems there is an error in vue-pdf because some resizeSensor throws a console error
import pdf from 'vue-pdf';

export default {
  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 1,
      pageCount: 0,
      loading: true,
      progress: 0,
      error: false,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  methods: {
    increasePage() {
      this.currentPage = Math.min(this.currentPage + 1, this.pageCount);
    },
    decreasePage() {
      this.currentPage = Math.max(this.currentPage - 1, 1);
    },
  },
};

</script>
