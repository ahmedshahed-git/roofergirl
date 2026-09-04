import { motion } from "motion/react";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import { services } from "@/lib/site-content";
import { EASE, MaskReveal, SectionHeading } from "./motion-primitives";

const images = [s1, s2, s3];

export function Services() {
  return (
    <section id="services" className="relative bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="What We Do" title={"Services, shaped\naround your roof."} />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground"
          >
            [Editable placeholder] Replace these cards with the real RooferGirl service list.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-hairline md:grid-cols-3">
          {services.map((svc, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.14, ease: EASE }}
              className="group relative flex flex-col bg-background transition-colors duration-700 hover:bg-card"
            >
              <MaskReveal delay={0.1 + i * 0.14} className="relative aspect-4/3 overflow-hidden">
                <img
                  src={images[i]}
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/45 transition-opacity duration-700 group-hover:opacity-20" />
                <motion.span className="absolute left-6 top-6 font-mono text-xs tracking-[0.3em] text-accent transition-transform duration-700 group-hover:-translate-y-1">
                  {svc.number}
                </motion.span>
              </MaskReveal>

              <div className="flex flex-1 flex-col p-7 md:p-9">
                <h3 className="font-display text-2xl tracking-[-0.02em] text-foreground transition-transform duration-700 group-hover:-translate-y-0.5">
                  {svc.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {svc.description}
                </p>
                <span className="mt-8 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-secondary-foreground transition-colors duration-500 group-hover:text-accent">
                  Details
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
