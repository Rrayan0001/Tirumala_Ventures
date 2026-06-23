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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Nav />
      <Hero />
      <About />
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
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" width={1920} height={1280} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-float-up">
          <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.4em] uppercase mb-6">
            <span className="h-px w-10 bg-gold" /> Tirumala Ventures
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
            Master the Markets <br />
            <span className="text-gradient-gold">with Confidence</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10">
            Learn professional trading inside a corporate-grade live trading floor.
            Mentorship, real-time market exposure and a community of disciplined traders.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
            <a href="#contact" className="w-full sm:w-auto"><Button variant="hero" size="lg" className="w-full"><GraduationCap /> Enroll Now</Button></a>
            <a href="#contact" className="w-full sm:w-auto"><Button variant="heroOutline" size="lg" className="w-full"><Calendar /> Book a Visit</Button></a>
            <a href="/brochure.pdf" download className="w-full sm:w-auto"><Button variant="heroOutline" size="lg" className="w-full"><Download /> Download Brochure</Button></a>
            <a href="#courses" className="w-full sm:w-auto"><Button variant="heroOutline" size="lg" className="w-full"><BookOpen /> Courses</Button></a>
          </div>
          <a href="#floor" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold">
            <span className="size-2 rounded-full bg-gold animate-pulse-glow" />
            Live Trading Corporate Ambience · Trading Floor <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="lg:col-span-5">
          <div className="relative glass-card rounded-2xl p-5 sm:p-8 shadow-gold">
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
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground tracking-wide">{k}</span>
                  <span className="text-foreground">{v}</span>
                  <span className="text-gold">{c}</span>
                </div>
              ))}
            </div>
          </div>
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
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Where discipline meets prosperity"
          sub="A premium trading education and live trading workspace built for serious learners — from first-time traders to seasoned professionals."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map(({ i: Icon, t, d }) => (
            <div key={t} className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold/40 transition-colors">
              <div className="size-12 rounded-lg gradient-gold grid place-items-center mb-4">
                <Icon className="size-6 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
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
            <div key={t} className="glass-card rounded-xl p-6 group hover:-translate-y-1 transition-transform">
              <Icon className="size-8 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
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
        <SectionHeading eyebrow="Why Choose Us" title="The Tirumala advantage" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usps.map(({ i: Icon, t }) => (
            <div key={t} className="glass-card rounded-xl p-6 text-center hover:border-gold/40 transition-all">
              <div className="mx-auto size-14 rounded-full border border-gold/40 grid place-items-center mb-4">
                <Icon className="size-6 text-gold" />
              </div>
              <div className="font-serif text-base">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}function ExperiencedTraders() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative glass-card rounded-3xl p-6 sm:p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Experienced Traders</div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl mb-6">Already an experienced trader?</h2>
            <p className="text-muted-foreground text-sm sm:text-lg mb-8">
              If you are an experienced trader looking for a professional trading environment,
              advanced market discussions, networking opportunities and a corporate trading floor experience —
              join us for a completely new trading experience.
            </p>
            <a href="#contact" className="w-full sm:w-auto inline-block">
              <Button variant="hero" size="lg" className="w-full">
                Join the Trading Community <ArrowRight />
              </Button>
            </a>
          </div>
        </div>
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
        <div className="relative glass-card rounded-3xl p-6 sm:p-12 md:p-20 text-center overflow-hidden">
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
            <div key={c.t} className="glass-card rounded-xl p-6 flex flex-col hover:border-gold/40 transition-colors">
              <BookOpen className="size-7 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-3">{c.t}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{c.d}</p>
              <a href="#contact"><Button variant="heroOutline" size="sm" className="w-full">Learn More <ArrowRight /></Button></a>
            </div>
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
            <div className="flex items-start gap-3"><MapPin className="size-5 text-gold mt-0.5" /><span>2nd Floor, Opp. Karnataka Bank, NTTF Stop, Hosa Yellapur, Dharwad — 580001</span></div>
            <div className="flex items-start gap-3"><Phone className="size-5 text-gold mt-0.5" /><span>+91 98XXX XXXXX</span></div>
            <div className="flex items-start gap-3"><Mail className="size-5 text-gold mt-0.5" /><span>info@tirumalaventures.com</span></div>
            <div className="flex items-start gap-3"><Clock className="size-5 text-gold mt-0.5" /><span>Mon — Sat · 8:30 AM to 8:00 PM IST</span></div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="lg:col-span-3 glass-card rounded-2xl p-5 sm:p-8 space-y-5">
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

function Footer() {
  return (
    <footer className="border-t border-gold/15 py-12">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif text-xl text-gold tracking-widest mb-2">TIRUMALA</div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">ventures</div>
          <p className="text-sm text-muted-foreground">A premium trading education and live trading workspace — a unit of CMPS group.</p>
        </div>
        <div>
          <div className="text-sm font-serif text-gold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.map(n => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-sm font-serif text-gold mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/brochure.pdf" download className="hover:text-gold inline-flex items-center gap-2"><Download className="size-4" /> Download Brochure</a></li>
            <li><a href="#contact" className="hover:text-gold">Book Floor Visit</a></li>
            <li><a href="#courses" className="hover:text-gold">All Courses</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-serif text-gold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Dharwad — 580001</li>
            <li>+91 98XXX XXXXX</li>
            <li>info@tirumalaventures.com</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-gold/10 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} Tirumala Ventures. All rights reserved.</span>
        <span>Crafted with discipline.</span>
      </div>
    </footer>
  );
}
