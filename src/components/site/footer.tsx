import { nav, site } from "@/lib/site-content";

export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <span className="font-display text-2xl tracking-[-0.02em] text-foreground">
            Roofer<span className="text-gold">Girl</span>
          </span>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-3">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-500 hover:text-accent"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} {site.name}
        </div>
      </div>
    </footer>
  );
}
