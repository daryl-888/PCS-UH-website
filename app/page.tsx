import BootSequence from "@/components/BootSequence";
import Scanlines from "@/components/Scanlines";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TelemetryStrip from "@/components/TelemetryStrip";
import Mission from "@/components/Mission";
import Offerings from "@/components/Offerings";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Officers from "@/components/Officers";
import Sponsors from "@/components/Sponsors";
import Join from "@/components/Join";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <BootSequence />
      <Scanlines />
      <Navbar />
      <main>
        <Hero />
        <TelemetryStrip />
        <Mission />
        <Offerings />
        <Projects />
        <Events />
        <Officers />
        <Sponsors />
        <Join />
      </main>
      <Footer />
    </>
  );
}
