import BootSequence from "@/components/BootSequence";
import Scanlines from "@/components/Scanlines";
import ScrollGpuScene from "@/components/ScrollGpuScene";
import ParticleNetwork from "@/components/ParticleNetwork";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Offerings from "@/components/Offerings";
import GitHubRepoPanel from "@/components/GitHubRepoPanel";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CodeTicker from "@/components/CodeTicker";
import { ScrollProgressProvider } from "@/lib/scroll-context";

export default function Page() {
  return (
    <ScrollProgressProvider>
      <BootSequence />
      {/* Ambient drifting node-network, fixed behind the GPU render and every
          section — the same visual language as the boot screen, dialed down
          to a faint backdrop so it reads as "the cluster is alive" without
          competing with the product render or the copy. */}
      <ParticleNetwork
        className="fixed inset-0 z-0 opacity-[0.28]"
        density={0.045}
        maxParticles={46}
        linkDistance={140}
        interactive
      />
      <ScrollGpuScene />
      <Scanlines />
      <Navbar />
      <main>
        <Hero />
        <CodeTicker />
        <Mission />
        <CodeTicker reverse />
        <Offerings />
        <CodeTicker />
        <GitHubRepoPanel />
        <CodeTicker reverse />
        <FinalCTA />
      </main>
      <Footer />
    </ScrollProgressProvider>
  );
}
