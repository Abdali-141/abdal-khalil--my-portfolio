import Reveal from './Reveal';

export default function SectionHead({ eyebrow, title, blurb, align = 'left' }) {
  return (
    <Reveal>
      <div className={align === 'center' ? 'mx-auto max-w-[46ch] text-center' : 'max-w-[52ch]'}>
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-fg/20" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="mt-5 text-[32px] font-semibold leading-[1.06] tracking-tightest text-gradient sm:text-[42px]">
          {title}
        </h2>
        {blurb && <p className="mt-4 text-[16px] leading-[1.65] text-fg/50">{blurb}</p>}
      </div>
    </Reveal>
  );
}
