<template>
  <div>
    <v-app-bar
      v-if="$data.playerActive"
      class="audio-player"
      dark
      bottom
      height="98"
      fixed
      app
    >
      <v-card
        tile
        width="100%"
        height="98"
        style="margin-left: 0 !important;"
      >
        <v-progress-linear
          v-if="!$data.player.loading"
          v-model="progress"
          color="white"
          class="`my-0 progress-bar"
          height="3"
        />

        <v-list>
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title v-html="$data.file.title" />
              <v-list-item-subtitle>
                <span v-html="$data.file.author" />
                <span class="ml-4">{{ timer }} / {{ duration }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer />

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-icon
                v-if="$data.error"
                :title="$data.error"
              >
                mdi-alert
              </v-icon>
              <v-btn
                icon
                v-else-if="$data.player.loading"
              >
                <v-progress-circular
                  indeterminate
                />
              </v-btn>
              <v-btn
                v-else
                icon
                @click="pause"
              >
                <v-icon v-if="$data.player.playing">
                  mdi-pause
                </v-icon>
                <v-icon v-else>
                  mdi-play
                </v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn
                icon
                @click="closePlayer"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-app-bar>
  </div>
</template>

<script>
import { Howler } from 'howler';
import { audioPlayer } from '@/plugins/howler.js';
import { getFileExtension } from '@/helpers/fileHelper';

export const AudioEvents = {
  stop: 'AudioPlayer/stop',
  load: 'AudioPlayer/select',
};

function formatTime(secs) {
  if (secs === undefined) return '-';
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;

  return `${minutes} : ${(seconds < 10 ? '0' : '')}${seconds}`;
}

export default {
  data() {
    return {
      error: false,
      file: {},
      player: audioPlayer,
      playerActive: false,
    };
  },
  methods: {
    load(fileObject) {
      if (!fileObject || !fileObject.hash) {
        this.soundError('No proper file specified');
        return;
      }

      this.$data.error = false;
      this.$data.playerActive = true;
      this.$data.file = fileObject;
      const fileExtension = getFileExtension(fileObject);
      if (!Howler.codecs(fileExtension)) {
        this.soundError('Unsupported/undetected file type');
        return;
      }
      this.$data.player.sound = {
        src: [`https://gateway.ipfs.io/ipfs/${fileObject.hash}`],
        format: [fileExtension],
      };
      this.player.on('loaderror', (source, message) => this.soundError(message));
      this.player.on('playerror', (source, message) => this.soundError(message));
    },

    soundError(error) {
      console.error('Sound error:', error, this.$data.file);
      this.$data.error = error;
    },

    play() {
      this.player.play();
    },
    pause() {
      if (this.player.playing) {
        this.player.pause();
      } else {
        this.player.play();
      }
    },
    stop() {
      this.player.stop();
    },

    closePlayer() {
      this.player.close();
      this.$data.playerActive = false;
    },
  },
  computed: {
    timer() {
      return formatTime(this.player.time);
    },
    duration() {
      return formatTime(this.player.duration);
    },
    progress: {
      get() {
        return (this.player.time / this.player.duration) * 100;
      },
      set(percentage) {
        if (this.player.loaded) {
          this.player.seek((percentage * this.player.duration) / 100);
        }
      },
    },
  },
  mounted() {
    Object.keys(AudioEvents).forEach((event) => {
      this.$root.$on(AudioEvents[event], this[event]);
    });
  },
  beforeDestroy() {
    this.$root.$off(Object.values(AudioEvents));
    this.closePlayer();
  },
};
</script>

<style lang="scss">
.progress-bar {
  cursor: pointer
}
</style>
