// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import { audioPlayer } from '@/plugins/audioPlugin';
import { reactive, computed } from '@vue/composition-api';

export const audioData = reactive({
  audioError: null,
  audioPlayer,
});

export function soundError(error) {
  console.error('Sound error:', error);
  console.debug(audioPlayer);
  audioData.audioError = error;
}

export function loadSoundFile(soundFile) {
  try {
    audioPlayer.load(soundFile, {
      onloaderror: (source, message) => soundError(message),
      onplayerror: (source, message) => soundError(message),
    });
  } catch (e) {
    soundError(e);
  }
}

export function play() {
  audioPlayer.play();
}

export function pause() {
  audioPlayer.pause();
}

export function stop() {
  audioPlayer.stop();
}

export function closePlayer() {
  audioPlayer.close();
}

/**
 * @param secs
 * @returns {string}
 */
export function formatTime(secs) {
  if (secs === undefined) return '-';
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;

  return `${minutes} : ${(seconds < 10 ? '0' : '')}${seconds}`;
}

export const loading = computed(() => audioPlayer.loading);
export const playing = computed(() => audioPlayer.playing);
export const loaded = computed(() => audioPlayer.loaded);
export const sourceFile = computed(() => audioPlayer.sourceFile);
export const playerActive = computed(() => audioPlayer.sourceFile && audioPlayer.sound);
export const timer = computed(() => formatTime(audioPlayer.time));
export const duration = computed(() => formatTime(audioPlayer.duration));
export const progress = computed({
  get() {
    return (audioPlayer.time / audioPlayer.duration) * 100;
  },
  set(percentage) {
    if (audioPlayer.loaded) {
      audioPlayer.seek((percentage * audioPlayer.duration) / 100);
    }
  },
});

export default {
};
