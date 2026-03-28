// src/js/ShoppingCart.mjs
import { renderWithTemplate, getLocalStorage } from "./utils.mjs";

// template function for each cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <h3>${item.Name}</h3>
      <p>$${item.Price}</p>
    </li>
  `;
}

// ShoppingCart class
export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  renderCart() {
    // get cart items from localStorage
    const cartItems = getLocalStorage("so-cart") || [];

    // convert cart items to HTML
    const html = cartItems.map(cartItemTemplate).join("");

    // render into the page
    renderWithTemplate(html, this.listElement);
  }
}