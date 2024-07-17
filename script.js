// Product data
const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 999.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Smartphone", category: "electronics", price: 699.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "T-shirt", category: "fashion", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Sofa", category: "home", price: 299.99, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Headphones", category: "electronics", price: 149.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Running Shoes", category: "fashion", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "Coffee Maker", category: "home", price: 79.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Smartwatch", category: "electronics", price: 199.99, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");
const applyPriceFilter = document.getElementById("apply-price-filter");
const pagination = document.getElementById("pagination");

// State
let cart = [];
let filteredProducts = products;
let currentPage = 1;
const productsPerPage = 8;

// Functions
function renderProducts(productsToRender) {
    productList.innerHTML = "";
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = productsToRender.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });

    renderPagination(productsToRender.length);
}

function renderPagination(totalProducts) {
    const pageCount = Math.ceil(totalProducts / productsPerPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderProducts(filteredProducts);
        });
        pagination.appendChild(pageButton);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function filterProducts() {
    const category = categoryFilter.value;
    const query = searchInput.value.toLowerCase();
    const min = parseFloat(minPrice.value) || 0;
    const max = parseFloat(maxPrice.value) || Infinity;

    filteredProducts = products.filter(product => 
        (category === "all" || product.category === category) &&
        product.name.toLowerCase().includes(query) &&
        product.price >= min && product.price <= max
    );

    currentPage = 1;
    renderProducts(filteredProducts);
}

// Event listeners
categoryFilter.addEventListener("change", filterProducts);
searchBtn.addEventListener("click", filterProducts);
applyPriceFilter.addEventListener("click", filterProducts);

checkoutBtn.addEventListener("click", () => {
    checkoutSection.style.display = "block";
});

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    cart = [];
    updateCart();
    checkoutSection.style.display = "none";
    checkoutForm.reset();
});

// Initialize
function init() {
    // Populate category filter
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });

    renderProducts(products);
    updateCart();
}

init();
