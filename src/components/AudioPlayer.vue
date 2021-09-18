<template>
  <div>
    <v-app-bar
      v-if="$data.playerActive"
      dark
      bottom
      app
    >
      <v-card
        tile
        width="100%"
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
              <v-progress-circular
                indeterminate
                v-if="$data.loading"
              />
              <v-btn
                v-else
                icon
                @click="pause"
              >
                <v-icon v-if="!$data.paused">
                  mdi-pause
                </v-icon>
                <v-icon v-if="$data.paused">
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
import { Howl } from 'howler';
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
      if (!fileObject || !fileObject.hash || !fileObject.title) return;

      if (this.$data.interval) clearInterval(this.$data.interval);
      if (this.sound) {
        this.sound.off('load');
        this.sound.unload();
      }
      this.$data.playerActive = true;
      this.$data.file = fileObject;
      this.$data.duration = '0:00';
      this.$data.time = 0;
      this.$data.loading = true;

      this.sound = new Howl({
        src: [`https://gateway.ipfs.io/ipfs/${fileObject.hash}`],
        format: [getFileExtension(fileObject.title)],
        html5: true,
        preload: 'metadata',
        autoplay: true,
      });
      this.sound.on('load', () => {
        this.$data.loading = false;
        this.$data.interval = setInterval(this.updateProgress, 100);
        this.$data.duration = formatTime(this.sound.duration());
      });
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
        this.sound.off('load');
        this.sound.unload();
      }
      clearInterval(this.$data.interval);
      Object.keys(AudioEvents).forEach((event) => {
        this.$root.$off(event);
      });
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
    this.$root.$on(AudioEvents.load, this.load);
    this.$root.$on(AudioEvents.stop, this.stop);
    // TODO: fix this, unclear why it doesn't work
    // Object.keys(AudioEvents).forEach((event) => {
    //   this.$root.$on(event, this[event]);
    // });
  },
  beforeDestroy() {
    this.closePlayer();
  },
};
</script>

<style>
.progress-bar {
  cursor: pointer
}
</style>
