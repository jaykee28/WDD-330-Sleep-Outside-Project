<<<<<<< HEAD
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to all Add to Cart buttons
const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
});
>>>>>>> 4129e2b2ffec697a2d324a8b3ef4ad6d00717968
