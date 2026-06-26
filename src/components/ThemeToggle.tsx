import { useEffect, useRef, useState } from "react";
import type { Theme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./Icons";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  const [spin, setSpin] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSpin((s) => s + 1);
  }, [theme]);

  const spinClass =
    spin === 0
      ? ""
      : spin % 2 === 1
        ? "animate-spin-once"
        : "animate-spin-once-b";

  return (
    <button
      type="button"
      onClick={onToggle}
      title="Switch theme"
      aria-label="Switch theme"
      className="fixed top-5 right-5 sm:top-[22px] sm:right-6 z-30 grid h-12 w-12 place-items-center rounded-full border border-gline bg-glass text-ink shadow-[0_8px_22px_var(--gsh)] backdrop-blur-[16px] backdrop-saturate-[1.4] transition-all duration-200 hover:scale-110 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
    >
      <div className={`relative h-6 w-6 ${spinClass}`}>
        <SunIcon
          className={`absolute inset-0 m-auto h-[22px] w-[22px] transition-opacity duration-[450ms] ${
            theme === "sunset" ? "opacity-100" : "opacity-0"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 m-auto h-5 w-5 transition-opacity duration-[450ms] ${
            theme === "night" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
