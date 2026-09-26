'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { profile } from './content';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-fg/[0.07] bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between">
        <a
          href="#top"
          className="font-script text-[26px] font-bold leading-none tracking-normal text-fg transition-opacity duration-300 hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] text-fg/55 transition-colors duration-300 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg/40">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Open to work
          </span>
          <ThemeToggle />
          <a href="#contact" className="btn-primary !px-5 !py-2 !text-[13.5px]">
            Start a conversation
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-fg/10 text-fg/70"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-fg/[0.07] bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[16px] text-fg/70 transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Start a conversation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
