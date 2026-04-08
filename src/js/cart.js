import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const listElement = document.querySelector('.product-list');


const cart = new ShoppingCart(listElement);
loadHeaderFooter();
cart.init();