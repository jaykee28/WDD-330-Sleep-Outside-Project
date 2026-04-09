// get URL parameter
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// localStorage helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// render list templates (for products, cart, etc.)
export function renderWithTemplate(templateFn, parentElement, data) {
  const html = data.map(templateFn).join('');
  parentElement.innerHTML = html;
}

// load external HTML file (header/footer)
export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}


// load header and footer dynamically

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');

  if (headerElement) {
    headerElement.innerHTML = headerTemplate;
  }

  if (footerElement) {
    footerElement.innerHTML = footerTemplate;
  }
}

export function alertMessage(message, scroll = true) {
  // create alert container
  const alert = document.createElement('div');
  alert.classList.add('alert');

  // add content (message + close button)
  alert.innerHTML = `
    <span>${message}</span>
    <button>X</button>
  `;

  // close alert when X is clicked
  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      this.remove();
    }
  });

  // add to top of page
  const main = document.querySelector('main');
  main.prepend(alert);

  // scroll to top so user sees it
  if (scroll) {
    window.scrollTo(0, 0);
  }
}