<template>
  <div>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        :total-visible="7"
      />
    </div>
    <pdf
      :src="src"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      :page="currentPage > 0 && currentPage"
    />
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
