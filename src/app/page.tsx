import { Ecosystem } from "@/components/ecosystem";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Navbar } from "@/components/navbar";
import { Pricing } from "@/components/pricing";
import { Roles } from "@/components/roles";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Roles />
        <Ecosystem />
        <ToolsSection />
        <Pricing />
      </main>
      <FinalCta />
    </>
  );
}
