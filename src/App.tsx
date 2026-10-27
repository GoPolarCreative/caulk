import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const projects = [
  { title: 'Westfield Southland', category: 'Retail & commercial', image: '/images/8_Westfield-Southland-10_-_Daniel_Harper.jpg' },
  { title: 'Government Schools', category: 'Education', image: '/images/0798_Balambalam_Primary_School_1318_-_Daniel_Harper.jpg' },
  { title: 'Chadstone expansion', category: 'Retail & commercial', image: '/images/chadstone-expansion-4-1024x683_-_Daniel_Harper.jpg' },
  { title: 'Residential development', category: 'Residential', image: '/images/images_-_Daniel_Harper.jpeg' },
  { title: 'Commercial tower', category: 'Commercial', image: '/images/images-2_-_Daniel_Harper.jpeg' },
  { title: 'Secure facilities', category: 'Specialist construction', image: '/images/images-2_copy_-_Daniel_Harper.jpeg' },
  { title: 'Townhouse development', category: 'Residential', image: '/images/images-2_copy_2_-_Daniel_Harper.jpeg' },
  { title: 'Level Crossing Removals', category: 'Infrastructure', image: '/images/PakenhamMainStreet-2048x1180_-_Daniel_Harper.jpg' },
  { title: 'Wonthaggi Hospital', category: 'Health & public', image: '/images/vhba-health-wonthaggi-hospital-exterior-artist-impression-west-elevation-gallery.jpg' },
  { title: 'Southland interior finish', category: 'Retail & commercial', image: '/images/8_Westfield-Southland-10_-_Daniel_Harper.jpg' },
];

const services = [
  'Internal & external caulking',
  'Fire-rated & acoustic sealing',
  'Wet area & waterproof sealing',
  'Expansion joints & construction joints',
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') setLightboxIndex((current) => current === null ? null : (current - 1 + projects.length) % projects.length);
      if (event.key === 'ArrowRight') setLightboxIndex((current) => current === null ? null : (current + 1) % projects.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Unable to send enquiry');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Caulk Central home">
          <img className="brand-logo" src="/caulklogo.png" alt="Caulk Central" />
        </a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-visual">
            <img src="/images/8_Westfield-Southland-10_-_Daniel_Harper.jpg" alt="Finished commercial interior at Westfield Southland" />
            <div className="hero-image-label"><span>01</span><span>Built for the finish</span></div>
          </div>
          <div className="hero-content">
            <p className="eyebrow"><span className="eyebrow-line" /> Commercial & residential caulking / Melbourne</p>
            <h1>Precision<br /><em>caulking.</em></h1>
            <p className="hero-intro">Caulk Central delivers professional caulking, sealing and joint protection for commercial, residential and construction projects. Clean lines, lasting protection and a team you can rely on.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Request a quote <ArrowUpRight size={17} /></a>
              <a className="text-link" href="tel:0482888898"><Phone size={15} /> 0482 888 898</a>
            </div>
            <div className="hero-proof"><ShieldCheck size={20} /><span>Internal, external, fire-rated and waterproof <b>sealing.</b></span></div>
          </div>
        </section>

        <section className="trust-strip"><div><span className="strip-number">01</span><span>Built on reliability</span></div><div><span className="strip-number">02</span><span>Obsessed with detail</span></div><div><span className="strip-number">03</span><span>Made to last</span></div><div className="strip-note">For builders, developers<br />and project teams.</div></section>

        <section className="intro section-pad" id="about"><div className="section-kicker">The central standard</div><div className="intro-copy"><h2>Good work is in<br /><em>the details.</em></h2><div><p>Caulk Central is a specialist caulking team built around a simple idea: the details should be the strongest part of the build.</p><p>From major commercial projects to residential developments, we bring a considered approach, dependable communication and a clean finish that holds up long after handover.</p><a className="text-link dark-link" href="#services">Explore our services <ArrowUpRight size={15} /></a></div></div></section>

        <section className="service-section" id="services"><div className="section-pad service-layout"><div className="service-heading"><p className="eyebrow"><span className="eyebrow-line" /> What we do</p><h2>Sealed with<br /><em>confidence.</em></h2><p>Every joint has a job. We make sure it does it properly.</p></div><div className="service-list">{services.map((service, index) => <div className="service-row" key={service}><span>0{index + 1}</span><h3>{service}</h3><ArrowUpRight size={20} /></div>)}</div></div></section>

        <section className="work-section section-pad" id="projects"><div className="work-header"><div><p className="eyebrow"><span className="eyebrow-line" /> Project gallery / 10 views</p><h2>Across every<br /><em>kind of build.</em></h2></div><p>Explore the environments our specialist caulking and sealing work helps protect, from education and healthcare to retail, residential and major infrastructure.</p></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={`${project.title}-${index}`}><button className="project-image" type="button" onClick={() => setLightboxIndex(index)} aria-label={`View ${project.title} image`}><img src={project.image} alt={project.title} loading="lazy" /></button><div className="project-meta"><div><span>{project.category}</span><h3>{project.title}</h3></div><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div></article>)}</div></section>

        <section className="statement"><div className="statement-mark"><Sparkles size={24} /></div><blockquote>“Reliability, quality<br />and service. <em>Always.</em>”</blockquote><p>Daniel Harper & Scott Gibson / Caulk Central</p></section>

        <section className="final-contact section-pad" id="contact"><div className="final-contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> Ready when you are</p><h2>Let&apos;s make<br /><em>it watertight.</em></h2><p className="final-contact-intro">Tell us what you&apos;re building and our team will be in touch to discuss the right caulking and sealing solution.</p><div className="direct-contact"><a href="tel:0482888898"><Phone size={16} /> Daniel Harper / 0482 888 898</a><a href="tel:0476168449"><Phone size={16} /> Scott Gibson / 0476 168 449</a><a href="mailto:info@caulkcentral.com.au"><Mail size={16} /> info@caulkcentral.com.au</a></div></div><div className="final-contact-form"><div className="contact-heading"><p className="eyebrow">Let&apos;s get to work</p><h2>Tell us about your project.</h2><p>Share a few details and we&apos;ll get back to you.</p></div>{formStatus === 'success' ? (<div className="form-success"><span className="success-icon"><Check size={21} /></span><h3>Thanks, we&apos;ve got it.</h3><p>Your enquiry is on its way to our team. We&apos;ll be in touch soon.</p><button className="text-link" onClick={() => setFormStatus('idle')}>Send another enquiry <ArrowUpRight size={15} /></button></div>) : (<form className="contact-form" onSubmit={handleSubmit}><input type="hidden" name="access_key" value="f8a1381f-66d6-4fcf-a42b-11e6e04d0b40" /><input type="hidden" name="subject" value="New enquiry from Caulk Central website" /><input type="hidden" name="from_name" value="Caulk Central website" /><div className="form-grid"><label><span>Name</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>Phone</span><input name="phone" type="tel" placeholder="0482 888 898" required /></label></div><label><span>Email</span><input name="email" type="email" placeholder="you@company.com" required /></label><label><span>How can we help?</span><textarea name="message" rows={3} placeholder="Tell us about your project" required /></label>{formStatus === 'error' && <p className="form-error">Something went wrong sending your enquiry. Please call us on 0482 888 898.</p>}<button className="button button-light" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending enquiry...' : 'Send enquiry'} <ArrowUpRight size={17} /></button></form>)}</div></section>
        {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${projects[lightboxIndex].title} image viewer`} onClick={() => setLightboxIndex(null)}><button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer"><X size={24} /></button><button className="lightbox-nav lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + projects.length) % projects.length); }} aria-label="Previous image"><ChevronLeft size={28} /></button><figure className="lightbox-content" onClick={(event) => event.stopPropagation()}><img src={projects[lightboxIndex].image} alt={projects[lightboxIndex].title} /><figcaption><span>{projects[lightboxIndex].category}</span><strong>{projects[lightboxIndex].title}</strong><small>{String(lightboxIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</small></figcaption></figure><button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % projects.length); }} aria-label="Next image"><ChevronRight size={28} /></button></div>}
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><img className="brand-logo" src="/caulklogo.png" alt="Caulk Central" /></a><div className="footer-details"><span>7 Gauntlet Ave, Glen Waverley VIC 3150</span><a href="mailto:info@caulkcentral.com.au">info@caulkcentral.com.au</a><span className="footer-credit">Website by <a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Go Polar</a></span></div><a className="back-top" href="#top">Back to top <ChevronDown size={16} /></a></footer>
    </div>
  );
}

export default App;
