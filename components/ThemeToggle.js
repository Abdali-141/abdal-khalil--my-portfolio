'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'abdal-theme';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-fg/[0.12] bg-fg/[0.03] text-fg/60 transition-all duration-300 hover:border-fg/25 hover:text-fg ${className}`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
        className={`absolute transition-all duration-500 ${
          isDark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <path
          d="M16.5 11.8A7 7 0 0 1 8.2 3.5a7 7 0 1 0 8.3 8.3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
        className={`absolute transition-all duration-500 ${
          isDark ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 2.2v1.6M10 16.2v1.6M17.8 10h-1.6M3.8 10H2.2M15.5 4.5l-1.1 1.1M5.6 14.4l-1.1 1.1M15.5 15.5l-1.1-1.1M5.6 5.6 4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
