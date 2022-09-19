<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { enterSearchQuery } from "@/router";
import { mdiMenuDown, mdiMagnify, mdiFilter } from "@mdi/js";
import { useDisplay } from "vuetify";
import { useMobileDevices } from "@/composables/useMobileDevices";
import { searchTypes, listName, Types, TypeListNames, TypeIcons } from "@/helpers/typeHelper";

const store = useStore();
const route = useRoute();

const { smAndDown, smAndUp, mobile } = useDisplay();
const { hideKeyBoardOnAndroid } = useMobileDevices();

const anyFiltersApplied = computed(() => store.getters["query/filters/anyFiltersApplied"]);

let searchPhraseProxy = store.state.query.searchPhrase;
const searchPhrase = computed({
  get: () => store.state.query.searchPhrase,
  set: (newSearchPhrase) => {
    searchPhraseProxy = newSearchPhrase;
  },
});
const enterSearchPhrase = () => {
  if (route.query.q !== searchPhraseProxy) {
    enterSearchQuery({ q: searchPhraseProxy });
    // We want to hide the keyboard after search has been done on Android
    if (/android/i.test(navigator.userAgent)) {
      hideKeyBoardOnAndroid();
    }
  }
};

const fileType = computed({
  get: () => store.getters["query/filters/type/toProps"].value,
  set: (newType) => {
    if (fileType.value !== newType) {
      enterSearchQuery({ type: newType });
    }
  },
});

import { playlistVisible } from "@/composables/audioControls";
</script>

<template>
  <v-container class="d-flex justify-center">
    <div id="search" class="flex-grow-1">
      <v-text-field
        id="searchfield"
        ref="input"
        v-model="searchPhrase"
        v-closable="{ handler: 'onIphoneClick' }"
        :style="{ width: playlistVisible ? (mobile ? '70px' : '180px') : '100%' }"
        variant="plain"
        class="bg-white rounded-pill pl-5"
        placeholder="Search"
        theme="light"
        autocomplete="off"
        autofocus
        density="compact"
        flat
        hide-details
        style="height: 42px"
        @keyup.enter="enterSearchPhrase"
        @focus="playlistVisible = false"
      >
        <template v-if="route.name !== 'Home'" #append>
          <!--          type menu -->
          <v-menu v-if="!playlistVisible" offset-y location="left">
            <!-- FixMe: console warning about activator not being a reactive object-->
            <template #activator="{ props }">
              <div v-if="smAndUp" class="mr-3 text-grey d-flex align-start" v-bind="props">
                <span class="text-capitalize" data-testid="type-filter-selector-value">
                  {{ listName(fileType) }}
                </span>
                <v-icon class="d-inline-block" :icon="mdiMenuDown" />
              </div>
              <div v-else v-bind="props">
                <v-icon class="d-inline-block" :icon="TypeIcons[fileType]" />
              </div>
            </template>
            <v-list class="bg-white">
              <v-list-item
                v-for="[type, typeName] in searchTypes.filter(
                  ([t, n]) => n !== TypeListNames.unfiltered
                )"
                :key="type"
                :prepend-icon="TypeIcons[type]"
                @click="fileType = Types[type]"
              >
                <v-list-item-title class="text-capitalize">
                  {{ typeName }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon
            v-if="!playlistVisible && smAndDown && route.name !== 'Home'"
            :class="anyFiltersApplied && `text-ipfsSecondary`"
            class="mr-3"
            :icon="mdiFilter"
            data-id="filter-menu-activator"
          />
          <v-icon
            v-if="playlistVisible"
            class="mr-3"
            :icon="mdiMagnify"
            @click="playlistVisible = false"
          />
        </template>
      </v-text-field>
    </div>
    <v-icon
      v-if="!smAndDown && !playlistVisible"
      class="ml-2"
      size="34"
      color="white"
      :icon="mdiMagnify"
      @click="enterSearchPhrase"
    />
  </v-container>
</template>

<style lang="scss" scoped>
#search {
  max-width: 915px;
  z-index: 10000;
}
</style>
<style>
#search input {
  text-overflow: ellipsis;
}
</style>
