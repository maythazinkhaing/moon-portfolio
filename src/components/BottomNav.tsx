import type { ComponentType } from 'react';
import type { SectionKey } from "../data/content";
import { navItems } from "../data/content";
import { playHover } from "../lib/sounds";
import { BriefcaseIcon, MailIcon, SparkleIcon, UserIcon } from "./Icons";

const ICONS: Record<SectionKey, ComponentType<{ className?: string }>> = {
  about: UserIcon,
  experience: BriefcaseIcon,
  skills: SparkleIcon,
  contact: MailIcon,
};

const HOVER_NOTE: Record<SectionKey, number> = {
  about: 523.25,
  experience: 659.25,
  skills: 783.99,
  contact: 987.77,
};

interface Props {
  onOpen: (key: SectionKey) => void;
}

export default function BottomNav({ onOpen }: Props) {
  return (
    <nav className="fixed bottom-5 sm:bottom-[26px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-[30px] border border-gline bg-bar p-[9px] px-2.5 sm:px-3 shadow-[0_16px_44px_var(--gsh)] backdrop-blur-[22px] backdrop-saturate-150">
      {navItems.map(({ key, label }) => {
        const Icon = ICONS[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onOpen(key)}
            onMouseEnter={() => playHover(HOVER_NOTE[key])}
            className="flex flex-col items-center gap-[3px] rounded-[18px] px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-[9px] text-[10px] xs:text-[11px] sm:text-[11.5px] font-semibold text-soft transition-colors duration-200 hover:text-accent hover:animate-float-hint"
          >
            <Icon className="h-[22px] w-[22px]" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
