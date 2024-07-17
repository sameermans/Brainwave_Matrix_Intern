const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 999.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", category: "electronics", price: 699.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "T-shirt", category: "fashion", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Sofa", category: "home", price: 299.99, image: "https://via.placeholder.com/150" },
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search");

let cart = [];
let filteredProducts = products;

function renderProducts(productsToRender) {
    productList.innerHTML = "";
    productsToRender.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
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

categoryFilter.addEventListener("change", (e) => {
    const category = e.target.value;
    if (category === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    renderProducts(filteredProducts);
});

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = filteredProducts.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filtered);
});

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

renderProducts(products);
