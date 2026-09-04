import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { EASE } from "./motion-primitives";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => scrollY.on("change", (v) => setSolid(v > 80)), [scrollY]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid
            ? "border-b border-hairline bg-background/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
            className="group flex items-baseline gap-2"
          >
            <span className="font-display text-2xl tracking-[-0.02em] text-foreground">
              Roofer<span className="text-gold">Girl</span>
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150 sm:block" />
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="group relative py-1 text-[0.72rem] uppercase tracking-[0.2em] text-secondary-foreground transition-colors duration-400 hover:text-foreground"
              >
                {n.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100",
                    active === n.id && "scale-x-100",
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group relative hidden overflow-hidden border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-colors duration-500 hover:border-accent md:inline-flex"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-accent-foreground">
                Get in touch
              </span>
            </a>

            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-border lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="block h-px w-5 bg-foreground"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-40 grain bg-surface lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {nav.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE }}
                  onClick={() => go(n.id)}
                  className="border-b border-hairline py-5 text-left font-display text-4xl tracking-[-0.02em] text-foreground"
                >
                  <span className="mr-4 font-mono text-xs tracking-[0.2em] text-accent">
                    0{i + 1}
                  </span>
                  {n.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                href={`mailto:${site.email}`}
                className="mt-10 font-mono text-xs tracking-[0.2em] text-accent"
              >
                {site.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
