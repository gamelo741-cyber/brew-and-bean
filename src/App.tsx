import { useState, useEffect, type ReactNode } from 'react';
import { Clock3, MapPin, Menu, X, Instagram, Sun, Moon, Phone } from 'lucide-react';

const IMAGES = {
  hero: 'https://images.pexels.com/photos/13735875/pexels-photo-13735875.jpeg?auto=compress&cs=tinysrgb&w=1400',
  flatWhite: 'https://images.pexels.com/photos/5337017/pexels-photo-5337017.jpeg?auto=compress&cs=tinysrgb&w=700',
  croissant: 'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&w=700',
  icedLatte: 'https://images.pexels.com/photos/4307385/pexels-photo-4307385.jpeg?auto=compress&cs=tinysrgb&w=700',
  story: 'https://images.pexels.com/photos/1724199/pexels-photo-1724199.jpeg?auto=compress&cs=tinysrgb&w=1100',
  galleryA: 'https://images.pexels.com/photos/33454120/pexels-photo-33454120.jpeg?auto=compress&cs=tinysrgb&w=900',
  galleryB: 'https://images.pexels.com/photos/15569230/pexels-photo-15569230.jpeg?auto=compress&cs=tinysrgb&w=900',
  galleryC: 'https://images.pexels.com/photos/30629967/pexels-photo-30629967.jpeg?auto=compress&cs=tinysrgb&w=900',
  galleryD: 'https://images.pexels.com/photos/37041313/pexels-photo-37041313.jpeg?auto=compress&cs=tinysrgb&w=900',
};

const menuLinks = [
  ['Menu', '#menu'],
  ['Our Story', '#story'],
  ['Visit', '#visit'],
] as const;

const PHONE_DISPLAY = '0594310065';
const PHONE_HREF = 'tel:0594310065';

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const closeMobileNav = () => setMobileNavOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="site-logo" href="#top" aria-label="Brew & Bean home">
          Brew & <span>Bean</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {menuLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-right">
          <button
            className="theme-toggle"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode((d) => !d)}
          >
            <Sun className="sun-icon" size={15} strokeWidth={1.6} />
            <Moon className="moon-icon" size={15} strokeWidth={1.6} />
          </button>
          <a className="header-visit" href="#visit">Visit Us</a>
        </div>
        <button className="nav-toggle" aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>
          {mobileNavOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        {mobileNavOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {menuLinks.map(([label, href]) => <a key={href} href={href} onClick={closeMobileNav}>{label}</a>)}
            <a className="header-visit" href="#visit" onClick={closeMobileNav}>Visit Us</a>
            <button
              className="theme-toggle mobile-theme-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A Neighbourhood Coffee Bar — Riyadh</p>
            <h1 id="hero-title">Coffee,<br />made <em>slow.</em></h1>
            <p className="hero-description">Thoughtfully brewed for slow mornings,<br className="desktop-break" /> good conversations, and everything in between.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">Today's Menu</a>
              <a className="button button-light" href="#visit">Visit Us <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-details">
              <div className="detail-item">
                <Clock3 aria-hidden="true" size={26} strokeWidth={1.4} />
                <div><span>Open Today</span><strong>7:00 AM — 11:00 PM</strong></div>
              </div>
              <div className="detail-separator" aria-hidden="true" />
              <div className="detail-item">
                <MapPin aria-hidden="true" size={26} strokeWidth={1.4} />
                <div><span>Riyadh</span><strong>24 Market Street</strong></div>
              </div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img src={IMAGES.hero} alt="Barista preparing pour-over coffee behind the counter" />
            <div className="roasted-mark" aria-label="Roasted daily, established 2021">
              <span>ROASTED DAILY</span><b>•</b><span>EST.<br />2021</span><b>•</b>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section" aria-labelledby="picks-title">
          <div className="section-heading menu-heading">
            <h2 id="picks-title">Today's Picks</h2>
            <p className="section-sub">A few favourites from behind the bar.</p>
          </div>
          <div className="menu-grid">
            <MenuItem image={IMAGES.flatWhite} alt="Flat white with latte art" title="Flat White" description={<>Smooth and balanced.<br />Steamed milk meets rich espresso.</>} price="SAR 16" />
            <MenuItem image={IMAGES.croissant} alt="Golden pistachio croissant on a plate" title={<>Pistachio<br className="desktop-break" /> Croissant</>} description={<>Buttery, flaky, and filled<br />with creamy pistachio.</>} price="SAR 18" />
            <MenuItem image={IMAGES.icedLatte} alt="Iced Spanish latte in a glass" title={<>Iced Spanish<br className="desktop-break" /> Latte</>} description={<>Sweet creamy drink<br />for your hot days</>} price="SAR 20" />
          </div>
        </section>

        <section id="story" className="story-section" aria-labelledby="story-title">
          <div className="story-image-wrap"><img src={IMAGES.story} alt="Friends talking together in a warm coffee shop" loading="lazy" /></div>
          <div className="story-copy"><p className="eyebrow">Our Story</p><h2 id="story-title">A small place for good coffee and unhurried mornings.</h2><p className="secondary-text">Brew & Bean began with a simple idea: make a room where the neighbourhood could slow down. We roast in small batches, brew with care, and leave enough space for a second cup and a good conversation.</p><p className="secondary-text">Our door has been open on Market Street since 2021. Come for the coffee, stay for the quiet.</p></div>
        </section>

        <section className="space-section" aria-labelledby="space-title">
          <div className="section-heading"><p className="eyebrow">The Space</p><h2 id="space-title">Come as you are.</h2></div>
          <div className="space-grid">
            <img src={IMAGES.galleryA} alt="Warm rustic coffee shop interior with wooden decor" loading="lazy" />
            <img src={IMAGES.galleryB} alt="Morning coffee setup on a mosaic table in warm light" loading="lazy" />
            <img src={IMAGES.galleryC} alt="Coffee beside an open book by a cafe window" loading="lazy" />
            <img src={IMAGES.galleryD} alt="Outdoor bistro seating with wooden tables and iron chairs" loading="lazy" />
          </div>
        </section>

        <section id="visit" className="visit-section" aria-labelledby="visit-title">
          <div className="visit-left">
            <p className="eyebrow">Find us</p>
            <h2 id="visit-title">Come by.</h2>
            <p className="visit-intro secondary-text">No reservations, no occasion needed.</p>
            <a className="button button-dark" href="https://maps.google.com/?q=24+Market+Street+Riyadh" target="_blank" rel="noreferrer">Get Directions <MapPin size={15} /></a>
          </div>
          <div className="visit-details">
            <p><MapPin size={18} aria-hidden="true" /><span><strong>24 Market Street</strong>Riyadh</span></p>
            <p><Clock3 size={18} aria-hidden="true" /><span><strong>Monday — Sunday</strong>7:00 AM — 11:00 PM</span></p>
            <p><Phone size={18} aria-hidden="true" /><a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
          </div>
          <div className="visit-map" aria-label="Map showing 24 Market Street in Riyadh">
            <div className="map-lines" aria-hidden="true" />
            <MapPin className="map-pin" size={31} strokeWidth={2} aria-hidden="true" />
            <a className="map-button" href="https://maps.google.com/?q=24+Market+Street+Riyadh" target="_blank" rel="noreferrer">Get Directions</a>
          </div>
        </section>
      </main>
    </div>
  );
}

function MenuItem({ image, alt, title, description, price }: { image: string; alt: string; title: ReactNode; description: ReactNode; price: string }) {
  return <article className="menu-item"><div className="menu-image"><img src={image} alt={alt} loading="lazy" /></div><div className="menu-info"><h3>{title}</h3><p className="menu-desc">{description}</p><strong>{price}</strong></div></article>;
}

export default App;