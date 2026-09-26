import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { services } from './content';

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="What I run"
          title="Four platforms, one accountable system."
          blurb="Structure, bidding and measurement are owned end to end — so what the dashboard reports is what the business can actually see coming in."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70} className={s.span}>
              <article className="card card-hover group h-full overflow-hidden p-7 sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(var(--glow-brand)_/_var(--glow-a)),transparent_70%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <span className="font-mono text-[11px] tracking-[0.15em] text-fg/38">{s.id}</span>
                <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight text-fg sm:text-[22px]">
                  {s.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-[1.68] text-fg/50">{s.body}</p>

                {s.metric && (
                  <div className="mt-6 flex items-baseline gap-3 rounded-xl border border-fg/[0.07] bg-fg/[0.02] px-4 py-3">
                    <span className="text-[22px] font-semibold tracking-tight text-fg">
                      {s.metric.value}
                    </span>
                    <span className="text-[13px] leading-snug text-fg/40">{s.metric.label}</span>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-fg/[0.08] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
