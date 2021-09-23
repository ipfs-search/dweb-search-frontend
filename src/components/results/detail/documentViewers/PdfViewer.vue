<template>
  <div>
    <div class="text-center">
      <v-pagination
        v-model="$data.currentPage"
        :length="$data.pageCount"
        :total-visible="7"
      />
    </div>
    <pdf
      :src="$props.src"
      @num-pages="$data.pageCount = $event"
      @page-loaded="$data.currentPage = $event"
      :page="$data.currentPage > 0 && $data.currentPage"
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
