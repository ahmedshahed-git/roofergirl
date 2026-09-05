import ctaNight from "@/assets/cta-night.jpg";
import { site } from "@/lib/site-content";
import { MagneticButton, ParallaxMedia, Reveal, WordReveal } from "./motion-primitives";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <ParallaxMedia
        image={ctaNight}
        alt="RooferGirl roofing project at dusk"
        className="absolute inset-0 -z-10"
        range={70}
      />
      <div className="veil absolute inset-0 -z-10" />
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1400px] px-5 py-32 md:px-10 md:py-48">
        <Reveal y={14}>
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent/70" />
            Contact
          </span>
        </Reveal>

        <WordReveal
          text={"Let's talk about\nyour roof."}
          delay={0.08}
          className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.03em] text-foreground"
        />

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-secondary-foreground">
            Send an email or message {site.messengerName} directly on Facebook Messenger — we'll get
            back to you with next steps.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap gap-4">
          <MagneticButton href={`mailto:${site.email}`}>Email us</MagneticButton>
          <MagneticButton href={site.messengerUrl} variant="ghost" external>
            Message on Messenger
          </MagneticButton>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2">
          <Reveal>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
              Email
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block font-display text-xl text-foreground transition-colors duration-500 hover:text-accent"
            >
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
              Messenger
            </div>
            <a
              href={site.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block font-display text-xl text-foreground transition-colors duration-500 hover:text-accent"
            >
              {site.messengerName}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
