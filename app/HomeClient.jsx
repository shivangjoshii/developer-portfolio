"use client";
import dynamic from 'next/dynamic';
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

const Education = dynamic(() => import("./components/homepage/education"), {
  ssr: false,
  loading: () => <div className="h-[600px]" />
});

const Experience = dynamic(() => import("./components/homepage/experience"), {
  ssr: false,
  loading: () => <div className="h-[600px]" />
});

export default function HomeClient({ blogs }) {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
