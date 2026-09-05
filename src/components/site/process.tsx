import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { process } from "@/lib/site-content";
import { EASE, SectionHeading } from "./motion-primitives";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="The Process" title={"From first call\nto final nail."} />

        <div ref={ref} className="relative mt-20 pl-10 md:pl-24">
          <div className="absolute left-[3px] top-0 h-full w-px bg-hairline md:left-[7px]" />
          <motion.div
            style={{ height }}
            className="absolute left-[3px] top-0 w-px bg-accent md:left-[7px]"
          />

          {process.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, delay: i * 0.05, ease: EASE }}
              className="group relative border-b border-hairline py-10 last:border-b-0"
            >
              <span className="absolute -left-10 top-[3.1rem] h-2 w-2 -translate-x-1/2 rounded-full bg-border transition-colors duration-500 group-hover:bg-accent md:-left-24 md:translate-x-[3px]" />
              <div className="grid gap-4 md:grid-cols-[8rem_1fr] md:gap-10">
                <span className="font-mono text-xs tracking-[0.3em] text-accent">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight tracking-[-0.02em] text-foreground transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
