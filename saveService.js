import { useState, useCallback } from 'react';
import { getEditableFields, getBranding } from '../templates/designerRenderer';
import { exportAsPNG, exportAsPDF, downloadBlob, downloadPDF, generateFilename } from '../services/exportService';
import { saveDesign, loadAllDesigns, deleteDesign } from '../services/saveService';

export default function ControlPanel({
  templateGroups,
  selectedTemplate,
  onSelectTemplate,
  customizations,
  onCustomizationChange,
  svgElementRef,
}) {
  const [exporting, setExporting] = useState(null);
  const [toast, setToast] = useState(null);
  const [savedDesigns, setSavedDesigns] = useState(loadAllDesigns());

  const showToast = useCallback(function(msg) {
    setToast(msg);
    setTimeout(function() { setToast(null); }, 2500);
  }, []);

  const fields = getEditableFields(selectedTemplate);
  const currentTexts = fields.texts || [];
  const currentColors = fields.colors || [];
  const branding = getBranding();
  const brandColors = branding.colors || {};

  function handleColorChange(colorId, value) {
    var newC = Object.assign({}, customizations);
    newC[colorId] = value;
    onCustomizationChange(newC);
  }

  function handleTextChange(textId, value) {
    var newC = Object.assign({}, customizations);
    newC[textId] = value;
    onCustomizationChange(newC);
  }

  function handleStyleColorClick(color) {
    var newC = Object.assign({}, customizations);
    currentColors.forEach(function(c) { newC[c.id] = color; });
    onCustomizationChange(newC);
  }

  function handleSave() {
    var couple = customizations['Couple Names'] || customizations.couple || '';
    var name = couple ? (selectedTemplate.name + ' - ' + couple) : selectedTemplate.name;
    saveDesign(selectedTemplate.id, name, customizations);
    setSavedDesigns(loadAllDesigns());
    showToast('Design saved!');
  }

  function handleLoadDesign(design) {
    onCustomizationChange(design.customizations);
    showToast('Design loaded!');
  }

  function handleDeleteDesign(id) {
    deleteDesign(id);
    setSavedDesigns(loadAllDesigns());
  }

  var handleExportPNG = async function() {
    if (!svgElementRef) return;
    setExporting('png');
    try {
      var blobData = await exportAsPNG(svgElementRef);
      var coupleName = customizations['Couple Names'] || customizations.couple || 'wedding';
      var filename = generateFilename(selectedTemplate ? selectedTemplate.name : '', coupleName);
      downloadBlob(blobData.blob, filename + '.png');
      showToast('High-res PNG downloaded!');
    } catch (err) {
      console.error('PNG export failed:', err);
      showToast('Export failed - please try again.');
    } finally {
      setExporting(null);
    }
  };

  var handleExportPDF = async function() {
    if (!svgElementRef) return;
    setExporting('pdf');
    try {
      var pdf = await exportAsPDF(svgElementRef);
      var coupleName = customizations['Couple Names'] || customizations.couple || 'wedding';
      var filename = generateFilename(selectedTemplate ? selectedTemplate.name : '', coupleName);
      downloadPDF(pdf, filename + '.pdf');
      showToast('Print-ready PDF downloaded!');
    } catch (err) {
      console.error('PDF export failed:', err);
      showToast('Export failed - please try again.');
    } finally {
      setExporting(null);
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="template-selector">
          <h2>Design Style</h2>
          {templateGroups.map(function(group) {
            return (
              <div key={group.style} style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: '#888', fontWeight: 600, marginBottom: '0.5rem',
                }}>
                  {group.styleName}
                </div>
                {group.templates.map(function(t) {
                  return (
                    <div
                      key={t.id}
                      className={'template-card ' + (selectedTemplate && selectedTemplate.id === t.id ? 'active' : '')}
                      onClick={function() { onSelectTemplate(t); }}
                    >
                      <div className="preview">
                        <div style={{
                          width: '100%', height: '100%', borderRadius: 4,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 22, color: '#d4a574',
                        }}>
                          {t.type === 'Save the Date' ? '\uD83D\uDCC5' :
                           t.type === 'Invitation' ? '\uD83D\uDC8C' :
                           t.type === 'RSVP' ? '\u2709\uFE0F' :
                           t.type === 'Thank You' ? '\uD83C\uDF80' : '\uD83D\uDCC4'}
                        </div>
                      </div>
                      <div className="info">
                        <h3>{t.name}</h3>
                        <p>{t.dimensions} \u00B7 {t.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {selectedTemplate && (
          <>
            <div>
              <h2>Quick Colors</h2>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {Object.entries(brandColors).filter(function(kv) { return !['white', 'charcoal'].includes(kv[0]); }).slice(0, 6).map(function(kv) {
                  var name = kv[0], color = kv[1];
                  return (
                    <button
                      key={name}
                      onClick={function() { handleStyleColorClick(color); }}
                      title={name}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        border: color === '#FFFFFF' ? '2px solid #ddd' : '2px solid transparent',
                        background: color, cursor: 'pointer',
                        transition: 'transform 0.15s',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {currentTexts.length > 0 && (
              <div>
                <h2>Text</h2>
                {currentTexts.map(function(field) {
                  return (
                    <div className="text-group" key={field.id}>
                      <label htmlFor={'text-' + field.id}>{field.label}</label>
                      <textarea
                        id={'text-' + field.id}
                        value={customizations[field.id] || field.defaultValue || ''}
                        onChange={function(e) { handleTextChange(field.id, e.target.value); }}
                        rows={field.defaultValue && field.defaultValue.split('\n').length > 1 ? 3 : 1}
                      />
                      {field.fontFamily && (
                        <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.15rem' }}>
                          {field.fontFamily} \u00B7 {field.fontSize}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {currentColors.length > 0 && (
              <div>
                <h2>Colors</h2>
                {currentColors.map(function(color) {
                  return (
                    <div className="color-group" key={color.id}>
                      <label>{color.label}</label>
                      <div className="color-row">
                        <input
                          type="color"
                          value={customizations[color.id] || color.defaultValue || '#333333'}
                          onChange={function(e) { handleColorChange(color.id, e.target.value); }}
                        />
                        <span className="color-hex">
                          {customizations[color.id] || color.defaultValue}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="export-section">
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>
                  {'\uD83D\uDCBE'} Save Design
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1rem' }}>
              <h2>My Designs</h2>
              <div style={{ fontSize: '0.85rem' }}>
                {savedDesigns.length === 0 ? (
                  <p style={{ color: '#999', fontStyle: 'italic', fontSize: '0.8rem' }}>No saved designs yet.</p>
                ) : (
                  savedDesigns.map(function(d) {
                    return (
                      <div key={d.id} style={{
                        padding: '0.5rem', marginBottom: '0.4rem',
                        background: '#f9f5f0', borderRadius: 6,
                        cursor: 'pointer', transition: 'background 0.15s',
                        border: '1px solid #e8ddd0',
                      }} onClick={function() { handleLoadDesign(d); }}>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{d.templateName}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#999', marginTop: '0.2rem' }}>
                          <span>{new Date(d.savedAt).toLocaleDateString()}</span>
                          <button onClick={function(e) { e.stopPropagation(); handleDeleteDesign(d.id); }}
                            style={{ background: 'none', border: 'none', color: '#c44', cursor: 'pointer', fontSize: '0.7rem' }}
                          >Delete</button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="export-section">
              <h2>Export</h2>
              <button className="btn btn-primary" onClick={handleExportPNG} disabled={exporting !== null}>
                {exporting === 'png' ? 'Exporting\u2026' : '\u2B07 Download High-Res PNG'}
              </button>
              <button className="btn btn-success" onClick={handleExportPDF} disabled={exporting !== null}>
                {exporting === 'pdf' ? 'Exporting\u2026' : '\u2B07 Download Print-Ready PDF'}
              </button>
            </div>
          </>
        )}
      </aside>

      {exporting && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Generating {exporting === 'pdf' ? 'PDF' : 'PNG'}\u2026</p>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}