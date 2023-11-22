const apiUrl = "https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products";
const productsContainer = document.getElementById("productContainer");
const nextPageButton = document.getElementById("nextPage");
let offset = 0;


function fetchProducts(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function displayProducts(products) {
    // Clear existing products
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.href = "vorusida.html?id=" + product.id; 
        productDiv.classList.add("product");

        const titleElement = document.createElement("h2");
        titleElement.textContent = product.title;

        const priceElement = document.createElement("p");
        priceElement.textContent = "Price: $" + product.price;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = product.description;

        const typeElement = document.createElement("p");
        typeElement.textContent = "Category: " + product.category_title;

        const imageElement = document.createElement("img");
        imageElement.src = product.image;
        imageElement.alt = product.title;

        productDiv.appendChild(titleElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(descriptionElement);
        productDiv.appendChild(typeElement);
        productDiv.appendChild(imageElement);

        productsContainer.appendChild(productDiv);

        productDiv.addEventListener("click", function() {
            window.location.href = productDiv.href;
        });
    });
}

function nextPage() {
    offset += 10;
    const nextUrl = `${apiUrl}?offset=${offset}&limit=10`;

    fetchProducts(nextUrl)
        .then(products => {
            displayProducts(products.items);
            window.scrollTo(0, 0); // Scroll to the top of the page
        })
        .catch(error => console.error("Error:", error));
}

nextPageButton.addEventListener("click", nextPage);

// Initial load
fetchProducts(apiUrl)
    .then(products => {
        displayProducts(products.items);
    })
    .catch(error => console.error("Error:", error));s