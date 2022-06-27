<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
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
        v-closable="{ handler: 'onClick' }"
        placeholder="Search"
        theme="light"
        autocomplete="off"
        autofocus
        density="compact"
        flat
        hide-details
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
                >{{ type }}</span>
                <v-icon
                  class="d-inline-block"
                >
                  mdi-menu-down
                </v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                v-for="t in searchTypes"
                :key="t"
                @click="type = t"
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

<script>
import { searchTypes } from '@/helpers/typeHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';

export default {
  data() {
    return {
      searchPhraseProxy: this.$store.state.query.searchPhrase,
    };
  },
  computed: {
    searchPhrase: {
      get() { return this.$store.state.query.searchPhrase; },
      set(newSearchPhrase) {
        this.$data.searchPhraseProxy = newSearchPhrase;
      },
    },
    type: {
      get() {
        return this.$store.getters['query/filters/type/toProps'].value;
      },
      set(newType) {
        if (this.type !== newType) {
          enterSearchQuery({ type: newType });
        }
      },
    },
  },
  created() {
    this.searchTypes = searchTypes;
  },
  methods: {
    hideKeyBoardOnAndroid() {
      // This is a bit experimental. It might show some side effects.
      // https://stackoverflow.com/questions/8335834/how-can-i-hide-the-android-keyboard-using-javascript
      setTimeout(() => {
        // Creating temp field
        const field = document.createElement('input');
        field.setAttribute('type', 'text');
        // Hiding temp field from peoples eyes
        // -webkit-user-modify is nessesary for Android 4.x
        field.setAttribute('style', `position:absolute;
          top: 0px;
          opacity: 0;
          -webkit-user-modify: read-write-plaintext-only;
          left:0px;`);
        document.body.appendChild(field);

        // Adding onfocus event handler for out temp field
        field.onfocus = () => {
          // This timeout of 200ms is nessasary for Android 2.3.x
          setTimeout(() => {
            field.setAttribute('style', 'display:none;');
            setTimeout(() => {
              document.body.removeChild(field);
              document.body.focus();
            }, 14);
          }, 200);
        };
        // Focusing it
        field.focus();
      }, 50);
    },

    enterSearchPhrase() {
      if (this.$route.query.q !== this.searchPhraseProxy) {
        enterSearchQuery({ q: this.searchPhraseProxy });
        // We want to hide the keyboard after search has been done on Android
        if (/android/i.test(navigator.userAgent)) {
          this.hideKeyBoardOnAndroid();
        }
      }
    },

    onClick() {
      // This is necessary for hiding the soft keyboard on iPhone
      // see v-closable="{ handler: 'onClick' }" in v-text-field
      // https://medium.com/@Taha_Shashtari/the-easy-vue-solution-to-dismiss-ios-keyboard-on-outside-click-2bb8be3c3347
      // Needs to be conditional; otherwise, (some) non-iphone devices will cause console errors
      this.$refs?.input?.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  max-width: 915px;
  height: 44px;
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
  margin-top: -4px;
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
