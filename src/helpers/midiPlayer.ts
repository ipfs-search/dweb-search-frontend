import { IMediaPlayer } from "@/interfaces/audioInterfaces";
import MidiPlayer from "midi-player-js";
import Soundfont, { Player as InstrumentPlayer, InstrumentName } from "soundfont-player";
import { IFile } from "@/interfaces/IFile";

const instrumentList: InstrumentName[] = [
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

interface IMidiEvent {
  name: string;
  track: number;
  string: string;
  noteName: string;
  velocity: number;
}
export class Midi implements IMediaPlayer {
  private audioContext: AudioContext;
  private file: IFile;
  private patchBay: Record<number, number>;
  private trackNames: Record<number, string>;
  private midiPlayer;
  private instruments: InstrumentPlayer[] = [];
  private loaded = false;
  private handleMidiEvent = (event: IMidiEvent) => {
    if (event.name === "Sequence/Track Name") {
      this.trackNames[event.track] = event.string?.toLowerCase();
    } else if (event.name === "Note on" && event.velocity > 0) {
      if (!this.patchBay[event.track]) {
        // eslint-disable-next-line no-nested-ternary
        this.patchBay[event.track] = this.trackNames[event.track]?.includes("drum")
          ? instrumentList.length - 1
          : this.trackNames[event.track]?.includes("percussion")
          ? instrumentList.length - 2
          : Math.floor(Math.random() * (instrumentList.length - 2));
      }
      // if (!patchBay.includes(event.track)) patchBay.push(event.track);
      this.instruments[this.patchBay[event.track]]?.play(
        event.noteName,
        this.audioContext.currentTime,
        {
          gain: event.velocity / 100,
        }
      );
    } else if (event.name === "Note off" || (event.name === "Note on" && event.velocity === 0)) {
      this.instruments[this.patchBay[event.track]]?.stop();
    }
  };

  constructor(options: { file: IFile; autoplay: boolean }) {
    this.file = options.file;
    this.audioContext = new AudioContext();
    this.patchBay = [];
    this.trackNames = [];
    this.midiPlayer = new MidiPlayer.Player(this.handleMidiEvent);
    this.load();
    this.midiPlayer.on("fileLoaded", () => {
      this.loaded = true;
      if (options.autoplay) this.play();
    });
  }

  duration() {
    return (this.loaded && this.midiPlayer.getSongTime()) || 0;
  }
  play() {
    this.loaded && this.midiPlayer.play();
  }
  pause() {
    this.loaded && this.midiPlayer.pause();
  }

  seek(progress?: number) {
    if (this.loaded) {
      if (progress) {
        this.midiPlayer.skipToSeconds(progress);
      } else {
        return this.midiPlayer.getSongTime() - this.midiPlayer.getSongTimeRemaining();
      }
    }
  }

  off() {
    return undefined;
  }

  unload() {
    this.midiPlayer = new MidiPlayer.Player(this.handleMidiEvent);
  }

  // once: (event: string, callback: (source?: unknown, message?: string | number) => void) => void;
  once(event: string, callback: () => void) {
    switch (event) {
      case "playerror":
        // TODO: implement playerror
        return;
      case "loaderror":
        // TODO: implement loaderror
        return;
      case "load":
        this.midiPlayer.on("fileLoaded", callback);
        return;
      case "end":
        this.midiPlayer.on("endOfFile", callback);
        return;
    }
  }

  async load() {
    console.log("loading midi player");
    this.loaded = false;
    this.midiPlayer?.stop();
    if (!this.instruments.length) {
      this.instruments = await Promise.all([
        ...instrumentList.map((instrument) => Soundfont.instrument(this.audioContext, instrument)),
      ]);
    }
    fetch(`https://gateway.ipfs.io/ipfs/${this.file.hash}`).then((response) => {
      response.arrayBuffer().then((buffer) => {
        this.midiPlayer.loadArrayBuffer(buffer);
      });
    });
  }
}
