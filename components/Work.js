import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { caseStudies } from './content';

export default function Work() {
  return (
    <section id="work" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(var(--glow-brand)_/_var(--glow-b)),transparent_65%)] blur-2xl" />
      </div>

      <div className="container-x">
        <SectionHead
          eyebrow="Selected work"
          title="Accounts, not impressions."
          blurb="Every number below comes from a live client account. Names are shown where disclosure is permitted."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.client} delay={i * 80}>
              <article className="card card-hover group flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg/40">
                    {c.client}
                  </span>
                  <span className="rounded-full border border-fg/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg/42">
                    {c.market}
                  </span>
                </div>

                <h3 className="mt-5 text-[23px] font-semibold leading-[1.22] tracking-tight text-fg sm:text-[26px]">
                  {c.headline}
                </h3>

                <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-fg/[0.07] bg-fg/[0.06]">
                  {c.stats.map((s) => (
                    <div key={s.k} className="bg-bg px-3 py-4 text-center">
                      <dd className="text-[17px] font-semibold tracking-tight text-fg sm:text-[19px]">
                        {s.v}
                      </dd>
                      <dt className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg/45">
                        {s.k}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 space-y-3.5 border-t border-fg/[0.06] pt-6">
                  {[
                    ['Situation', c.situation],
                    ['Action', c.action],
                    ['Result', c.result],
                  ].map(([label, text]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[86px_1fr] sm:gap-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-fg/40 sm:pt-[3px]">
                        {label}
                      </span>
                      <p className="text-[14.5px] leading-[1.62] text-fg/55">{text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-fg/38">
            Figures reflect reported account performance over the campaign periods managed. Full
            account screenshots available on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
