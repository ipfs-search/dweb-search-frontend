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
        <h3>An Urgent Appeal from <a href="ipfs-search.com">ipfs-search.com</a></h3>
        <v-card-text class="text-body-1">
          <p>Dear Valued Users &amp; Supporters,</p>

          <p>
            Since 2016 we have been providing neutral, privacy-friendly Open Source search for Web3.
            Faced with funding challenges, we now risk
            <strong>imminent hibernation of our public service</strong>.
          </p>

          <p>
            We stand at a critical crossroads, committed to maintaining our crucial role in the Web3
            ecosystem amidst operational costs and our personal sustenance needs. Unless additional
            funding comes through, we will need to shut down our public APIs in the coming weeks. As
            of now, site search is already suspended, but API access remains.
          </p>

          <p>
            We see this hurdle not as the end of our journey, but a challenging bend in the road. To
            help us steer through, please share our situation within the community and consider
            supporting us directly through
            <a href="https://opencollective.com/ipfs-search">OpenCollective</a>. We're always here
            to answer your questions at
            <a href="mailto:info@ipfs-search.com">info@ipfs-search.com</a>.
          </p>

          <p>We'll share updates here and on Twitter.</p>

          <p>Thank you for your understanding and unwavering support.</p>

          <p>Sincerely,</p>

          <p>The <a href="http://ipfs-search.com/">ipfs-search.com</a> Team</p>

          <p>
            Mathijs de Bruin<br />
            Frido Emans<br />
            Aad Versteeden
          </p>
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
