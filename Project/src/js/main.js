import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

//function to handle search
const handleSearch = () => {
     const query = searchInput.value.toLowerCase();
    productList.filterProducts(query);
    searchInput.value = "";
}

searchButton.addEventListener("click", handleSearch);

//On Enter Key
searchInput.addEventListener("keydown", (event) =>{
    if(event.key === "Enter")
        handleSearch();
})