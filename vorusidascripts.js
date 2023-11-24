function fetchProductDetails(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function fetchRelatedProducts(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById("product-details");

    const titleElement = document.createElement("h1");
    titleElement.textContent = product.title;

    const priceElement = document.createElement("p");
    priceElement.textContent = "Price: $" + product.price;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;

    const typeElement = document.createElement("p");
    typeElement.classList.add("product-type");
    typeElement.textContent = "Category: " + product.category_title;

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = product.title;

    productDetailsContainer.appendChild(titleElement);
    productDetailsContainer.appendChild(priceElement);
    productDetailsContainer.appendChild(descriptionElement);
    productDetailsContainer.appendChild(typeElement);
    productDetailsContainer.appendChild(imageElement);

    return product.category_id; // Return the category ID for fetching related products
}

function displayRelatedProducts(relatedProducts) {
    const relatedProductsContainer = document.getElementsByClassName("related-products");

    relatedProducts.forEach(product => {
        const relatedProductDiv = document.createElement("a");
        relatedProductDiv.href = "vorusida.html?id=" + product.id; // Link to the new page with the related product ID
        relatedProductDiv.classList.add("related-product");

        const titleElement = document.createElement("h2");
        titleElement.textContent = product.title;

        const priceElement = document.createElement("p");
        priceElement.textContent = "Price: $" + product.price;

        const typeElement = document.createElement("p");
        typeElement.classList.add("product-type");
        typeElement.textContent = "Category: " + product.category_title;

        const imageElement = document.createElement("img");
        imageElement.src = product.image;
        imageElement.alt = product.title;

        relatedProductDiv.appendChild(titleElement);
        relatedProductDiv.appendChild(priceElement);
        relatedProductDiv.appendChild(typeElement);
        relatedProductDiv.appendChild(imageElement);

        relatedProductsContainer.appendChild(relatedProductDiv);

        // Add click event listener to navigate to the new page on click
        relatedProductDiv.addEventListener("click", function() {
            window.location.href = relatedProductDiv.href;
        });
    });
}

// Extract product ID from the URL
const productId = new URLSearchParams(window.location.search).get("id");

// Replace the URL with the actual URL of your JSON data
const apiUrl = "https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products";
const productUrl = `${apiUrl}/${productId}`;
const relatedProductsUrl = `${apiUrl}?limit=3&category=`; // The category will be dynamically added

fetchProductDetails(productUrl)
    .then(product => {
        const categoryId = displayProductDetails(product);
        return fetchRelatedProducts(relatedProductsUrl + categoryId);
    })
    .then(relatedProducts => {
        displayRelatedProducts(relatedProducts.items);
    })
    .catch(error => console.error("Error:", error));