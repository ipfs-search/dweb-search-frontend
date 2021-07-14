<template>
  <div>
    <!-- Content -->
    <div>
      <!-- Subheader -->
      <v-row>
        <v-col>
          <div class="text-caption mb-n7 text-truncate">
            <span class="green--text">Last seen 1 day ago</span>
            <span> | Size 478mb</span><span> | Mimetype text/html</span>
          </div>
        </v-col>
      </v-row>

      <!-- Title -->
      <v-row>
        <v-col>
          <div class="text-h5 mb-n3">
            Unlimited Music Now
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- Left - video or preview image with title and subcaption above -->
        <v-col
          cols="12"
          md="7"
        >
          <!-- Previewed video or image that goes along with the played audio track -->
          <v-row>
            <v-col>
              <v-img
                src="https://picsum.photos/510/300?random"
                aspect-ratio="1.7"
              />
            </v-col>
          </v-row>
        </v-col>

        <!-- Right - list with related audio files first one is playing -->
        <v-col
          cols="12"
          md="5"
        >
          <v-list
            two-line
            class="mt-n2"
          >
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              />

              <v-divider
                v-else-if="item.divider"
                :key="index"
              />

              <v-list-item
                class="d-flex"
                v-else
                :key="item.title"
                @click="startPlayer(item.title)"
                :class="item.title === selected ? 'highlight' : ''"
              >
                <v-list-item-avatar
                  size="42"
                  tile
                >
                  <v-img :src="item.avatar">
                    <v-icon
                      v-if="(item.title === selected) && !paused"
                      size="24"
                      color="white"
                      style="opacity: 0.9;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);"
                    >
                      mdi-play
                    </v-icon>
                    <v-icon
                      v-if="(item.title === selected) && paused"
                      size="24"
                      color="white"
                      style="opacity: 0.9;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);"
                    >
                      mdi-pause
                    </v-icon>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.title"
                    :class="item.title === selected ? 'ipfsSecondary--text text--darken-1' : ''"
                  />
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
      </v-row>

      <!-- Meta data -->
      <v-row>
        <v-col>
          <div class="text-body-1 mt-n3">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template v-slot:default="{ open }">
                    <div>
                      {{ `${open ? 'Hide' : 'Show'}` }} meta data
                    </div>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="ml-n2 mr-0">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Calories
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="dessert in desserts"
                          :key="dessert.name"
                        >
                          <td>{{ dessert.name }}</td>
                          <td>{{ dessert.calories }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Music player appears at bottom when click on a list item -->
    <v-bottom-sheet
      v-model="playerActive"
      hide-overlay
      dark
      persistent
      no-click-animation
    >
      <v-card tile>
        <v-progress-linear
          :value="0"
          class="my-0"
          height="3"
        />

        <v-list>
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title>The Walker</v-list-item-title>
              <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer />

            <v-list-item-icon>
              <v-btn icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn
                icon
                @click="pause()"
              >
                <v-icon
                  v-if="!paused"
                >
                  mdi-pause
                </v-icon>
                <v-icon
                  v-if="paused"
                >
                  mdi-play
                </v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
    <v-sheet
      v-if="playerActive"
      height="100"
    />
  </div>
</template>

<script>
import { Howl } from 'howler';
import graveDigger from '@/assets/examples_player_audio_rave_digger.mp3';

export default {

  components: {
    // VideoPlayer,
  },

  data() {
    return {
      selected: undefined,
      playing: false,
      paused: false,
      sound: null,
      playerActive: false,
      model: null,
      /* eslint-disable */
      items: [
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ 1<span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui aa',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ 2<span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: false },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: false },
      ],
      /* eslint-enable */
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },

  methods: {
    startPlayer(selected) {
      this.selected = selected;
      if (this.playing) {
        this.sound.stop();
        this.playing = false;
        this.paused = false;
      }
      this.playerActive = true;
      this.play();
    },

    play() {
      if (this.playing) {
        return null;
      }
      this.sound = new Howl({
        src: [graveDigger],
      });
      this.playing = true;
      this.sound.play();
      console.log('HEEEE', this.sound.seek());
      return null;
    },

    pause() {
      this.paused = !this.paused;
      if (this.paused) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },

    stop() {
      this.playing = false;
      this.sound.stop();
    },
  },

  beforeDestroy() {
    this.sound.stop();
    this.sound = null;
  },
};
</script>

<style lang="scss" scoped>
.highlight {
  background: rgba(100, 100, 100, 0.1);
}
</style>
