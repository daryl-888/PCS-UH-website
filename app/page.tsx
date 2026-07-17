import BootSequence from "@/components/BootSequence";
import Scanlines from "@/components/Scanlines";
import ScrollGpuScene from "@/components/ScrollGpuScene";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Offerings from "@/components/Offerings";
import GitHubRepoPanel from "@/components/GitHubRepoPanel";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <BootSequence />
      <ScrollGpuScene />
      <Scanlines />
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Offerings />
        <GitHubRepoPanel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
