import Reveal from './Reveal';
import { profile } from './content';

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--glow-brand)_/_var(--glow-a)),transparent_65%)] blur-[30px]" />
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_55%_50%_at_50%_50%,#000_10%,transparent_70%)]" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="noise card relative overflow-hidden px-7 py-14 text-center sm:px-14 sm:py-20">
            <span className="eyebrow">Next step</span>
            <h2 className="mx-auto mt-5 max-w-[18ch] text-[34px] font-semibold leading-[1.04] tracking-tightest text-gradient sm:text-[48px]">
              Send me the account. I&apos;ll tell you what&apos;s leaking.
            </h2>
            <p className="mx-auto mt-5 max-w-[54ch] text-[16px] leading-[1.65] text-fg/50">
              A first look at structure, search terms, bidding and tracking — with the specific
              changes worth making, before any commitment.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="btn-ghost">
                {profile.phone}
              </a>
            </div>

            <div className="mx-auto mt-12 grid max-w-[640px] gap-px overflow-hidden rounded-xl border border-fg/[0.07] bg-fg/[0.06] sm:grid-cols-3">
              {[
                { k: 'Location', v: profile.location },
                { k: 'Working style', v: profile.availability },
                { k: 'Response', v: 'Within 24 hours' },
              ].map((row) => (
                <div key={row.k} className="bg-bg px-4 py-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg/42">
                    {row.k}
                  </div>
                  <div className="mt-2 text-[14px] text-fg/75">{row.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
