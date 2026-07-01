import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav, Gallery, Footer, BrochureModal } from "./index";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Discover & Ambience — Tirumala Ventures" },
      { name: "description", content: "Explore our corporate trading floor, live infrastructure, classroom sessions, and community events." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-36">
      <Toaster />
      <Nav />

      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-[0.25em] uppercase mb-6">
            <Camera className="size-3.5" /> Floor Ambience
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-foreground uppercase tracking-wider mb-6 leading-tight">
            Discover Our <span className="text-gradient-gold font-bold italic">Workspace</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center">
            Step into India's premier corporate trading floor. Take a visual tour of our professional desks, 
            breakout zones, training seminars, and active community events designed to build disciplined traders.
          </p>
        </div>
      </section>

      {/* Main Gallery Component */}
      <Gallery />

      {/* Footer */}
      <Footer onDownloadRequest={() => setShowBrochureModal(true)} />

      {/* Brochure Lead Capture Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <BrochureModal isOpen={showBrochureModal} onClose={() => setShowBrochureModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
