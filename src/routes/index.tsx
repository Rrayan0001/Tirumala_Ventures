import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import type React from "react";
import {
  GraduationCap, Calendar, Download, BookOpen, Users, TrendingUp,
  Briefcase, Activity, Wallet, ShieldCheck, Sparkles, Building2,
  Network, Layers, Monitor, Wifi, MessageSquare, Trophy, Phone,
  Mail, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight, LineChart, X,
  Facebook, Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ImageAutoSlider } from "@/components/ImageAutoSlider";
import heroBg from "@/assets/hero/hero-bg.webp";
import tradingFloor from "@/assets/gallery/trading-floor.webp";
import gallery1 from "@/assets/gallery/gallery-1.webp";
import gallery2 from "@/assets/gallery/gallery-2.webp";
import gallery3 from "@/assets/gallery/gallery-3.webp";
import gallery4 from "@/assets/gallery/gallery-4.webp";
import logoAsset from "@/assets/brand/logo.webp";
import contactBg from "@/assets/contact_us/bg1.webp";
import box1 from "@/assets/services/box1.webp";
import box2 from "@/assets/services/box2.webp";
import box3 from "@/assets/services/box3.webp";
import box4 from "@/assets/services/box4.webp";
import aboutUsImg from "@/assets/about/aboutus.webp";
import tradingFloorSection from "@/assets/trading-floor/Trading_floor_section.webp";
import wcuBox1 from "@/assets/why_choose_us/box1.webp";
import wcuBox2 from "@/assets/why_choose_us/box2.webp";
import wcuBox3 from "@/assets/why_choose_us/box3.webp";
import wcuBox4 from "@/assets/why_choose_us/box4.webp";
import wcuBox5 from "@/assets/why_choose_us/box5.webp";
import wcuBox6 from "@/assets/why_choose_us/box6.webp";
import wcuBox7 from "@/assets/why_choose_us/box7.webp";
import wcuBox8 from "@/assets/why_choose_us/box8.webp";
import CandlestickBackground from "@/components/CandlestickBackground";
import MouseGlowTracker from "@/components/MouseGlowTracker";
import { motion, useMotionValue, useSpring, useTransform, useScroll, animate, useInView, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TextReveal } from "@/components/ui/cascade-text";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tirumala Ventures — Premium Trading Education & Live Trading Floor" },
      { name: "description", content: "India's premier trading institute. Live trading floor, expert mentors, practical courses, corporate ambience. Enroll, visit our floor, or download the brochure." },
      { property: "og:title", content: "Tirumala Ventures" },
      { property: "og:description", content: "Premium trading education and live corporate trading floor. Mentorship, weekend classes, live trading, demat support." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "Live Market", href: "#live-market" },
  { label: "Workspace", href: "#workspace", soon: true },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
}) {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 35 };
      case "down": return { opacity: 0, y: -35 };
      case "left": return { opacity: 0, x: -45 };
      case "right": return { opacity: 0, x: 45 };
      case "none": return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value, inView, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh and force top scroll
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Fallback for browsers that don't support native CSS scroll-driven animations
    if (typeof window !== "undefined" && (!window.CSS || !CSS.supports || !CSS.supports("(animation-timeline: view()) and (animation-range: entry)"))) {
      const handleScroll = () => {
        const scrolled = window.scrollY;
        const bgs = document.querySelectorAll(".parallax-bg");
        const fgs = document.querySelectorAll(".parallax-fg");

        bgs.forEach((bg) => {
          const htmlBg = bg as HTMLElement;
          htmlBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        });

        fgs.forEach((fg) => {
          const htmlFg = fg as HTMLElement;
          htmlFg.style.transform = `translateY(${scrolled * -0.06}px)`;
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/60 via-gold to-gold/60 origin-left z-[60]"
        style={{ scaleX }}
      />
      {showSplash && <WelcomeSplash onComplete={() => setShowSplash(false)} />}
      <Toaster />
      <Nav />
      <Hero />
      <About />
      <section id="leadership"><Leadership /></section>
      <Services />
      <LiveMarket />
      <USP />
      <TradingFloor />
      <section id="workspace"><Workspace /></section>
      <Courses />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

const LOGO_PHASE_MS = 1000;
const CURTAIN_PHASE_MS = 1200;

function WelcomeSplash({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase("reveal"), LOGO_PHASE_MS);
    const finishTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, LOGO_PHASE_MS + CURTAIN_PHASE_MS);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          overflow: hidden;
          transition: background-color 0.12s linear;
        }
        .intro-overlay.reveal-phase {
          background: transparent;
        }

        .intro-logo-stage {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .intro-logo-stage.is-active {
          opacity: 1;
        }
        .intro-logo-wrap {
          position: relative;
          width: min(94vw, 920px);
          aspect-ratio: 3 / 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: logoPop 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .intro-logo {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: scale(0.94);
          animation: logoFade 0.8s ease-out forwards 0.05s;
        }
        @keyframes logoPop {
          0% { transform: scale(0.82); opacity: 0; }
          30% { transform: scale(1.04); opacity: 1; }
          65% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        @keyframes logoFade {
          0% { opacity: 0; transform: scale(0.94); }
          60% { opacity: 1; transform: scale(1.01); }
          100% { opacity: 1; transform: scale(1); }
        }

        .curtain-grid {
          position: absolute;
          inset: 0;
          z-index: 2;
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

      <div className={`intro-overlay ${phase === "reveal" ? "reveal-phase" : ""}`}>
        <div className={`intro-logo-stage ${phase === "logo" ? "is-active" : ""}`}>
          <div className="intro-logo-wrap">
            {/* Glowing Logo */}
            <div className="relative mb-6 animate-pulse-glow rounded-full p-2">
              <img
                src={logoAsset}
                alt="Tirumala Ventures Logo"
                className="size-20 sm:size-24 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.55)] intro-logo"
                loading="eager"
              />
            </div>

            {/* Serif Title */}
            <div className="overflow-hidden mb-3 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-gold tracking-[0.25em] uppercase leading-tight">
                Tirumala
              </h2>
              <div className="text-xs uppercase tracking-[0.4em] text-gold/80 mt-1.5 leading-tight">
                ventures
              </div>
            </div>

            {/* Tagline Highlight with Underline Progress */}
            <div className="relative mt-3 px-4 py-1.5 overflow-hidden text-center">
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gradient-gold font-semibold leading-relaxed">
                Master the Markets
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent mt-2 opacity-65" />
            </div>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-gold/15 rounded-full overflow-hidden mt-6 mx-auto relative">
              <div 
                className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full w-full origin-left animate-progress-bar" 
                style={{ animationDuration: "1s" }}
              />
            </div>
          </div>
        </div>

        <div className={`curtain-grid ${phase === "reveal" ? "curtain-open" : ""}`} aria-hidden="true">
          <div className="curtain-panel panel-1" />
          <div className="curtain-panel panel-2" />
          <div className="curtain-panel panel-3" />
          <div className="curtain-panel panel-4" />
        </div>
      </div>
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
        {/* Scrolling alerts marquee ticker */}
        <div className="w-full bg-gold/[0.04] border-b border-gold/10 py-2 overflow-hidden select-none text-[10px] sm:text-xs text-gold/90 font-medium uppercase tracking-[0.25em] relative flex items-center">
          <div className="animate-marquee whitespace-nowrap gap-12">
            <span>⚡ LIVE MARKET ROOMS: ACTIVE SETUPS IN PLAY</span>
            <span>✦ NEW TECHNICAL ANALYSIS MASTERCLASS BATCH STARTING MONDAY</span>
            <span>⚡ NIFTY 50: EXPANDING BREAKOUT RESISTANCE ZONE</span>
            <span>✦ CORPORATE FLOOR VISITS OPEN FOR WEEKEND ENROLLMENT</span>
            <span>⚡ PRE-MARKET SESSION BRIEF STARTS 9:00 AM IST WEEKDAYS</span>
            {/* Duplicate for seamless infinite loop */}
            <span>⚡ LIVE MARKET ROOMS: ACTIVE SETUPS IN PLAY</span>
            <span>✦ NEW TECHNICAL ANALYSIS MASTERCLASS BATCH STARTING MONDAY</span>
            <span>⚡ NIFTY 50: EXPANDING BREAKOUT RESISTANCE ZONE</span>
            <span>✦ CORPORATE FLOOR VISITS OPEN FOR WEEKEND ENROLLMENT</span>
            <span>⚡ PRE-MARKET SESSION BRIEF STARTS 9:00 AM IST WEEKDAYS</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={logoAsset} alt="Tirumala Ventures" className="size-12 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]" />
            <div className="leading-tight">
              <div className="font-serif text-lg text-gold tracking-widest">TIRUMALA</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">ventures</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                <TextReveal text={n.label} className="hover:text-gold" />
                {n.soon && <span className="text-[9px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded-full border border-gold/50 text-gold">Soon</span>}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex"><Button variant="hero" size="sm">Enroll Now</Button></a>
            <button onClick={() => setOpen(true)} className="lg:hidden text-gold p-1.5" aria-label="Open Menu">
              <Layers className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-all duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in glassmorphic drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-emerald-deep border-l border-gold/30 p-6 flex flex-col justify-between shadow-gold transition-all duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gold/30">
            <div className="font-serif text-gold tracking-widest text-sm font-semibold">MENU</div>
            <button onClick={() => setOpen(false)} className="text-gold p-1 hover:text-white" aria-label="Close menu">
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 py-6 overflow-y-auto max-h-[60vh]">
            {NAV.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-base py-3 px-4 rounded-lg text-gold hover:text-white hover:bg-gold/10 font-serif font-medium transition-all flex items-center justify-between group border border-gold/10"
              >
                <span className="tracking-wide">{n.label}</span>
                {n.soon ? (
                  <span className="text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-full border border-gold/45 text-gold bg-gold/5">Soon</span>
                ) : (
                  <ArrowRight className="size-4 opacity-60 text-gold group-hover:opacity-100 group-hover:text-white transition-all" />
                )}
              </a>
            ))}
          </nav>
        </div>
        <div className="pt-6 border-t border-gold/30 space-y-4">
          <div className="text-xs text-gold/80 flex flex-col gap-2">
            <a href="mailto:info@tirumalaventures.com" className="hover:text-white flex items-center gap-2 py-1 transition-colors">
              <Mail className="size-4 text-gold" /> info@tirumalaventures.com
            </a>
            <a href="tel:+9198XXXXXXXX" className="hover:text-white flex items-center gap-2 py-1 transition-colors">
              <Phone className="size-4 text-gold" /> +91 98XXX XXXXX
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Mouse-position motion values for perspective tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 18 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 18 });

  // Parallax layer offsets (different depths)
  const layerFarX  = useSpring(useTransform(rawX, [-0.5, 0.5], [-18, 18]), { stiffness: 50, damping: 20 });
  const layerFarY  = useSpring(useTransform(rawY, [-0.5, 0.5], [-10, 10]), { stiffness: 50, damping: 20 });
  const layerMidX  = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 55, damping: 20 });
  const layerMidY  = useSpring(useTransform(rawY, [-0.5, 0.5], [-6, 6]),  { stiffness: 55, damping: 20 });
  const layerFgX   = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]),  { stiffness: 60, damping: 22 });
  const layerFgY   = useSpring(useTransform(rawY, [-0.5, 0.5], [-3, 3]),  { stiffness: 60, damping: 22 });
  const layerCardX = useSpring(useTransform(rawX, [-0.5, 0.5], [8, -8]),  { stiffness: 55, damping: 20 });
  const layerCardY = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]),  { stiffness: 55, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 pb-8 sm:pb-12 overflow-hidden parallax-container"
      style={{ perspective: "1200px" }}
    >
      {/* ── DEPTH LAYER 0: Farthest — hero background image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: layerFarX, y: layerFarY, scale: 1.08 }}
      >
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1280} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

      {/* ── DEPTH LAYER 1: Mid-far — candlestick chart ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20"
        style={{ x: layerMidX, y: layerMidY, scale: 1.06 }}
      >
        <CandlestickBackground />
      </motion.div>

      {/* ── MAIN CONTENT TILT WRAPPER (perspective-3d tilt) ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative mx-auto max-w-7xl px-6 pt-2 pb-8 lg:pt-4 lg:pb-12 grid lg:grid-cols-12 gap-y-10 lg:gap-y-12 gap-x-12 items-center"
      >
        {/* ── DEPTH LAYER 3: Foreground — hero text ── */}
        <motion.div
          className="lg:col-span-7"
          style={{ x: layerFgX, y: layerFgY, translateZ: 30 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-5">
              <span className="h-px w-10 bg-gold" /> Tirumala Ventures
            </div>
            <h1 className="font-serif leading-[1.08] mb-6 tracking-tight">
              {/* Line 1 — light cream, regular weight */}
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-foreground/80">
                Master the
              </span>
              {/* Line 2 — bold gold gradient, italic, with 3D extrusion shadow */}
              <span
                className="block text-5xl sm:text-7xl lg:text-8xl font-bold italic text-gradient-gold leading-[1.0]"
                style={{
                  textShadow: [
                    "2px 2px 0 oklch(0.7 0.16 75 / 0.6)",
                    "4px 4px 0 oklch(0.6 0.14 75 / 0.4)",
                    "6px 6px 0 oklch(0.5 0.12 75 / 0.25)",
                    "8px 8px 12px oklch(0 0 0 / 0.4)",
                  ].join(", "),
                }}
              >
                Markets
              </span>
              {/* Line 3 — muted italic, smaller, offbeat weight */}
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-medium italic text-muted-foreground/70 mt-1">
                with Confidence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10">
              Learn professional trading inside a corporate-grade live trading floor.
              Mentorship, real-time market exposure and a community of disciplined traders.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8 max-w-4xl">
              <a href="#contact" className="w-full"><Button variant="hero" size="lg" className="w-full px-2.5 sm:px-8 text-xs sm:text-sm"><GraduationCap className="size-4 shrink-0" /> Enroll Now</Button></a>
              <a href="#contact" className="w-full"><Button variant="heroOutline" size="lg" className="w-full px-2.5 sm:px-8 text-xs sm:text-sm"><Calendar className="size-4 shrink-0" /> Book a Visit</Button></a>
              <a href="/brochure.pdf" download className="w-full"><Button variant="heroOutline" size="lg" className="w-full px-2.5 sm:px-8 text-xs sm:text-sm"><Download className="size-4 shrink-0" /> Download Brochure</Button></a>
              <a href="#courses" className="w-full"><Button variant="heroOutline" size="lg" className="w-full px-2.5 sm:px-8 text-xs sm:text-sm"><BookOpen className="size-4 shrink-0" /> Courses</Button></a>
            </div>
            <a href="#floor" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold">
              <span className="size-2 rounded-full bg-gold animate-pulse-glow" />
              Live Trading Corporate Ambience · Trading Floor <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── DEPTH LAYER 4: Card — floats opposite direction (counter-parallax) ── */}
        <motion.div
          className="lg:col-span-5"
          style={{ x: layerCardX, y: layerCardY, translateZ: 50 }}
        >
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
          >
            <MouseGlowTracker className="rounded-3xl">
              <div className="relative glass-card glowing-border p-5 sm:p-8 shadow-gold">
                <div className="absolute -inset-px rounded-2xl animate-shimmer pointer-events-none" />
                <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                  {[
                    { val: 12, suffix: "K+", label: "Active Traders" },
                    { val: 240, prefix: "₹", suffix: "Cr", label: "Tracked Capital" },
                    { val: 4.9, suffix: "★", decimals: 1, label: "Mentor Rating" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-serif text-lg sm:text-2xl text-gold">
                        <AnimatedCounter value={s.val} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                      </div>
                      <div className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-muted-foreground mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-gold/15 pt-6 space-y-3 text-xs sm:text-sm">
                  {[
                    ["NIFTY 50", "24,812.45", "+0.84%"],
                    ["BANK NIFTY", "53,204.10", "+1.12%"],
                    ["SENSEX", "81,402.30", "+0.67%"],
                    ["GOLD", "₹74,210", "+0.31%"],
                  ].map(([k, v, c]) => (
                    <div key={k} className="grid grid-cols-3 items-center">
                      <span className="text-muted-foreground tracking-wide text-left">{k}</span>
                      <span className="text-foreground text-right font-mono pr-2 sm:pr-8">{v}</span>
                      <span className="text-gold text-right font-mono">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MouseGlowTracker>
          </motion.div>
        </motion.div>

        {/* ── HIGHLIGHTS ROW — 3D floating feature cards ── */}
        <div className="lg:col-span-12 mt-6 pt-6 border-t border-gold/15 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 animate-float-up" style={{ transformStyle: "preserve-3d" }}>
          {[
            { i: Building2, t: "Corporate Ambience", d: "Live trading floor experience", z: 20 },
            { i: Users, t: "Expert Mentors", d: "Decade-experienced guidance", z: 30 },
            { i: TrendingUp, t: "Practical Learning", d: "Trade with real capital", z: 25 },
            { i: Calendar, t: "Flexible Batches", d: "Weekday & weekend classes", z: 15 },
          ].map(({ i: Icon, t, d, z }) => (
            <motion.div
              key={t}
              className="flex gap-4 items-center group cursor-default"
              style={{ translateZ: z }}
              whileHover={{ translateZ: z + 20, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="size-10 rounded-xl bg-gold/5 border border-gold/15 flex items-center justify-center shrink-0 shadow-sm shadow-gold/5 group-hover:bg-gold/15 transition-all duration-300">
                <Icon className="size-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-serif text-gold font-semibold tracking-wide leading-tight group-hover:text-white transition-colors">{t}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-4">
      <div className="inline-flex items-center gap-3 text-gold text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4">
        <span className="h-px w-6 sm:h-px sm:w-8 bg-gold" /> {eyebrow} <span className="h-px w-6 sm:h-px sm:w-8 bg-gold" />
      </div>
      <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-4 leading-tight">{title}</h2>
      {sub && <p className="text-muted-foreground text-sm sm:text-base">{sub}</p>}
    </div>
  );
}

function About() {
  const leftPillars = [
    { i: Building2, t: "Professional Environment", d: "Access our corporate-grade live trading floor and professional study environments designed for serious focus." },
    { i: Activity, t: "Practical Learning", d: "Learn by doing with live market charts, hands-on simulation, and direct execution practice." },
    { i: Layers, t: "Corporate Infrastructure", d: "Utilize high-speed feeds, multi-screen trading terminals, and institutional-grade workspace setups." },
  ];

  const rightPillars = [
    { i: Users, t: "Industry Mentors", d: "Get direct guidance from veteran market traders with over a decade of real-world trading experience." },
    { i: TrendingUp, t: "Real-Time Markets", d: "Be in the middle of active market sessions, pre-market analysis, and post-market review briefs." },
    { i: Network, t: "Community Driven", d: "Join a disciplined, active network of traders, technical analysts, and financial enthusiasts." },
  ];

  const metrics = [
    { val: 12, suffix: "K+", label: "Active Traders", i: Users },
    { val: 240, prefix: "₹", suffix: "Cr", label: "Tracked Capital", i: TrendingUp },
    { val: 4.9, suffix: "★", decimals: 1, label: "Mentor Rating", i: Trophy },
    { val: 10, suffix: "+", label: "Years Experience", i: ShieldCheck },
  ];

  return (
    <section id="about" className="pt-16 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 px-4">
            <div className="flex items-center justify-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-4">
              <span className="h-[1.5px] w-8 bg-gold/50" />
              <span>About Us</span>
              <span className="h-[1.5px] w-8 bg-gold/50" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight uppercase tracking-wider text-gradient-gold">
              About Tirumala Ventures
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mb-8" />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We are a results-driven trading academy and live floor workspace helping aspiring and seasoned traders grow through strategy, discipline, and performance. From foundational knowledge to advanced execution, we turn market analysis into consistent results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12 mt-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {leftPillars.map(({ i: Icon, t, d }, index) => (
              <ScrollReveal
                key={t}
                direction="left"
                delay={index * 0.1}
                className="flex-1"
              >
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-all duration-300 flex items-start gap-4 h-full">
                    <div className="size-12 rounded-xl bg-gold border border-gold/15 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-emerald-deep" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-gold font-semibold uppercase tracking-wider mb-2">{t}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">{d}</p>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            ))}
          </div>

          {/* Center Image */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <ScrollReveal direction="up" className="w-full h-full">
              <div className="relative border border-gold/30 rounded-2xl overflow-hidden w-full h-full min-h-[350px] sm:min-h-[450px] group shadow-gold flex items-center justify-center">
                <img
                  src={aboutUsImg}
                  alt="Tirumala Ventures Live Trading Floor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {rightPillars.map(({ i: Icon, t, d }, index) => (
              <ScrollReveal
                key={t}
                direction="right"
                delay={index * 0.1}
                className="flex-1"
              >
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-all duration-300 flex items-start gap-4 h-full">
                    <div className="size-12 rounded-xl bg-gold border border-gold/15 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-emerald-deep" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-gold font-semibold uppercase tracking-wider mb-2">{t}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">{d}</p>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Metrics Bar */}
        <ScrollReveal direction="up" delay={0.2} className="w-full mt-12">
          <MouseGlowTracker className="rounded-2xl w-full">
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 shadow-gold">
              {metrics.map((s, index) => {
                const Icon = s.i;
                return (
                  <div key={s.label} className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                    {index > 0 && (
                      <>
                        <div className="hidden md:block w-px h-12 bg-gold/15" />
                        <div className="block md:hidden w-full h-px bg-gold/10 my-2" />
                      </>
                    )}
                    <div className="flex items-center gap-4 justify-center md:justify-start w-full md:w-auto">
                      <div className="size-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                        <Icon className="size-6 text-gold" />
                      </div>
                      <div>
                        <div className="font-serif text-2xl sm:text-3xl text-gold font-bold">
                          <AnimatedCounter value={s.val} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                        </div>
                        <div className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </MouseGlowTracker>
        </ScrollReveal>
      </div>
    </section>
  );
}
function Services() {
  const items = [
    {
      i: Briefcase,
      t: "Mentorship\nProgram",
      d: "One-on-one guidance, strategy development, risk management and market psychology training.",
      img: box1,
    },
    {
      i: Calendar,
      t: "Weekend\nClasses",
      d: "Flexible weekend programs designed for working professionals and students.",
      img: box2,
    },
    {
      i: Activity,
      t: "Live\nTrading",
      d: "Real-time trading sessions with market analysis and execution strategies.",
      img: box3,
    },
    {
      i: Wallet,
      t: "Demat\nSupport",
      d: "Complete assistance for opening and managing Demat & Trading accounts.",
      img: box4,
    },
  ];
  return (
    <section id="services" className="pt-12 pb-0 md:pt-16 md:pb-0 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Services"
            title="WHAT WE OFFER"
            sub="At Tirumala Ventures, we provide a blend of expert-led trading education and real-world market support designed to help you grow your skills, confidence, and consistency."
          />
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ i: Icon, t, d, img }, index) => {
            const direction = index < 2 ? "left" : "right";
            const delay = (index % 2) * 0.12;
            return (
              <ScrollReveal
                key={t}
                direction={direction}
                delay={delay}
                className="h-full"
              >
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-5 sm:p-6 group hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Background 3D asset image positioned absolutely to overlap with text */}
                    <img
                      src={img}
                      alt={t}
                      className="absolute right-2 top-2 h-28 sm:h-40 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 pointer-events-none z-0 opacity-60 sm:opacity-85 group-hover:opacity-100"
                    />
                    
                    {/* Main content layer on top of the image */}
                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                      <div className="size-12 rounded-lg bg-gold/5 border border-gold/15 flex items-center justify-center">
                        <Icon className="size-6 text-gold" />
                      </div>
                      <div className="mt-8 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl text-gold mb-3 uppercase tracking-wide leading-tight whitespace-pre-line min-h-[50px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {t}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                            {d}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#c57d29] hover:text-gold transition-colors uppercase cursor-pointer">
                          <span>Learn More</span>
                          <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            );
          })}
        </div>
        {/* Bottom stylized divider line with Tirumala Ventures logo */}
        <div className="w-full flex items-center justify-center mt-12 mb-6 gap-6 select-none opacity-45">
          <div className="h-px bg-gold/15 flex-1" />
          <img src={logoAsset} alt="Tirumala Ventures" className="size-10 object-contain brightness-95" />
          <div className="h-px bg-gold/15 flex-1" />
        </div>
      </div>
    </section>
  );
}

function USP() {
  const usps = [
    { i: Activity,      t: "Live Market Exposure",          img: wcuBox1 },
    { i: Building2,     t: "Corporate Trading Ambience",    img: wcuBox2 },
    { i: Users,         t: "Experienced Mentors",           img: wcuBox3 },
    { i: Sparkles,      t: "Practical Learning",            img: wcuBox4 },
    { i: MessageSquare, t: "Real-Time Trade Discussions",   img: wcuBox5 },
    { i: Monitor,       t: "Professional Trading Floor",   img: wcuBox6 },
    { i: Network,       t: "Networking Opportunities",      img: wcuBox7 },
    { i: Trophy,        t: "Beginner to Advanced Training", img: wcuBox8 },
  ];

  return (
    <section id="why-choose-us" className="pt-16 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 px-4">
            <div className="flex items-center justify-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-4">
              <span className="h-[1.5px] w-8 bg-gold/50" />
              <span>Why Choose Us</span>
              <span className="h-[1.5px] w-8 bg-gold/50" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight tracking-wider text-gradient-gold">
              The Tirumala Advantage
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              If You Are a Experienced Trader, Come join us For the new experience.
            </p>
          </div>
        </ScrollReveal>

        {/* 4×2 card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {usps.map(({ i: Icon, t, img }, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const direction = col < 2 ? "left" : "right";
            const delay = (col % 2) * 0.1 + row * 0.05;
            return (
              <ScrollReveal key={t} direction={direction} delay={delay} className="h-full">
                <MouseGlowTracker className="rounded-2xl h-full">
                  <div className="glass-card rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 h-full flex flex-col justify-between relative group min-h-[290px] sm:min-h-[360px]">
                    {/* 3D image — absolute positioned, very large & overlapping */}
                    <div className="absolute inset-x-0 top-3 bottom-24 flex items-center justify-center pointer-events-none z-0">
                      <img
                        src={img}
                        alt={t}
                        className="w-auto h-full max-h-[105%] object-contain scale-110 group-hover:scale-115 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] opacity-90 group-hover:opacity-100"
                      />
                    </div>

                    {/* Spacer to push content down */}
                    <div className="flex-1" />

                    {/* Bottom area with icon + title + gold underline with contrast gradient */}
                    <div className="px-4 sm:px-5 pb-5 sm:pb-6 pt-12 sm:pt-16 flex flex-col gap-3 relative z-10 bg-gradient-to-t from-card via-card/75 to-transparent">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-3">
                        <div className="size-7 sm:size-9 rounded-full border border-gold/50 bg-background/80 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5 shadow-lg">
                          <Icon className="size-3 sm:size-4 text-gold" />
                        </div>
                        <div className="flex flex-col gap-1.5 sm:gap-2">
                          <h3 className="font-serif text-xs sm:text-sm md:text-base font-semibold tracking-wider text-foreground/95 uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            {t}
                          </h3>
                          <div className="w-8 h-[2px] bg-gold/70 rounded-full mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function TradingFloor() {
  const leftPillars = [
    { i: Monitor, t: "Professional Trading Desks", d: "Our floor features premium ergonomic trading desks with dual-monitor setups, built for precision and speed in every session." },
    { i: Activity, t: "Multiple Market-Monitoring Screens", d: "Track indices, futures, options and live charts simultaneously across our wall of institutional-grade multi-screen arrays." },
    { i: Wifi, t: "High-Speed Internet Setup", d: "Experience uninterrupted trading powered by dedicated fiber lines with sub-millisecond latency and redundant failover connectivity." },
  ];

  const rightPillars = [
    { i: Users, t: "Collaborative Trading Environment", d: "Share ideas, strategies and live calls in a buzzing open-floor environment where traders learn and grow together in real time." },
    { i: Network, t: "Learning & Networking Space", d: "Dedicated breakout zones and seminar spaces where knowledge meets opportunity — connect with mentors and fellow traders." },
    { i: ShieldCheck, t: "Institutional-Grade Infrastructure", d: "Every workstation is equipped with professional-level data feeds, Bloomberg terminals access, and enterprise security standards." },
  ];

  return (
    <section id="floor" className="pt-16 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 px-4">
            <div className="flex items-center justify-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-4">
              <span className="h-[1.5px] w-8 bg-gold/50" />
              <span>Trading Floor Showcase</span>
              <span className="h-[1.5px] w-8 bg-gold/50" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight uppercase tracking-wider text-gradient-gold">
              Live Trading Corporate Ambience
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mb-8" />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Step inside an institutional-grade trading floor meticulously designed for serious market participants. Every detail engineered for performance, focus, and professional growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Three-column layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12 mt-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {leftPillars.map(({ i: Icon, t, d }, index) => (
              <ScrollReveal key={t} direction="left" delay={index * 0.1} className="flex-1">
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-all duration-300 flex items-start gap-4 h-full">
                    <div className="size-12 rounded-xl bg-gold border border-gold/15 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-emerald-deep" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-gold font-semibold uppercase tracking-wider mb-2">{t}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">{d}</p>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            ))}
          </div>

          {/* Center Image */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <ScrollReveal direction="up" className="w-full h-full">
              <div className="relative border border-gold/30 rounded-2xl overflow-hidden w-full h-full min-h-[350px] sm:min-h-[450px] group shadow-gold flex items-center justify-center">
                <img
                  src={tradingFloorSection}
                  alt="Tirumala Ventures Live Trading Floor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 text-gold text-xs sm:text-sm tracking-widest whitespace-nowrap">
                  <span className="size-2 rounded-full bg-gold animate-pulse-glow" />
                  LIVE TRADING FLOOR
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {rightPillars.map(({ i: Icon, t, d }, index) => (
              <ScrollReveal key={t} direction="right" delay={index * 0.1} className="flex-1">
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-all duration-300 flex items-start gap-4 h-full">
                    <div className="size-12 rounded-xl bg-gold border border-gold/15 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-emerald-deep" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-gold font-semibold uppercase tracking-wider mb-2">{t}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">{d}</p>
                    </div>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Centered CTA Button */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex justify-center mt-4">
            <a href="#contact">
              <Button variant="hero" className="px-10 py-4 text-base">
                Book a Floor Visit <Calendar className="ml-2" />
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function LiveMarket() {
  const initial = [
    { sym: "RELIANCE", name: "Reliance Industries", price: 2945.20, change: 1.24, call: "BUY", target: 3050, sl: 2890 },
    { sym: "TCS", name: "Tata Consultancy", price: 4120.55, change: -0.42, call: "HOLD", target: 4250, sl: 4020 },
    { sym: "HDFCBANK", name: "HDFC Bank", price: 1682.10, change: 0.86, call: "BUY", target: 1740, sl: 1645 },
    { sym: "INFY", name: "Infosys", price: 1875.40, change: 1.91, call: "BUY", target: 1960, sl: 1820 },
    { sym: "ICICIBANK", name: "ICICI Bank", price: 1245.75, change: 0.55, call: "BUY", target: 1290, sl: 1210 },
    { sym: "SBIN", name: "State Bank of India", price: 824.30, change: -0.31, call: "HOLD", target: 860, sl: 798 },
    { sym: "TATAMOTORS", name: "Tata Motors", price: 982.65, change: 2.14, call: "BUY", target: 1040, sl: 945 },
    { sym: "ADANIENT", name: "Adani Enterprises", price: 2410.90, change: -1.08, call: "SELL", target: 2300, sl: 2480 },
    { sym: "BAJFINANCE", name: "Bajaj Finance", price: 7195.40, change: 0.74, call: "BUY", target: 7400, sl: 7050 },
    { sym: "LT", name: "Larsen & Toubro", price: 3625.20, change: 1.42, call: "BUY", target: 3780, sl: 3540 },
  ];
  const [stocks, setStocks] = useState(initial);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const delta = (Math.random() - 0.48) * (s.price * 0.0025);
        const price = +(s.price + delta).toFixed(2);
        const change = +((s.change + (Math.random() - 0.5) * 0.15)).toFixed(2);
        return { ...s, price, change };
      }));
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="live-market" className="pt-6 pb-12 md:pt-8 md:pb-16 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Live Market Analysis"
            title="Real-time stock calls & analysis"
            sub="Mentor-curated live trade calls with entry, target and stop-loss. Updated every few seconds during market hours."
          />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-6 px-1">
            <div className="inline-flex items-center gap-2 text-sm text-gold">
              <span className="size-2 rounded-full bg-gold animate-pulse-glow" />
              LIVE · NSE / BSE · Tick #{tick}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase">Indicative analysis · Not investment advice</div>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 px-3 py-3 sm:px-5 text-[9px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-muted-foreground border-b border-gold/15">
              <div className="col-span-4 md:col-span-3">Stock</div>
              <div className="col-span-2 md:col-span-2 text-right">LTP</div>
              <div className="col-span-3 md:col-span-2 text-right">Change</div>
              <div className="hidden md:block md:col-span-2 text-right">Target</div>
              <div className="hidden md:block md:col-span-1 text-right">SL</div>
              <div className="col-span-3 md:col-span-2 text-right">Call</div>
            </div>
            <div className="divide-y divide-gold/10">
              {stocks.map(s => {
                const up = s.change >= 0;
                const callColor = s.call === "BUY" ? "text-emerald-400 border-emerald-400/40 bg-emerald-400/5"
                  : s.call === "SELL" ? "text-red-400 border-red-400/40 bg-red-400/5"
                  : "text-gold border-gold/40 bg-gold/5";
                return (
                  <div key={s.sym} className="grid grid-cols-12 px-3 py-3 sm:px-5 sm:py-4 items-center hover:bg-gold/[0.03] transition-colors">
                    <div className="col-span-4 md:col-span-3">
                      <div className="font-serif text-sm sm:text-base text-gold leading-tight">{s.sym}</div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate max-w-[80px] sm:max-w-none">{s.name}</div>
                    </div>
                    <div className="col-span-2 md:col-span-2 text-right font-mono text-xs sm:text-sm">₹{s.price.toFixed(2)}</div>
                    <div className={`col-span-3 md:col-span-2 text-right font-mono text-xs sm:text-sm inline-flex items-center justify-end gap-0.5 sm:gap-1 ${up ? "text-emerald-400" : "text-red-400"}`}>
                      {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                      {s.change > 0 ? "+" : ""}{s.change.toFixed(2)}%
                    </div>
                    <div className="hidden md:block md:col-span-2 text-right font-mono text-sm text-foreground/80">₹{s.target}</div>
                    <div className="hidden md:block md:col-span-1 text-right font-mono text-sm text-foreground/60">₹{s.sl}</div>
                    <div className="col-span-3 md:col-span-2 text-right">
                      <span className={`inline-block text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${callColor}`}>{s.call}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="#contact" className="inline-block w-full sm:w-auto"><Button variant="hero" size="lg" className="w-full"><LineChart /> Get Daily Live Calls</Button></a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Workspace() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal direction="right">
          <MouseGlowTracker className="rounded-3xl">
            <div className="relative glass-card glowing-border p-6 sm:p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute inset-0 animate-shimmer opacity-40" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase mb-6 animate-pulse-glow">
                  <Sparkles className="size-3" /> Coming Soon
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl mb-6">Trading Workspace</h2>
                <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  A dedicated professional workspace for traders, investors and market enthusiasts
                  is currently under development and will be launching soon.
                </p>
              </div>
            </div>
          </MouseGlowTracker>
        </ScrollReveal>
      </div>
    </section>
  );
}

const COURSES = [
  { t: "Beginner Trading Program", d: "Stock market basics, demat setup, risk fundamentals and your first trades." },
  { t: "Technical Analysis Masterclass", d: "Charts, indicators, patterns and price action — read markets like a pro." },
  { t: "Options Trading Program", d: "Greeks, strategies, hedging and disciplined options execution." },
  { t: "Intraday Trading Strategies", d: "Setups, entries, exits and risk control for active intraday traders." },
  { t: "Swing Trading Program", d: "Multi-day strategies, position sizing and trend-following systems." },
  { t: "Advanced Market Psychology", d: "Mindset, discipline and habits that separate consistent traders." },
];

function Courses() {
  return (
    <section id="courses" className="section-pad bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="Courses" title="Programs crafted for every level" />
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, index) => {
            const col = index % 3;
            const direction = col === 0 ? "left" : col === 1 ? "up" : "right";
            return (
              <ScrollReveal
                key={c.t}
                direction={direction}
                delay={index * 0.08}
                className="h-full"
              >
                <MouseGlowTracker className="rounded-xl h-full">
                  <div className="glass-card rounded-xl p-6 flex flex-col hover:border-gold/40 transition-colors h-full">
                    <BookOpen className="size-7 text-gold mb-4" />
                    <h3 className="font-serif text-xl mb-3">{c.t}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">{c.d}</p>
                    <a href="#contact"><Button variant="heroOutline" size="sm" className="w-full">Learn More <ArrowRight /></Button></a>
                  </div>
                </MouseGlowTracker>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal className="text-center mt-12">
          <a href="/brochure.pdf" download><Button variant="hero" size="lg"><Download /> Download Brochure</Button></a>
        </ScrollReveal>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: gallery1, label: "Classroom Training" },
  { src: gallery2, label: "Live Trading Sessions" },
  { src: gallery3, label: "Trading Floor Environment" },
  { src: gallery4, label: "Workshops & Events" },
  { src: tradingFloor, label: "Student Interactions" },
  { src: heroBg, label: "Success Stories" },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + GALLERY.length) % GALLERY.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % GALLERY.length);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
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

  // Split gallery images into two halves for the dual-row marquee
  const row1Images = GALLERY.slice(0, 3);
  const row2Images = GALLERY.slice(3, 6);

  return (
    <section id="gallery" className="section-pad overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Gallery" title="Moments from our trading floor" />
        </ScrollReveal>
      </div>

      {/* Infinite scrolling dual marquees */}
      <div className="flex flex-col gap-2 md:gap-4 select-none">
        <ScrollReveal direction="left" delay={0.1}>
          <ImageAutoSlider
            images={row1Images}
            onImageClick={(idx) => setActiveIndex(idx)}
            startIndex={0}
            reverse={false}
          />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.2}>
          <ImageAutoSlider
            images={row2Images}
            onImageClick={(idx) => setActiveIndex(idx)}
            startIndex={3}
            reverse={true}
          />
        </ScrollReveal>
      </div>

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
            <div className="relative max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
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
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    role: "Professional Swing Trader",
    text: "Tirumala Ventures completely transformed my approach to risk management. The live floor environment is unmatched, allowing me to trade alongside experts and refine my setups daily.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "IT Consultant & Part-time Trader",
    text: "The weekend batches allowed me to learn without leaving my corporate job. The mentors are incredibly patient, translating complex options Greeks into actionable, rule-based strategies.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Full-time Intraday Trader",
    text: "Trading beside experienced professionals on their live floor gave me the psychological discipline to scale my capital. Highly recommend their corporate trading desks.",
    rating: 5,
  },
  {
    name: "Sneha K.",
    role: "Beginner",
    text: "I started with zero knowledge of stock markets. The step-by-step guidance, demat support, and hands-on trading simulator made my entry into trading completely stress-free.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Retired Defense Officer",
    text: "A highly disciplined learning academy. Their technical analysis methodologies are structured, objective, and focus heavily on capital protection. Exceptional mentorship.",
    rating: 5,
  },
];

function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="testimonials" className="section-pad bg-card/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Reviews"
            title="Voices of Tirumala Traders"
            sub="Hear how our live trading floor and mentorship programs are helping students build consistency in the markets."
          />
        </ScrollReveal>

        <ScrollReveal direction="left">
          <div className="relative px-4 sm:px-12">
            <Carousel
              opts={{ align: "start", loop: true }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {TESTIMONIALS.map((t, idx) => (
                  <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <MouseGlowTracker className="rounded-2xl h-full">
                      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full hover:border-gold/30 transition-all duration-300">
                        <div>
                          {/* Quote mark and stars */}
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-gold text-5xl font-serif leading-none select-none">“</span>
                            <div className="flex gap-1">
                              {Array.from({ length: t.rating }).map((_, i) => (
                                <Sparkles key={i} className="size-4 fill-gold text-gold" />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic mb-8">
                            {t.text}
                          </p>
                        </div>

                        <div>
                          <div className="h-px w-full bg-gold/10 my-4" />
                          <div className="font-serif text-gold text-base sm:text-lg font-semibold tracking-wide">
                            {t.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </MouseGlowTracker>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex border-gold/40 text-gold hover:bg-gold/10 hover:text-white -left-4" />
              <CarouselNext className="hidden sm:flex border-gold/40 text-gold hover:bg-gold/10 hover:text-white -right-4" />
            </Carousel>

            {/* Custom Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === i ? "bg-gold w-6" : "bg-gold/25 w-2 hover:bg-gold/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thank you! Our team will reach out within one business day.");
    }, 600);
  }

  const lookingForOptions = [
    { value: "website", label: "Website" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "web-app", label: "Web App" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "brand-identity", label: "Brand Identity" },
    { value: "3d-animation", label: "3D & Animation" },
    { value: "social-media", label: "Social Media Marketing" },
    { value: "brand-strategy", label: "Brand Strategy & Consulting" },
    { value: "other", label: "Other" },
  ];

  return (
    <section id="contact" className="relative section-pad overflow-hidden flex items-center justify-center min-h-[700px] bg-background">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={contactBg}
          alt="Contact Background"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#030d08]/15 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Let's Build Something Amazing Together */}
        <ScrollReveal direction="left" className="lg:col-span-5 text-left">
          <div className="max-w-xl">
            <div className="text-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">
              Contact Us
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[45px] leading-[1.1] text-foreground font-medium uppercase mb-10 tracking-wide">
              Let's Build<br />
              Something<br />
              Amazing<br />
              Together!
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-foreground/90">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full border border-gold/30 bg-background/50 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  <MapPin className="size-5 text-gold" />
                </div>
                <span className="leading-relaxed">
                  Ramraj Cotton - Dharwad, Ward num - 15, near NTTF, 15/1183, Ramnagar, opp. to Karnataka bank, Hosayellapur, Hubballi, Karnataka 580001
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full border border-gold/30 bg-background/50 flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="size-5 text-gold" />
                </div>
                <span>+91 98XXX XXXXX</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full border border-gold/30 bg-background/50 flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="size-5 text-gold" />
                </div>
                <span>info@tirumalaventures.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full border border-gold/30 bg-background/50 flex items-center justify-center shrink-0 shadow-md">
                  <Clock className="size-5 text-gold" />
                </div>
                <span>Mon — Sat · 8:30 AM to 8:00 PM IST</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Glassmorphic Contact Card */}
        <ScrollReveal direction="right" className="lg:col-span-7 w-full">
          <MouseGlowTracker className="rounded-3xl w-full">
            <form onSubmit={onSubmit} className="glass-card rounded-3xl p-6 sm:p-10 text-left relative z-10 w-full hover:border-gold/30 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-wide flex items-center gap-2">
                    Reach out to us today! ✨
                  </h3>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
                    <span>Mail us at</span>
                    <a href="mailto:info@tirumalaventures.com" className="text-foreground hover:text-gold transition-colors font-medium">
                      info@tirumalaventures.com
                    </a>
                  </div>
                </div>
                {/* Social media links */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mr-1">OR</span>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="size-10 rounded-xl border border-gold/25 bg-background/40 hover:bg-gold/15 hover:border-gold/50 flex items-center justify-center text-gold transition-all duration-300 shadow-md"
                  >
                    <Facebook className="size-4.5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="size-10 rounded-xl border border-gold/25 bg-background/40 hover:bg-gold/15 hover:border-gold/50 flex items-center justify-center text-gold transition-all duration-300 shadow-md"
                  >
                    <Twitter className="size-4.5" />
                  </a>
                </div>
              </div>

              <div className="h-px bg-gold/15 w-full mb-6" />

              <div className="space-y-6">
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
                  Leave us a brief message
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-xs tracking-widest uppercase text-muted-foreground font-medium">Your name</Label>
                    <Input
                      name="name"
                      required
                      placeholder="Your name"
                      className="mt-2 bg-[#0e261c]/45 border-gold/20 hover:border-gold/35 focus:border-gold/60 focus:bg-[#0e261c]/70 transition-all rounded-xl py-5"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-widest uppercase text-muted-foreground font-medium">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      className="mt-2 bg-[#0e261c]/45 border-gold/20 hover:border-gold/35 focus:border-gold/60 focus:bg-[#0e261c]/70 transition-all rounded-xl py-5"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs tracking-widest uppercase text-muted-foreground font-medium">Briefly describe your project idea...</Label>
                  <Textarea
                    name="message"
                    required
                    placeholder="Briefly describe your project idea..."
                    rows={4}
                    className="mt-2 bg-[#0e261c]/45 border-gold/20 hover:border-gold/35 focus:border-gold/60 focus:bg-[#0e261c]/70 transition-all rounded-xl resize-none"
                  />
                </div>

                <div>
                  <Label className="text-xs tracking-widest uppercase text-muted-foreground font-medium block mb-3">I'm looking for...</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-4">
                    {lookingForOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-foreground/90 hover:text-white select-none group">
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value={opt.value}
                          className="appearance-none size-4.5 rounded-full border border-gold/35 bg-[#0e261c]/45 checked:bg-gold checked:border-gold cursor-pointer transition-all relative shrink-0 after:content-[''] after:absolute after:hidden checked:after:block after:left-[5px] after:top-[2px] after:w-[4px] after:h-[7px] after:border-[#0e261c] after:border-r-2 after:border-b-2 after:rotate-45 focus:ring-1 focus:ring-gold/30"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-gold via-gold/90 to-gold-soft text-[#030d08] hover:brightness-[1.08] active:scale-[0.99] font-serif tracking-wider text-sm sm:text-base uppercase py-6 rounded-xl transition-all duration-300 font-semibold shadow-gold/20 shadow-lg cursor-pointer"
                >
                  {submitting ? "Sending..." : "Send a message"}
                </Button>
              </div>
            </form>
          </MouseGlowTracker>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <Label className="text-xs tracking-widest uppercase text-muted-foreground">{label}</Label>
      <Input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 bg-input/40 border-gold/20" />
    </div>
  );
}

function Leadership() {
  return (
    <section className="section-pad bg-card/10">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="Our Leadership" title="The minds behind Tirumala" />
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* Founder 1: Mr. Channu Dalawai */}
          <ScrollReveal direction="left" className="h-full">
            <MouseGlowTracker className="rounded-3xl h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-gold/5 flex flex-col justify-between relative overflow-hidden group hover:border-gold/30 transition-all duration-300 h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/[0.02] rounded-full blur-3xl" />
                <div>
                  <div className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase font-semibold text-center">
                    Founder & Managing Director
                  </div>
                  <div className="w-8 h-0.5 bg-gold/60 mt-2 mb-4 mx-auto" />
                  
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground font-semibold mb-3 leading-snug text-center">
                    A Vision to Educate.<br />
                    A Mission to Empower.
                  </h3>
                  <div className="w-16 h-0.5 bg-gold/40 mb-6 mx-auto" />
                  
                  <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4 font-sans text-center">
                    <p>
                      At Tirumala Ventures, we believe that true growth begins with knowledge, discipline, and the courage to embrace opportunities.
                    </p>
                    <p>
                      Our vision is to make quality financial education accessible, practical, and impactful, empowering individuals to navigate the markets with confidence.
                    </p>
                    <p>
                      Learning here extends beyond theory. We focus on analytical thinking, disciplined decision-making, and a long-term approach to nurture a community that participates in the markets with clarity and conviction.
                    </p>
                    <p>
                      Our commitment remains steadfast: to inspire learning, create opportunities, and build a financially aware and empowered society.
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="h-px w-full bg-gold/15 my-6" />
                  <div className="flex flex-col items-center">
                    <div className="font-signature text-gold text-5xl sm:text-6xl tracking-wide select-none leading-none -mb-2 text-center">
                      Channu Dalawai
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-serif text-sm sm:text-base text-gold font-semibold tracking-wide">
                        Mr. Channu Dalawai
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                        Founder & Managing Director
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground/80">
                        Tirumala Ventures
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MouseGlowTracker>
          </ScrollReveal>

          {/* Founder 2: Mr. Sharankumar Tantri */}
          <ScrollReveal direction="right" className="h-full">
            <MouseGlowTracker className="rounded-3xl h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-gold/5 flex flex-col justify-between relative overflow-hidden group hover:border-gold/30 transition-all duration-300 border-l-4 border-l-gold h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/[0.02] rounded-full blur-3xl" />
                <div>
                  <div className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase font-semibold text-center">
                    Founder & Chief Strategy Officer
                  </div>
                  <div className="w-8 h-0.5 bg-gold/60 mt-2 mb-4 mx-auto" />
                  
                  <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-semibold mb-1 leading-tight text-center">
                    Sharankumar Tantri
                  </h3>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-medium mb-5 text-center">
                    Founder & Chief Strategy Officer
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-3 mb-6 text-gold">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <GraduationCap className="size-3.5" /> Master's in Management
                    </div>
                    <div className="text-gold/30 text-xs hidden sm:block">|</div>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <TrendingUp className="size-3.5" /> Professional Trader
                    </div>
                    <div className="text-gold/30 text-xs hidden sm:block">|</div>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Users className="size-3.5" /> Mentor
                    </div>
                  </div>

                  <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4 font-sans text-center">
                    <p>
                      The stock market is a powerful wealth creation avenue when approached with the right knowledge, mindset, and strategy. My mission is to make this knowledge practical and accessible to everyone.
                    </p>
                    <p>
                      As Chief Strategy Officer, I personally lead our learning programs and mentor aspiring traders to help them build a strong foundation in the markets.
                    </p>
                    <p>
                      Our training is built on real market experience, risk management, and emotional discipline to transform beginners into confident, independent traders.
                    </p>
                    <p>
                      We design every program to educate, empower, and build a community of disciplined, knowledgeable, and financially free individuals.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="h-px w-full bg-gold/15 my-6" />
                  <div className="flex flex-col items-center">
                    <div className="font-signature text-gold text-5xl sm:text-6xl tracking-wide select-none leading-none text-center">
                      Sharankumar Tantri
                    </div>
                    <div className="w-32 h-px bg-gold/30 mt-1" />
                  </div>
                </div>
              </div>
            </MouseGlowTracker>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/15 py-12">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <div className="font-serif text-xl text-gold tracking-widest mb-2">TIRUMALA</div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">ventures</div>
          <p className="text-sm text-muted-foreground">A premium trading education and live trading workspace — a unit of CMPS group.</p>
        </div>
        <div className="lg:col-span-2">
          <div className="text-sm font-serif text-gold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.map(n => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <div className="text-sm font-serif text-gold mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/brochure.pdf" download className="hover:text-gold inline-flex items-center gap-2"><Download className="size-4" /> Download Brochure</a></li>
            <li><a href="#contact" className="hover:text-gold">Book Floor Visit</a></li>
            <li><a href="#courses" className="hover:text-gold">All Courses</a></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <div className="text-sm font-serif text-gold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="leading-relaxed">Ramraj Cotton - Dharwad, Ward num - 15, near NTTF, 15/1183, Ramnagar, opp. to Karnataka bank, Hosayellapur, Hubballi, Karnataka 580001</li>
            <li className="pt-2"><a href="tel:+9198XXXXXXXX" className="hover:text-gold">+91 98XXX XXXXX</a></li>
            <li><a href="mailto:info@tirumalaventures.com" className="hover:text-gold">info@tirumalaventures.com</a></li>
          </ul>
        </div>
        <div className="lg:col-span-3 h-48 lg:h-auto min-h-[160px]">
          <iframe
            title="Tirumala Ventures Location Map"
            src="https://maps.google.com/maps?q=Ramraj%20Cotton%20Dharwad%20Ward%2015%20near%20NTTF%2015%2F1183%20Ramnagar%20Karnataka%20Bank%20Hosayellapur%20Hubballi%20580001&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full rounded-xl border border-gold/15 shadow-gold/10 shadow-md filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-gold/10 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} Tirumala Ventures. All rights reserved.</span>
        <span>Crafted with discipline.</span>
      </div>
    </footer>
  );
}
