import { IAudio, IMediaPlayer, MediaPlayerEvent } from "@/interfaces/audioInterfaces";
import MidiPlayer from "midi-player-js";
import Soundfont, { InstrumentName, Player as InstrumentPlayer } from "soundfont-player";
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

const events: MediaPlayerEvent[] = ["load", "end", "loaderror", "playerror", "play", "pause"];

let instruments: InstrumentPlayer[] = [];

let abortController: AbortController;

export class Midi implements IMediaPlayer {
  private context: IAudio;
  private audioContext: AudioContext;
  private file: IFile;
  private patchBay: Record<number, number>;
  private trackNames: Record<number, string>;
  private midiPlayer;
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
      instruments[this.patchBay[event.track]]?.play(event.noteName, this.audioContext.currentTime, {
        gain: event.velocity / 100,
      });
    } else if (event.name === "Note off" || (event.name === "Note on" && event.velocity === 0)) {
      instruments[this.patchBay[event.track]]?.stop();
    }
  };
  private autoplay: boolean;

  constructor(options: { context: IAudio; file: IFile; autoplay: boolean }) {
    this.autoplay = options.autoplay;
    this.context = options.context;
    this.file = options.file;
    this.audioContext = new AudioContext();
    this.patchBay = [];
    this.trackNames = [];
    this.midiPlayer = new MidiPlayer.Player(this.handleMidiEvent);
    this.load();
    this.once("loaderror", (message) => {
      this.context.reportError(this.file.hash, `Load Error: ${message}`);
    });
    this.midiPlayer.on("fileLoaded", () => {
      this.loaded = true;
      console.debug("loaded midifile", this.file);
      this.context.loaded = true;
      this.context.loading = false;
      this.context.duration = this.midiPlayer.getSongTime();

      if (this.autoplay) this.play();
    });
    this.midiPlayer.on("playing", () => {
      this.context.time = this.midiPlayer.getSongTime() - this.midiPlayer.getSongTimeRemaining();
    });
    this.midiPlayer.on("fileLoaded", () => this.callEvent("load"));
    this.midiPlayer.on("endOfFile", () => this.callEvent("end"));
  }

  play() {
    if (this.loaded) {
      console.debug("midiplayer play", this.file);
      this.context.playing = true;
      if (this.midiPlayer.isPlaying()) {
        console.debug("Already playing", this.file);
        return;
      }
      this.midiPlayer.play();
      this.callEvent("play");
    }
  }
  pause() {
    if (this.loaded) {
      this.midiPlayer.pause();
      this.callEvent("pause");
      this.context.playing = false;
    }
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

  duration() {
    return this.midiPlayer.getSongTime();
  }

  off() {
    events.forEach((event) => {
      this.onceEventStore[event] = [];
      this.onEventStore[event] = [];
    });
  }

  unload() {
    // undefined/null is not possible
    abortController?.abort("unloading player");
    this.midiPlayer?.stop();
    this.midiPlayer = new MidiPlayer.Player(this.handleMidiEvent);
  }

  onceEventStore: Record<MediaPlayerEvent, ((...args: any[]) => void)[]> = {
    playerror: [],
    loaderror: [],
    load: [],
    end: [],
    play: [],
    pause: [],
  };

  onEventStore: Record<MediaPlayerEvent, ((...args: any[]) => void)[]> = {
    playerror: [],
    loaderror: [],
    load: [],
    end: [],
    play: [],
    pause: [],
  };

  callEvent(event: MediaPlayerEvent, ...args: any[]) {
    this.onEventStore[event].forEach((callback) => callback(...args));
    this.onceEventStore[event].forEach((callback) => {
      console.log("calling event once", event, callback);
      callback(...args);
    });
    this.onceEventStore[event] = [];
  }

  on(event: MediaPlayerEvent, callback: (...args: any[]) => void) {
    this.onEventStore[event].push(callback);
  }

  once(event: MediaPlayerEvent, callback: (...args: any[]) => void) {
    console.debug("midiplayer push once", event, callback);
    this.onceEventStore[event].push(callback);
  }

  async load() {
    console.debug("loading midi player", this.file);
    abortController?.abort("loading a new file");
    this.midiPlayer?.stop();
    try {
      this.loaded = false;
      this.context.loading = true;
      this.context.loaded = false;
      if (!instruments.length) {
        console.debug("loading instruments");
        instruments = await Promise.all([
          ...instrumentList.map((instrument) =>
            Soundfont.instrument(this.audioContext, instrument)
          ),
        ]);
      }
      abortController = new AbortController();
      fetch(`https://gateway.ipfs.io/ipfs/${this.file.hash}`, { signal: abortController.signal })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.arrayBuffer();
        })
        .then((buffer) => {
          console.debug("Midi file fetched", this.file);
          this.midiPlayer.loadArrayBuffer(buffer);
        })
        .catch((error) => this.callEvent("loaderror", error));
    } catch (error: unknown) {
      this.callEvent("loaderror");
    }
  }
}
