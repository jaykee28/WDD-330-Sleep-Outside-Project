import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    try {
      // fetch product
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        console.error("Product not found");
        return;
      }

      // render product info
      this.renderProductDetails();

      // add event listener
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    // brand + name
    document.getElementById("productBrand").textContent =
      this.product.Brand;
    document.getElementById("productName").textContent =
      this.product.Name;

    // image
    const img = document.getElementById("productImage");
    img.src = this.product.Image;
    img.alt = this.product.Name;

    // price
    document.getElementById("productPrice").textContent =
      `$${this.product.FinalPrice}`;

    // color (safe access)
    document.getElementById("productColor").textContent =
      this.product.Colors?.[0]?.ColorName || "";

    // description
    document.getElementById("productDescription").innerHTML =
      this.product.DescriptionHtml || "";
  }
}