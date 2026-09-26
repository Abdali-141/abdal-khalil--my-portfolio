import Reveal from './Reveal';
import { heroStats, markets, profile } from './content';

export default function Hero() {
  return (
    <section id="top" className="noise relative overflow-hidden pb-20 pt-[132px] sm:pt-[156px] lg:pb-28">
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_20%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-18%] h-[520px] w-[820px] -translate-x-1/2 animate-glow rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--glow-brand)_/_var(--glow-a)),transparent_62%)] blur-[24px]" />
        <div className="absolute right-[6%] top-[28%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgb(52_211_153_/_var(--glow-b)),transparent_65%)] blur-[20px]" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] py-1.5 pl-1.5 pr-4">
            <span className="shrink-0 rounded-full bg-fg/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg/70">
              5 yrs
            </span>
            <span className="text-[12px] leading-snug text-fg/55 sm:text-[13px]">
              Google Ads &middot; Local Services Ads &middot; Meta Ads
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 max-w-[15ch] text-[42px] font-semibold leading-[0.98] tracking-tightest text-gradient sm:text-[62px] lg:text-[80px]">
            Paid media that pays for itself.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-[62ch] text-[16.5px] leading-[1.68] text-fg/55 sm:text-[18px]">
            I&apos;m {profile.name} — a paid media specialist running Google Ads, Google Local Services
            Ads and Meta Ads for clients across the US, Canada, the UK and the UAE. Over{' '}
            <span className="text-fg/85">$600,000 in ad spend managed</span>, accounts pacing to
            $25,000 a month, and measurement fixed before a single budget gets scaled.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Start a conversation
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" className="btn-ghost">
              See the numbers
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-fg/[0.07] bg-fg/[0.06] lg:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="group bg-bg px-6 py-7 transition-colors duration-500 hover:bg-raised">
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg/46">
                  {s.label}
                </dt>
                <dd className="mt-3 text-[30px] font-semibold tracking-tighter text-fg sm:text-[34px]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={380}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/42">
            <span className="text-fg/45">Markets</span>
            {markets.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
