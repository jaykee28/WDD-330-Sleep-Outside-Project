// checkout.js
import { getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

const checkout = new CheckoutProcess('so-cart', '#order-summary');
checkout.init();

// Recalculate totals after the user fills in the zip code
const zipInput = document.querySelector('#zip');
if (zipInput) {
  zipInput.addEventListener('input', () => {
    checkout.calculateOrderTotal();
  });
}
// DOM elements
const form = document.getElementById('checkoutForm');
const summaryList = document.querySelector('.summary-list');

// TAX and SHIPPING constants
const TAX_RATE = 0.08; // 8%
const SHIPPING_ESTIMATE = 10.0; // flat rate shipping

// Get cart from localStorage
const cartItems = getLocalStorage('so-cart') || [];

// Calculate totals
function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_ESTIMATE;
  return { subtotal, tax, shipping: SHIPPING_ESTIMATE, total };
}

// Render order summary
function renderSummary() {
  const { subtotal, tax, shipping, total } = calculateTotals(cartItems);

  summaryList.innerHTML = `
    <li>Subtotal: $${subtotal.toFixed(2)}</li>
    <li>Tax (8%): $${tax.toFixed(2)}</li>
    <li>Shipping: $${shipping.toFixed(2)}</li>
    <li><strong>Total: $${total.toFixed(2)}</strong></li>
  `;
}

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop actual submission for now

  // Simple validation: check if all fields are filled
  const inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert('Please fill out all fields.');
      input.focus();
      return;
    }
  }

  // Here you would normally send data to the server
  alert('Order placed successfully!');
  // Clear cart if you want
  localStorage.removeItem('so-cart');
  window.location.href = '/index.html'; // redirect back home
});

// Initial render
renderSummary();