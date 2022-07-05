<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
import { useRoute } from 'vue-router';
const route = useRoute()
import { enterSearchQuery } from '@/router';

import { mdiMenuDown, mdiMagnify } from '@mdi/js'
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
import { useMobileDevices } from '@/composables/useMobileDevices'
const { hideKeyBoardOnAndroid, onIphoneClick } = useMobileDevices()
import { searchTypes } from '@/helpers/typeHelper';

let searchPhraseProxy = store.state.query.searchPhrase
const searchPhrase = computed({
  get: () => store.state.query.searchPhrase,
  set: (newSearchPhrase) => {
    searchPhraseProxy = newSearchPhrase;
  },
})
const enterSearchPhrase = () => {
  if (route.query.q !== searchPhraseProxy) {
    enterSearchQuery({ q: searchPhraseProxy });
    // We want to hide the keyboard after search has been done on Android
    if (/android/i.test(navigator.userAgent)) {
      hideKeyBoardOnAndroid();
    }
  }
}

const fileType = computed({
  get: () => store.getters['query/filters/type/toProps'].value,
  set: (newType) => {
    if (fileType.value !== newType) {
      enterSearchQuery({ type: newType });
    }
  },
})
</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <div class="search flex-grow-1">
      <v-text-field
        ref="input"
        variant="plain"
        class="bg-white rounded-pill pl-5"
        v-model="searchPhrase"
        @keyup.enter="enterSearchPhrase"
        v-closable="{ handler: 'onIphoneClick' }"
        placeholder="Search"
        theme="light"
        autocomplete="off"
        autofocus
        density="compact"
        flat
        hide-details
        style="height: 42px;"
      >
        <template #append>
          <v-menu
            offset-y
          >
            <template #activator="{ props }">
              <div
                class="mr-3 text-grey d-flex align-start"
                v-bind="props"
              >
                <span
                  class="text-capitalize"
                  data-testid="type-filter-selector-value"
                >{{ fileType }}</span>
                <v-icon
                  class="d-inline-block"
                  :icon="mdiMenuDown"
                />
              </div>
            </template>
            <v-list>
              <v-list-item
                class="bg-white"
                v-for="t in searchTypes"
                :key="t"
                @click="fileType = t"
              >
                <v-list-item-title class="text-capitalize">
                  {{ t }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-text-field>
    </div>
    <v-icon
      v-if="!smAndDown"
      class="ml-2"
      size="34"
      color="white"
      @click="enterSearchPhrase"
      :icon="mdiMagnify"
    />
  </v-container>
</template>

<style lang="scss" scoped>
.search {
  max-width: 915px;
  z-index: 10000;
}
</style>


