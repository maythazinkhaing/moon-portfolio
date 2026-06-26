import type { SectionKey } from "../data/content";
import { tabMeta } from "../data/content";
import { LockIcon } from "./Icons";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";

const SECTIONS: Record<SectionKey, () => JSX.Element> = {
  about: AboutSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  contact: ContactSection,
};

interface Props {
  section: SectionKey;
  onClose: () => void;
}

/** A cute, browser-window-styled modal that pops open per nav tab. */
export default function TabWindow({ section, onClose }: Props) {
  const meta = tabMeta[section];
  const Body = SECTIONS[section];

  return (
    <div
      onClick={onClose}
      className="animate-overlay fixed inset-0 z-40 flex items-center justify-center bg-[rgba(30,20,55,0.42)] p-4 backdrop-blur-[6px] sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-screen-label="popup"
        role="dialog"
        aria-label={meta.title}
        className="animate-pop-in flex max-h-[85dvh] w-full max-w-[560px] flex-col overflow-hidden rounded-3xl border border-gline bg-glass shadow-[0_30px_80px_var(--gsh),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[28px] backdrop-saturate-150"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-gline bg-card px-4 py-3">
          <div className="flex shrink-0 gap-[7px]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="h-[13px] w-[13px] rounded-full bg-[#ff6b81]"
            />
            <span className="h-[13px] w-[13px] rounded-full bg-[#ffd267]" />
            <span className="h-[13px] w-[13px] rounded-full bg-[#7ad79a]" />
          </div>
          <div className="flex max-w-[78%] flex-1 items-center justify-center gap-[7px] rounded-[13px] bg-chip px-3.5 py-1.5 text-[12.5px] font-semibold text-soft">
            <LockIcon className="h-3 w-3" />
            <span className="text-accent2">🌙</span> {meta.url}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px] text-lg text-soft transition-colors hover:bg-chip hover:text-ink"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 pb-[30px] pt-[26px] sm:px-[30px]">
          <h2 className="mb-[18px] flex items-center gap-[9px] whitespace-nowrap font-display text-[27px] font-bold text-ink ">
            <span className="text-accent">✿</span>
            {meta.title}
          </h2>
          <Body />
        </div>
      </div>
    </div>
  );
}
