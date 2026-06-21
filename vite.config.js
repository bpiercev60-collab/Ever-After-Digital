*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --rose: #d4a574;
  --rose-light: #e8d5c4;
  --sage: #8a9a7a;
  --blush: #f5e6d3;
  --charcoal: #2c2c2c;
  --cream: #fdf8f0;
  --white: #ffffff;
  --gray-50: #f9f9f9;
  --gray-100: #f0f0f0;
  --gray-200: #e0e0e0;
  --gray-300: #c0c0c0;
  --gray-500: #888888;
  --gray-700: #555555;
  --gray-900: #1a1a1a;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --radius: 8px;
  --radius-lg: 12px;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
  min-height: 100vh;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--charcoal);
  letter-spacing: -0.01em;
}

.app-header .brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app-header .brand-logo {
  width: 32px;
  height: 32px;
}

.app-header .brand-sub {
  font-size: 0.75rem;
  color: var(--gray-500);
  font-weight: 400;
}

/* Main Layout */
.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 340px;
  min-width: 340px;
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar h2 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Canvas Area */
.canvas-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: auto;
  background: var(--gray-100);
}

.template-wrapper {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  max-width: 100%;
}

.template-wrapper svg {
  display: block;
  max-width: 800px;
  width: 100%;
  height: auto;
}

/* Template Selector */
.template-selector {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.template-card {
  border: 2px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.template-card:hover {
  border-color: var(--rose);
  background: var(--blush);
}

.template-card.active {
  border-color: var(--rose);
  background: var(--blush);
  box-shadow: 0 0 0 2px var(--rose);
}

.template-card .preview {
  width: 64px;
  height: 64px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--gray-50);
}

.template-card .info h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--charcoal);
}

.template-card .info p {
  font-size: 0.8rem;
  color: var(--gray-500);
  margin-top: 0.15rem;
}

/* Color picker section */
.color-group {
  margin-bottom: 0.75rem;
}

.color-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.4rem;
}

.color-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-row input[type="color"] {
  width: 36px;
  height: 36px;
  border: 2px solid var(--gray-200);
  border-radius: 6px;
  cursor: pointer;
  padding: 2px;
  background: none;
}

.color-row input[type="color"]:hover {
  border-color: var(--rose);
}

.color-row .color-hex {
  font-size: 0.85rem;
  color: var(--gray-500);
  font-family: 'SF Mono', 'Fira Code', monospace;
}

/* Text edit section */
.text-group {
  margin-bottom: 0.75rem;
}

.text-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.3rem;
}

.text-group input[type="text"],
.text-group textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid var(--gray-200);
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--charcoal);
  background: var(--white);
  transition: border-color 0.2s;
}

.text-group input[type="text"]:focus,
.text-group textarea:focus {
  outline: none;
  border-color: var(--rose);
  box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.15);
}

.text-group textarea {
  resize: vertical;
  min-height: 60px;
}

/* Export buttons */
.export-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: var(--rose);
  color: var(--white);
}

.btn-primary:hover {
  background: #c49360;
  box-shadow: var(--shadow-sm);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--charcoal);
  border: 1.5px solid var(--gray-200);
}

.btn-secondary:hover {
  background: var(--gray-200);
}

.btn-success {
  background: var(--sage);
  color: var(--white);
}

.btn-success:hover {
  background: #758565;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.loading-spinner {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
}

.loading-spinner .spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--rose);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 0.75rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Notification toast */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--charcoal);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-size: 0.9rem;
  box-shadow: var(--shadow-lg);
  z-index: 999;
  animation: toastIn 0.3s ease;
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(1rem); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Responsive scrollbar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 3px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray-500);
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  opacity: 0.4;
}

.empty-state h3 {
  font-size: 1.1rem;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

/* Download link (hidden) */
.download-link {
  display: none;
}

/* Responsive */
@media (max-width: 900px) {
  .app-main {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    min-width: unset;
    max-height: 50vh;
    border-right: none;
    border-bottom: 1px solid var(--gray-200);
  }
}