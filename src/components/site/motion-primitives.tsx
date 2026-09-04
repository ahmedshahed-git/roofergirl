import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- Reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Word-by-word headline reveal ---------------- */

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const lines = text.split("\n");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 },
    show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
              <motion.span variants={word} className="inline-block will-change-transform">
                {w}
                {"\u00A0"}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- Mask reveal wrapper ---------------- */

export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Parallax media (video-ready) ---------------- */

export function ParallaxMedia({
  image,
  videoSrc,
  alt,
  className,
  imgClassName,
  range = 90,
  zoom = true,
  priority = false,
  width,
  height,
}: {
  image: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  range?: number;
  zoom?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], zoom ? [1.16, 1.06, 1.16] : [1, 1, 1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-[-12%]"
        style={reduced ? undefined : { y, scale }}
      >
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            poster={image}
          />
        ) : (
          <img
            src={image}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn("h-full w-full object-cover", imgClassName)}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal y={14}>
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent/70" />
          {eyebrow}
        </span>
      </Reveal>
      <WordReveal
        text={title}
        delay={0.08}
        className="mt-5 font-display text-[clamp(2.1rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground"
      />
    </div>
  );
}

/* ---------------- Magnetic CTA ---------------- */

export function MagneticButton({
  children,
  href,
  variant = "solid",
  className,
  external,
}: {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative inline-flex items-center gap-4 overflow-hidden px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-[transform,color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant === "solid"
          ? "bg-accent text-accent-foreground"
          : "border border-border text-foreground hover:border-accent",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
          variant === "solid" ? "bg-foreground" : "bg-accent",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-500",
          variant === "solid"
            ? "group-hover:text-background"
            : "group-hover:text-accent-foreground",
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "relative z-10 transition-all duration-500 group-hover:translate-x-1.5",
          variant === "solid"
            ? "group-hover:text-background"
            : "group-hover:text-accent-foreground",
        )}
        aria-hidden
      >
        →
      </span>
    </a>
  );
}
