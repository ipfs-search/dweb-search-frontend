<template>
  <div class="home">
    <v-app-bar
      app
      height="56"
      class="px-4"
      elevate-on-scroll
      light
    >
      <v-container
        class="px-0"
      >
        <v-row>
          <v-col
            cols="12"
            xl="8"
            offset-xl="2"
            class="d-flex justify-space-between align-center"
          >
            <div
              class="d-flex align-center"
              :class="$vuetify.breakpoint.mdAndUp ? 'ml-6' : ''"
            >
              <v-img
                alt="ipfs-search.com logo"
                contain
                src="../assets/logo-black.svg"
                width="168"
                :aspect-ratio="6.00840336"
              />
            </div>
            <v-spacer />
            <v-btn
              v-for="(link, i) in links"
              :key="i"
              :href="link.href"
              text
              small
              class="my-2 mx-1 hidden-sm-and-down"
            >
              {{ link.title }}
            </v-btn>

            <settings-menu
              :is-home="isHome"
            />

            <v-menu
              bottom
              left
              class=""
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  class="my-2 mx-0 mr-n2 hidden-md-and-up"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(link, i) in links"
                  :key="i"
                  :href="link.href"
                >
                  <v-list-item-title>
                    {{ link.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-img
      src="../assets/background-02.png"
      aspect-ratio="1.83"
      class="hero"
    >
      <v-container class="pa-0 fill-height align-content-end">
        <v-row>
          <v-col class="white--text">
            <h3 class="mb-2 text-center hidden-sm-and-down">
              Search the Distributed&#160;Web
            </h3>
            <SearchBar />
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <v-container class="mx-auto pt-4">
      <v-row>
        <v-col
          cols="12"
          xl="8"
          offset-xl="2"
          :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
        >
          <v-container class="pa-0">
            <v-row align-center>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-wrench
                    </v-icon>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div class="headline">
                      Publicly available search
                    </div>
                  </v-card-title>
                  <v-card-text>
                    We wish to provide publicly available search and discovery services in the
                    interest of our users, funded through donations and/or subscriptions and/or
                    opt-in advertisements. This would allow us to sustain ourselves while being able
                    to provide public search functionality for free.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-share-variant
                    </v-icon>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div class="headline">
                      For external organisations
                    </div>
                  </v-card-title>
                  <v-card-text>
                    We recognise that the expertise and team spirit attained during the development
                    of the public service can be harnessed to implement similar services for
                    external organisations, specifically by providing private search through private
                    clouds and/or ipfs clusters.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-earth
                    </v-icon>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div class="headline">
                      Next generation internet
                    </div>
                  </v-card-title>
                  <v-card-text>
                    In the long run, we aspire to scale out and implement truly
                    decentralised/distributed search for the next generation internet, providing
                    strong guarantees for the integrity of the service, meeting the interests ofthe
                    users as well as the openness of our architecture and data.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-open-source-initiative
                    </v-icon>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div class="headline">
                      World class documentation
                    </div>
                  </v-card-title>
                  <v-card-text>
                    It is our personal experience that many FOSS projects become overly
                    dependent on a very select group of developers, effectively creating a closed
                    community. Besides being approachable and actively engaging in conversations,
                    documentation is a key component to enable others to contribute to a project,
                    improving upon it, using it pinpointing essential mistakes.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-account-multiple
                    </v-icon>
                  </v-card-text>
                  <v-card-title
                    primary-title
                    center
                  >
                    <div class="headline">
                      Pragmatic solution
                    </div>
                  </v-card-title>
                  <v-card-text>
                    Since its very inception, we wanted to create
                    a search engine that was explicitly open with regards to its
                    intellectual property. As a part of this, we have repeatedly
                    attempted to automatically publish snapshots of our index to
                    the IPFS. We have yet to find a pragmatic solution. We are
                    confident that during the scope of this project, we will be
                    able to publish our full index to IPFS such that others may
                    fork our project.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-card
                  flat
                  class="transparent"
                >
                  <v-card-text class="text-center">
                    <v-icon
                      size="42px"
                      class="ml-n4 ipfsSecondary--text text--lighten-1"
                    >
                      mdi-flash
                    </v-icon>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div class="headline">
                      Darker visions
                    </div>
                  </v-card-title>
                  <v-card-text>
                    Like many who recognise themselves as part of
                    a freedom-loving community, we have harboured the dream of
                    the internet as a truly liberating architecture. Like many,
                    we also have darker visions wherein current tendencies
                    commodify our most intimate identity and our behaviour. We
                    feel that the only true solution to this is to fully
                    distribute the internet’s architecture. We feel that this is
                    possible theoretically, as well as practically.
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col />
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar';
import SettingsMenu from '@/components/SettingsMenu';

export default {
  components: {
    SearchBar,
    SettingsMenu,
  },

  data: () => ({
    isHome: true,
    links: [
      {
        title: 'Donate',
        href: 'https://opencollective.com/ipfs-search#category-CONTRIBUTE',
      },
      {
        title: 'Blog',
        href: 'https://blog.ipfs-search.com/',
      },
      {
        title: 'API',
        href: 'https://api.ipfs-search.com/',
      },
      {
        title: 'Docs',
        href: 'https://ipfs-search.readthedocs.io/en/latest/',
      },
      {
        title: 'Code',
        href: 'https://github.com/ipfs-search/',
      },
      {
        title: 'Contact',
        href: 'mailto:info@ipfs-search.com',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
  .hero {
    max-height: 45vh;
    min-height: 45vh;
    background-color: lighten(#0e3344, 10%);
  }
  h2 {
    font-size: 120%;
    letter-spacing: 0.09em;
    font-weight: 500;
    span {
      font-weight: 500;
    }
  }
  h3 {
    font-family: 'Heebo', sans-serif;
    letter-spacing: -0.02em;
    font-size: 150%;
    font-weight: 700;
  }
  .v-card__title {
    word-break: keep-all;
  }
</style>
