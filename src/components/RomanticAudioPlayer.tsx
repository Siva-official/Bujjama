import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RomanticAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Romantic Pentatonic Chord Progression (Frequencies in Hz: C major / A minor romantic dreamy tones)
  const notes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    987.77, // B5
    1046.50 // C6
  ];

  // Dreamy arpeggio melody patterns
  const sequence = [
    [0, 2, 4, 6], // Cmaj7
    [1, 3, 5, 7], // Em7
    [4, 6, 7, 9], // C high
    [3, 5, 7, 8], // Am9
    [2, 4, 6, 8], // G6
    [0, 3, 5, 7], // Fmaj7
  ];

  const playChime = (freq: number, delay: number, duration: number = 2.4) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    setTimeout(() => {
      if (!isPlayingRef.current || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm low-pass filter for a dreamy, soft music-box / rhodes tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.setValueAtTime(4.5, ctx.currentTime);
      vibratoGain.gain.setValueAtTime(2.2, ctx.currentTime);
      vibrato.connect(osc.frequency);
      vibrato.start();

      // Soft envelope (gentle attack, lingering decay)
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    }, delay * 1000);
  };

  const startMelodyLoop = () => {
    let step = 0;

    const playNextBar = () => {
      if (!isPlayingRef.current) return;
      const currentChord = sequence[step % sequence.length];
      
      currentChord.forEach((noteIdx, i) => {
        playChime(notes[noteIdx], i * 0.45, 3.0);
      });

      // Occasional high celestial sparkle tone
      if (Math.random() > 0.4) {
        playChime(notes[notes.length - 1], 1.2, 3.5);
      }

      step++;
      timerRef.current = window.setTimeout(playNextBar, 2200);
    };

    playNextBar();
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      startMelodyLoop();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-40">
      <motion.button
        id="romantic-audio-toggle"
        onClick={togglePlay}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel border border-pink-500/20 text-xs text-pink-200/90 hover:text-pink-100 hover:border-pink-500/40 shadow-lg shadow-pink-950/40 transition-all backdrop-blur-md cursor-pointer group"
        title={isPlaying ? "Mute romantic ambiance" : "Play romantic ambiance"}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-pink-400 group-hover:text-pink-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-pink-300" />
          )}
          {isPlaying && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-pink-400"
            />
          )}
        </div>
        <span className="font-sans-modern tracking-wider text-[11px] font-medium hidden sm:inline">
          {isPlaying ? "Ambiance: Soft Melody" : "Play Ambiance"}
        </span>
        <Music className={`w-3 h-3 text-pink-400/70 transition-transform ${isPlaying ? 'rotate-12' : ''}`} />
      </motion.button>
    </div>
  );
};
