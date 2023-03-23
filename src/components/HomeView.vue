<script setup lang="ts">
import {ref} from 'vue'
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import { onBeforeMount } from "vue";
import { _footerVisible } from "@/composables/footer";
import { mdiHeart } from "@mdi/js";
import store from '@/store'

onBeforeMount(() => {
  _footerVisible.value = true;
});
</script>

<template>
  <v-img src="/assets/background-02.png" cover class="h-100 bg-ipfsPrimary">
    <v-container class="pa-0 fill-height d-flex mt-12">
      <v-row class="align-content-center">
        <v-col class="pa-2">
          <v-alert
            v-if="store.state.localStorage.questionnaireBanner"
            id="questionnaireBanner"
            color="ipfsPrimary-lighten-1"
            border
            :icon="mdiHeart"
            class="mt-3"
            position="absolute"
            location="top"
            closable
            type="info"
            @update:model-value="store.commit('localStorage/setQuestionnaireBanner', false)"
          >
            <a
              href="https://www.cognitoforms.com/Ipfssearchcom/HelpUsImproveIPFSSearchCom"
              target="_blank"
              style="text-decoration: none; color: inherit"
            >
              Got a moment to help us improve IPFS-Search? Please take
              this short <u><b>questionnaire</b></u>.
            </a>
          </v-alert>
          <v-btn
            v-else
            :icon="mdiHeart"
            color="ipfsPrimary-lighten-1"
            position="absolute"
            location="top right"
            class="mt-3 mr-3"
            @click="store.commit('localStorage/setQuestionnaireBanner', true)"
          >
          </v-btn>
          <h3 class="mb-2 text-center text-white">Searching the Universe since 2016</h3>
          <SearchBar />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<style lang="scss" scoped>
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
