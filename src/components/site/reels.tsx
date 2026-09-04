import { motion } from "motion/react";
import { reels } from "@/lib/site-content";
import { EASE, SectionHeading } from "./motion-primitives";

export function Reels() {
  return (
    <section id="reels" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Facebook Reels" title={"Watch the work\nin motion."} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.15, ease: EASE }}
              className="group relative"
            >
              <div className="relative aspect-9/16 overflow-hidden border border-hairline bg-surface transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-accent/50 group-hover:shadow-[var(--shadow-lift)]">
                {reel.src ? (
                  <iframe
                    src={reel.src}
                    title={reel.title}
                    loading="lazy"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[radial-gradient(80%_60%_at_50%_0%,var(--card),var(--surface))]">
                    <span className="absolute left-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">
                      {reel.label}
                    </span>

                    <motion.span
                      className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/40"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="absolute inset-0 rounded-full border border-accent/20 transition-transform duration-700 group-hover:scale-125" />
                      <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-accent" />
                    </motion.span>

                    <span className="px-8 text-center font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                      [ Video Placeholder ]
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
              </div>

              <figcaption className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg text-foreground">{reel.title}</span>
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-muted-foreground">
                  0{i + 1}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
