/**
 * Save Design Service - uses localStorage to persist user's customizations.
 * Allows saving, loading, and deleting designs by name.
 * Shared across customization engine and storefront gallery.
 */

var STORAGE_KEY = 'ever-after-designs';

export function saveDesign(templateId, templateName, customizations) {
  var designs = loadAllDesigns();
  var id = 'design_' + Date.now();
  var timestamp = new Date().toISOString();
  var entry = { id: id, templateId: templateId, templateName: templateName || 'Untitled', customizations: Object.assign({}, customizations), savedAt: timestamp };
  designs.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  return entry;
}

export function loadAllDesigns() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function loadDesignById(id) {
  var designs = loadAllDesigns();
  return designs.find(function(d) { return d.id === id; }) || null;
}

export function deleteDesign(id) {
  var designs = loadAllDesigns().filter(function(d) { return d.id !== id; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
}

export function clearAllDesigns() {
  localStorage.removeItem(STORAGE_KEY);
}