import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';


loadHeaderFooter();

// create checkout instance
const checkout = new CheckoutProcess('so-cart', '#order-summary');
checkout.init();

// form submission
document
  .getElementById('checkoutForm')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    checkout.checkout(); 
  });