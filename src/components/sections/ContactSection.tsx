import { contact, type ContactLink } from '../../data/content';
import { BriefcaseIcon, LinkedInIcon, MailIcon } from '../Icons';

const TILE: Record<ContactLink['tile'], string> = {
  accent: 'bg-accent',
  accent2: 'bg-accent2',
  gradient: 'bg-[image:linear-gradient(135deg,var(--accent),var(--accent2))]',
};

const ICON: Record<ContactLink['icon'], (p: { className?: string }) => JSX.Element> = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
  briefcase: BriefcaseIcon,
};

export default function ContactSection() {
  return (
    <>
      <p className="mb-[18px] text-[15px] leading-[1.6] text-soft">
        Let's build something cute together — say hi anytime ♡
      </p>
      <div className="flex flex-col gap-[11px]">
        {contact.map((c) => {
          const Icon = ICON[c.icon];
          return (
            <a
              key={c.kind}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-[13px] rounded-2xl border border-gline bg-card px-[18px] py-3.5 text-ink no-underline transition-transform duration-200 hover:translate-x-1"
            >
              <span className={`grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[11px] text-white ${TILE[c.tile]}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[1px] text-soft">{c.kind}</span>
                <span className="text-sm font-semibold">{c.value}</span>
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}
