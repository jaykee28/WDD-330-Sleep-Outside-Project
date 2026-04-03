import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const listElement = document.querySelector('.product-list');

// Create cart instance and render
const cart = new ShoppingCart(listElement);
loadHeaderFooter();
cart.init();