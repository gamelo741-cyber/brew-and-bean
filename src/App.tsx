import { useState, useEffect, type ReactNode } from 'react';
import { Clock3, MapPin, Menu, X, Sun, Moon, Phone } from 'lucide-react';

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

const PHONE_DISPLAY = '0594310065';
const PHONE_HREF = 'tel:0594310065';

type Language = 'en' | 'ar';

const translations = {
  en: {
    nav: { menu: 'Menu', story: 'Our Story', visit: 'Visit' },
    accessibility: {
      home: 'Brew & Bean home',
      primaryNav: 'Primary navigation',
      mobileNav: 'Mobile navigation',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      switchToArabic: 'Switch language to Arabic',
      switchToEnglish: 'Switch language to English',
      heroImage: 'Barista preparing pour-over coffee behind the counter',
      roastedDaily: 'Roasted daily, established 2021',
      storyImage: 'Friends talking together in a warm coffee shop',
      spaceImageA: 'Warm rustic coffee shop interior with wooden decor',
      spaceImageB: 'Morning coffee setup on a mosaic table in warm light',
      spaceImageC: 'Coffee beside an open book by a cafe window',
      spaceImageD: 'Outdoor bistro seating with wooden tables and iron chairs',
      map: 'Map showing 24 Market Street in Riyadh',
    },
    hero: {
      eyebrow: 'A Neighbourhood Coffee Bar — Riyadh',
      title: <>Coffee,<br />made <em>slow.</em></>,
      description: <>Thoughtfully brewed for slow mornings,<br className="desktop-break" /> good conversations, and everything in between.</>,
      todaysMenu: "Today's Menu",
      visitUs: 'Visit Us',
      openToday: 'Open Today',
      riyadh: 'Riyadh',
      address: '24 Market Street',
      roastedDaily: 'ROASTED DAILY',
      established: 'EST.',
      establishedYear: '2021',
      hours: '7:00 AM — 11:00 PM',
    },
    menu: {
      title: "Today's Picks",
      subtitle: 'A few favourites from behind the bar.',
      items: [
        { image: 'flatWhite', alt: 'Flat white with latte art', title: 'Flat White', description: <>Smooth and balanced.<br />Steamed milk meets rich espresso.</>, price: 'SAR 16' },
        { image: 'croissant', alt: 'Golden pistachio croissant on a plate', title: <>Pistachio<br className="desktop-break" /> Croissant</>, description: <>Buttery, flaky, and filled<br />with creamy pistachio.</>, price: 'SAR 18' },
        { image: 'icedLatte', alt: 'Iced Spanish latte in a glass', title: <>Iced Spanish<br className="desktop-break" /> Latte</>, description: <>Sweet creamy drink<br />for your hot days.</>, price: 'SAR 20' },
      ],
    },
    story: {
      eyebrow: 'Our Story',
      title: 'A small place for good coffee and unhurried mornings.',
      paragraphOne: 'Brew & Bean began with a simple idea: make a room where the neighbourhood could slow down. We roast in small batches, brew with care, and leave enough space for a second cup and a good conversation.',
      paragraphTwo: 'Our door has been open on Market Street since 2021. Come for the coffee, stay for the quiet.',
    },
    space: { eyebrow: 'The Space', title: 'Come as you are.' },
    visit: {
      eyebrow: 'Find us',
      title: 'Come by.',
      intro: 'No reservations, no occasion needed.',
      directions: 'Get Directions',
      mondaySunday: 'Monday — Sunday',
    },
    theme: { light: 'Light Mode', dark: 'Dark Mode' },
  },
  ar: {
    nav: { menu: 'القائمة', story: 'قصتنا', visit: 'موقعنا' },
    accessibility: {
      home: 'الصفحة الرئيسية لبرو آند بين',
      primaryNav: 'التنقّل الرئيسي',
      mobileNav: 'تنقّل الهاتف',
      closeMenu: 'إغلاق القائمة',
      openMenu: 'فتح القائمة',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      switchToArabic: 'التبديل إلى العربية',
      switchToEnglish: 'التبديل إلى الإنجليزية',
      heroImage: 'باريستا يحضّر قهوة مقطّرة خلف المنضدة',
      roastedDaily: 'تحميص يومي، منذ عام ٢٠٢١',
      storyImage: 'أصدقاء يتحدثون في مقهى دافئ',
      spaceImageA: 'داخل مقهى دافئ بطابع ريفي وديكور خشبي',
      spaceImageB: 'قهوة صباحية على طاولة فسيفسائية في ضوء دافئ',
      spaceImageC: 'قهوة بجانب كتاب مفتوح قرب نافذة المقهى',
      spaceImageD: 'جلسات خارجية بطاولات خشبية وكراسٍ حديدية',
      map: 'خريطة توضّح موقع ٢٤ شارع ماركت في الرياض',
    },
    hero: {
      eyebrow: 'مقهى قهوة في الحي — الرياض',
      title: <>قهوة،<br />محضّرة <em>بهدوء.</em></>,
      description: <>قهوة محضّرة بعناية لصباحات هادئة،<br className="desktop-break" /> وأحاديث جميلة وكل ما بينهما.</>,
      todaysMenu: 'قائمة اليوم',
      visitUs: 'زرنا',
      openToday: 'مفتوح اليوم',
      riyadh: 'الرياض',
      address: 'شارع ماركت ٢٤',
      roastedDaily: 'تحميص يومي',
      established: 'منذ',
      establishedYear: '٢٠٢١',
      hours: '٧:٠٠ ص — ١١:٠٠ م',
    },
    menu: {
      title: 'اختيارات اليوم',
      subtitle: 'بعض من المفضّلات لدينا خلف البار.',
      items: [
        { image: 'flatWhite', alt: 'فلات وايت مع فن على سطح القهوة', title: 'فلات وايت', description: <>ناعم ومتوازن.<br /></>, price: '١٦ ر.س' },
        { image: 'croissant', alt: 'كرواسون بالفستق ذهبي اللون على طبق', title: <>كرواسون<br className="desktop-break" /> بالفستق</>, description: <>هشّ، زبدي، ومحشو<br />بكريمة الفستق.</>, price: '١٨ ر.س' },
        { image: 'icedLatte', alt: 'لاتيه إسباني مثلج في كوب زجاجي', title: <>لاتيه إسباني<br className="desktop-break" /> مثلج</>, description: <>مشروب حلو وكريمي<br />لأيامك الحارة.</>, price: '٢٠ ر.س' },
      ],
    },
    story: {
      eyebrow: 'قصتنا',
      title: 'مساحة صغيرة لقهوة طيبة وصباحات بلا عجلة.',
      paragraphOne: 'بدأ برو آند بين بفكرة بسيطة: أن نصنع مكانًا يستطيع فيه أهل الحي أن يخففوا سرعتهم. نحمّص بكميات صغيرة، ونحضّر القهوة بعناية، ونترك متّسعًا لفنجان ثانٍ وحديث جميل.',
      paragraphTwo: 'أبوابنا مفتوحة في شارع ماركت منذ عام ٢٠٢١. تعال من أجل القهوة، وابقَ من أجل الهدوء.',
    },
    space: { eyebrow: 'المكان', title: 'تعال كما أنت.' },
    visit: {
      eyebrow: 'اعثر علينا',
      title: 'مرّ بنا.',
      intro: 'لا حجوزات ولا مناسبة خاصة مطلوبة.',
      directions: 'احصل على الاتجاهات',
      mondaySunday: 'من الاثنين إلى الأحد',
    },
    theme: { light: 'الوضع الفاتح', dark: 'الوضع الداكن' },
  },
} as const;

const menuLinks = (language: Language) => {
  const nav = translations[language].nav;
  return [
    [nav.menu, '#menu'],
    [nav.story, '#story'],
    [nav.visit, '#visit'],
  ] as const;
};

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];
  const links = menuLinks(language);
  const closeMobileNav = () => setMobileNavOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [darkMode, language]);

  const toggleLanguage = () => setLanguage((current) => current === 'en' ? 'ar' : 'en');

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="site-logo" href="#top" aria-label={t.accessibility.home}>
          Brew & <span>Bean</span>
        </a>
        <nav className="desktop-nav" aria-label={t.accessibility.primaryNav}>
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-right">
          <button
            className="theme-toggle"
            aria-label={darkMode ? t.accessibility.switchToLight : t.accessibility.switchToDark}
            onClick={() => setDarkMode((d) => !d)}
          >
            <Sun className="sun-icon" size={15} strokeWidth={1.6} />
            <Moon className="moon-icon" size={15} strokeWidth={1.6} />
          </button>
          <a className="header-visit" href="#visit">{t.hero.visitUs}</a>
          <button className="header-visit language-toggle" type="button" aria-label={language === 'en' ? t.accessibility.switchToArabic : t.accessibility.switchToEnglish} onClick={toggleLanguage}>{language === 'en' ? 'العربية' : 'English'}</button>
        </div>
        <button className="nav-toggle" aria-label={mobileNavOpen ? t.accessibility.closeMenu : t.accessibility.openMenu} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>
          {mobileNavOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        {mobileNavOpen && (
          <nav className="mobile-nav" aria-label={t.accessibility.mobileNav}>
            {links.map(([label, href]) => <a key={href} href={href} onClick={closeMobileNav}>{label}</a>)}
            <a className="header-visit" href="#visit" onClick={closeMobileNav}>{t.hero.visitUs}</a>
            <button
              className="theme-toggle mobile-theme-toggle"
              aria-label={darkMode ? t.accessibility.switchToLight : t.accessibility.switchToDark}
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
              {darkMode ? t.theme.light : t.theme.dark}
            </button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title">{t.hero.title}</h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">{t.hero.todaysMenu}</a>
              <a className="button button-light" href="#visit">{t.hero.visitUs} <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-details">
              <div className="detail-item">
                <Clock3 aria-hidden="true" size={26} strokeWidth={1.4} />
                <div><span>{t.hero.openToday}</span><strong>{t.hero.hours}</strong></div>
              </div>
              <div className="detail-separator" aria-hidden="true" />
              <div className="detail-item">
                <MapPin aria-hidden="true" size={26} strokeWidth={1.4} />
                <div><span>{t.hero.riyadh}</span><strong>{t.hero.address}</strong></div>
              </div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img src={IMAGES.hero} alt={t.accessibility.heroImage} />
            <div className="roasted-mark" aria-label={t.accessibility.roastedDaily}>
              <span>{t.hero.roastedDaily}</span><b>•</b><span>{t.hero.established}<br />{t.hero.establishedYear}</span><b>•</b>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section" aria-labelledby="picks-title">
          <div className="section-heading menu-heading">
            <h2 id="picks-title">{t.menu.title}</h2>
            <p className="section-sub">{t.menu.subtitle}</p>
          </div>
          <div className="menu-grid">
            {t.menu.items.map(({ image, ...item }) => <MenuItem key={item.alt} {...item} image={IMAGES[image]} />)}
          </div>
        </section>

        <section id="story" className="story-section" aria-labelledby="story-title">
          <div className="story-image-wrap"><img src={IMAGES.story} alt={t.accessibility.storyImage} loading="lazy" /></div>
          <div className="story-copy"><p className="eyebrow">{t.story.eyebrow}</p><h2 id="story-title">{t.story.title}</h2><p className="secondary-text">{t.story.paragraphOne}</p><p className="secondary-text">{t.story.paragraphTwo}</p></div>
        </section>

        <section className="space-section" aria-labelledby="space-title">
          <div className="section-heading"><p className="eyebrow">{t.space.eyebrow}</p><h2 id="space-title">{t.space.title}</h2></div>
          <div className="space-grid">
            <img src={IMAGES.galleryA} alt={t.accessibility.spaceImageA} loading="lazy" />
            <img src={IMAGES.galleryB} alt={t.accessibility.spaceImageB} loading="lazy" />
            <img src={IMAGES.galleryC} alt={t.accessibility.spaceImageC} loading="lazy" />
            <img src={IMAGES.galleryD} alt={t.accessibility.spaceImageD} loading="lazy" />
          </div>
        </section>

        <section id="visit" className="visit-section" aria-labelledby="visit-title">
          <div className="visit-left">
            <p className="eyebrow">{t.visit.eyebrow}</p>
            <h2 id="visit-title">{t.visit.title}</h2>
            <p className="visit-intro secondary-text">{t.visit.intro}</p>
            <a className="button button-dark" href="https://maps.google.com/?q=24+Market+Street+Riyadh" target="_blank" rel="noreferrer">{t.visit.directions} <MapPin size={15} /></a>
          </div>
          <div className="visit-details">
            <p><MapPin size={18} aria-hidden="true" /><span><strong>{t.hero.address}</strong>{t.hero.riyadh}</span></p>
            <p><Clock3 size={18} aria-hidden="true" /><span><strong>{t.visit.mondaySunday}</strong>{t.hero.hours}</span></p>
            <p><Phone size={18} aria-hidden="true" /><a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
          </div>
          <div className="visit-map" aria-label={t.accessibility.map}>
            <div className="map-lines" aria-hidden="true" />
            <MapPin className="map-pin" size={31} strokeWidth={2} aria-hidden="true" />
            <a className="map-button" href="https://maps.google.com/?q=24+Market+Street+Riyadh" target="_blank" rel="noreferrer">{t.visit.directions}</a>
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