import { renderWithTemplate } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

// Template for a single product card
function productCardTemplate(product) {
  // Use PrimaryMedium image for listing cards
  const imageSrc = product.PrimaryMedium
    ? `${baseURL}${product.PrimaryMedium}`
    : product.Image.startsWith("http")
    ? product.Image
    : `${baseURL}${product.Image}`;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${imageSrc}" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.Price}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;       
    this.dataSource = dataSource;   
    this.listElement = listElement; 
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
  }

  renderList(products) {
    const htmlString = products.map(productCardTemplate).join("");
    renderWithTemplate(htmlString, this.listElement);
  }
}