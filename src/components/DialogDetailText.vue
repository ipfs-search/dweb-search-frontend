<template>
  <dialog-detail-base-layout>

    <template v-slot:dialog-detail>

      <v-row>
        <v-col>
          <div class="text-caption mb-n7 text-truncate">
            <span class="green--text">Last seen 1 day ago</span><span> | Size 478mb</span><span> | Mimetype text/html</span>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-h5">
            Unlimited Music Now
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-body-1 mt-n3">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template v-slot:default="{ open }">
                    <div>
                      {{ `${open ? 'Hide' : 'Show'}`}} meta data
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
                          v-for="item in desserts"
                          :key="item.name"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.calories }}</td>
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

      <v-row>
        <v-col>
          <div class="text-body-1">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum maxime officia recusandae! Cum id molestiae doloribus officia possimus optio omnis, consequuntur at. In aliquam saepe numquam enim pariatur sint quos. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore vel temporibus maxime dignissimos, deserunt animi veritatis nulla velit? Quidem pariatur repellendus ab excepturi voluptatem neque veritatis, natus maxime! Cumque, voluptatem.</p>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-body-1">
            <v-card style="text-align: center">
                <v-card-text>
                    <v-btn outlined icon class="ma-2" @click.native="playing ? pause() : play()">
                      <v-icon v-if="!playing || paused">mdi-play</v-icon>
                      <v-icon v-else>mdi-pause</v-icon>
                    </v-btn>
                    <v-btn outlined icon class="ma-2" @click.native="stop()">
                        <v-icon>mdi-stop</v-icon>
                    </v-btn>
                    <v-btn outlined icon class="ma-2" disabled>
                        <v-icon>mdi-volume-high</v-icon>
                    </v-btn>
                    <v-btn outlined icon class="ma-2" disabled>
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                    <v-btn outlined icon class="ma-2" disabled>
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-body-1">
            <video-player :options="videoOptions" />
          </div>
        </v-col>
      </v-row>

    </template>

  </dialog-detail-base-layout>
</template>

<script>
import { Howl } from 'howler';
import DialogDetailBaseLayout from '@/components/DialogDetailBaseLayout.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {

  components: {
    DialogDetailBaseLayout,
    VideoPlayer,
  },

  data () {
    return {
      videoOptions: {
        controls: true,
        sources: [
          {
            src: '//vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4',
          }
        ]
      },
      playing: false,
      paused: false,
      sound: null,
      percentage: 0,
      currentTime: '00:00:00',
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
    }
  },

  methods: {
    play() {
      if (this.playing) {
        return null;
      }
      this.sound = new Howl({
        src: [require('../assets/examples_player_audio_rave_digger.mp3')]
      });
      this.playing = true;
      this.sound.play();
    },
    pause() {
      this.paused = !this.paused;
      (this.paused) ? this.sound.pause() : this.sound.play()
    },
    stop() {
      this.playing = false;
      this.sound.stop();
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '~video.js/dist/video-js.css';
</style>