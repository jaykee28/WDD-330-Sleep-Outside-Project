import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  async init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderCart();
  }

  renderCart() {
    // Render each item
    const htmlItems = this.cartItems.map(cartItemTemplate).join("");
    this.listElement.innerHTML = htmlItems;

    // Render totals
    this.renderTotals();
  }

  renderTotals() {
  const subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
  const tax = subtotal * 0.1; // Example: 10% tax
  const shipping = this.cartItems.length > 0 ? 15 : 0; // Flat shipping
  const total = subtotal + tax + shipping;

  const totalsHtml = `
    <li class="cart-totals divider">
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax (10%): $${tax.toFixed(2)}</p>
      <p>Shipping: $${shipping.toFixed(2)}</p>
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
      <a href="/checkout/index.html" class="checkout-button">Checkout</a>
    </li>
  `;

  this.listElement.insertAdjacentHTML("beforeend", totalsHtml);
 }
}