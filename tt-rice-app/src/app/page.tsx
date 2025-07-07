import { HeroSection } from "./_components/home/HeroSection";
import { AboutSection } from "./_components/home/AboutSection";
import { ProductsSection } from "./_components/home/ProductsSection";
import { PartnerSection } from "./_components/home/PartnerSection";
import { Testimonial } from "./_components/home/TestinomialSection";
import { StatisticSection } from "./_components/home/StatisticsSection";
import { ContactSection } from "./_components/home/ContactSection";
import { HydrateClient } from "~/trpc/server";
export default async function Home() {
  return (
    <main className="flex-grow"> 
    <HydrateClient>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <PartnerSection />
        <StatisticSection/>
        <Testimonial/>
        <ContactSection />
    </HydrateClient>
    </main>
  );
}
