import { useState, useEffect } from 'react';
import { loadAllDesigns, deleteDesign, clearAllDesigns } from '../services/saveService';

export default function MyDesigns() {
  var designsState = useState([]);
  var designs = designsState[0];
  var setDesigns = designsState[1];

  useEffect(function() {
    setDesigns(loadAllDesigns());
  }, []);

  function handleDelete(id) {
    deleteDesign(id);
    setDesigns(loadAllDesigns());
  }

  function handleClearAll() {
    if (confirm('Delete all saved designs?')) {
      clearAllDesigns();
      setDesigns([]);
    }
  }

  return (
    <div style={{
      maxWidth: 800, margin: '0 auto', padding: '3rem 2rem',
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#001F3F', margin: 0 }}>
            {'\uD83C\uDFF0'} My Designs
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {designs.length} saved design{designs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href="/editor/" target="_blank" rel="noopener"
            style={{
              background: '#D4AF37', color: '#fff', padding: '0.5rem 1.25rem',
              borderRadius: 6, fontWeight: 600, fontSize: '0.85rem',
              textDecoration: 'none', display: 'inline-block',
            }}
          >+ New Design</a>
          {designs.length > 0 && (
            <button onClick={handleClearAll}
              style={{
                background: 'transparent', color: '#c44', padding: '0.5rem 1rem',
                borderRadius: 6, fontWeight: 500, fontSize: '0.85rem',
                border: '1px solid #ecc', cursor: 'pointer',
              }}
            >Clear All</button>
          )}
        </div>
      </div>

      {designs.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem 2rem',
          background: '#f9f5f0', borderRadius: 12,
          border: '2px dashed #e0d5c4',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{'\uD83C\uDFF0'}</div>
          <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>No saved designs yet</h3>
          <p style={{ color: '#888', marginBottom: '1.5rem' }}>
            Start customizing a template and save your design to see it here.
          </p>
          <a href="/editor/" target="_blank" rel="noopener"
            style={{
              background: '#D4AF37', color: '#fff', padding: '0.75rem 2rem',
              borderRadius: 8, fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none', display: 'inline-block',
            }}
          >{'\u2728'} Start Customizing</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {designs.map(function(d) {
            return (
              <div key={d.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.25rem', background: '#fff',
                borderRadius: 10, border: '1px solid #e0e0e0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: '#001F3F' }}>{d.templateName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.2rem' }}>
                    Saved: {new Date(d.savedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={"/editor/?load=" + d.id} target="_blank" rel="noopener"
                    style={{
                      background: '#001F3F', color: '#fff', padding: '0.4rem 1rem',
                      borderRadius: 6, fontWeight: 500, fontSize: '0.8rem', textDecoration: 'none',
                    }}
                  >Load & Edit</a>
                  <button onClick={function() { handleDelete(d.id); }}
                    style={{
                      background: 'transparent', color: '#c44', padding: '0.4rem 0.75rem',
                      borderRadius: 6, fontWeight: 500, fontSize: '0.8rem',
                      border: '1px solid #ecc', cursor: 'pointer',
                    }}
                  >Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/" style={{ color: '#888', fontSize: '0.8rem' }}>{'\u2190'} Back to Storefront</a>
      </div>
    </div>
  );
}