import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  GraduationCap, Calendar, Download, BookOpen, Users, TrendingUp,
  Briefcase, Activity, Wallet, ShieldCheck, Sparkles, Building2,
  Network, Layers, Monitor, Wifi, MessageSquare, Trophy, Phone,
  Mail, MapPin, ArrowRight, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight, LineChart, X,
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
import heroBg from "@/assets/hero-bg.jpg";
import tradingFloor from "@/assets/trading-floor.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import logoAsset from "@/assets/logo.png";
import CandlestickBackground from "@/components/CandlestickBackground";
import MouseGlowTracker from "@/components/MouseGlowTracker";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  { label: "Contact Us", href: "#contact" },
];

function Index() {
  const [showSplash, setShowSplash] = useState(true);

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
      {showSplash && <WelcomeSplash onComplete={() => setShowSplash(false)} />}
      <Toaster />
      <Nav />
      <Hero />
      <About />
      <section id="leadership"><Leadership /></section>
      <Services />
      <LiveMarket />
      <USP />
      <ExperiencedTraders />
      <TradingFloor />
      <section id="workspace"><Workspace /></section>
      <Courses />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

const LOGO_PHASE_MS = 1600;
const CURTAIN_PHASE_MS = 900;

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
          animation: logoPop 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .intro-logo {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: scale(0.94);
          animation: logoFade 1.1s ease-out forwards 0.1s;
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
          animation: liftPanel 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.14s;
        }
        .curtain-open .panel-2 {
          animation: liftPanel 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards 0s;
        }
        .curtain-open .panel-3 {
          animation: liftPanel 0.62s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.04s;
        }
        .curtain-open .panel-4 {
          animation: liftPanel 0.68s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.18s;
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
              <div className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full w-full origin-left animate-progress-bar" />
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
                {n.label}
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

        {/* Scrolling alerts marquee ticker */}
        <div className="w-full bg-gold/[0.04] border-t border-gold/10 py-2 overflow-hidden select-none text-[10px] sm:text-xs text-gold/90 font-medium uppercase tracking-[0.25em] relative flex items-center">
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
  return (
    <section id="home" className="relative pt-28 pb-8 sm:pb-12 overflow-hidden parallax-container">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 parallax-bg" width={1920} height={1280} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      
      {/* Dynamic drifting stock candlesticks background chart */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden parallax-bg select-none opacity-20">
        <CandlestickBackground />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-2 pb-8 lg:pt-4 lg:pb-12 grid lg:grid-cols-12 gap-y-10 lg:gap-y-12 gap-x-12 items-center">
        <div className="lg:col-span-7 animate-float-up parallax-fg">
          <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-5">
            <span className="h-px w-10 bg-gold" /> Tirumala Ventures
          </div>
          <h1 className="font-serif leading-[1.08] mb-6 tracking-tight">
            {/* Line 1 — light cream, regular weight */}
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-foreground/80">
              Master the
            </span>
            {/* Line 2 — bold gold gradient, italic, slightly larger */}
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold italic text-gradient-gold leading-[1.0]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-4xl">
            <a href="#contact" className="w-full"><Button variant="hero" size="lg" className="w-full"><GraduationCap /> Enroll Now</Button></a>
            <a href="#contact" className="w-full"><Button variant="heroOutline" size="lg" className="w-full"><Calendar /> Book a Visit</Button></a>
            <a href="/brochure.pdf" download className="w-full"><Button variant="heroOutline" size="lg" className="w-full"><Download /> Download Brochure</Button></a>
            <a href="#courses" className="w-full"><Button variant="heroOutline" size="lg" className="w-full"><BookOpen /> Courses</Button></a>
          </div>
          <a href="#floor" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold">
            <span className="size-2 rounded-full bg-gold animate-pulse-glow" />
            Live Trading Corporate Ambience · Trading Floor <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="lg:col-span-5">
          <MouseGlowTracker className="rounded-3xl">
            <div className="relative glass-card glowing-border p-5 sm:p-8 shadow-gold">
              <div className="absolute -inset-px rounded-2xl animate-shimmer pointer-events-none" />
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                {[
                  { v: "12K+", l: "Active Traders" },
                  { v: "₹240Cr", l: "Tracked Capital" },
                  { v: "4.9★", l: "Mentor Rating" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-serif text-lg sm:text-2xl text-gold">{s.v}</div>
                    <div className="text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground mt-1 leading-tight">{s.l}</div>
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
                    <span className="text-foreground text-right font-mono pr-4 sm:pr-8">{v}</span>
                    <span className="text-gold text-right font-mono">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </MouseGlowTracker>
        </div>

        <div className="lg:col-span-12 mt-6 pt-6 border-t border-gold/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-float-up">
          {[
            { i: Building2, t: "Corporate Ambience", d: "Live trading floor experience" },
            { i: Users, t: "Expert Mentors", d: "Decade-experienced guidance" },
            { i: TrendingUp, t: "Practical Learning", d: "Trade with real capital" },
            { i: Calendar, t: "Flexible Batches", d: "Weekday & weekend classes" }
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="flex gap-4 items-center group">
              <div className="size-10 rounded-xl bg-gold/5 border border-gold/15 flex items-center justify-center shrink-0 shadow-sm shadow-gold/5 group-hover:scale-105 group-hover:bg-gold/15 transition-all duration-300">
                <Icon className="size-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-serif text-gold font-semibold tracking-wide leading-tight group-hover:text-white transition-colors">{t}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
  const pillars = [
    { i: Building2, t: "Professional Environment", d: "Corporate-grade trading floor and study spaces." },
    { i: Users, t: "Industry Mentors", d: "Decade-experienced traders guiding every session." },
    { i: Activity, t: "Practical Learning", d: "Live charts, real capital exposure, executable plans." },
    { i: TrendingUp, t: "Real-Time Markets", d: "Pre-market to closing — be where the action is." },
    { i: Layers, t: "Corporate Infrastructure", d: "Multi-screen desks, high-speed data, premium ambience." },
    { i: Network, t: "Community Driven", d: "Network of traders, investors and market enthusiasts." },
  ];
  return (
    <section id="about" className="pt-16 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Where discipline meets prosperity"
          sub="A premium trading education and live trading workspace built for serious learners — from first-time traders to seasoned professionals."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map(({ i: Icon, t, d }) => (
            <MouseGlowTracker key={t} className="rounded-xl">
              <div className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-colors h-full">
                <div className="size-12 rounded-lg gradient-gold grid place-items-center mb-4">
                  <Icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </MouseGlowTracker>
          ))}
        </div>
      </div>
    </section>
  );
}
function Services() {
  const items = [
    { i: Briefcase, t: "Mentorship Program", d: "One-on-one guidance, strategy development, risk management and market psychology training." },
    { i: Calendar, t: "Weekend Classes", d: "Flexible weekend programs designed for working professionals and students." },
    { i: Activity, t: "Live Trading", d: "Real-time trading sessions with market analysis and execution strategies." },
    { i: Wallet, t: "Demat Support", d: "Complete assistance for opening and managing Demat & Trading accounts." },
  ];
  return (
    <section id="services" className="section-pad bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Services" title="What we offer" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ i: Icon, t, d }) => (
            <MouseGlowTracker key={t} className="rounded-xl">
              <div className="glass-card rounded-xl p-6 group hover:-translate-y-1 transition-transform h-full">
                <Icon className="size-8 text-gold mb-4" />
                <h3 className="font-serif text-xl mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </MouseGlowTracker>
          ))}
        </div>
      </div>
    </section>
  );
}

function USP() {
  const usps = [
    { i: Activity, t: "Live Market Exposure" },
    { i: Building2, t: "Corporate Trading Ambience" },
    { i: Users, t: "Experienced Mentors" },
    { i: Sparkles, t: "Practical Learning" },
    { i: MessageSquare, t: "Real-Time Trade Discussions" },
    { i: Monitor, t: "Professional Trading Floor" },
    { i: Network, t: "Networking Opportunities" },
    { i: Trophy, t: "Beginner to Advanced Training" },
  ];
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Why Choose Us" title="The Tirumala advantage" sub="If You Are a Experienced Trader, Come join us For the new experience." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usps.map(({ i: Icon, t }) => (
            <MouseGlowTracker key={t} className="rounded-xl">
              <div className="glass-card rounded-xl p-6 text-center hover:border-gold/40 transition-all h-full">
                <div className="mx-auto size-14 rounded-full border border-gold/40 grid place-items-center mb-4">
                  <Icon className="size-6 text-gold" />
                </div>
                <div className="font-serif text-base">{t}</div>
              </div>
            </MouseGlowTracker>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencedTraders() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30, bounce: 0 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30, bounce: 0 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const translateZContent = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <MouseGlowTracker className="rounded-3xl">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="relative glass-card glowing-border p-6 sm:p-10 md:p-16 overflow-hidden cursor-default"
          >
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            
            <motion.div
              style={{
                transform: "translateZ(30px)",
                translateY: translateZContent,
              }}
              className="relative max-w-3xl"
            >
              <div className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Experienced Traders</div>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-6">If You Are a Experienced Trader</h2>
              <p className="text-muted-foreground text-sm sm:text-lg mb-8 leading-relaxed">
                Come join us For the new experience.
              </p>
              <a href="#contact" className="w-full sm:w-auto inline-block">
                <Button variant="hero" size="lg" className="w-full">
                  Join the Trading Community <ArrowRight />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </MouseGlowTracker>
      </div>
    </section>
  );
}
function TradingFloor() {
  const features = [
    { i: Monitor, t: "Professional trading desks" },
    { i: Activity, t: "Multiple market-monitoring screens" },
    { i: Wifi, t: "High-speed internet setup" },
    { i: Users, t: "Collaborative trading environment" },
    { i: Network, t: "Learning & networking space" },
  ];
  return (
    <section id="floor" className="section-pad bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Trading Floor Showcase"
          title="Live Trading Corporate Ambience"
          sub="Step inside an institutional-grade trading floor designed for serious market participants."
        />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-gold">
            <img src={tradingFloor} alt="Tirumala live trading floor" width={1600} height={1067} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 text-gold text-sm">
              <span className="size-2 rounded-full bg-gold animate-pulse-glow" /> LIVE TRADING FLOOR
            </div>
          </div>
          <ul className="space-y-4">
            {features.map(({ i: Icon, t }) => (
              <li key={t} className="flex items-start gap-4 glass-card rounded-xl p-5">
                <Icon className="size-6 text-gold flex-none mt-0.5" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
            <a href="#contact" className="inline-block pt-2"><Button variant="hero">Book a Floor Visit <Calendar /></Button></a>
          </ul>
        </div>
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
    <section id="live-market" className="section-pad bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Live Market Analysis"
          title="Real-time stock calls & analysis"
          sub="Mentor-curated live trade calls with entry, target and stop-loss. Updated every few seconds during market hours."
        />
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
            <div className="col-span-3 md:col-span-2 text-right">LTP</div>
            <div className="col-span-3 md:col-span-2 text-right">Change</div>
            <div className="hidden md:block md:col-span-2 text-right">Target</div>
            <div className="hidden md:block md:col-span-1 text-right">SL</div>
            <div className="col-span-2 text-right">Call</div>
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
                  <div className="col-span-3 md:col-span-2 text-right font-mono text-xs sm:text-sm">₹{s.price.toFixed(2)}</div>
                  <div className={`col-span-3 md:col-span-2 text-right font-mono text-xs sm:text-sm inline-flex items-center justify-end gap-0.5 sm:gap-1 ${up ? "text-emerald-400" : "text-red-400"}`}>
                    {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    {s.change > 0 ? "+" : ""}{s.change.toFixed(2)}%
                  </div>
                  <div className="hidden md:block md:col-span-2 text-right font-mono text-sm text-foreground/80">₹{s.target}</div>
                  <div className="hidden md:block md:col-span-1 text-right font-mono text-sm text-foreground/60">₹{s.sl}</div>
                  <div className="col-span-2 text-right">
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
      </div>
    </section>
  );
}

function Workspace() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-5xl px-6">
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
        <SectionHeading eyebrow="Courses" title="Programs crafted for every level" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map(c => (
            <MouseGlowTracker key={c.t} className="rounded-xl">
              <div className="glass-card rounded-xl p-6 flex flex-col hover:border-gold/40 transition-colors h-full">
                <BookOpen className="size-7 text-gold mb-4" />
                <h3 className="font-serif text-xl mb-3">{c.t}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{c.d}</p>
                <a href="#contact"><Button variant="heroOutline" size="sm" className="w-full">Learn More <ArrowRight /></Button></a>
              </div>
            </MouseGlowTracker>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/brochure.pdf" download><Button variant="hero" size="lg"><Download /> Download Brochure</Button></a>
        </div>
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
  return (
    <section id="gallery" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Gallery" title="Moments from our trading floor" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gold/15">
              <img src={g.src} alt={g.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-gold font-serif text-xs sm:text-base leading-tight">{g.label}</div>
            </div>
          ))}
        </div>
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
  return (
    <section id="contact" className="section-pad bg-card/40">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Contact Us</div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-6 leading-tight">Let's start your trading journey</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8">
            Enroll in a course, book a floor visit, or send us a general inquiry —
            our team responds within one business day.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3"><MapPin className="size-5 text-gold mt-0.5" /><span>Ramraj Cotton - Dharwad, Ward num - 15, near NTTF, 15/1183, Ramnagar, opp. to Karnataka bank, Hosayellapur, Hubballi, Karnataka 580001</span></div>
            <div className="flex items-start gap-3"><Phone className="size-5 text-gold mt-0.5" /><span>+91 98XXX XXXXX</span></div>
            <div className="flex items-start gap-3"><Mail className="size-5 text-gold mt-0.5" /><span>info@tirumalaventures.com</span></div>
            <div className="flex items-start gap-3"><Clock className="size-5 text-gold mt-0.5" /><span>Mon — Sat · 8:30 AM to 8:00 PM IST</span></div>
          </div>
        </div>
        <MouseGlowTracker className="lg:col-span-3 rounded-2xl">
          <form onSubmit={onSubmit} className="glass-card glowing-border p-5 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" name="name" required placeholder="Your full name" />
              <Field label="Mobile Number" name="mobile" type="tel" required placeholder="+91" />
              <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
              <Field label="City" name="city" required placeholder="City" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-muted-foreground">Interested Program</Label>
              <Select name="program">
                <SelectTrigger className="mt-2 bg-input/40 border-gold/20"><SelectValue placeholder="Select an inquiry type / program" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="enrollment">Course Enrollment</SelectItem>
                  <SelectItem value="floor-visit">Trading Floor Visit Booking</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  {COURSES.map(c => <SelectItem key={c.t} value={c.t}>{c.t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-muted-foreground">Message</Label>
              <Textarea name="message" placeholder="Tell us a bit about your goals…" rows={4} className="mt-2 bg-input/40 border-gold/20" />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
              {submitting ? "Sending…" : <>Send Inquiry <ArrowRight /></>}
            </Button>
          </form>
        </MouseGlowTracker>
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
        <SectionHeading eyebrow="Our Leadership" title="The minds behind Tirumala" />
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* Founder 1: Mr. Channu Dalawai */}
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

          {/* Founder 2: Mr. Sharankumar Tantri */}
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
