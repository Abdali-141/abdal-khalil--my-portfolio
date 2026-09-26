'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { faqs } from './content';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative border-t border-fg/[0.06] py-24 sm:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Questions" title="Before you write." />

        <div className="mt-12 max-w-[820px]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 55}>
                <div className="border-b border-fg/[0.07]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-fg"
                  >
                    <span
                      className={`text-[17px] font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-[18px] ${
                        isOpen ? 'text-fg' : 'text-fg/70'
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fg/12 transition-all duration-400 ${
                        isOpen ? 'rotate-45 border-fg/30 bg-fg/10' : ''
                      }`}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-7 pr-10 text-[15px] leading-[1.7] text-fg/50">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
