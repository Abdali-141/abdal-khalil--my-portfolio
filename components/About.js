import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { timeline, profile } from './content';

export default function About() {
  return (
    <section id="about" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-8%] top-[15%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgb(52_211_153_/_var(--glow-b)),transparent_65%)] blur-2xl" />
      </div>

      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Who you're working with"
              title="Five years, one discipline."
              blurb="Paid media only — no split attention across ten services. Google Ads since 2021, with Local Services Ads and Meta Ads alongside, across a portfolio of 60+ live accounts and 100+ client projects."
            />

            <Reveal delay={120}>
              <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-fg/[0.07] bg-fg/[0.06] sm:grid-cols-2">
                {[
                  { k: 'Based in', v: profile.location },
                  { k: 'Availability', v: profile.availability },
                  { k: 'Education', v: 'BSc Computer Science — NCBA&E' },
                  { k: 'Certifications', v: 'HubSpot Academy · Google Ads Search Certification' },
                ].map((row) => (
                  <div key={row.k} className="bg-bg px-5 py-5">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg/45">
                      {row.k}
                    </div>
                    <div className="mt-2 text-[15px] leading-snug text-fg/80">{row.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="card p-7 sm:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg/45">
                Track record
              </h3>
              <ul className="mt-7 space-y-7">
                {timeline.map((t) => (
                  <li key={`${t.role}-${t.org}`} className="border-l border-fg/[0.09] pl-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[16.5px] font-semibold tracking-tight text-fg">
                        {t.role}
                      </h4>
                      <span className="font-mono text-[11px] tracking-[0.06em] text-fg/42">
                        {t.period}
                      </span>
                    </div>
                    <div className="mt-1 text-[13.5px] text-brand-soft/80">{t.org}</div>
                    <p className="mt-2.5 text-[14px] leading-[1.6] text-fg/45">{t.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
