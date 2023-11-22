function fetchAndDisplayProducts(url, limit = 6) {
    fetch(url + "?limit=" + limit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productContainer = document.getElementById("productContainer");

            data.items.forEach(product => {
                const productDiv = document.createElement("a");
                productDiv.href = "vorusida.html?id=" + product.id; 
                productDiv.classList.add("product");

                const titleElement = document.createElement("h2");
                titleElement.textContent = product.title;

                const priceElement = document.createElement("p");
                priceElement.textContent = "Price: $" + product.price;

                const descriptionElement = document.createElement("p");
                descriptionElement.classList.add("description");
                descriptionElement.textContent = product.description;

                const typeElement = document.createElement("p");
                typeElement.classList.add("product-type");
                typeElement.textContent = "Category: " + product.category_title;

                const imageElement = document.createElement("img");
                imageElement.src = product.image;
                imageElement.alt = product.title;

                productDiv.appendChild(titleElement);
                productDiv.appendChild(priceElement);
                productDiv.appendChild(descriptionElement);
                productDiv.appendChild(typeElement);
                productDiv.appendChild(imageElement);

                productContainer.appendChild(productDiv);

                
                productDiv.addEventListener("click", function() {
                    window.location.href = productDiv.href;
                });
            });
        })
        .catch(error => console.error("Error:", error));
}


const apiUrl = "https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products";
fetchAndDisplayProducts(apiUrl);


