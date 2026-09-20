import { FormEvent, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, ChevronDown, FileText, Layers3, Mail, MapPin, Menu, MessageCircle, PenLine, Phone, Printer, Ruler, ScanLine, Signpost, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Service = {
  name: string;
  description: string;
  details: string[];
  icon: typeof Printer;
};

const services: Service[] = [
  {
    name: 'Solvent Flex',
    description: 'Outdoor-ready printed graphics for clear, durable visibility.',
    details: ['Star Flex', 'Star Black Back', 'One Way Vision', 'Canvas', 'Gloss Vinyl', 'Matt Vinyl', 'Vinyl with Sunboard', 'Vinyl with Sunpack', 'Backlight Printing'],
    icon: ScanLine,
  },
  {
    name: 'Offset Printing',
    description: 'Crisp paper printing for business and personal essentials.',
    details: ['Brochure & Catalogues', 'Calendar', 'Letterhead', 'Business Card', 'Bill Book', 'Envelope', 'Wedding Card', 'Flyer & Leaflet', 'Pavti Book', 'Menu Card'],
    icon: FileText,
  },
  {
    name: 'Screen Printing',
    description: 'Versatile ink printing across paper, fabric and objects.',
    details: ['Wedding Card', 'Visiting Card', 'Letterhead', 'T-Shirt', 'Envelope', 'Cap', 'Umbrella', 'Carry Bag', 'ID Ribbon', 'School Bag'],
    icon: PenLine,
  },
  {
    name: 'Digital Printing',
    description: 'Flexible short-run print for timely, polished output.',
    details: ['Visiting Card', 'Brochure', 'Catalogue', 'Pamphlet', 'Poster', 'Annual Reports', 'UV Print', 'Hotel Menu', 'Hospital File', 'Trophy Sticker'],
    icon: Printer,
  },
  {
    name: 'Sign Boards',
    description: 'Professional signs that help people find and remember you.',
    details: ['Acrylic Clip-on Board', 'Crystal Letter', 'LED Signage', 'Steel & Brass Letter', 'Pixel LED', 'Backlit Signage', 'Iron Standee', 'Roll-up Standee', 'Sunboard Cutout'],
    icon: Signpost,
  },
  {
    name: 'Graphics Design',
    description: 'Clear, production-ready design for every touchpoint.',
    details: ['Logo Design', 'Social Media Posts', 'Hoarding Banner', 'Menu Card', 'Flyer', 'Product Packaging', 'Magazine Ads', 'Visiting Card', 'Invitation', 'Brochure', 'Calendar'],
    icon: Sparkles,
  },
  {
    name: 'Banner Printing',
    description: 'Large-format communication for events, offers and places.',
    details: ['Promotional Banners', 'Event Backdrops', 'Hoarding Banners', 'Shop Front Banners', 'Directional Banners'],
    icon: Ruler,
  },
  {
    name: 'Sunboard / Sunpack',
    description: 'Lightweight rigid displays with a clean, firm finish.',
    details: ['Mounted Graphics', 'Retail Displays', 'Indoor Signage', 'Sunboard Cutout', 'Vinyl with Sunpack'],
    icon: Layers3,
  },
  {
    name: 'PVC Cards',
    description: 'Neat, durable cards for everyday professional use.',
    details: ['Visiting Cards', 'ID Cards', 'Membership Cards', 'Loyalty Cards', 'Access Cards'],
    icon: FileText,
  },
  {
    name: 'Wooden / MS Frames',
    description: 'Practical framed solutions for signs and displays.',
    details: ['Wooden Frames', 'MS Frames', 'Mounted Signage', 'Display Structures', 'Custom Frames'],
    icon: Ruler,
  },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function BrandMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-display text-sm font-extrabold tracking-[-.08em] text-primary-foreground" aria-hidden="true">
      NN
    </span>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-logo">
      <BrandMark />
      <span className="display text-[13px] font-extrabold leading-[1.05] tracking-[-.04em] text-foreground">NEW NATIONAL<br />ADVERTISING</span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto h-[390px] w-full max-w-[500px] sm:h-[470px]" data-testid="visual-print-signage">
      <div className="absolute right-[5%] top-[9%] h-[68%] w-[66%] rounded-2xl border border-border bg-secondary p-5 shadow-[0_18px_40px_hsl(218_24%_20%_/_0.07)] sm:p-7">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Outdoor signage</span>
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <div className="mt-12">
          <p className="display text-4xl font-extrabold leading-[.95] tracking-[-.07em] text-foreground sm:text-5xl">Make your<br /><span className="text-primary">presence</span><br />clear.</p>
          <div className="mt-8 h-2 w-20 rounded-full bg-accent/70" />
        </div>
        <span className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[.14em] text-muted-foreground sm:left-7">NN / Mumbai</span>
      </div>
      <div className="hero-paper absolute bottom-[8%] left-[7%] h-[61%] w-[57%] rotate-[-7deg] rounded-xl border border-border bg-card p-5 sm:p-7">
        <div className="absolute inset-4 rounded-lg border border-border sm:inset-6" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <BrandMark />
            <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-muted-foreground">Print / design</span>
          </div>
          <div>
            <p className="display text-3xl font-extrabold leading-none tracking-[-.07em] sm:text-4xl">Ideas,<br /><span className="text-accent">made</span><br />visible.</p>
            <div className="mt-5 flex gap-1.5">
              <span className="h-5 w-5 rounded-full bg-primary" />
              <span className="h-5 w-5 rounded-full bg-secondary" />
              <span className="h-5 w-5 rounded-full border border-border bg-card" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[2%] right-[2%] rounded-lg border border-border bg-card px-4 py-3 shadow-[0_12px_26px_hsl(218_24%_20%_/_0.09)] sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="h-4 w-4" /></span>
          <span><strong className="block text-xs font-bold">Ready for production</strong><small className="text-[10px] text-muted-foreground">Material • finish • format</small></span>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeService, setActiveService] = useState(services[0]);
  const [submitted, setSubmitted] = useState(false);
  const whatsappHref = 'https://wa.me/919555759677?text=Hello%20New%20National%20Advertising%2C%20I%20would%20like%20to%20enquire%20about%20your%20printing%20and%20advertising%20services.';

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ['Home', '#top'],
    ['Services', '#services'],
    ['About', '#about'],
    ['Our Work', '#work'],
    ['Contact', '#contact'],
  ];

  const handleQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top" className="app-shell bg-background text-foreground">
      <header className={`site-header sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm ${headerScrolled ? 'is-scrolled' : ''}`}>
        <div className="section-shell flex h-[74px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="header-link" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>)}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <a href="tel:+919555759677" className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground hover:text-foreground" data-testid="link-header-phone"><Phone className="h-3.5 w-3.5 text-primary" /> 9555759677</a>
            <a href="#quote" className="button-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-bold" data-testid="button-header-quote">Get a quote <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <nav className="section-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold hover:bg-secondary" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>{label}<ArrowRight className="h-4 w-4 text-primary" /></a>)}
              <a href="tel:+919555759677" onClick={closeMenu} className="mt-2 flex items-center gap-2 border-t border-border px-3 pt-4 text-sm font-semibold" data-testid="link-mobile-phone"><Phone className="h-4 w-4 text-primary" /> 9555759677</a>
            </nav>
          </div>
        )}
      </header>

      <section className="border-b border-border bg-background" aria-labelledby="hero-title">
        <div className="section-shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[.92fr_1.08fr] lg:gap-8 lg:py-24">
          <Reveal>
            <p className="section-kicker mb-5">Printing • Signage • Design</p>
            <h1 id="hero-title" className="display max-w-[590px] text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-.065em]">Printing, Signage<br /><span className="text-primary">&amp; Design Solutions</span></h1>
            <p className="mt-6 max-w-[510px] text-base leading-7 text-muted-foreground sm:text-lg">Professional printing, advertising, signage and graphic design solutions for businesses, brands and individuals.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="button-primary flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold" data-testid="button-hero-quote">Get a quote <ArrowRight className="h-4 w-4" /></a>
              <a href="#services" className="button-secondary flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold" data-testid="button-explore-services">View services <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Mumbai, Maharashtra, India</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 9555759677</span>
            </div>
          </Reveal>
          <Reveal className="lg:pl-8">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <div className="border-b border-border bg-secondary">
        <div className="section-shell grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
          {[
            ['01', 'Understand', 'Your brief and purpose'],
            ['02', 'Recommend', 'The right material'],
            ['03', 'Produce', 'With care and clarity'],
            ['04', 'Deliver', 'A useful finished piece'],
          ].map(([number, title, text]) => (
            <div key={number} className="px-3 py-5 first:pl-0 sm:px-6 sm:py-6">
              <span className="text-[10px] font-bold tracking-[.14em] text-primary">{number}</span>
              <strong className="mt-1 block text-sm font-bold">{title}</strong>
              <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="services" className="section-pad border-b border-border" aria-labelledby="services-title">
        <div className="section-shell">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="section-kicker mb-3">What we offer</p>
              <h2 id="services-title" className="display text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">Our services</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">From a single visiting card to a complete sign board, find a practical service for the way your business needs to be seen.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const selected = activeService.name === service.name;
              return (
                <button type="button" key={service.name} onClick={() => setActiveService(service)} aria-pressed={selected} className={`service-card group rounded-xl border p-5 text-left ${selected ? 'border-primary/50 bg-primary/[.045]' : 'border-border bg-card'}`} data-testid={`button-service-${index + 1}`}>
                  <div className="flex items-start justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${selected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                    <ArrowRight className="service-arrow h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="mt-6 text-base font-bold">{service.name}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{service.description}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-8 rounded-xl border border-border bg-secondary p-6 sm:p-8" data-testid="panel-service-details">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <p className="section-kicker">Service details</p>
                <h3 className="display mt-2 text-2xl font-extrabold tracking-[-.04em]">{activeService.name}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Available options and applications include:</p>
              </div>
              <a href="#quote" className="flex w-fit items-center gap-2 text-sm font-bold text-primary hover:underline" data-testid="link-service-quote">Ask about this service <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeService.details.map((detail) => <span key={detail} className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground" data-testid={`text-service-detail-${detail.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{detail}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-pad border-b border-border bg-secondary" aria-labelledby="work-title">
        <div className="section-shell">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="section-kicker mb-3">Material in context</p>
              <h2 id="work-title" className="display text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">Sample applications</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">A quiet look at the surfaces, formats and details that make printed work feel considered.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <div className="work-tile group relative overflow-hidden rounded-xl border border-border bg-card md:col-span-7" data-testid="work-tile-paper">
              <div className="flex min-h-[290px] items-center justify-center overflow-hidden bg-[#e8e3da] p-8 sm:min-h-[360px]">
                <div className="relative h-52 w-64 rotate-[-4deg] bg-card p-6 shadow-[0_16px_28px_hsl(218_24%_20%_/_0.14)] sm:h-60 sm:w-80">
                  <div className="absolute inset-5 border border-border" />
                  <p className="relative mt-2 text-[9px] font-bold uppercase tracking-[.2em] text-muted-foreground">Paper / offset</p>
                  <p className="display relative mt-12 text-4xl font-extrabold leading-[.92] tracking-[-.08em]">A clear<br /><span className="text-primary">first</span><br />impression.</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-4"><span className="text-sm font-bold">Paper &amp; stationery</span><span className="text-xs text-muted-foreground">Offset / digital</span></div>
              <div className="work-overlay pointer-events-none absolute inset-0 flex items-end bg-primary/5 p-5"><span className="rounded-full bg-card px-3 py-2 text-xs font-bold text-primary">Sample application</span></div>
            </div>
            <div className="work-tile group relative overflow-hidden rounded-xl border border-border bg-card md:col-span-5" data-testid="work-tile-signage">
              <div className="flex min-h-[290px] items-center justify-center overflow-hidden bg-[#d7e0e5] p-8 sm:min-h-[360px]">
                <div className="relative w-full max-w-[270px] rounded-lg border border-[#b6c3ca] bg-[#eff3f4] p-7 shadow-[0_12px_25px_hsl(218_24%_20%_/_0.1)]">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-accent" /><span className="text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground">Sign board</span></div>
                  <p className="display mt-12 text-3xl font-extrabold leading-none tracking-[-.06em] text-primary">Be easy<br />to find.</p>
                  <div className="mt-6 h-1 w-16 rounded-full bg-accent" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-4"><span className="text-sm font-bold">Signage &amp; displays</span><span className="text-xs text-muted-foreground">Boards / vinyl</span></div>
              <div className="work-overlay pointer-events-none absolute inset-0 flex items-end bg-primary/5 p-5"><span className="rounded-full bg-card px-3 py-2 text-xs font-bold text-primary">Sample application</span></div>
            </div>
            <div className="work-tile group relative overflow-hidden rounded-xl border border-border bg-card md:col-span-5" data-testid="work-tile-cards">
              <div className="flex min-h-[230px] items-center justify-center overflow-hidden bg-[#e4e0d8] p-8">
                <div className="relative h-32 w-52 -rotate-6 rounded-lg border border-border bg-card p-4 shadow-[0_12px_22px_hsl(218_24%_20%_/_0.1)]">
                  <span className="text-[8px] font-bold uppercase tracking-[.15em] text-muted-foreground">PVC / cards</span>
                  <span className="absolute bottom-4 left-4 h-2 w-16 rounded bg-primary/70" />
                </div>
                <div className="relative -ml-10 mt-8 h-32 w-52 rotate-6 rounded-lg border border-border bg-secondary p-4 shadow-[0_12px_22px_hsl(218_24%_20%_/_0.1)]">
                  <span className="text-[8px] font-bold uppercase tracking-[.15em] text-muted-foreground">Print / finish</span>
                  <span className="absolute bottom-4 left-4 h-2 w-16 rounded bg-accent/70" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-4"><span className="text-sm font-bold">Cards &amp; small formats</span><span className="text-xs text-muted-foreground">PVC / paper</span></div>
              <div className="work-overlay pointer-events-none absolute inset-0 flex items-end bg-primary/5 p-5"><span className="rounded-full bg-card px-3 py-2 text-xs font-bold text-primary">Sample application</span></div>
            </div>
            <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 md:col-span-7 md:p-8" data-testid="work-note">
              <div>
                <Layers3 className="h-6 w-6 text-primary" strokeWidth={1.7} />
                <h3 className="display mt-8 max-w-md text-2xl font-extrabold tracking-[-.045em] sm:text-3xl">The right finish helps good communication do its job.</h3>
              </div>
              <a href="#quote" className="mt-10 flex w-fit items-center gap-2 text-sm font-bold text-primary hover:underline" data-testid="link-work-quote">Tell us what you need <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-pad border-b border-border" aria-labelledby="about-title">
        <div className="section-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="section-kicker mb-3">A practical partner</p>
            <h2 id="about-title" className="display max-w-md text-4xl font-extrabold leading-[1.06] tracking-[-.06em] sm:text-5xl">Good work begins with understanding what it needs to do.</h2>
          </Reveal>
          <Reveal className="lg:pt-2">
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">New National Advertising provides printing, signage, advertising and graphic design solutions for businesses, brands and individuals.</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                ['Quality printing', 'Clear output and thoughtful finishing for the format.'],
                ['Professional design', 'A considered visual starting point for your message.'],
                ['Wide range of services', 'Print, signage, graphics and display requirements in one place.'],
                ['Custom solutions', 'A response shaped around your size, surface and purpose.'],
              ].map(([title, text]) => <div key={title} className="rounded-xl border border-border bg-card p-5"><Check className="h-4 w-4 text-primary" /><h3 className="mt-4 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-secondary" aria-labelledby="process-title">
        <div className="section-shell">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="section-kicker mb-3">A clear process</p><h2 id="process-title" className="display text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">From brief to finished piece</h2></div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Straightforward communication at every stage, so the final result feels right before it reaches the world.</p>
          </Reveal>
          <div className="process-line relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Discuss', 'Share your requirement, reference or idea.'],
              ['02', 'Design', 'We shape the message and the format.'],
              ['03', 'Print', 'The selected material becomes a finished piece.'],
              ['04', 'Deliver', 'Your work is ready for its intended place.'],
            ].map(([number, title, text]) => <Reveal key={number} className="relative rounded-xl border border-border bg-card p-6"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-xs font-bold text-primary">{number}</span><h3 className="mt-7 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-5 text-muted-foreground">{text}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section id="quote" className="section-pad border-b border-border" aria-labelledby="quote-title">
        <div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="section-kicker mb-3">Start a conversation</p>
            <h2 id="quote-title" className="display text-4xl font-extrabold leading-[1.04] tracking-[-.06em] sm:text-5xl">Let&apos;s work together.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">Have a printing, signage or design requirement? Get in touch with New National Advertising.</p>
            <div className="mt-9 space-y-4 border-t border-border pt-6">
              <a className="flex items-center gap-3 text-sm font-semibold hover:text-primary" href="tel:+919555759677" data-testid="link-quote-phone-one"><Phone className="h-4 w-4 text-primary" /> 9555759677</a>
              <a className="flex items-center gap-3 text-sm font-semibold hover:text-primary" href="tel:+917506269783" data-testid="link-quote-phone-two"><Phone className="h-4 w-4 text-primary" /> 7506269783</a>
              <a className="flex items-center gap-3 text-sm font-semibold hover:text-primary" href="tel:+918898805753" data-testid="link-quote-phone-three"><Phone className="h-4 w-4 text-primary" /> 8898805753</a>
              <a className="flex items-center gap-3 break-all text-sm font-semibold hover:text-primary" href="mailto:newnationaladv2022@gmail.com" data-testid="link-quote-email"><Mail className="h-4 w-4 shrink-0 text-primary" /> newnationaladv2022@gmail.com</a>
              <a className="flex items-center gap-3 text-sm font-semibold hover:text-primary" href={whatsappHref} target="_blank" rel="noreferrer" data-testid="link-quote-whatsapp"><MessageCircle className="h-4 w-4 text-primary" /> WhatsApp enquiry</a>
            </div>
          </Reveal>
          <Reveal>
            {submitted ? (
              <div className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10" data-testid="status-quote-confirmation">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-6 w-6" /></div>
                <p className="section-kicker mt-8">Request saved on this device</p>
                <h3 className="display mt-3 text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Thank you for getting in touch.</h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">Your enquiry has been captured in this browser. This form does not send email. To move your request forward, call us, use WhatsApp, or email newnationaladv2022@gmail.com.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="button-primary flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold" data-testid="button-confirmation-whatsapp">Continue on WhatsApp <ArrowRight className="h-4 w-4" /></a>
                  <button type="button" onClick={() => setSubmitted(false)} className="button-secondary flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold" data-testid="button-new-quote">Make another request</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuote} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8" data-testid="form-quote-request">
                <div className="mb-7 flex items-center justify-between border-b border-border pb-5"><div><h3 className="display text-xl font-extrabold tracking-[-.04em]">Request a quote</h3><p className="mt-1 text-xs text-muted-foreground">Tell us a little about the work.</p></div><FileText className="h-5 w-5 text-primary" /></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2"><span className="text-xs font-bold">Name</span><input required name="name" type="text" placeholder="Your name" className="input-field" data-testid="input-quote-name" /></label>
                  <label className="grid gap-2"><span className="text-xs font-bold">Phone</span><input required name="phone" type="tel" placeholder="Your phone number" className="input-field" data-testid="input-quote-phone" /></label>
                  <label className="grid gap-2"><span className="text-xs font-bold">Email</span><input required name="email" type="email" placeholder="you@example.com" className="input-field" data-testid="input-quote-email" /></label>
                  <label className="grid gap-2"><span className="text-xs font-bold">Service</span><div className="relative"><select required name="service" defaultValue="" className="input-field appearance-none pr-10" data-testid="select-quote-service"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" /></div></label>
                  <label className="grid gap-2 sm:col-span-2"><span className="text-xs font-bold">Project details</span><textarea required name="project" rows={4} placeholder="What would you like us to print, design or produce?" className="input-field resize-none" data-testid="textarea-quote-project" /></label>
                  <label className="grid gap-2"><span className="text-xs font-bold">Quantity <span className="font-normal text-muted-foreground">(optional)</span></span><input name="quantity" type="text" placeholder="e.g. 500" className="input-field" data-testid="input-quote-quantity" /></label>
                  <label className="grid gap-2"><span className="text-xs font-bold">Upload file <span className="font-normal text-muted-foreground">(optional)</span></span><input name="file" type="file" className="input-field cursor-pointer text-xs file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-semibold" data-testid="input-quote-file" /></label>
                </div>
                <button type="submit" className="button-primary mt-7 flex min-h-12 w-full items-center justify-between rounded-lg px-5 text-sm font-bold" data-testid="button-submit-quote">Request a quote <ArrowRight className="h-4 w-4" /></button>
                <p className="mt-3 text-center text-[11px] leading-4 text-muted-foreground">Your request is confirmed in this browser only. No email is sent from this form.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <footer id="contact" className="bg-[#252b32] py-12 text-[#f7f5f1]">
        <div className="section-shell">
          <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
            <div>
              <div className="flex items-center gap-3"><BrandMark /><span className="display text-sm font-extrabold leading-[1.05] tracking-[-.04em]">NEW NATIONAL<br />ADVERTISING</span></div>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">Printing • Signage • Design • Advertising<br />Mumbai, Maharashtra, India</p>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#a7c4da]">Contact</p>
              <div className="space-y-2.5 text-sm text-white/75">
                <a href="tel:+919555759677" className="block hover:text-white" data-testid="link-footer-phone-one">9555759677</a>
                <a href="tel:+917506269783" className="block hover:text-white" data-testid="link-footer-phone-two">7506269783</a>
                <a href="tel:+918898805753" className="block hover:text-white" data-testid="link-footer-phone-three">8898805753</a>
                <a href="mailto:newnationaladv2022@gmail.com" className="block break-all hover:text-white" data-testid="link-footer-email">newnationaladv2022@gmail.com</a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#a7c4da]">Explore</p>
              <div className="space-y-2.5 text-sm text-white/75">
                <a href="#services" className="block hover:text-white" data-testid="link-footer-services">Services</a>
                <a href="#work" className="block hover:text-white" data-testid="link-footer-work">Our work</a>
                <a href="#quote" className="block hover:text-white" data-testid="link-footer-quote">Request a quote</a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[11px] text-white/45 sm:flex-row"><span>© New National Advertising</span><span>Professional printing and advertising services</span></div>
        </div>
      </footer>

      <a href={whatsappHref} target="_blank" rel="noreferrer" className="floating-whatsapp fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-label="Chat on WhatsApp" data-testid="button-floating-whatsapp"><MessageCircle className="h-5 w-5" /></a>
    </main>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;