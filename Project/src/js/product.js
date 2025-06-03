//
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// // Add product to cart functionality
// function addProductToCart(productData) {
//   const cart = getLocalStorage("so-cart") || [];
//   cart.push(productData);
//   setLocalStorage("so-cart", cart);
// }
//
// async function addToCartHandler(e) {
//   const id = e.target.dataset.id;
//   console.log("Add to Cart clicked with ID:", id);
//
//   const productData = await dataSource.findProductById(id);
//   if (!productData) {
//     console.error("Product not found for ID:", id);
//     return;
//   }
//
//   console.log("Product found:", productData);
//   addProductToCart(productData);
// }
//
// // Attach event listener after DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.getElementById("addToCart");
//   if (addBtn) {
//     addBtn.addEventListener("click", addToCartHandler);
//   }
// });
