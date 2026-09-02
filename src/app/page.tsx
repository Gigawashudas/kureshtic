import { Capabilities } from "@/components/sections/capabilities";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Navigation } from "@/components/layout/navigation";
import { Process } from "@/components/sections/process";
import { QuestionAnswer } from "@/components/sections/question-answer";
import { SelectedWork } from "@/components/sections/selected-work";
import { StartProject } from "@/components/sections/start-project";
import { Technology } from "@/components/sections/technology";
import { Trust } from "@/components/sections/trust";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { WhyKureshtic } from "@/components/sections/why-kureshtic";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <QuestionAnswer />
        <WhatWeBuild />
        <SelectedWork />
        <Capabilities />
        <Process />
        <WhyKureshtic />
        <Trust />
        <Technology />
        <StartProject />
        <FinalCta />
      </main>
    </>
  );
}
