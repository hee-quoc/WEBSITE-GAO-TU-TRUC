import Link from "next/link";

import { LatestProduct } from "~/app/_components/product";
import { HeroSection } from "./_components/home/HeroSection";
import { AboutSection } from "./_components/home/AboutSection";
import { ProductsSection } from "./_components/home/ProductsSection";
import { PartnerSection } from "./_components/home/PartnerSection";
import { Testimonial } from "./_components/home/TestinomialSection";
import { StatisticSection } from "./_components/home/StatisticsSection";
import { ContactSection } from "./_components/home/ContactSection";
import { api, HydrateClient } from "~/trpc/server";
export default async function Home() {
  //const hello = await api.product.hello({ text: "from tRPC" });

  //void api.product.getLatest.prefetch();
  const products = await api.product.getAll();
  return (
    <HydrateClient>
      
        <HeroSection />
        <AboutSection />
        <ProductsSection products={products} />
        <PartnerSection />
        <StatisticSection/>
        <Testimonial/>
        <ContactSection />
    </HydrateClient>
  );
}
