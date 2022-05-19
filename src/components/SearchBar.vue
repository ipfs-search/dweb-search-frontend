<template>
  <v-container class="d-flex justify-center">
    <div class="search flex-grow-1">
      <v-text-field
        v-model="searchPhrase"
        ref="input"
        placeholder="Search"
        light
        rounded
        height="42"
        autocomplete="off"
        autofocus
        dense
        solo
        validate-on-blur
        hide-details
        @keyup.enter="enterSearchPhrase"
        v-closable="{ handler: 'onClick' }"
      >
        <template #append>
          <v-menu
            style="top: -12px"
            offset-y
          >
            <template #activator="{ on }">
              <div
                class="mr-n3 grey--text d-flex align-center"
                v-on="on"
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
        <template
          #append-outer
          v-if="!$vuetify.breakpoint.smAndDown"
        >
          <v-icon
            style="margin-top: -2px;"
            size="34"
            color="white"
            @click="enterSearchPhrase"
          >
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
    </div>
  </v-container>
</template>

<script>
import { searchTypes } from '@/helpers/typeHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';

export default {
  created() {
    this.searchTypes = searchTypes;
  },
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
  max-width: 960px;
  z-index: 10000;
}
</style>
