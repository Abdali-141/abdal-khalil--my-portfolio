import PortfolioPreview from './PortfolioPreview';
import { profile } from './content';

const socials = [
  { label: 'LinkedIn', href: profile.linkedin },
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
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={socials[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[13.5px] text-fg/45 transition-colors duration-300 hover:text-fg"
            >
              {socials[0].label}
            </a>

            <PortfolioPreview />

            <a
              href={socials[1].href}
              className="text-[13.5px] text-fg/45 transition-colors duration-300 hover:text-fg"
            >
              {socials[1].label}
            </a>
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
