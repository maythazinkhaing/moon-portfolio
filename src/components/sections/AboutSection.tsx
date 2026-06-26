import { about } from "@/data/content";

export default function AboutSection() {
  return (
    <>
      {about.paragraphs.map((p, i) => (
        <p
          key={i}
          className={`text-[15.5px] leading-[1.75] text-ink ${i > 0 ? "mt-3.5" : ""}`}
        >
          {p}
        </p>
      ))}
      <div className="mt-5 flex flex-wrap gap-2">
        {about.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[14px] bg-chip px-3.5 py-[7px] text-[13px] font-semibold text-ink"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-[18px]">
        <div className="mb-[9px] text-xs font-bold uppercase tracking-[1.5px] text-accent">
          ✧ Languages
        </div>
        <div className="flex flex-wrap gap-2">
          {about.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1.5 rounded-[14px] border border-gline bg-card px-3.5 py-[7px] text-[13px] font-semibold text-ink"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {lang}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
