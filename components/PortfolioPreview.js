'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from './content';

const PDFJS_VERSION = '3.11.174';
const PDFJS_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
const PDFJS_WORKER = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

let pdfjsPromise = null;

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const tag = document.createElement('script');
      tag.src = PDFJS_SRC;
      tag.async = true;
      tag.onload = () => {
        if (!window.pdfjsLib) {
          pdfjsPromise = null;
          reject(new Error('viewer-unavailable'));
          return;
        }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        resolve(window.pdfjsLib);
      };
      tag.onerror = () => {
        pdfjsPromise = null;
        reject(new Error('viewer-unavailable'));
      };
      document.head.appendChild(tag);
    });
  }
  return pdfjsPromise;
}

function PdfViewer({ onPageChange }) {
  const scrollRef = useRef(null);
  const slotRefs = useRef([]);
  const docRef = useRef(null);
  const tasksRef = useRef(new Map());
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(0);

  // load the document once, and collect every page's aspect ratio up front
  useEffect(() => {
    let cancelled = false;
    let loadingTask;

    loadPdfJs()
      .then((pdfjsLib) => {
        if (cancelled) return null;
        loadingTask = pdfjsLib.getDocument(profile.portfolioPdf);
        loadingTask.onProgress = ({ loaded, total }) => {
          if (!cancelled && total) setProgress(Math.round((loaded / total) * 100));
        };
        return loadingTask.promise;
      })
      .then(async (doc) => {
        if (cancelled || !doc) return;
        docRef.current = doc;
        const sizes = [];
        for (let i = 1; i <= doc.numPages; i += 1) {
          const page = await doc.getPage(i); // eslint-disable-line no-await-in-loop
          const view = page.getViewport({ scale: 1 });
          sizes.push({ w: view.width, h: view.height });
        }
        if (cancelled) return;
        setPages(sizes);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      tasksRef.current.forEach((task) => task.cancel());
      tasksRef.current.clear();
      if (loadingTask && loadingTask.destroy) loadingTask.destroy();
      if (docRef.current && docRef.current.destroy) docRef.current.destroy();
      docRef.current = null;
    };
  }, []);

  // track the render width so pages stay sharp when the window resizes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [status]);

  // paint only the pages near the viewport, and repaint them when the width changes
  useEffect(() => {
    if (status !== 'ready' || !width) return undefined;

    const renderPage = async (slot) => {
      const num = Number(slot.dataset.page);
      const canvas = slot.querySelector('canvas');
      const doc = docRef.current;
      if (!doc || !canvas || canvas.dataset.rendered === String(width)) return;
      canvas.dataset.rendered = String(width);

      const page = await doc.getPage(num);
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      const previous = tasksRef.current.get(num);
      if (previous) previous.cancel();

      const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
      tasksRef.current.set(num, task);
      try {
        await task.promise;
      } catch (e) {
        // superseded by a newer render pass; that pass paints this page
        canvas.dataset.rendered = '';
      }
      tasksRef.current.delete(num);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) renderPage(entry.target);
        });
      },
      { root: scrollRef.current, rootMargin: '800px 0px' }
    );

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onPageChange) onPageChange(Number(entry.target.dataset.page));
        });
      },
      { root: scrollRef.current, rootMargin: '-45% 0px -45% 0px' }
    );

    slotRefs.current.forEach((slot) => {
      if (!slot) return;
      const canvas = slot.querySelector('canvas');
      if (canvas) canvas.dataset.rendered = '';
      io.observe(slot);
      spy.observe(slot);
    });

    return () => {
      io.disconnect();
      spy.disconnect();
    };
  }, [status, width, pages.length, onPageChange]);

  if (status === 'error') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="max-w-[40ch] text-[14.5px] leading-relaxed text-fg/55">
          The inline viewer could not load. The portfolio itself is still right here.
        </p>
        <a
          href={profile.portfolioPdf}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost !py-2.5 !text-[13.5px]"
        >
          Open the PDF
        </a>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg/40">
          {progress ? `Loading portfolio — ${progress}%` : 'Loading portfolio…'}
        </div>
        <div className="h-px w-40 overflow-hidden bg-fg/10">
          <div
            className="h-full bg-fg/45 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto flex max-w-[900px] flex-col gap-3 sm:gap-5">
        {pages.map((size, i) => (
          <div
            key={`page-${i + 1}`}
            ref={(el) => {
              slotRefs.current[i] = el;
            }}
            data-page={i + 1}
            style={{ aspectRatio: `${size.w} / ${size.h}` }}
            className="relative w-full overflow-hidden rounded-lg border border-fg/[0.08] bg-fg/[0.04]"
          >
            <canvas className="block h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPreview({ className = '', label = 'Portfolio', variant = 'link' }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const onPageChange = useCallback((n) => setPage(n), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (triggerRef.current) triggerRef.current.focus();
      setPage(1);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={
          variant === 'primary'
            ? `btn-primary ${className}`
            : variant === 'button'
              ? `btn-ghost ${className}`
              : `text-[13.5px] text-fg/45 transition-colors duration-300 hover:text-fg ${className}`
        }
      >
        {label}
        {variant !== 'link' && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5L9 1.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M9 1.5V5.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Paid media performance portfolio"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={close}
            className="absolute inset-0 cursor-default bg-bg/85 backdrop-blur-md"
          />

          <div
            ref={panelRef}
            tabIndex={-1}
            className="card relative flex h-full max-h-[940px] w-full max-w-[1100px] flex-col overflow-hidden outline-none"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-fg/[0.07] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <div className="truncate text-[14px] font-medium tracking-tight text-fg">
                  Performance marketing portfolio
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg/40">
                  Page {page} of {profile.portfolioPages}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={profile.portfolioPdf}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hidden rounded-full border border-fg/[0.14] bg-fg/[0.03] px-4 py-2 text-[13px] text-fg/70 transition-colors duration-300 hover:border-fg/30 hover:text-fg sm:inline-flex"
                >
                  Open in new tab
                </a>
                <a
                  href={profile.portfolioPdf}
                  download
                  className="rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-opacity duration-300 hover:opacity-90"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-fg/[0.12] text-fg/60 transition-colors duration-300 hover:border-fg/30 hover:text-fg"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M1 1l12 12M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-fg/[0.02]">
              <PdfViewer onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
