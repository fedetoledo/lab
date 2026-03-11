import { Link } from "react-router";
import type { Route as RouteType } from "./+types/home";
import { highlights } from "~/lib/highlights";

export function meta({}: RouteType.MetaArgs) {
  return [
    { title: "Fede's Lab" },
    { name: "description", content: "Welcome to Fede's Lab!" },
  ];
}

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center pt-16 pb-4 gap-16 px-6 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute top-[30%] left-[-10%] h-[400px] w-[500px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[600px] rounded-full bg-amber-500/[0.03] blur-[100px]" />
      </div>
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-4xl">Fede&apos;s Lab</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          A collection of web experiments exploring creative coding, 3D
          graphics, and interaction design. Each experiment is a self-contained
          playground where I dig into a technique, break it apart, and rebuild
          it from scratch.
        </p>
      </div>

      <section className="w-full max-w-5xl">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8 text-center">
          Highlighted Experiments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] ${item.accent} hover:shadow-lg`}
            >
              <div
                className={`relative h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center border-b border-white/[0.04]`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px]" />
                <div className="relative transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto px-5 pb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                  Explore
                  <svg
                    className="size-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
