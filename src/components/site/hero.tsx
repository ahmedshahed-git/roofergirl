import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImg from "@/assets/hero-roof.jpg";
import { site } from "@/lib/site-content";
import { EASE, MagneticButton } from "./motion-primitives";

/** Drop a looping roofing video URL here to activate the cinematic background video. */
const HERO_VIDEO_SRC: string | undefined = undefined;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.35, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = "Roofing that stands above.".split(" ");

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden grain">
      {/* Background layer — video-ready */}
      <motion.div className="absolute inset-0" {...(reduced ? {} : { style: { y } })}>
        <motion.div
          className="absolute inset-[-8%]"
          initial={{ scale: 1.25 }}
          animate={{ scale: reduced ? 1.25 : 1.05 }}
          transition={{ duration: 14, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.div
            className="h-full w-full"
            {...(reduced ? {} : { animate: { x: [0, -18, 6, 0], y: [0, 8, -10, 0] } })}
            transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          >
            {HERO_VIDEO_SRC ? (
              <video
                className="h-full w-full object-cover"
                src={HERO_VIDEO_SRC}
                poster={heroImg}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={heroImg}
                alt="Rooflines of a home at dusk"
                width={1920}
                height={1088}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cinematic veils */}
      <div className="veil pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ opacity: overlay }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,transparent_35%,var(--background)_100%)]" />

      {/* Content */}
      <motion.div
        {...(reduced ? {} : { style: { y: contentY, opacity: contentOpacity } })}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-20 md:px-10 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent/70" />
          {site.name} — Premium Roofing
        </motion.span>

        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.03em] text-foreground">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.7 + i * 0.09, ease: EASE }}
                className="inline-block will-change-transform"
              >
                {w === "above." ? <em className="not-italic text-gold">{w}</em> : w}
                {"\u00A0"}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.25, ease: EASE }}
          className="mt-6 max-w-[46ch] text-base leading-relaxed text-secondary-foreground md:text-lg"
        >
          [Editable placeholder] A short, confident line introducing RooferGirl and the standard
          held on every roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.45, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={`mailto:${site.email}`}>Email us</MagneticButton>
          <MagneticButton href={site.messengerUrl} variant="ghost" external>
            Message on Messenger
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 right-5 z-10 hidden items-center gap-3 md:right-10 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-accent"
            animate={{ y: [-20, 56] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
