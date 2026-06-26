/**
 * Tiny Web Audio helper — cute synth UI sounds, no audio files needed.
 * A single AudioContext is lazily created on first use (after a user
 * gesture, so browsers allow it) and shared across the app.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** Gentle blip on hover. Ascending pitch per nav tab = a little rising melody. */
export function playHover(freq: number): void {
  const ac = getCtx();
  const t = ac.currentTime + 0.005;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.075, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0005, t + 0.18);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + 0.2);
}

/** Cheery rising "bloop" + sparkle — plays when a menu tab opens. */
export function playPop(): void {
  const ac = getCtx();
  const t0 = ac.currentTime + 0.01;
  const notes: [number, number][] = [
    [659.25, 0.0],
    [987.77, 0.085],
  ];
  notes.forEach(([f, dt]) => {
    const t = t0 + dt;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.16);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + 0.18);
  });
  const s = ac.createOscillator();
  const sg = ac.createGain();
  s.type = 'triangle';
  s.frequency.setValueAtTime(1318.5, t0 + 0.1);
  sg.gain.setValueAtTime(0.0001, t0 + 0.1);
  sg.gain.linearRampToValueAtTime(0.06, t0 + 0.12);
  sg.gain.exponentialRampToValueAtTime(0.0004, t0 + 0.3);
  s.connect(sg).connect(ac.destination);
  s.start(t0 + 0.1);
  s.stop(t0 + 0.32);
}

/** Gentle descending "boop" — plays when a tab closes. */
export function playClose(): void {
  const ac = getCtx();
  const t0 = ac.currentTime + 0.01;
  const notes: [number, number][] = [
    [880, 0.0],
    [587.33, 0.08],
  ];
  notes.forEach(([f, dt]) => {
    const t = t0 + dt;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(f * 0.7, t + 0.08);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.17);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + 0.19);
  });
}

/**
 * A calm, chill song for the singing chibi — soft warm tones that loop
 * seamlessly until stopped. Call startCalmSong() to begin, stopCalmSong()
 * to end. The loop schedules one phrase at a time slightly ahead of time.
 */

let calmTimer: number | undefined;
let calmActive = false;
let master: GainNode | null = null;

// A soft, warm tone — slow attack + long release for a chill feel.
function calmTone(ac: AudioContext, f: number, t: number, d: number): void {
  const voices: [number, number, OscillatorType][] = [
    [f, 0.085, 'sine'],
    [f / 2, 0.045, 'sine'],
    [f * 2.001, 0.018, 'triangle'],
  ];
  voices.forEach(([freq, peak, type]) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.1);
    g.gain.setValueAtTime(peak, t + d * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0006, t + d * 1.1);
    o.connect(g).connect(master ?? ac.destination);
    o.start(t);
    o.stop(t + d * 1.18);
  });
}

/** Start the chill song looping. Safe to call when already playing. */
export function startCalmSong(): void {
  if (calmActive) return;
  const ac = getCtx();
  calmActive = true;
  // A master volume so we can snap the sound to silence instantly on stop
  // (notes are scheduled ahead of time and would otherwise keep playing).
  master = ac.createGain();
  master.gain.value = 1;
  master.connect(ac.destination);
  // Soft lo-fi chord arpeggio (Cmaj · Am · Fmaj · G). Edit [freq, seconds] to taste.
  const phrase: [number, number][] = [
    [523.25, 0.46], [659.25, 0.46], [783.99, 0.46], [659.25, 0.46],
    [440, 0.46], [523.25, 0.46], [659.25, 0.46], [523.25, 0.46],
    [349.23, 0.46], [440, 0.46], [523.25, 0.46], [440, 0.46],
    [392, 0.46], [493.88, 0.46], [587.33, 0.46], [392, 0.58],
  ];
  const total = phrase.reduce((a, b) => a + b[1], 0);
  let next = ac.currentTime + 0.12;
  const loop = () => {
    if (!calmActive) return;
    let t = next;
    for (const [f, d] of phrase) {
      if (f > 0) calmTone(ac, f, t, d);
      t += d;
    }
    next += total;
    calmTimer = window.setTimeout(loop, total * 1000 - 140);
  };
  loop();
}

/** Stop the chill song immediately (master volume snaps to silence). */
export function stopCalmSong(): void {
  calmActive = false;
  if (calmTimer) window.clearTimeout(calmTimer);
  if (master && ctx) {
    const now = ctx.currentTime;
    const m = master;
    m.gain.cancelScheduledValues(now);
    m.gain.setValueAtTime(m.gain.value, now);
    m.gain.linearRampToValueAtTime(0.0001, now + 0.07);
    window.setTimeout(() => {
      try {
        m.disconnect();
      } catch {
        /* already disconnected */
      }
    }, 200);
    master = null;
  }
}
