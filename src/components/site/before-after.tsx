import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import afterImg from "@/assets/after.jpg";
import beforeImg from "@/assets/before.jpg";
import { EASE, MaskReveal, SectionHeading } from "./motion-primitives";

export function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const raw = useMotionValue(50);
  const pos = useSpring(raw, { stiffness: 220, damping: 30, mass: 0.4 });
  const clip = useTransform(pos, (v) => `inset(0% ${100 - v}% 0% 0%)`);
  const left = useTransform(pos, (v) => `${v}%`);

  const setFromClient = useCallback(
    (clientX: number) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      raw.set(Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100)));
    },
    [raw],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClient(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClient]);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => raw.set(62), 900);
    return () => clearTimeout(t);
  }, [raw, reduced]);

  return (
    <section id="before-after" className="relative bg-surface pb-28 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Transformation" title={"Before.\nAfter."} />

        <MaskReveal delay={0.15} className="mt-14">
          <div
            ref={wrapRef}
            onPointerDown={(e) => {
              setDragging(true);
              setFromClient(e.clientX);
            }}
            className="relative aspect-16/10 w-full cursor-ew-resize touch-none select-none overflow-hidden border border-hairline grain"
          >
            <img
              src={afterImg}
              alt="Home after new roof installation"
              loading="lazy"
              width={1600}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <img
                src={beforeImg}
                alt="Weathered roof before replacement"
                loading="lazy"
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/25" />
            </motion.div>

            {/* Divider */}
            <motion.div
              style={{ left }}
              className="absolute inset-y-0 z-20 -ml-px w-0.5 bg-accent/90"
            >
              <motion.div
                animate={dragging ? { scale: 1.12 } : { scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-background/70 backdrop-blur-md"
              >
                <span className="font-mono text-xs text-accent">◀ ▶</span>
              </motion.div>
            </motion.div>

            {/* Labels */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-5 md:p-8">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="border border-hairline bg-background/60 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-secondary-foreground backdrop-blur-md"
              >
                Before
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
                className="border border-accent/40 bg-background/60 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent backdrop-blur-md"
              >
                After
              </motion.span>
            </div>
          </div>
        </MaskReveal>

        <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          Drag the divider · Placeholder imagery — replace with real project photos
        </p>
      </div>
    </section>
  );
}
