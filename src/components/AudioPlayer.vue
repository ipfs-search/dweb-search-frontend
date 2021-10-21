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
          v-if="!$data.loading"
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
                <span class="ml-4">{{ timer }} / {{ $data.duration }}</span>
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
                v-else-if="$data.loading"
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
                <v-icon v-if="!$data.paused">
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
import { Howl, Howler } from 'howler';
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
      duration: '0:00',
      time: 0,
      sound: null,
      playerActive: false,
      interval: null,
      loading: true,
      paused: true,
    };
  },
  methods: {
    load(fileObject) {
      if (!fileObject || !fileObject.hash) {
        this.soundError('No proper file specified');
        return;
      }

      if (this.$data.interval) clearInterval(this.$data.interval);
      if (this.sound) {
        this.sound.off();// unregister any hooks
        this.sound.unload();
      }
      this.$data.error = false;
      this.$data.playerActive = true;
      this.$data.file = fileObject;
      this.$data.duration = '0:00';
      this.$data.time = 0;
      this.$data.loading = true;
      const fileExtension = getFileExtension(fileObject);
      if (!Howler.codecs(fileExtension)) {
        this.soundError('Unsupported/undetected file type');
        return;
      }
      this.sound = new Howl({
        src: [`https://gateway.ipfs.io/ipfs/${fileObject.hash}`],
        format: [fileExtension],
        html5: true,
        preload: 'metadata',
        autoplay: true,
      });
      this.sound.on('load', () => {
        this.$data.loading = false;
        this.$data.interval = setInterval(this.updateProgress, 100);
        this.$data.duration = formatTime(this.sound.duration());
      });
      this.sound.on('loaderror', (source, message) => this.soundError(message));
      this.sound.on('playerror', (source, message) => this.soundError(message));
    },

    soundError(error) {
      console.error('Sound error:', error, this.$data.file);
      this.$data.error = error;
    },

    updateProgress() {
      this.$data.paused = !this.sound.playing();
      this.$data.time = this.sound.seek();
    },

    pause() {
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },

    stop() {
      if (this.sound && this.sound.playing()) this.sound.stop();
    },

    closePlayer() {
      if (this.sound) {
        this.sound.off();
        this.sound.unload();
      }
      clearInterval(this.$data.interval);
      this.$data.playerActive = false;
    },
  },
  computed: {
    timer() {
      return formatTime(this.$data.time);
    },
    progress: {
      get() {
        return (this.$data.time / this.sound.duration()) * 100;
      },
      set(percentage) {
        if (this.sound && this.sound.state() === 'loaded') {
          this.sound.seek((percentage * this.sound.duration()) / 100);
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
