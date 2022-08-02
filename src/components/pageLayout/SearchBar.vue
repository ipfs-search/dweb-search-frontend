<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { enterSearchQuery } from "@/router";
import { mdiMenuDown, mdiMagnify, mdiFilter } from "@mdi/js";
import { useDisplay } from "vuetify";
import { useMobileDevices } from "@/composables/useMobileDevices";
import { searchTypes, listName, Types } from "@/helpers/typeHelper";
import SelectFilter from "@/components/shared/SelectFilter.vue";
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";

const store = useStore();
const route = useRoute();

const { smAndDown } = useDisplay();
const { hideKeyBoardOnAndroid } = useMobileDevices();

const filters = store.getters["query/filters/filterWidgets"];

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
</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <div id="search" class="flex-grow-1">
      <v-text-field
        ref="input"
        v-model="searchPhrase"
        v-closable="{ handler: 'onIphoneClick' }"
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
      >
        <template #append>
          <v-menu offset-y>
            <template #activator="{ props }">
              <div class="mr-3 text-grey d-flex align-start" v-bind="props">
                <span class="text-capitalize" data-testid="type-filter-selector-value">
                  {{ listName(fileType) }}
                </span>
                <v-icon class="d-inline-block" :icon="mdiMenuDown" />
              </div>
            </template>
            <v-list class="bg-white">
              <v-list-item
                v-for="[type, typeName] in searchTypes"
                :key="type"
                @click="fileType = Types[type]"
              >
                <v-list-item-title class="text-capitalize">
                  {{ typeName }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon v-if="smAndDown" class="mr-3" :icon="mdiFilter" data-id="filter-menu-activator" />
        </template>
      </v-text-field>
    </div>
    <v-icon
      v-if="!smAndDown"
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
