<template>
  <v-bottom-sheet
    v-model="playerActive"
    hide-overlay
    dark
    persistent
    no-click-animation
  >
    <v-card
      tile
      v-if="$data.sound"
    >
      <v-progress-linear
        :value="$data.progress"
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
              <span class="ml-4">{{ $data.timer }} / {{ $data.duration }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer />

          <v-list-item-icon>
            <v-btn
              icon
              disabled
            >
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn
              icon
              @click="pause"
            >
              <v-icon
                v-if="$data.sound.playing"
              >
                mdi-pause
              </v-icon>
              <v-icon
                v-if="!$data.sound.playing"
              >
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
              disabled
            >
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { Howl } from 'howler';
import { getFileExtension } from '@/helpers/fileHelper';

function formatTime(secs) {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = (secs - minutes * 60) || 0;

  return `${minutes} : ${(seconds < 10 ? '0' : '')}${seconds}`;
}

export default {
  data() {
    return {
      file: {},
      timer: '0:00',
      duration: '0:00',
      progress: 0,
      sound: null,
      playerActive: false,
    };
  },
  methods: {
    load({ title, hash }) {
      this.sound = new Howl({
        src: [`https://gateway.ipfs.io/ipfs/${hash}`],
        format: [getFileExtension(title)],
        html5: true,
        preload: 'metadata',
        autoplay: true,
      });
    },

    pause() {
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },

    stop() {
      this.sound.stop();
    },

    step() {
      // Determine our current seek position.
      const seek = this.sound.seek() || 0;
      this.timer = formatTime(Math.round(seek));
      this.progress = (((seek / this.sound.duration()) * 100) || 0);
      if (this.$data.sound.playing()) setTimeout(this.step, 1000);
    },

  },
  watch: {
    '$store.state.player.selectedAudioFile': (fileObject) => {
      if (this.sound) this.sound.unload();
      this.$data.file = fileObject;
      this.load(fileObject);
    },
  },
  beforeDestroy() {
    this.sound.unload();
  },
};
</script>
