
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// load header + footer
loadHeaderFooter();

// get category from URL
const category = getParam("category") || "tents";

// create data source
const dataSource = new ExternalServices();

// get where products will render
const listElement = document.querySelector(".product-list");

// create product list
const myList = new ProductList(category, dataSource, listElement);

// initialize
myList.init();