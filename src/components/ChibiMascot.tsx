import { useCallback, useEffect, useRef, useState } from "react";
import { startCalmSong, stopCalmSong } from "../lib/sounds";

const BASE = import.meta.env.BASE_URL;
const frameSrc = (n: number) => `${BASE}assets/moon-${n}.png`;

// Mouth cycle while singing: open / wide / small "o".
const SING_SEQUENCE = [2, 3, 1, 2, 3, 2, 1, 3];

interface Note {
  id: number;
  char: string;
  color: string;
  left: string;
  size: string;
}

const NOTE_CHARS = ["♪", "♫", "✦", "♩", "♡"];
const NOTE_COLORS = ["#ff9ec4", "#ffd28a", "#b6a6f5", "#ff8db0", "#a6e3c0"];

export default function ChibiMascot() {
  const [frame, setFrame] = useState(4); // 4 = resting smile
  const [singing, setSinging] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const noteId = useRef(0);
  const frameTimer = useRef<number>();
  const noteTimer = useRef<number>();

  const spawnNote = useCallback(() => {
    const id = ++noteId.current;
    const note: Note = {
      id,
      char: NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      left: `${8 + Math.random() * 74}%`,
      size: `${18 + Math.random() * 16}px`,
    };
    setNotes((cur) => [...cur, note]);
    window.setTimeout(
      () => setNotes((cur) => cur.filter((n) => n.id !== id)),
      1700,
    );
  }, []);

  const stop = useCallback(() => {
    window.clearInterval(frameTimer.current);
    window.clearInterval(noteTimer.current);
    stopCalmSong();
    setSinging(false);
    setBounce(false);
    setFrame(4);
  }, []);

  const sing = useCallback(() => {
    if (singing) {
      stop();
      return;
    }
    let i = 0;
    setSinging(true);
    setFrame(2);
    setBounce(true);
    frameTimer.current = window.setInterval(() => {
      i = (i + 1) % SING_SEQUENCE.length;
      setFrame(SING_SEQUENCE[i]);
      setBounce((b) => !b);
    }, 300);
    noteTimer.current = window.setInterval(spawnNote, 430);
    spawnNote();
    startCalmSong();
  }, [singing, spawnNote, stop]);

  useEffect(() => {
    return () => {
      window.clearInterval(frameTimer.current);
      window.clearInterval(noteTimer.current);
      stopCalmSong();
    };
  }, []);

  return (
    <div
      onClick={sing}
      title="tap me to sing"
      role="button"
      aria-label="Tap the mascot to sing"
      className="fixed bottom-24 right-3 sm:bottom-7 sm:right-7 z-[25] animate-bob cursor-pointer select-none mobile-land:hidden"
    >
      {/* Speech bubble — right-aligned so it never clips the viewport edge */}
      {singing ? (
        <div className="absolute -top-3.5 right-0 z-[5] whitespace-nowrap rounded-2xl bg-accent px-[13px] py-1.5 text-xs font-bold text-white shadow-[0_6px_16px_var(--gsh)]">
          la~ la~ la~ ♫
        </div>
      ) : (
        <div className="animate-float-hint absolute -top-3.5 right-0 z-[5] whitespace-nowrap rounded-2xl border border-gline bg-glass px-[13px] py-1.5 text-xs font-semibold text-ink shadow-[0_6px_16px_var(--gsh)] backdrop-blur-[12px]">
          tap me to sing ♪
        </div>
      )}

      {/* Floating notes */}
      {notes.map((n) => (
        <span
          key={n.id}
          className="animate-note pointer-events-none absolute top-[24%] z-[6] [text-shadow:0_2px_6px_rgba(0,0,0,0.15)]"
          style={{ left: n.left, fontSize: n.size, color: n.color }}
        >
          {n.char}
        </span>
      ))}

      {/* Stacked frames — only the active one is visible (cross-fade) */}
      <div
        className="relative h-28 w-28 sm:h-[150px] sm:w-[150px] transition-transform duration-150 [filter:drop-shadow(0_12px_20px_var(--gsh))]"
        style={{ transform: `scale(${singing ? (bounce ? 1.06 : 0.98) : 1})` }}
      >
        {[4, 1, 2, 3].map((n) => (
          <img
            key={n}
            src={frameSrc(n)}
            alt={n === 4 ? "Moon, the chibi mascot" : ""}
            draggable={false}
            className="absolute inset-0 h-full w-full select-none"
            style={{ opacity: frame === n ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
