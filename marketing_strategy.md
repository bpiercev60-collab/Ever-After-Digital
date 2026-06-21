import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export Service — handles high-res PNG and print-ready PDF export
 * of the SVG template with all customizations applied.
 */

/**
 * Captures the SVG element as a high-resolution PNG blob
 */
export async function exportAsPNG(svgElement, scale = 3) {
  if (!svgElement) throw new Error('No SVG element to export');

  // Clone the SVG to avoid mutating the live DOM
  const clone = svgElement.cloneNode(true);
  
  // Ensure the clone has explicit sizing and white background
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 600 800';
  const [, , vbW, vbH] = viewBox.split(/\s+/).map(Number);
  const width = svgElement.getAttribute('width') || vbW || 600;
  const height = svgElement.getAttribute('height') || vbH || 800;

  // Create a wrapper div for rendering
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.style.width = `${width * scale}px`;
  wrapper.style.height = `${height * scale}px`;
  wrapper.style.background = '#ffffff';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Scale the SVG
  clone.setAttribute('width', String(width * scale));
  clone.setAttribute('height', String(height * scale));
  clone.style.width = `${width * scale}px`;
  clone.style.height = `${height * scale}px`;

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 1, // We already scaled the SVG
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: width * scale,
      height: height * scale,
    });

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return { blob, canvas, width: width * scale, height: height * scale };
  } finally {
    document.body.removeChild(wrapper);
  }
}

/**
 * Exports the SVG as a print-ready PDF
 * Uses the high-res PNG capture and embeds it into a PDF at 300 DPI
 */
export async function exportAsPDF(svgElement) {
  const { blob, width, height } = await exportAsPNG(svgElement, 3);

  // Convert PNG dimensions to PDF at 300 DPI
  // At 300 DPI, 1 inch = 300px
  const pdfWidth = width / 300; // inches
  const pdfHeight = height / 300; // inches

  // Create PDF in mm (1 inch = 25.4 mm)
  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [pdfWidth * 25.4, pdfHeight * 25.4],
  });

  const imageUrl = URL.createObjectURL(blob);
  
  try {
    pdf.addImage(imageUrl, 'PNG', 0, 0, pdfWidth * 25.4, pdfHeight * 25.4);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }

  return pdf;
}

/**
 * Downloads a file from a blob or data URL
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.className = 'download-link';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a jsPDF instance
 */
export function downloadPDF(pdf, filename) {
  pdf.save(filename);
}

/**
 * Generates a safe filename from the template name and couple names
 */
export function generateFilename(templateName, coupleNames) {
  const safeCouple = (coupleNames || 'template')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const safeTemplate = (templateName || 'custom')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${safeCouple}-${safeTemplate}`;
}