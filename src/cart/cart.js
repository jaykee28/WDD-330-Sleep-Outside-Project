// cart/cart.js
import ShoppingCart from "../js/ShoppingCart.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

const listElement = document.querySelector(".product-list");

// create ShoppingCart instance
const cart = new ShoppingCart(listElement);

// load header/footer templates
loadHeaderFooter();

// render cart items
cart.renderCart();