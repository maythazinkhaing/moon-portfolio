import { skills } from '../../data/content';

export default function SkillsSection() {
  return (
    <>
      <p className="mb-[18px] text-[14.5px] leading-[1.6] text-soft">
        Tools &amp; languages I reach for to build delightful, reliable interfaces.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span key={skill} className="rounded-2xl bg-chip px-[18px] py-2.5 text-sm font-semibold text-ink">
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}
