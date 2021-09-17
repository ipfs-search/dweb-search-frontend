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
          v-model="progress"
          color="white"
          class="my-0"
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
                v-if="loading"
              />
              <v-btn
                v-else
                icon
                @click="pause"
              >
                <v-icon v-if="!paused">
                  mdi-pause
                </v-icon>
                <v-icon v-if="paused">
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
    };
  },
  methods: {
    load({ title, hash }) {
      if (this.$data.interval) clearInterval(this.$data.interval);
      this.$data.duration = '0:00';
      this.$data.time = 0;
      this.sound = new Howl({
        src: [`https://gateway.ipfs.io/ipfs/${hash}`],
        format: [getFileExtension(title)],
        html5: true,
        preload: 'metadata',
        autoplay: true,
      });
      this.sound.on('load', () => {
        this.$data.interval = setInterval(this.updateProgress, 100);
        this.$data.duration = formatTime(this.sound.duration());
      });
    },
    updateProgress() {
      this.$data.time = this.sound.seek();
    },
    pause() {
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },

    seek(percentage) {
      console.log('seeking', percentage);
      this.sound.pause();
      // this.sound.seek((this.sound.duration * percentage) / 100);
      this.sound.seek(this.sound.seek() + 1);
      console.log(this.sound.seek());
      this.sound.play();
    },

    stop() {
      console.log('gotta stop now');
      this.sound.stop();
    },

    closePlayer() {
      if (this.sound) this.sound.unload();
      this.$data.playerActive = false;
      this.$store.dispatch('player/selectAudioFile', undefined);
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
    paused() {
      return !this.sound.playing();
    },
    loading() {
      return this.sound.state() === 'loading';
    },
  },
  watch: {
    '$store.state.player.selectedAudioFile': function (fileObject) {
      if (this.$data.sound) this.$data.sound.unload();
      if (fileObject) {
        this.$data.file = fileObject;
        this.load(fileObject);
        this.$data.playerActive = true;
      } else {
        this.$data.playerActive = false;
      }
    },
  },
  mounted() {
    this.$root.$on('AudioPlayer/stop', this.stop);
  },
  beforeDestroy() {
    clearInterval(this.$data.interval);
    this.$data.sound.unload();
    this.$root.$off('AudioPlayer/stop');
  },
};
</script>
