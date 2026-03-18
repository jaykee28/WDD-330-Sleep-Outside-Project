// js/ProductDetails.mjs
import { getParam, getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId; // the ID from URL
    this.dataSource = dataSource; // instance of ProductData
    this.product = {}; // will hold the fetched product
  }

  // Initialize the product details page
  async init() {
    try {
      // Fetch product details
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error('Product not found!');
        return;
      }

      // Render product details into HTML
      this.renderProductDetails();

      // Add event listener to Add to Cart button
      const addButton = document.getElementById('addToCart');
      addButton.dataset.id = this.product.Id; // set the product id
      addButton.addEventListener('click', this.addProductToCart.bind(this));
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }

  // Add the product to the cart
  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    alert(`${this.product.name} added to cart!`);
  }

  // Render product details into HTML
  renderProductDetails() {
    document.getElementById('productBrand').textContent = this.product.brand;
    document.getElementById('productName').textContent = this.product.name;
    const imgEl = document.getElementById('productImage');
    imgEl.src = this.product.image;
    imgEl.alt = this.product.name;
    document.getElementById('productPrice').textContent = `$${this.product.price}`;
    document.getElementById('productColor').textContent = this.product.color;
    document.getElementById('productDescription').textContent = this.product.description;
  }
}