/**
 * Designer Template Loader & Layer-Based SVG Renderer
 *
 * Loads template and branding data dynamically from the shared directory
 * at runtime via fetch(). This means the Lead Designer can update
 * /home/team/shared/templates/templates.json and /home/team/shared/branding/branding.json
 * and the app picks up changes on the next page load — no rebuild needed.
 *
 * Usage:
 *   import { initDesignerData, renderTemplateToSVG, TEMPLATES, ... } from './designerRenderer'
 *
 *   // Call once before using any template functions
 *   await initDesignerData()
 */

// ── Module-level state (populated by initDesignerData) ─

let _branding = null;
let _templates = [];

// ── Inline SVG Assets ──────────────────────────────────
const ASSETS = {
  gold_border: `<svg width="500" height="700" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="480" height="680" stroke="##COLOR##" stroke-width="2"/>
  </svg>`,
  gold_border_thick: `<svg width="500" height="700" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="470" height="670" stroke="##COLOR##" stroke-width="5"/>
  </svg>`,
};

const STYLE_NAMES = {
  classic_elegance: 'Classic Elegance',
  modern_minimalist: 'Modern Minimalist',
  wildflower_boho: 'Wildflower Boho',
  classic_noir: 'Classic Noir',
};

// ── Initialization ──────────────────────────────────

/**
 * Fetch branding and templates from the shared directory at runtime.
 * Call once at app startup before using template functions.
 */
export async function initDesignerData() {
  const [brandingResp, templatesResp] = await Promise.all([
    fetch('/shared-data/branding.json'),
    fetch('/shared-data/templates.json'),
  ]);

  if (!brandingResp.ok) throw new Error(`Failed to load branding: ${brandingResp.status}`);
  if (!templatesResp.ok) throw new Error(`Failed to load templates: ${templatesResp.status}`);

  _branding = await brandingResp.json();
  const data = await templatesResp.json();
  _templates = data.templates || [];
}

// ── Getters (safe — return empty defaults if not loaded) ─

export function getBranding() {
  return _branding || {
    brand_name: 'Ever After Digital',
    colors: {},
    typography: {},
    design_styles: {},
  };
}

export const BRANDING = new Proxy({}, {
  get(_, prop) {
    return _branding?.[prop];
  },
});

export function getTemplates() {
  return _templates || [];
}

export const TEMPLATES = new Proxy([], {
  get(target, prop) {
    if (prop === 'length') return _templates?.length || 0;
    if (prop === Symbol.iterator) return function* () { yield* _templates; };
    if (typeof prop === 'string' && !isNaN(prop)) return _templates?.[parseInt(prop)];
    if (prop === 'map') return (fn) => (_templates || []).map(fn);
    if (prop === 'forEach') return (fn) => (_templates || []).forEach(fn);
    if (prop === 'filter') return (fn) => (_templates || []).filter(fn);
    if (prop === 'find') return (fn) => (_templates || []).find(fn);
    return target[prop];
  },
});

export function isDataLoaded() {
  return _branding !== null && _templates.length > 0;
}

// ── Helpers ────────────────────────────────────────

function getStyleFromId(id) {
  if (id?.includes('classic') && !id?.includes('noir')) return 'classic_elegance';
  if (id?.includes('minimalist')) return 'modern_minimalist';
  if (id?.includes('boho')) return 'wildflower_boho';
  if (id?.includes('noir')) return 'classic_noir';
  return 'classic_elegance';
}

export function getStylePalette(templateId) {
  const style = getStyleFromId(templateId);
  const styleData = _branding?.design_styles?.[style];
  return {
    styleName: STYLE_NAMES[style] || style,
    styleKey: style,
    palette: styleData?.colors || [],
    fonts: styleData?.fonts || [],
  };
}

function getCanvasSize(dimensions) {
  const match = dimensions?.match(/(\d+\.?\d*)\s*x\s*(\d+\.?\d*)/i);
  if (match) {
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    return { width: w * 100, height: h * 100 };
  }
  return { width: 500, height: 700 };
}

function getFontsUrl(template) {
  if (!template?.layers) return '';
  const families = new Set();
  template.layers.forEach((layer) => {
    if (layer.font_family) families.add(layer.font_family);
  });
  if (families.size === 0) return '';
  const names = Array.from(families)
    .map((f) => f.replace(/\s+/g, '+'))
    .join('|');
  return `https://fonts.googleapis.com/css2?family=${names}:wght@300;400;600;700&display=swap`;
}

function parsePosition(pos, vbW, vbH) {
  let x = 0, y = 0;
  if (pos) {
    if (pos.x === 'center') x = vbW / 2;
    else if (typeof pos.x === 'number') x = pos.x;
    else if (typeof pos.x === 'string' && pos.x.endsWith('%'))
      x = (parseFloat(pos.x) / 100) * vbW;
    else x = parseFloat(pos.x) || 0;

    if (pos.y === 'center') y = vbH / 2;
    else if (typeof pos.y === 'number') y = pos.y;
    else if (typeof pos.y === 'string' && pos.y.endsWith('%'))
      y = (parseFloat(pos.y) / 100) * vbH;
    else y = parseFloat(pos.y) || 0;
  }
  return { x, y };
}

function getAssetKey(src) {
  const parts = src.replace(/\\/g, '/').split('/');
  const file = parts[parts.length - 1];
  return file.replace(/\.svg$/i, '');
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ── SVG Rendering ──────────────────────────────────

export function renderTemplateToSVG(template, customizations = {}) {
  if (!template) return '';
  const { width, height } = getCanvasSize(template.dimensions);
  const vbW = width, vbH = height;
  const c = customizations || {};
  const fontsUrl = getFontsUrl(template);

  let svgContent = '';
  if (fontsUrl) {
    svgContent += `
    <defs>
      <style>@import url('${fontsUrl}');</style>
    </defs>`;
  }

  template.layers?.forEach((layer, index) => {
    const layerName = layer.name || `layer-${index}`;
    const editable = layer.editable !== false;

    switch (layer.type) {
      case 'color': {
        const color = c[layerName] || layer.default_value || '#FFFFFF';
        svgContent += `
    <rect x="0" y="0" width="${vbW}" height="${vbH}" fill="${color}" ${editable ? `data-edit-id="${layerName}"` : ''}/>`;
        break;
      }

      case 'text': {
        const text = c[layerName] || layer.value || '';
        const fontFamily = layer.font_family || 'serif';
        const fontSize = layer.font_size || '16px';
        const textColor = layer.color || '#333333';
        const pos = parsePosition(layer.position, vbW, vbH);
        const lines = text.split('\n');
        const lineHeight = parseInt(fontSize) * 1.4;
        const totalHeight = lines.length * lineHeight;
        const startY = pos.y - totalHeight / 2 + lineHeight * 0.8;

        lines.forEach((line, li) => {
          svgContent += `
    <text x="${pos.x}" y="${startY + li * lineHeight}" text-anchor="middle"
      font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}"
      ${editable ? `data-edit-id="${layerName}"` : ''}>${escapeXml(line)}</text>`;
        });
        break;
      }

      case 'image/svg': {
        const assetKey = getAssetKey(layer.src);
        const overlayColor = c[layerName] || layer.color_overlay || '#D4AF37';
        let assetSvg = ASSETS[assetKey] || '';
        if (assetSvg) {
          assetSvg = assetSvg.replace(/##COLOR##/g, overlayColor);
          svgContent += `
    <g ${editable ? `data-edit-id="${layerName}"` : ''} transform="translate(${vbW / 2 - 250}, ${vbH / 2 - 350})">
      ${assetSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
    </g>`;
        }
        break;
      }

      default:
        break;
    }
  });

  const styleInfo = getStylePalette(template.id);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${vbW}" height="${vbH}" data-style="${styleInfo.styleKey}">
    ${svgContent}
  </svg>`;
}

// ── Data Access ────────────────────────────────────

export function getTemplateById(id) {
  return _templates?.find((t) => t.id === id) || null;
}

export function getTemplatesByStyle() {
  const groups = {};
  (_templates || []).forEach((t) => {
    const style = getStyleFromId(t.id);
    const styleName = STYLE_NAMES[style] || style;
    if (!groups[styleName]) {
      groups[styleName] = { style, styleName, templates: [] };
    }
    groups[styleName].templates.push(t);
  });
  return Object.values(groups);
}

export function getEditableFields(template) {
  const texts = [];
  const colors = [];
  template?.layers?.forEach((layer) => {
    if (layer.editable === false) return;
    if (layer.type === 'text') {
      texts.push({
        id: layer.name,
        label: layer.name,
        defaultValue: layer.value,
        fontFamily: layer.font_family,
        fontSize: layer.font_size,
        color: layer.color,
      });
    } else if (layer.type === 'color') {
      colors.push({
        id: layer.name,
        label: layer.name,
        defaultValue: layer.default_value,
      });
    } else if (layer.type === 'image/svg') {
      colors.push({
        id: layer.name,
        label: layer.name + ' Color',
        defaultValue: layer.color_overlay || '#D4AF37',
      });
    }
  });
  return { texts, colors };
}

export function getDefaultCustomizations(template) {
  const defaults = {};
  template?.layers?.forEach((layer) => {
    if (layer.editable === false) return;
    if (layer.type === 'text') {
      defaults[layer.name] = layer.value;
    } else if (layer.type === 'color') {
      defaults[layer.name] = layer.default_value;
    } else if (layer.type === 'image/svg') {
      defaults[layer.name] = layer.color_overlay || '#D4AF37';
    }
  });
  return defaults;
}
