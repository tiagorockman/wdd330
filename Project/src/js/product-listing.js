import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import loadAlerts from "./alerts.js";

loadAlerts();
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();


// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

//function to handle search
const handleSearch = () => {
     const query = searchInput.value.toLowerCase();
    listing.filterProducts(query);
    searchInput.value = "";
}

searchButton.addEventListener("click", handleSearch);

//On Enter Key
searchInput.addEventListener("keydown", (event) =>{
    if(event.key === "Enter")
        handleSearch();
})