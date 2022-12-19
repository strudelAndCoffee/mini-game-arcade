export function getCustomProperty(el, prop) {
  return parseFloat(getComputedStyle(el).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(el, prop, val) {
  el.style.setProperty(prop, val);
}

export function incrementCustomProperty(el, prop, inc) {
  setCustomProperty(el, prop, getCustomProperty(el, prop) + inc);
}
