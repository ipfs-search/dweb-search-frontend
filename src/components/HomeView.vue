<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import { onBeforeMount } from "vue";
import { _footerVisible } from "@/composables/footer";
import { mdiHeart } from "@mdi/js";
import store from "@/store";
import { useDisplay } from "vuetify/lib/framework.mjs";

const {height} = useDisplay();

onBeforeMount(() => {
  _footerVisible.value = true;
});
</script>

<template>
  <div class="h-100">
  <v-img src="/assets/background-02.png" cover class="bg-ipfsPrimary h-100">
  </v-img>
  <div 
    class="d-flex justify-center align-center h-100 w-100 wrapper" 
    :class="height < 600 ? 'lower-padding' : 'higher-padding'"
  >
    <v-card class="announcement pa-2 mx-auto overflow-auto h-100" max-width="700" max-height="">
        <h3>Important Announcement from <a href="ipfs-search.com">ipfs-search.com</a></h3>
      <v-card-text class="text-body-1"> 
        <p>Dear valued users and supporters, </p>
      <p>
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
    </v-card></div></div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 70px;
  left:0;
  max-height: 900px;
}

.lower-padding {
  padding-bottom: 80px;
}

.higher-padding {
  padding-bottom: 200px;
}

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
  padding: 16px;
}

#questionnaireBanner {
  max-width: 915px;
  width: 95%;
}
</style>
