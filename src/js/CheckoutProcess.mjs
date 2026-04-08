import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();

    const zipInput = document.querySelector('input[name="zip"]');
    if (zipInput) {
      zipInput.addEventListener('blur', () => {
        this.calculateOrderTotal();
      });
    }
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0
    );

    const itemCount = this.list.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;

    document.querySelector(`${this.outputSelector} #num-items`).innerText =
      itemCount;
  }

  calculateOrderTotal() {
    const itemCount = this.list.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    this.tax = this.itemTotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).innerText =
      `$${this.tax.toFixed(2)}`;

    document.querySelector(`${this.outputSelector} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;

    document.querySelector(`${this.outputSelector} #order-total`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  // Package cart items for API
  packageItems() {
    return this.list.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: parseFloat(item.FinalPrice),
      quantity: item.quantity || 1,
    }));
  }
  
  async checkout() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: String(formData.get('zip')),
      cardNumber: formData.get('cardNumber'),
      expirationDate: formData.get('expiration'), 
      cardCode: formData.get('code'),             
      items: this.packageItems(),
      orderTotal: this.orderTotal,
      tax: this.tax,
      shipping: this.shipping,
    };

    try {
      const response = await services.checkout(order);
      console.log('SUCCESS:', response);

      alert('Order placed successfully!');
      localStorage.removeItem(this.key);
      window.location.href = '/index.html';
    } catch (error) {
      console.error('CHECKOUT ERROR:', error);
      alert('Checkout failed');
    }
  }
}
