import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Stats } from "@/components/site/stats";
import { BeforeAfter } from "@/components/site/before-after";
import { Reels } from "@/components/site/reels";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const title = "RooferGirl — Premium Roofing, Built With Purpose";
const description =
  "RooferGirl delivers premium roofing craftsmanship: inspections, repairs and full replacements finished with care. See the work and get in touch.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <BeforeAfter />
        <Reels />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
