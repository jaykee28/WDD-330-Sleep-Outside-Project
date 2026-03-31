// CheckoutProcess.mjs
import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key; // the key for your cart in localStorage
    this.outputSelector = outputSelector; // selector for order summary container
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    // Load cart from localStorage
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // Sum up the item prices
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Display subtotal and number of items
    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemsEl = document.querySelector(`${this.outputSelector} #num-items`);
    if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (itemsEl) itemsEl.innerText = this.list.length;
  }

  calculateOrderTotal() {
    // Tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 for first item + $2 for each additional item
    this.shipping = this.list.length > 0 ? 10 + 2 * (this.list.length - 1) : 0;

    // Total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const totalEl = document.querySelector(`${this.outputSelector} #order-total`);

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}