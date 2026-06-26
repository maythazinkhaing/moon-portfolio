import { experience } from '../../data/content';

export default function ExperienceSection() {
  return (
    <div className="flex flex-col gap-4">
      {experience.map((job) => (
        <div key={job.company} className="rounded-[18px] border border-gline bg-card p-[18px] px-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2.5">
            <h3 className="font-display text-[17px] font-semibold text-ink">{job.role}</h3>
            <span className="whitespace-nowrap text-xs font-bold text-accent2">{job.period}</span>
          </div>
          <div className="mt-0.5 text-[13.5px] font-semibold text-accent">{job.company}</div>
          {job.location && <div className="mb-2.5 mt-0.5 text-[12px] text-soft">{job.location}</div>}
          <ul className="flex list-none flex-col gap-[7px]">
            {job.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[13.5px] leading-[1.5] text-soft">
                <span className="text-accent">✦</span>
                {b}
              </li>
            ))}
          </ul>
          {job.stack && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <span key={s} className="rounded-full bg-chip px-2.5 py-0.5 text-[11.5px] font-semibold text-accent2">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
