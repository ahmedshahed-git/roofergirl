import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import aboutImg from "@/assets/about-craft.jpg";
import serviceImg from "@/assets/service-1.jpg";
import { about } from "@/lib/site-content";
import { MaskReveal, ParallaxMedia, Reveal, WordReveal } from "./motion-primitives";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section id="about" ref={ref} className="relative bg-background py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Layered visual composition */}
        <div className="relative lg:col-span-6">
          <MaskReveal className="relative aspect-4/5 w-full lg:w-[86%]">
            <ParallaxMedia
              image={aboutImg}
              alt="Roofer aligning shingles at golden hour"
              className="h-full w-full"
              width={1200}
              height={1504}
              range={60}
            />
            <div className="pointer-events-none absolute inset-0 bg-background/25" />
          </MaskReveal>

          <motion.div
            style={{ rotate: rot }}
            className="absolute -bottom-14 right-0 hidden w-[46%] lg:block"
          >
            <MaskReveal delay={0.25} className="aspect-square border border-hairline">
              <ParallaxMedia
                image={serviceImg}
                alt="Detail of a new roof surface"
                className="h-full w-full"
                width={1200}
                height={900}
                range={30}
              />
            </MaskReveal>
          </motion.div>

          <Reveal delay={0.4} className="absolute -left-2 top-8 hidden xl:block">
            <span className="block -rotate-90 origin-left font-mono text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
              Craft · Care · Coverage
            </span>
          </Reveal>
        </div>

        {/* Editorial text */}
        <div className="lg:col-span-6 lg:pl-10 lg:pt-16">
          <Reveal y={12}>
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/70" />
              {about.eyebrow}
            </span>
          </Reveal>

          <WordReveal
            text={about.heading}
            delay={0.05}
            className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-foreground"
          />

          <div className="mt-8 space-y-6">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <p className="max-w-[52ch] leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-hairline sm:grid-cols-2">
            {about.notes.map((n, i) => (
              <Reveal key={i} delay={0.35 + i * 0.12}>
                <div className="group h-full bg-surface/60 p-7 transition-colors duration-500 hover:bg-card">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-accent">
                    {n.label}
                  </span>
                  <p className="mt-3 text-secondary-foreground">{n.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
