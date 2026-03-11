import { useEffect, useState } from "react";
import {
  Box,
  ChevronRight,
  FlaskConical,
  Home,
  PanelLeft,
  Paintbrush,
  Play,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const navigation = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Three.js Journey",
    icon: Box,
    url: "/three-js-journey",
    children: [
{ title: "Particles", url: "/three-js-journey/particles" },
      { title: "Grass Field", url: "/three-js-journey/grass" },
      { title: "Shader Effects", url: "/three-js-journey/shader-effects" },
      { title: "Shader Transitions", url: "/three-js-journey/shader-transitions" },
    ],
  },
  {
    title: "Animation",
    icon: Play,
    url: "/animation",
    children: [
{ title: "Sticky Cursor", url: "/animation/sticky-cursor" },
      { title: "Perspective", url: "/animation/perspective" },
      { title: "Parallax Bento", url: "/animation/parallax-bento" },
      { title: "Mask Cursor", url: "/animation/mask-cursor" },
{ title: "Zoom Parallax", url: "/animation/zoom-parallax" },
{
        title: "Text Scroll Gradient",
        url: "/animation/text-scroll-gradient",
      },
    ],
  },
];

function NavSection({
  item,
  pathname,
  onNavigate,
}: {
  item: (typeof navigation)[number];
  pathname: string;
  onNavigate: () => void;
}) {
  const isActive = pathname.startsWith(item.url) && item.url !== "/";
  const [expanded, setExpanded] = useState(isActive);

  if (!item.children) {
    return (
      <li>
        <Link
          to={item.url}
          onClick={onNavigate}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
            pathname === item.url
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          }`}
        >
          {item.icon && <item.icon className="size-4" />}
          <span>{item.title}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm w-full text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
      >
        {item.icon && <item.icon className="size-4" />}
        <span>{item.title}</span>
        <ChevronRight
          className={`size-3 ml-auto transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="ml-4 pt-1 border-l border-white/10 pl-2 space-y-0.5 overflow-hidden">
          {item.children.map((child) => (
            <li key={child.url}>
              <Link
                to={child.url}
                onClick={onNavigate}
                className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                  pathname === child.url
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function AppSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-card border hover:bg-white/10 transition-colors"
        aria-label="Open sidebar"
      >
        <PanelLeft className="size-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 p-4 pr-0 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full rounded-xl border bg-card p-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2"
            >
              <FlaskConical className="size-5" />
              <span className="text-lg font-bold">Lab</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground px-3 mb-2">Navigation</p>
          <ul className="space-y-0.5">
            {navigation.map((item) => (
              <NavSection
                key={item.title}
                item={item}
                pathname={location.pathname}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
