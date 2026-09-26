import { logos } from './content';

export default function Marquee() {
  const row = [...logos, ...logos];
  return (
    <section aria-label="Selected clients" className="border-y border-fg/[0.06] bg-fg/[0.012] py-7">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-[15px] font-medium tracking-tight text-fg/42 transition-colors duration-300 hover:text-fg/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
