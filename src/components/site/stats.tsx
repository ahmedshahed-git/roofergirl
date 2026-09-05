import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site-content";
import { Reveal } from "./motion-primitives";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-hairline bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 px-5 md:grid-cols-4 md:px-10">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} className="px-2 text-center md:px-6">
            <div className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-gold">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
