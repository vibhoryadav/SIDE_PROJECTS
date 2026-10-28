// Web Audio API generator for interactive sound simulation (strictly opt-in, no autoplay)

class AudioEngine {
  private ctx: AudioContext | null = null;
  private currentOsc: OscillatorNode | null = null;
  private currentGain: GainNode | null = null;
  private isPlaying = false;
  private currentMode: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, type: OscillatorType = 'sine', durationSec: number = 3) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth attack and release envelope to prevent clicks
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + durationSec);

      this.currentOsc = osc;
      this.currentGain = gain;
      this.isPlaying = true;

      osc.onended = () => {
        this.isPlaying = false;
        this.currentMode = null;
      };
    } catch (e) {
      console.warn('Audio playback not supported or interrupted', e);
    }
  }

  public playChord(frequencies: number[], durationSec: number = 4, modeName: string = 'chord') {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = modeName;
    this.isPlaying = true;

    try {
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.3);
      masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);
      masterGain.connect(this.ctx.destination);

      frequencies.forEach(freq => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + durationSec);
      });

      setTimeout(() => {
        if (this.currentMode === modeName) {
          this.isPlaying = false;
          this.currentMode = null;
        }
      }, durationSec * 1000);
    } catch (e) {
      console.warn('Audio chord playback error', e);
    }
  }

  public stop() {
    try {
      if (this.currentOsc) {
        this.currentOsc.stop();
        this.currentOsc.disconnect();
        this.currentOsc = null;
      }
      if (this.currentGain) {
        this.currentGain.disconnect();
        this.currentGain = null;
      }
    } catch {
      // Ignored
    }
    this.isPlaying = false;
    this.currentMode = null;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentMode: this.currentMode
    };
  }
}

export const soundEngine = new AudioEngine();
