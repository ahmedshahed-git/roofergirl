import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site-content";
import { EASE, SectionHeading } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i] ?? testimonials[0]!;

  return (
    <section className="relative overflow-hidden border-y border-hairline bg-surface py-28 md:py-40">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Testimonials" title="Words from homeowners." align="center" />

        <div className="relative mx-auto mt-16 min-h-[18rem] max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center"
            >
              <span className="block font-display text-6xl leading-none text-accent/40">“</span>
              <p className="mt-4 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] leading-[1.25] tracking-[-0.01em] text-foreground">
                {t.quote}
              </p>
              <footer className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                {t.author} — {t.meta}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Review ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                "h-px w-10 bg-border transition-all duration-500",
                idx === i && "bg-accent",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
