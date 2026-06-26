import { profile } from '../data/content';

export default function Hero() {
  return (
    <div className="animate-fade-up w-full max-w-[430px] rounded-[24px] xs:rounded-[30px] border border-gline bg-glass p-5 xs:p-7 sm:p-[34px] px-5 xs:px-7 sm:px-[38px] mobile-land:p-4 mobile-land:px-5 shadow-[0_22px_60px_var(--gsh)] backdrop-blur-[20px] backdrop-saturate-[1.4]">
      <div className="mb-2 xs:mb-2.5 text-[12px] xs:text-[13px] font-semibold uppercase tracking-[3px] text-accent">✿ hello, i'm</div>
      <h1 className="mb-3 xs:mb-3.5 font-display text-[28px] xs:text-[34px] sm:text-[46px] mobile-land:text-[24px] font-bold leading-[1.05] text-ink">
        {profile.name}
      </h1>
      <div className="mb-4 inline-flex items-center gap-[7px] rounded-[20px] bg-chip px-[15px] py-[7px] text-sm font-semibold text-ink">
        ♡ you can call me <span className="font-bold text-accent2">{profile.nickname}</span>
      </div>
      <p className="text-lg font-semibold text-ink">{profile.role}</p>
      <p className="mt-2 flex items-center gap-[5px] text-[13.5px] font-semibold text-accent2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
        {profile.location}
      </p>
      <p className="mt-1.5 text-sm text-soft">{profile.tagline}</p>
    </div>
  );
}
