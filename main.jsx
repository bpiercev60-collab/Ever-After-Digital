import { useState, useRef, useEffect, useCallback } from 'react';
import {
  initDesignerData,
  isDataLoaded,
  getTemplates,
  getTemplatesByStyle,
  getDefaultCustomizations,
  getTemplateById,
} from './templates/designerRenderer';
import TemplateEditor, { getSvgElement } from './components/TemplateEditor';
import ControlPanel from './components/ControlPanel';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [templateGroups, setTemplateGroups] = useState([]);
  const svgWrapperRef = useRef(null);
  const [svgElement, setSvgElement] = useState(null);

  // Load shared data at runtime
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        await initDesignerData();
        if (cancelled) return;
        const templates = getTemplates();
        const groups = getTemplatesByStyle();
        setTemplateGroups(groups);
        if (templates.length > 0) {
          setSelectedTemplate(templates[0]);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load designer data:', err);
          setLoadError('Could not load templates. Please ensure the dev server is running.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Initialize defaults when template changes
  useEffect(() => {
    if (selectedTemplate) {
      setCustomizations(getDefaultCustomizations(selectedTemplate));
    }
  }, [selectedTemplate?.id]);

  // Track SVG element for export
  useEffect(() => {
    setSvgElement(getSvgElement(svgWrapperRef));
  }, [customizations, selectedTemplate]);

  const handleSelectTemplate = useCallback((template) => {
    setSelectedTemplate(template);
  }, []);

  const handleCustomizationChange = useCallback((newVals) => {
    setCustomizations(newVals);
  }, []);

  // ── Loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#fdf8f0', flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid #e0d5c4',
          borderTopColor: '#d4a574', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: '#888' }}>Loading templates…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error state
  if (loadError) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#fdf8f0', flexDirection: 'column', gap: '1rem',
        textAlign: 'center', padding: '2rem',
      }}>
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <h2 style={{ color: '#333' }}>Could not load templates</h2>
        <p style={{ color: '#888', maxWidth: 400 }}>{loadError}</p>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, background: '#D4AF37', borderRadius: 6,
            fontSize: 18, lineHeight: 1, color: '#fff',
          }}>♥</span>
          <div>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Ever After Digital</span>
            <span className="brand-sub">Wedding Template Customizer</span>
          </div>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          {selectedTemplate ? selectedTemplate.name : 'Select a template'}
        </div>
      </header>

      <main className="app-main">
        <ControlPanel
          templateGroups={templateGroups}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          customizations={customizations}
          onCustomizationChange={handleCustomizationChange}
          svgElementRef={svgElement}
        />

        <section className="canvas-area" ref={svgWrapperRef}>
          <TemplateEditor
            template={selectedTemplate}
            customizations={customizations}
          />
        </section>
      </main>
    </>
  );
}