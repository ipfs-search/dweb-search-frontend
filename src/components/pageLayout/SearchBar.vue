<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
import { useRoute } from 'vue-router';
const route = useRoute()
import { enterSearchQuery } from '@/router';

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
        variant="contained"
        class="bg-white rounded-pill"
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
                >
                  mdi-menu-down
                </v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                class="bg-white"
                v-for="t in searchTypes"
                :key="t"
                @click="fileType = t"
              >
                <v-list-item-title
                  class="text-capitalize"
                >
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
      style="margin-left: 9px"
      size="34"
      color="white"
      @click="enterSearchPhrase"
    >
      mdi-magnify
    </v-icon>
  </v-container>
</template>

<style lang="scss" scoped>
.search {
  max-width: 915px;
  z-index: 10000;
}
</style>

<style lang="scss">
// FIXME: This is a hack; the style box ought to be scoped and this style should be added by
// class="border-pill" on the v-text-field, but this does not work. Most likely a bug in vuetify
.search .v-field {
  background: transparent;
  box-shadow: none;
  margin-bottom: 6px;
  margin-top: -6px;
  padding-left: 9px;
  caret-color: auto;
}
::placeholder {
  color: #c0c0c0;
  opacity: 1;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: red;
}
</style>
