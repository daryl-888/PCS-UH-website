import Navbar from "@/components/Navbar";
import Scanlines from "@/components/Scanlines";
import Footer from "@/components/Footer";

/** Shared chrome (nav + CRT overlay + footer) for every route. No WebGL here — the GPU canvas is landing-page-only. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Scanlines />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
