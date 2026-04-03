// get URL parameter
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// get from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}