import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs"; // ✅ USE THIS
import ProductDetails from "./ProductDetails.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

// Get product ID from URL
const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
