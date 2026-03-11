import { useState } from "react";
import type { ExperimentMeta } from "~/lib/experiment-meta";
import { ExperimentDescription } from "./experiment-description";

export function ExperimentLayout({
  meta,
  children,
}: {
  meta: ExperimentMeta;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed z-50 bottom-5 right-5 w-[min(420px,calc(100vw-2.5rem))] max-h-[calc(100vh-2.5rem)] transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col max-h-[calc(100vh-2.5rem)] rounded-2xl border border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.06] shrink-0">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-white truncate">
                {meta.title}
              </h2>
              {meta.subtitle && (
                <p className="text-xs text-white/40 truncate">{meta.subtitle}</p>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
              aria-label="Close info panel"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto overscroll-contain">
            <ExperimentDescription meta={meta} />
          </div>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed z-50 bottom-5 right-5 h-11 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md flex items-center gap-2 px-4 text-white/50 hover:text-white/80 hover:bg-white/[0.14] hover:border-white/[0.16] transition-all duration-300 shadow-lg ${
          open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
        aria-label="Show experiment info"
      >
        <span className="text-xs">Want to know more?</span>
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </button>
    </>
  );
}
