<template>
  <div class="result">

    <!-- App bar with nested container, row and col component
      for layout logo and search bar using flex-->
    <v-app-bar
      app
      color="primary"
      height="64"
      light
    >
      <v-container
        fluid
        class="px-0 align-start"
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0 d-flex justify-space-between align-center"
          >
            <div
              class="ml-2 d-none d-lg-block"
              style="min-width: 200px"
            >
              <div
                class="d-flex align-center"
                @click="goHome"
                style="cursor: pointer;"
              >
                <v-img
                  alt="DWEB Search Logo"
                  class="pl-1 mr-2"
                  contain
                  src="../assets/logo_white.svg"
                  width="32"
                  height="32"
                />
                <h2 dark class="white--text">DWEB <span>SEARCH</span></h2>
              </div>
            </div>
            <div class="flex-grow-1">
              <searchbar />
            </div>
            <div
              class="d-none d-lg-block"
              style="min-width: 200px"
            >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>


    <!-- container with nested row and col components to layout filters
      Filters are made with menu components that is triggered
      via a click 'on'. The menu it self consists of list components
      containing list-items which contains a list-item-title
    -->
    <v-container
    >
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" align="end" class="text--secondary body-2">
          Filter:
          <span>
            <v-menu>
              <template v-slot:activator="{ on }">
                <span class="pt-2" v-on="on">
                  Size {{ sizeFilter }}<v-icon>mdi-menu-down</v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sizeItems"
                  :key="index"
                  @click="setSizeFilter(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>

          <span>
            <v-menu>
              <template v-slot:activator="{ on }">
                <span class="pt-2" v-on="on">
                  Last seen {{ lastSeenFilter }}
                  <v-icon>
                    mdi-menu-down
                  </v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in lastSeenItems"
                  :key="index"
                  @click="setLastSeenFilter(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row dense>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-subheader class="mt-n2 mb-n4">
            Texts (230) - view all
          </v-subheader>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card
            @click="dialog = true"
          >
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline albums whenever and wherever, online and offline.</v-card-subtitle>
            <v-card-subtitle class="green--text text-caption mt-n6 text-right">
              Last seen 1 day ago
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card>
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
            <v-card-subtitle class="orange--text text-caption mt-n6 text-right">
              Last seen 1 week ago
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card>
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
            <v-card-subtitle class="red--text text-caption mt-n6 text-right">
              Last seen 2 months ago
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-subheader class="mt-n2 mb-n4" />
        </v-col>
      </v-row>
    </v-container>


    <v-container>
      <template>
        <div class="mt-4">
          <v-pagination
            v-model="page"
          />
        </div>
      </template>
    </v-container>

    <v-dialog
      v-model="dialog"
      class=""
      scrollable
      fullscreen
    >
      <v-card
        tile
        flat
      >
        <v-card-title class="pa-0">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" xl="8" offset-xl="2" class="d-flex align-center justify-space-between">
                <div class="text-body-1" style="width: 80%">
                  Demo title
                </div>
                <v-btn
                  icon
                  @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" xl="8" offset-xl="2">
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
                <p class="text-body-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore consequatur unde culpa, rerum facere sint in saepe, inventore sapiente magni eaque assumenda dolorem cum tenetur ratione recusandae at eos iure? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero non animi labore quis voluptate laborum ab, maiores eius accusamus.</p>
              </v-col>
            </v-row>
          </v-container>
         </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import Searchbar from '@/components/Searchbar.vue'

export default {
  components: {
    Searchbar
  },

  data: () => ({
    page: 1,
    dialog: false,
    sizeFilter: '0-10mb',
    lastSeenFilter: '<3hr',

    sizeItems: [
      { title: '0-10mb' },
      { title: '10-100mb' },
      { title: '100mb-1gb' },
      { title: '1gb+' }
    ],

    lastSeenItems: [
      { title: '<3hr' },
      { title: '<24hr' },
      { title: '<7d' }
    ]
  }),

  methods: {
    setSizeFilter (index) {
      this.sizeFilter = this.sizeItems[index].title
    },

    setLastSeenFilter (index) {
      this.lastSeenFilter = this.lastSeenItems[index].title
    },

    goHome() {
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>

  h2 {
    font-size: 120%;
    letter-spacing: 0.09em;
    font-weight: 500;
    span {
      font-weight: 500;
    }
  }

  .searchbar {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
  }

</style>