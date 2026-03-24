import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Product details setup
const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

// Add to cart functionality
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const selectedProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(selectedProduct);
}

// Add listener to all Add to Cart buttons
const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
});