<template>
  <div>
    <v-container class="d-flex justify-center">
      <div class="search flex-grow-1">
        <v-text-field
          v-model="query"
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
          @keyup.enter="onClickSearch"
        >
          <template v-slot:append>
            <v-menu
              style="top: -12px"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <div class="mr-n3 grey--text d-flex align-center" v-on="on">
                  <span>{{ contentType }}</span>
                  <v-icon
                   class="d-inline-block">
                    mdi-menu-down
                  </v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="showSelectedContentType(index)"
                >
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:append-outer>
            <template>
              <v-icon
                class="ml-n1"
                large
                color="white"
                @click="onClickSearch"
              >
                mdi-magnify
              </v-icon>
            </template>
          </template>
        </v-text-field>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {

  data: () => ({
    query: null,
    contentType: 'Any',
    items: [
      { title: 'Any' },
      { title: 'Texts' },
      { title: 'Images' },
      { title: 'Music' },
      { title: 'Videos' },
      { title: 'Directories' }
    ]
  }),

  methods: {
    showSelectedContentType (index) {
      // console.log(index); // eslint-disable-line
      this.contentType = this.items[index].title
      this.onClickSearch();
    },

    onClickSearch () {
      if (this.query) {
        // TODO: Add url encoder for query
        this.$router.push({ path: `/result?query=${this.query}&type=${this.contentType}` }).catch(err => { console.log(err)})
      }
    },
  },

  mounted() {
    if (this.$route.query.query) {
      this.query = this.$route.query.query;
    }
    if (this.$route.query.type) {
      this.contentType = this.$route.query.type;
    }
  }

}
</script>

<style lang="scss" scoped>
  .search {
    max-width: 960px;
  }
</style>
