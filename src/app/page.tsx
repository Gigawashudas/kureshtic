import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { QuestionAnswer } from "@/components/sections/question-answer";
import { SelectedWork } from "@/components/sections/selected-work";
import { WhatWeBuild } from "@/components/sections/what-we-build";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <QuestionAnswer />
        <WhatWeBuild />
        <SelectedWork />
      </main>
    </>
  );
}
