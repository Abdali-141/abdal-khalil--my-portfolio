import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { process } from './content';

export default function Process() {
  return (
    <section id="process" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow="How it runs"
              title="Measurement first. Budget second."
              blurb="A repeatable order of operations — the same one used across 60+ live accounts."
            />
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[15px] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-fg/15 via-fg/8 to-transparent"
            />
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <li className="group relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fg/12 bg-raised font-mono text-[11px] text-fg/45 transition-all duration-500 group-hover:border-brand/60 group-hover:text-fg">
                    {p.n}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-[19px] font-semibold tracking-tight text-fg sm:text-[20px]">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 max-w-[56ch] text-[15px] leading-[1.68] text-fg/50">
                      {p.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
