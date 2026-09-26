import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { stack } from './content';

export default function Stack() {
  return (
    <section id="stack" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Toolkit"
          title="Hands on the platforms, not just the reports."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 70}>
              <div className="card card-hover h-full p-6 sm:p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg/45">
                  {g.group}
                </h3>
                <div className="mt-5 h-px w-full bg-fg/[0.07]" />
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug text-fg/55">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
