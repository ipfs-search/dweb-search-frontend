<template>
  <div class="result">
    <!-- App bar with nested container, row and col component
      for layout logo and search bar using flex-->
    <v-app-bar
      app
      color="primary"
      height="56"
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
              class="ml-2"
            >
              <div
                class="d-flex align-center"
                @click="goHome"
                style="cursor: pointer; min-width: 34px;"
              >
                <v-img
                  alt="DWEB Search Logo"
                  class="pl-1 mr-2"
                  contain
                  src="../assets/logo_white.svg"
                  width="32"
                  height="32"
                />
                <h2
                  dark
                  class="white--text d-none d-lg-block"
                >
                  DWEB <span>SEARCH</span>
                </h2>
              </div>
            </div>
            <div class="flex-grow-1">
              <SearchBar />
            </div>
            <div
              class="d-none d-lg-block"
              style="min-width: 200px"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <SearchFilters />

    <!-- TEXT FILES -->
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              Texts (230)
            </div>
            <div>
              <a class="text-subtitle-1 text-decoration-none">
                view all
              </a>
            </div>
          </v-subheader>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="green--text">Last seen 1 day ago</span>
              <span> | Size 478mb</span><span> | Mimetype text/html</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline
              albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="orange--text">Last seen 1 week ago</span>
              <span> | Size 478mb</span><span> | Mimetype audio/mpeg</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="red--text">Last seen 2 months ago</span>
              <span> | Size 478mb</span> <span> | Mimetype application/msword</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- IMAGE FILES -->
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              Images (230)
            </div>
            <div>
              <a
                href=""
                class="text-subtitle-1 text-decoration-none"
              >
                view all
              </a>
            </div>
          </v-subheader>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-row dense>
            <v-col
              v-for="n in 6"
              :key="n"
              class="d-flex child-flex"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-img
                @click="genericDialog()"
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- AUDIO FILES -->
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              Audio (64)
            </div>
            <div>
              <a
                href=""
                class="text-subtitle-1 text-decoration-none"
              >
                view all
              </a>
            </div>
          </v-subheader>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-row
            dense
          >
            <v-col
              v-for="hit in results.hits"
              :key="hit.hash"
              cols="6"
              xs="4"
              sm="4"
              md="3"
              lg="2"
            >
              <v-card
                @click="genericDialog()"
              >
                <v-img
                  :src="hit.src"
                  class="white--text align-end"
                  :aspect-ratio="1"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-icon
                    size="64"
                    color="white"
                    style="opacity: 0.3; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  >
                    mdi-music
                  </v-icon>
                  <v-card-title
                    class="text-subtitle-1 font-weight-bold"
                    v-html="hit.title"
                  />
                  <v-card-subtitle
                    class="white--text text-body-2"
                    v-html="hit.description"
                  />
                </v-img>

                <v-card-subtitle class="text-caption text-truncate">
                  <div class="my-n2">
                    <span class="red--text">Last seen {{ hit['last-seen'] }} </span><br>
                    <span v-if="hit.size">Size {{ hit.size }}</span>
                  </div>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- VIDEO FILES -->
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              Video (230)
            </div>
            <div>
              <a
                href=""
                class="text-subtitle-1 text-decoration-none"
              >
                view all
              </a>
            </div>
          </v-subheader>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
          class="my-2 mb-4"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="3"
                lg="2"
                class="mb-sm-n2 mb-n10 mt-n2"
              >
                <v-img
                  class="ma-3 mr-sm-0"
                  cover
                  aspect-ratio="1.778"
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-icon
                    size="64"
                    color="white"
                    style="opacity: 0.9; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  >
                    mdi-play
                  </v-icon>
                </v-img>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="9"
                lg="10"
                class="py-sm-0 ml-sm-n6"
              >
                <v-card-subtitle class="text-caption mb-n7 text-truncate">
                  <span class="green--text">Last seen 1 day ago</span><span> | Size 478mb</span>
                </v-card-subtitle>
                <v-card-title class="text-subtitle-1">
                  Unlimited music now
                </v-card-title>
                <v-card-subtitle class="text-body-2">
                  Listen to your favorite artists and albums artists and albums whenever and
                  wherever, online and online and offline.
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
          class="my-2 mb-4"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="3"
                lg="2"
                class="mb-sm-n2 mb-n10 mt-n2"
              >
                <v-img
                  class="ma-3 mr-sm-0"
                  cover
                  aspect-ratio="1.778"
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-icon
                    size="64"
                    color="white"
                    style="opacity: 0.9; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  >
                    mdi-play
                  </v-icon>
                </v-img>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="9"
                lg="10"
                class="py-sm-0 ml-sm-n6"
              >
                <v-card-subtitle class="text-caption mb-n7 text-truncate">
                  <span class="orange--text">Last seen 1 week ago</span><span> | Size 478mb</span>
                </v-card-subtitle>
                <v-card-title class="text-subtitle-1">
                  Unlimited music now
                </v-card-title>
                <v-card-subtitle class="text-body-2">
                  Listen to your favorite artists and albums artists and albums whenever and
                  wherever, online and online and offline.
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
          class="my-2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="3"
                lg="2"
                class="mb-sm-n2 mb-n10 mt-n2"
              >
                <v-img
                  class="ma-3 mr-sm-0"
                  cover
                  aspect-ratio="1.778"
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-icon
                    size="64"
                    color="white"
                    style="opacity: 0.9; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  >
                    mdi-play
                  </v-icon>
                </v-img>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="9"
                lg="10"
                class="py-sm-0 ml-sm-n6"
              >
                <v-card-subtitle class="text-caption mb-n7 text-truncate">
                  <span class="red--text">Last seen 2 months ago</span><span> | Size 478mb</span>
                </v-card-subtitle>
                <v-card-title class="text-subtitle-1">
                  Unlimited music now
                </v-card-title>
                <v-card-subtitle class="text-body-2">
                  Listen to your favorite artists and albums artists and albums whenever and
                  wherever, online and online and offline.
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- DIRECTORIES FILES -->
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              Directories (230)
            </div>
            <div>
              <a
                href=""
                class="text-subtitle-1 text-decoration-none"
              >
                view all
              </a>
            </div>
          </v-subheader>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="green--text">Last seen 1 day ago</span>
              <span> | Size 478mb</span><span> | 128 files</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Beatles samples and works
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline
              albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="orange--text">Last seen 1 week ago</span>
              <span> | Size 478mb</span><span> | 528 files</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="red--text">Last seen 2 months ago</span>
              <span> | Size 478mb</span> <span> | 64 files</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Beatles All - Files
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- PAGINATION -->
    <v-container>
      <template>
        <div class="my-16">
          <v-pagination
            v-model="page"
          />
        </div>
      </template>
    </v-container>
  </div>
</template>

<script>
import SearchMixin from '@/mixins/SearchMixin';
import SearchNavigationMixin from '@/mixins/SearchNavigationMixin';
import SearchBar from '@/components/SearchBar.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import DialogDetailText from '@/components/DialogDetailText.vue';
import { showDialog } from '@/helpers/dialogHelper';

export default {
  components: {
    SearchBar,
    SearchFilters,
  },

  mixins: [SearchMixin, SearchNavigationMixin],

  data: () => ({
    sizeItems: [
      '0-10mb',
      '10-100mb',
      '100mb-1gb',
      '1gb+',
    ],

    lastSeenItems: [
      '<3hr',
      '<24hr',
      '<7d',
    ],
  }),

  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },

    genericDialog() {
      showDialog(DialogDetailText, {});
    },
  },
};
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
