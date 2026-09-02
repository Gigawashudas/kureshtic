import { Navigation } from "@/components/layout/navigation";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { QuestionAnswer } from "@/components/sections/question-answer";
import { SelectedWork } from "@/components/sections/selected-work";
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
      </main>
    </>
  );
}
