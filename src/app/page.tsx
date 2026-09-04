import { Capabilities } from "@/components/sections/capabilities";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { QuestionAnswer } from "@/components/sections/question-answer";
import { FeaturedWork } from "@/components/sections/featured-work";
import { StartProject } from "@/components/sections/start-project";
import { Technology } from "@/components/sections/technology";
import { Trust } from "@/components/sections/trust";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { WhyKureshtic } from "@/components/sections/why-kureshtic";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <QuestionAnswer />
        <WhatWeBuild />
        <FeaturedWork />
        <Capabilities />
        <Process />
        <WhyKureshtic />
        <Trust />
        <Technology />
        <StartProject />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
