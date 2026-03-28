import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

// Get product ID from URL
const productId = getParam("product");

const productTitleEl = document.querySelector("#product-title");
const productImageEl = document.querySelector(".product-image");
const productBrandEl = document.querySelector("#product-brand");
const productPriceEl = document.querySelector("#product-price");
const productDescEl = document.querySelector("#product-description");
const addToCartBtn = document.querySelector("[data-add-to-cart]");

const dataSource = new ProductData();

async function init() {
  if (!productId) return;

  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      productTitleEl.textContent = "Product Not Found";
      return;
    }

    // Render product info
    productTitleEl.textContent = product.Name;
    productBrandEl.textContent = product.Brand;
    productPriceEl.textContent = `$${product.Price}`;
    productDescEl.textContent = product.Description || "";

    const imgSrc = product.PrimaryLarge
      ? `${baseURL}${product.PrimaryLarge}`
      : product.Image.startsWith("http")
      ? product.Image
      : `${baseURL}${product.Image}`;

    productImageEl.setAttribute("src", imgSrc);
    productImageEl.setAttribute("alt", `Image of ${product.Name}`);

    if (addToCartBtn) {
      addToCartBtn.dataset.id = product.Id;
      addToCartBtn.addEventListener("click", () => addProductToCart(product));
    }
  } catch (err) {
    console.error("Error loading product:", err);
    productTitleEl.textContent = "Error loading product";
  }
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  alert(`${product.Name} added to cart!`);
}

init();