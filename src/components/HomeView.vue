<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import { onBeforeMount } from "vue";
import { _footerVisible } from "@/composables/footer";
import { mdiHeart } from "@mdi/js";
import store from "@/store";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { height } = useDisplay();

onBeforeMount(() => {
  _footerVisible.value = true;
});
</script>

<template>
  <div class="h-100">
    <v-img src="/assets/background-02.png" cover class="bg-ipfsPrimary h-100"> </v-img>
    <div
      class="d-flex justify-center align-center h-100 w-100 wrapper"
      :class="height < 600 ? 'lower-padding' : 'higher-padding'"
    >
      <v-card class="announcement pa-2 mx-auto overflow-auto h-100" max-width="700" max-height="">
        <h3>Important Announcement from <a href="ipfs-search.com">ipfs-search.com</a></h3>
        <v-card-text class="text-body-1">
          <p>Dear valued users and supporters, we have some grave news.</p>
          <p>
            <a href="ipfs-search.com">ipfs-search.com</a> is committed to providing the neutral,
            privacy-centered search engine for Web3. We are passionate about this vision and are
            proud to pioneer it.
          </p>
          <p>
            But we are running high costs, and without a new source of funding,
            <b>we will shut down june the 7th, 2023</b>, we don't know for how long. Until then, API
            access is still available, but we will block search here on the site.
          </p>
          <p>
            We truly hope this is just a bump in the road, and not the end of our journey. To help
            us continue our mission, please
            <a
              href="https://twitter.com/intent/tweet?text=%F0%9F%9A%80Dear%20community%2C%20ipfs-search.com%20faces%20financial%20challenges%20threatening%20our%20public%20APIs.%20We%20need%20your%20support%20to%20continue%20championing%20open%2C%20unbiased%20search%20for%20%23Web3%20and%20%23IPFS.%20Share%20our%20mission%20%26%20support%20us%20at%20https%3A%2F%2Fopencollective.com%2Fipfs-search%20%23SaveIPFSSearch"
              target="_blank"
              rel="noopener noreferrer"
            >
              share
            </a>
            our situation in the community. You can also support us directly by visiting our
            <a href="https://opencollective.com/ipfs-search" target="_blank">OpenCollective</a>, and
            we are available for questions at
            <a href="mailto:info@ipfs-search.com" target="_blank">info@ipfs-search.com</a>.
          </p>
          <p>We will announce any further developments here and on Twitter.</p>
          <p>Thank you for your understanding and support. Sincerely,</p>
          <p>The <a href="ipfs-search.com">ipfs-search.com</a> Team</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 70px;
  left: 0;
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
