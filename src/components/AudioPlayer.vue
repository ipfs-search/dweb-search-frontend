<template>
  <div>
    <v-app-bar
      v-if="playerActive"
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
          v-if="!loading"
          v-model="progress"
          color="white"
          class="`my-0 progress-bar"
          height="3"
        />

        <v-list>
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title v-html="sourceFile.title" />
              <v-list-item-subtitle>
                <span v-html="sourceFile.author" />
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
                v-else-if="loading"
                loading
              />
              <v-btn
                v-else-if="playing"
                icon
                @click="pause"
              >
                <v-icon>
                  mdi-pause
                </v-icon>
              </v-btn>
              <v-btn
                v-else
                icon
                @click="play"
              >
                <v-icon>
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
import AudioControlsMixin from '../mixins/AudioControlsMixin';

export default {
  mixins: [
    AudioControlsMixin,
  ],
  beforeDestroy() {
    this.audioPlayer.close();
  },
};
</script>

<style lang="scss">
.progress-bar {
  cursor: pointer
}
</style>
