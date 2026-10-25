'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface ShotImage {
  url: string;
  alt: string;
}

/**
 * Play Store style screenshots: a horizontal swipe / scroll strip with
 * left-right arrows. Clicking a screenshot opens a full-screen viewer with
 * previous / next (buttons, arrow keys, Escape to close).
 */
export default function ScreenshotCarousel({ images }: { images: ShotImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update, images.length]);

  const scrollPage = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const last = images.length - 1;

  // Full-screen viewer: keyboard + scroll lock
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? null : Math.min(i + 1, last)));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? null : Math.max(i - 1, 0)));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, last]);

  const arrowCls =
    'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition hover:bg-gray-50 sm:flex';

  return (
    <div className="relative">
      {canLeft && (
        <button type="button" onClick={() => scrollPage(-1)} aria-label="Scroll screenshots left" className={`${arrowCls} -left-3`}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canRight && (
        <button type="button" onClick={() => scrollPage(1)} aria-label="Scroll screenshots right" className={`${arrowCls} -right-3`}>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <button
            key={`${img.url}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open screenshot ${i + 1} of ${images.length}`}
            className="min-w-24 shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              draggable={false}
              onLoad={update}
              className="h-64 w-auto max-w-none object-cover sm:h-80"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close viewer"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            disabled={open === 0}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(open - 1);
            }}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open].url}
            alt={images[open].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />

          <button
            type="button"
            disabled={open === last}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(open + 1);
            }}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}