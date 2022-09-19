<script setup>
import SearchBar from "@/components/pageLayout/SearchBar.vue";
</script>

<template>
  <v-img src="/assets/background-02.png" cover class="h-100 hero bg-ipfsPrimary">
    <v-container class="pa-0 fill-height d-flex mt-12">
      <v-row class="align-content-center">
        <v-col class="pa-2">
          <!--          TODO: put a better title or remove this tag-->
          <h3 class="mb-2 text-center hidden-sm-and-down text-white"></h3>
          <SearchBar />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<style lang="scss" scoped>
.hero {
  margin-top: -100px;
}

h2 {
  font-size: 120%;
  letter-spacing: 0.09em;
  font-weight: 500;
  span {
    font-weight: 500;
  }
}
h3 {
  font-family: "Heebo", sans-serif;
  letter-spacing: -0.02em;
  font-size: 150%;
  font-weight: 700;
}
.v-card__title {
  word-break: keep-all;
}
</style>
