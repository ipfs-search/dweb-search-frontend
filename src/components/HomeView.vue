<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import { onBeforeMount } from "vue";
import { _footerVisible } from "@/composables/footer";
import { mdiHeart } from "@mdi/js";
import store from "@/store";

onBeforeMount(() => {
  _footerVisible.value = true;
});
</script>

<template>
  <v-img src="/assets/background-02.png" cover class="h-100 bg-ipfsPrimary">
    <v-card class="announcement pa-2 ma-16 h-75 overflow-auto" >
      <v-card-title>
        <h3>Important Announcement from <a href="ipfs-search.com">ipfs-search.com</a></h3>
      </v-card-title>
      <v-card-text class="text-body-1"> 
        <p>Dear valued users and supporters, </p>
      <p class="text-body-1">
        We regret to inform you that due to current financial constraints, we are faced with the
        difficult decision of shutting down our public APIs in the coming weeks.
      </p>
      <p>
        <a href="ipfs-search.com">ipfs-search.com</a> has always been committed to providing a
        neutral, privacy-centric search engine for the Interplanetary Filesystem. It's a vision
        we're proud to champion and a service we're passionate about.
      </p>
      <p>
        We hope to still be able to find new backers to support this vision. However, to continue
        this mission and maintain our operations, which amount to $12500 monthly, we need support.
        As a cry for help, we will block the search on the site. API access is still available for
        now.
      </p>
      <p>
        We believe that <a href="ipfs-search.com">ipfs-search.com</a> plays a crucial role in the
        IPFS ecosystem. Now more than ever, we rely on the recognition and support from our
        community, including influential actors in the decentralized web, to help us navigate
        through these challenging times.
      </p>
      <p>
        We truly hope this is not the end of our journey but rather a stepping stone towards a more
        sustainable future for <a href="ipfs-search.com">ipfs-search.com</a>. Please share our
        situation and mission with those who believe in a more open and accessible web. You can also
        support us directly by visiting our
        <a href="https://opencollective.com/ipfs-search" target="_blank">OpenCollective</a>, and we are available
        for questions at <a href="mailto:info@ipfs-search.com" target="_blank">info@ipfs-search.com</a>.
      </p>
      <p> Thank you for your understanding and support. </p>
      <p>Sincerely,</p>
      <p> 
        The <a href="ipfs-search.com">ipfs-search.com</a> Team 
        </p>
      </v-card-text>
    </v-card>
  </v-img>
</template>

<style lang="scss" scoped>
.announcement {
  opacity: 0.8;
}

.announcement p {
    margin-bottom: 12px;
}

h3 {
  font-family: "Heebo", sans-serif;
  letter-spacing: -0.02em;
  font-size: 150%;
  font-weight: 700;
}

#questionnaireBanner {
  max-width: 915px;
  width: 95%;
}
</style>
