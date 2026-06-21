/**
 * EmailCapture — Elegant email signup with "15% Off Your First Suite" incentive
 * Stores to localStorage and provides a hook for future API integration.
 */

import { useState } from 'react';

const STORAGE_KEY = 'ever-after-emails';

function saveEmail(email) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!existing.find(e => e.email === email)) {
      existing.push({ email, source: 'hero-banner', timestamp: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function validate(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setErrorMsg('Please enter your email address');
      setStatus('error');
      return;
    }

    if (!validate(trimmed)) {
      setErrorMsg('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call — replace with real endpoint when available
    setTimeout(() => {
      try {
        saveEmail(trimmed);
        setStatus('success');
        setEmail('');
      } catch (err) {
        setErrorMsg('Something went wrong. Please try again.');
        setStatus('error');
      }
    }, 600);
  }

  if (status === 'success') {
    return (
      <div className="email-capture email-capture--success">
        <div className="email-capture__icon">✓</div>
        <p className="email-capture__success-text">
          <strong>You're on the list!</strong> Check your inbox for your 15% off code.
        </p>
      </div>
    );
  }

  return (
    <form className="email-capture" onSubmit={handleSubmit} noValidate>
      <div className="email-capture__inner">
        <label className="email-capture__label" htmlFor="hero-email">
          <span className="email-capture__incentive">🎉 Get 15% Off Your First Suite</span>
        </label>
        <div className="email-capture__row">
          <input
            id="hero-email"
            type="email"
            className="email-capture__input"
            placeholder="your@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            disabled={status === 'loading'}
            aria-label="Email address for 15% discount"
          />
          <button
            type="submit"
            className="email-capture__btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Get 15% Off →'}
          </button>
        </div>
        {status === 'error' && (
          <p className="email-capture__error">{errorMsg}</p>
        )}
        <p className="email-capture__footnote">
          No spam ever. Unsubscribe anytime.
        </p>
      </div>
    </form>
  );
}