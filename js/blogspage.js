import { BASE_URL } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = `${BASE_URL}wc/store/products`;

    // Function to fetch a single product by ID
    const fetchProductById = productId => {
        const apiUrl = `${BASE_URL}wc/store/products/${productId}`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    };
 
 // Fetch data from the API to display product list
 fetch(apiUrl)
 .then(response => {
     // Check if response is successful
     if (!response.ok) {
         throw new Error('Failed to fetch products');
     }
     return response.json(); // response data as JSON
 })
 .then(products => {
     // Process the fetched products
     const productList = document.getElementById('blogposts');
 
     products.forEach(product => {
         // Create a clickable product element
         const productElement = document.createElement('div');
         productElement.classList.add('product-item');
         
         // Create anchor element with dynamic product ID
         const productLink = document.createElement('a');
         productLink.href = `blog.html?productId=${product.id}`; // Link to product details with dynamic product ID
         productElement.appendChild(productLink); // Append anchor to product container
 
         // Create image element inside the anchor
         const productImage = document.createElement('img');
         productImage.src = product.images[0].src; //
         productImage.alt = product.name;
         productImage.classList.add('product-image');
         productLink.appendChild(productImage); // Append image to anchor
 
         // Create product details
         const productDetails = document.createElement('div');
         productDetails.classList.add('product-details');
         productDetails.innerHTML = `
             <h2>${product.name}</h2>
         `;
         productElement.appendChild(productDetails); // Append product details to product container
 
         productList.appendChild(productElement); // Append product container to product list
     });
 })
 .catch(error => {
     console.error('Error fetching products:', error);
 });
});