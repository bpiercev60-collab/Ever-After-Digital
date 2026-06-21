/**
 * Storefront / Landing Page for Ever After Digital
 * Routes:
 *  / or /#styles — Main storefront
 *  /#my-designs — Saved designs gallery
 *  /links or /in — Link-in-bio (for Instagram/Pinterest bio)
 */
import MyDesigns from './components/MyDesigns';
import LinksPage from './components/LinksPage';
import EmailCapture from './components/emailCapture';

const STYLES = [
  {
    name: 'Classic Elegance',
    subtitle: 'Timeless & refined',
    description: 'Gold foil borders, champagne tones, and navy accents. The perfect choice for formal weddings.',
    palette: ['#D4AF37', '#001F3F', '#F7E7CE', '#FFFFFF'],
    bg: 'linear-gradient(135deg, #F7E7CE 0%, #FFF8F0 50%, #F7E7CE 100%)',
    preview: '<svg viewBox="0 0 300 200" style={{ width: "100%", height: "100%" }}>...</svg>',
    templates: 'Save the Date · Invitation · RSVP · Thank You',
  },
  {
    name: 'Modern Minimalist',
    subtitle: 'Clean & contemporary',
    description: 'Bold typography, generous white space, and a stark black-and-white palette.',
    palette: ['#000000', '#FFFFFF', '#F5F5F5'],
    bg: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
    preview: '',
    templates: 'Save the Date · Invitation',
  },
  {
    name: 'Wildflower Boho',
    subtitle: 'Free-spirited & organic',
    description: 'Earthy browns, sage greens, and flowing script fonts. Inspired by nature.',
    palette: ['#BC6C25', '#DDA15E', '#FEFAE0', '#606C38'],
    bg: 'linear-gradient(135deg, #FEFAE0 0%, #F5F0E0 100%)',
    preview: '',
    templates: 'Save the Date · Invitation',
  },
  {
    name: 'Classic Noir',
    subtitle: 'Bold & sophisticated',
    description: 'Dramatic black backgrounds with crisp white lettering. Elegant script meets editorial edge.',
    palette: ['#000000', '#FFFFFF'],
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
    preview: '',
    templates: 'Save the Date · Invitation',
  },
];

const FEATURES = [
  { icon: '\uD83C\uDFA8', title: 'Customize Everything', text: 'Change colors, edit every line of text, and choose fonts that match your vision.' },
  { icon: '\uD83D\uDCF1', title: 'Real-Time Preview', text: 'See every change instantly as you customize.' },
  { icon: '\uD83D\uDDA8\uFE0F', title: 'Print-Ready Export', text: 'Download high-res PNGs or professional print-ready PDFs.' },
  { icon: '\uD83D\uDC8E', title: 'Bespoke Quality', text: 'Every template designed by professional wedding stationers.' },
  { icon: '\u26A1', title: 'Instant Delivery', text: 'Download your customized suite immediately.' },
  { icon: '\uD83D\uDCB0', title: 'Full Suite Bundles', text: 'Save big when you bundle Save the Dates, Invitations, RSVPs, and Thank Yous.' },
];

function getRoute() {
  if (typeof window === 'undefined') return 'storefront';
  var path = window.location.pathname;
  var hash = window.location.hash;
  if (path === '/links' || path === '/in') return 'links';
  if (hash === '#my-designs') return 'my-designs';
  return 'storefront';
}

export default function App() {
  var route = getRoute();

  if (route === 'links') {
    return <LinksPage />;
  }

  if (route === 'my-designs') {
    return <MyDesigns />;
  }

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="brand">
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, background: '#D4AF37', borderRadius: 5, fontSize: 14, lineHeight: 1, color: '#fff' }}>{'\u2661'}</span>
          Ever After Digital
        </a>
        <div className="nav-links">
          <a href="#styles">Collections</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Why Us</a>
          <a href="#my-designs">My Designs</a>
          <a href="http://localhost:5173/" className="cta-btn" target="_blank" rel="noopener">
            Start Customizing {'\u2192'}
          </a>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-badge">Elegant Digital Templates</div>
        <h1>Wedding Stationery,<br /><span>Beautifully Yours</span></h1>
        <p>Choose from our curated collection of professional wedding templates. Customize colors, fonts, and text — then download print-ready files instantly. Bespoke quality, without the bespoke price tag.</p>
        <div className="hero-actions">
          <a href="http://localhost:5173/" className="btn-primary" target="_blank" rel="noopener">{'\u2728'} Start Customizing</a>
          <a href="#styles" className="btn-secondary">View Collections {'\u2193'}</a>
        </div>
        <div className="pricing-badge" style={{ marginTop: '2rem' }}>
          <span className="pill">Bundle & Save</span>
          <span>Full suites from $24 — individual templates from $8</span>
        </div>
        {/* Email capture with 15% off incentive */}
        <EmailCapture />
      </section>

      <section className="section" id="how-it-works">
        <div className="section-label">Simple Process</div>
        <h2>Customize. Download. Print.</h2>
        <p className="subtitle">Three simple steps to stunning wedding stationery — no design experience needed.</p>
        <div className="steps">
          <div className="step"><h3>Pick Your Style</h3><p>Browse our designer collections and choose the template that matches your wedding vision.</p></div>
          <div className="step"><h3>Make It Yours</h3><p>Edit names, dates, colors, and fonts in real-time. Our preview updates instantly.</p></div>
          <div className="step"><h3>Download & Print</h3><p>Export high-res PNGs for digital sharing or print-ready PDFs for professional printing.</p></div>
        </div>
      </section>

      <section className="section" id="styles" style={{ background: 'var(--gray-50)', borderRadius: '2rem', margin: '0 1rem' }}>
        <div className="section-label">Collections</div>
        <h2>Find Your Perfect Style</h2>
        <p className="subtitle">Four distinct design collections, each with matching Save the Dates, Invitations, RSVPs, and more.</p>
        <div className="styles-grid">
          {STYLES.map(function(style) {
            return (
              <div className="style-card" key={style.name}>
                <div className="preview" style={{ background: style.bg }} />
                <div className="info">
                  <h3>{style.name}</h3>
                  <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{style.subtitle}</p>
                  <p>{style.description}</p>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 500 }}>{style.templates}</div>
                  <div className="palette" style={{ marginTop: '0.75rem' }}>
                    {style.palette.map(function(color, i) { return <div key={i} className="swatch" style={{ background: color }} />; })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-label">Why Ever After Digital</div>
        <h2>Premium Design, Zero Hassle</h2>
        <p className="subtitle">Professional wedding stationery that you customize in minutes — no graphic designer required.</p>
        <div className="value-props">
          {FEATURES.map(function(f) {
            return (
              <div className="value-card" key={f.title}>
                <div className="icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to Create Your Wedding Suite?</h2>
        <p>Join thousands of happy couples who designed their dream stationery in minutes.</p>
        <a href="http://localhost:5173/" className="btn-primary" target="_blank" rel="noopener">
          Start Customizing Free {'\u2192'}
        </a>
      </section>

      <footer className="footer">
        <p>Made with <span>{'\u2661'}</span> by <span>Ever After Digital</span> — Elegant Templates for Your Forever</p>
      </footer>
    </div>
  );
}