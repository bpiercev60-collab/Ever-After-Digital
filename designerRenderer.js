import { useRef, useEffect, useState } from 'react';
import { renderTemplateToSVG } from '../templates/designerRenderer';

export default function TemplateEditor({ template, customizations }) {
  const svgRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    if (template) {
      setSvgContent(renderTemplateToSVG(template, customizations));
    } else {
      setSvgContent('');
    }
  }, [template, customizations]);

  if (!template) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" /><path d="M9 21V9" />
        </svg>
        <h3>Select a Template</h3>
        <p>Choose a wedding template from the sidebar to customize it.</p>
      </div>
    );
  }

  return (
    <div className="template-wrapper">
      <div
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ lineHeight: 0 }}
      />
    </div>
  );
}

export function getSvgElement(wrapperRef) {
  return wrapperRef?.current?.querySelector('svg') || null;
}
