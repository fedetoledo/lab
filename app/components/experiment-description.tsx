import type { ExperimentMeta } from "~/lib/experiment-meta";

export function ExperimentDescription({ meta }: { meta: ExperimentMeta }) {
  return (
    <div className="px-5 py-5 space-y-5">
      {/* Date */}
      {meta.date && (
        <p className="text-xs text-white/30">{meta.date}</p>
      )}

      {/* Description */}
      <div className="space-y-3 text-[13px] leading-relaxed text-white/60">
        {meta.description.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Tech Stack */}
      {meta.techStack.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[11px] font-medium text-white/30 uppercase tracking-wider">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {meta.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Learnings */}
      {meta.keyLearnings.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[11px] font-medium text-white/30 uppercase tracking-wider">
            Key Learnings
          </h3>
          <ul className="space-y-1.5">
            {meta.keyLearnings.map((learning, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13px] leading-relaxed text-white/50"
              >
                <span className="mt-[7px] block size-1 shrink-0 rounded-full bg-white/20" />
                {learning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source Link */}
      {meta.sourceUrl && (
        <a
          href={meta.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
        >
          View source / inspiration
          <svg
            className="size-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6h6m0 0v6m0-6L9.75 14.25"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
