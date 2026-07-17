/**
 * LinksPage — Link-in-Bio page for Instagram/Pinterest bio links.
 * Routes: /links or /in
 * Links to: Customization Engine, Collections, and Early Access signup.
 */

import { useState, useEffect } from 'react';

const LINKS = [
  {
    href: '/editor/',
    label: '✏️  Design Your Wedding Suite',
    desc: 'Customize templates in real-time',
    primary: true,
    target: '_blank',
  },
  {
    href: '/#styles',
    label: '👰  Browse Our Collections',
    desc: 'Classic, Minimalist, Boho & Noir',
    target: '_self',
  },
  {
    href: '/#hero',
    label: '🎉  Get 15% Off Your First Suite',
    desc: 'Early access pricing — limited time',
    target: '_self',
  },
  {
    href: '#',
    label: '📅  Wedding Planning Guide',
    desc: 'Coming soon — free checklist',
    badge: 'Coming Soon',
  },
];

export default function LinksPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try {
        const key = 'ever-after-emails';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        if (!existing.find(e => e.email === email)) {
          existing.push({ email, source: 'links-page', timestamp: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(existing));
        }
      } catch (_) {}
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <div className="links-page">
      <div className="links-page__brand">
        <div className="links-page__logo">♥</div>
        <h1 className="links-page__title">Ever After Digital</h1>
        <p className="links-page__subtitle">Elegant Wedding Templates — Design Yours</p>
      </div>

      <div className="links-page__links">
        {LINKS.map((link, i) => {
          if (link.badge) {
            return (
              <div key={i} className="links-page__link links-page__link--coming-soon">
                <span>{link.label}</span>
                <span className="links-page__badge">{link.badge}</span>
              </div>
            );
          }
          return (
            <a
              key={i}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener' : undefined}
              className={`links-page__link ${link.primary ? 'links-page__link--primary' : ''}`}
            >
              {link.label}
            </a>
          );
        })}

        {/* Mini email capture inline */}
        {!subscribed ? (
          <form onSubmit={handleEmailSubmit} style={{
            display: 'flex', gap: '0.5rem', marginTop: '0.5rem',
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '0.75rem 1rem', borderRadius: 8,
                border: '2px solid var(--gray-200)', fontSize: '0.85rem',
                fontFamily: 'Montserrat, sans-serif', outline: 'none',
              }}
              aria-label="Email for early access"
            />
            <button type="submit" style={{
              padding: '0.75rem 1rem', background: 'var(--gold)', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              Notify Me
            </button>
          </form>
        ) : (
          <p style={{ color: 'var(--gold)', fontWeight: 600, marginTop: '0.75rem' }}>
            ✓ You're on the list!
          </p>
        )}
      </div>

      <div className="links-page__socials">
        <a href="#" className="links-page__social-link" aria-label="Pinterest" title="Coming soon">P</a>
        <a href="#" className="links-page__social-link" aria-label="Instagram" title="Coming soon">IG</a>
        <a href="#" className="links-page__social-link" aria-label="TikTok" title="Coming soon">TT</a>
      </div>

      <p className="links-page__footer">
        © 2025 Ever After Digital — Elegant Templates for Your Forever
      </p>
    </div>
  );
}