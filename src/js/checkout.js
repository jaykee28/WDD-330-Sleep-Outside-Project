import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';


loadHeaderFooter();

// create checkout instance
const checkout = new CheckoutProcess('so-cart', '#order-summary');
checkout.init();

document
  .getElementById('checkoutForm')
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;

    // check if form is valid
    if (!form.checkValidity()) {
      form.reportValidity(); // show browser messages
      return; // stop here
    }

    // only runs if valid
    checkout.checkout();
  });