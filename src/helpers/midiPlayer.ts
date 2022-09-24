import { IExternalPlayer } from "@/interfaces/audioInterfaces";
import MidiPlayer from "midi-player-js";
import Soundfont from "soundfont-player";

export class Player implements IExternalPlayer {
  constructor(options: { src: string }) {
    this.src = options.src;
  }
  src: string;

  duration: () => number;
  play: () => void;
  pause: () => void;
  seek: (progress?: number) => number;
  off: () => void;
  unload: () => void;
  once: (event: string, callback: (source?: unknown, message?: string | number) => void) => void;

  load = () => {
    console.log("midi player starting");
    const audioContext = new AudioContext();
    const patchBay = [];
    const trackNames = [];
    const instrumentList = [
      "ocarina",
      "electric_piano_1",
      "bright_acoustic_piano",
      "marimba",
      "electric_guitar_clean",
      "lead_6_voice",
      "pan_flute",
      "electric_guitar_jazz",
      "choir_aahs",
      "cello",
      "woodblock",
      "synth_drum",
    ];
    Promise.all([
      fetch(`https://gateway.ipfs.io/ipfs/${file.hash}`),
      ...instrumentList.map((instrument) => Soundfont.instrument(audioContext, instrument)),
    ]).then(([response, ...instruments]) => {
      response.arrayBuffer().then((buffer) => {
        midiPlayer?.stop();
        midiPlayer = new MidiPlayer.Player((event) => {
          // console.log(event, patchBay);
          if (event.name === "Sequence/Track Name") {
            trackNames[event.track] = event.string?.toLowerCase();
          } else if (event.name === "Note on" && event.velocity > 0) {
            if (!patchBay[event.track]) {
              // eslint-disable-next-line no-nested-ternary
              patchBay[event.track] = trackNames[event.track]?.includes("drum")
                ? instrumentList.length - 1
                : trackNames[event.track]?.includes("percussion")
                ? instrumentList.length - 2
                : Math.floor(Math.random() * (instrumentList.length - 2));
            }
            // if (!patchBay.includes(event.track)) patchBay.push(event.track);
            instruments[patchBay[event.track]]?.play(event.noteName, audioContext.currentTime, {
              gain: event.velocity / 100,
            });
          } else if (
            event.name === "Note off" ||
            (event.name === "Note on" && event.velocity === 0)
          ) {
            instruments[patchBay[event.track]]?.stop();
          }
        });
        midiPlayer.loadArrayBuffer(buffer);
        midiPlayer.play();
      });
    });
  };
}
