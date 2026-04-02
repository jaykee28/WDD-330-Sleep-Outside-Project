import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);

    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    document.getElementById('productBrand').textContent = this.product.Brand;
    document.getElementById('productName').textContent = this.product.Name;

    const img = document.getElementById('productImage');
    img.src = this.product.Image;
    img.alt = this.product.Name;

    document.getElementById('productPrice').textContent = `$${this.product.FinalPrice}`;
    document.getElementById('productDescription').innerHTML = this.product.DescriptionHtml;
  }
}