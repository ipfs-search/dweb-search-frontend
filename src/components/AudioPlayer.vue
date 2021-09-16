<template>
  <v-bottom-sheet
    v-model="playerActive"
    hide-overlay
    dark
    persistent
    no-click-animation
  >
    <v-card tile>
      <v-progress-linear
        :value="progress"
        color="white"
        class="my-0"
        height="3"
      />

      <v-list>
        <v-list-item dark>
          <v-list-item-content>
            <v-list-item-title v-html="$props.file.title" />
            <v-list-item-subtitle>
              <span v-html="$props.file.author" />
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
import { getFileExtension } from '@/helpers/fileHelper.js';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: undefined,
      timer: '0:00',
      duration: '0:00',
      progress: 0,
      playing: false,
      paused: false,
      sound: null,
      playerActive: false,
      model: null,
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
      if (!this.playerActive) {
        this.playerActive = true;
      }
      this.play();
    },

    play() {
      const self = this;
      if (this.playing) {
        return null;
      }
      this.sound = new Howl({
        src: [`https://gateway.ipfs.io/ipfs/${this.file.hash}`],
        format: [getFileExtension(this.file.title)],
        onplay() {
          // Display the duration.
          self.duration = self.formatTime(Math.round(self.sound.duration()));
          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        },
        onseek() {
          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        },
      });

      this.sound.play();
      this.playing = true;
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

    step() {
      // Determine our current seek position.
      const seek = this.sound.seek() || 0;
      this.timer = this.formatTime(Math.round(seek));
      this.progress = (((seek / this.sound.duration()) * 100) || 0);

      // If the sound is still playing, continue stepping.
      if (this.sound.playing()) {
        requestAnimationFrame(this.step.bind(this));
      }
    },

    formatTime(secs) {
      const minutes = Math.floor(secs / 60) || 0;
      const seconds = (secs - minutes * 60) || 0;

      return `${minutes} : ${(seconds < 10 ? '0' : '')}${seconds}`;
    },

  },
  beforeDestroy() {
    this.sound.stop();
    this.sound = null;
    this.playerActive = false;
  },
};
</script>
