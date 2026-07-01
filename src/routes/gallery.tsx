import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav, Footer, BrochureModal, GALLERY } from "./index";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, X, ArrowLeft, ArrowRight } from "lucide-react";
import { ImageAutoSlider } from "@/components/ImageAutoSlider";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Discover & Ambience — Tirumala Ventures" },
      {
        name: "description",
        content:
          "Explore our corporate trading floor, live infrastructure, classroom sessions, and community events.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === 0 ? GALLERY.length - 1 : prev! - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === GALLERY.length - 1 ? 0 : prev! + 1));
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const officeImages = GALLERY.slice(6, 12);
  const studentImages = GALLERY.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground pt-36 relative">
      <style>{`
        .curtain-grid {
          position: absolute;
          inset: 0;
          z-index: 9999;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .curtain-panel {
          position: relative;
          height: 100%;
          background: linear-gradient(180deg, oklch(0.13 0.035 155) 0%, oklch(0.08 0.02 155) 100%);
          border: 1px solid transparent;
          transform: translateY(0);
        }
        .curtain-open .curtain-panel {
          border-color: rgba(212, 175, 55, 0.85);
        }
        .curtain-open .panel-1 {
          animation: liftPanel 0.96s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.15s;
        }
        .curtain-open .panel-2 {
          animation: liftPanel 0.78s cubic-bezier(0.22, 1, 0.36, 1) forwards 0s;
        }
        .curtain-open .panel-3 {
          animation: liftPanel 0.82s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.06s;
        }
        .curtain-open .panel-4 {
          animation: liftPanel 0.90s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.21s;
        }
        @keyframes liftPanel {
          from { transform: translateY(0); }
          to { transform: translateY(-115vh); }
        }
      `}</style>

      {/* Page Curtain Intro Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <div className="curtain-grid curtain-open" aria-hidden="true">
              <div className="curtain-panel panel-1" />
              <div className="curtain-panel panel-2" />
              <div className="curtain-panel panel-3" />
              <div className="curtain-panel panel-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            Discover Our{" "}
            <span className="text-gradient-gold font-bold italic">
              Workspace
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center">
            Step into India's premier corporate trading floor. Take a visual
            tour of our professional desks, breakout zones, training seminars,
            and active community events designed to build disciplined traders.
          </p>
        </div>
      </section>

      {/* Animated Marquee Gallery Layout */}
      <section className="pb-24 overflow-hidden space-y-16">
        {/* Row 1: Office Infrastructure (Starting Row) */}
        <div>
          <div className="mx-auto max-w-7xl px-6 mb-6">
            <h3 className="font-serif text-lg sm:text-2xl text-gold uppercase tracking-wider">
              Our Office Infrastructure & Ambience
            </h3>
            <div className="w-16 h-0.5 bg-gold/50 mt-2" />
          </div>
          <ImageAutoSlider
            images={officeImages}
            onImageClick={(idx) => setActiveIndex(idx)}
            startIndex={6}
            reverse={false}
          />
        </div>

        {/* Row 2: Student Moments */}
        <div>
          <div className="mx-auto max-w-7xl px-6 mb-6">
            <h3 className="font-serif text-lg sm:text-2xl text-gold uppercase tracking-wider">
              Student Moments & Training Sessions
            </h3>
            <div className="w-16 h-0.5 bg-gold/50 mt-2" />
          </div>
          <ImageAutoSlider
            images={studentImages}
            onImageClick={(idx) => setActiveIndex(idx)}
            startIndex={0}
            reverse={true}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer onDownloadRequest={() => setShowBrochureModal(true)} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 size-12 rounded-full border border-gold/20 text-gold flex items-center justify-center hover:bg-gold/10 hover:border-gold/50 cursor-pointer transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="size-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 size-12 rounded-full border border-gold/20 text-gold flex items-center justify-center hover:bg-gold/10 hover:border-gold/50 cursor-pointer transition-colors z-10"
              aria-label="Previous image"
            >
              <ArrowLeft className="size-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 size-12 rounded-full border border-gold/20 text-gold flex items-center justify-center hover:bg-gold/10 hover:border-gold/50 cursor-pointer transition-colors z-10"
              aria-label="Next image"
            >
              <ArrowRight className="size-6" />
            </button>

            {/* Lightbox Content */}
            <div
              className="relative max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={activeIndex}
                src={GALLERY[activeIndex].src}
                alt={GALLERY[activeIndex].label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-gold/15 shadow-gold/20 shadow-2xl"
              />

              <div className="flex flex-col items-center gap-1">
                <div className="text-gold font-serif text-sm sm:text-lg tracking-wide text-center">
                  {GALLERY[activeIndex].label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {activeIndex + 1} / {GALLERY.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brochure Lead Capture Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <BrochureModal
            isOpen={showBrochureModal}
            onClose={() => setShowBrochureModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
