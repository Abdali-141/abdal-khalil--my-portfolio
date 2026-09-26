import { profile } from './content';

const socials = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Behance portfolio', href: profile.behance },
  { label: 'Email', href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-fg/[0.06] py-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-script text-[26px] font-bold leading-tight text-fg">
              {profile.name}
            </div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.06em] text-fg/45">
              {profile.role}
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className="text-[13.5px] text-fg/45 transition-colors duration-300 hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hairline my-9" />

        <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.06em] text-fg/38 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>{profile.location} &middot; Serving US, Canada, UK &amp; UAE</span>
        </div>
      </div>
    </footer>
  );
}
