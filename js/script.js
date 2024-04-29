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

    // Function to parse URL parameters
    const getParameterByName = name => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    // Function to open modal with clicked image
    const openModal = (imageUrl) => {
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('modalImg');

        modal.style.display = "block";
        modalImg.src = imageUrl;

        // Close the modal when the user clicks anywhere outside the modal content
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    };

    // Attach event listeners to images to open modal on click
    const attachImageListeners = () => {
        document.querySelectorAll('.product-image').forEach(image => {
            image.addEventListener('click', () => {
                const imageUrl = image.getAttribute('src');
                openModal(imageUrl);
            });
        });
    };


    // Fetch single product based on URL parameter
    const productId = getParameterByName('productId');
    if (productId) {
        fetchProductById(productId)
            .then(product => {
                const productDetailsContainer = document.getElementById('product-details');
                productDetailsContainer.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.images[0].src}" alt="${product.name}" class="product-image">
                    <p>Description: ${product.description}</p>
                `;
                productDetailsContainer.classList.add('product-details-page');
                
                // Call function to attach listeners after updating DOM
                attachImageListeners();
            });
    } else {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json(); 
            })
            .then(products => {
                const productList = document.getElementById('latest-products');
                const sliderContainer = document.createElement('div');
                sliderContainer.classList.add('slider-container');

                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product-item');
                    productElement.classList.add('product-list-page');

                    const productLink = document.createElement('a');
                    productLink.href = `blog.html?productId=${product.id}`; 
                    productElement.appendChild(productLink); 

                    const productImage = document.createElement('img');
                    productImage.src = product.images[0].src;
                    productImage.alt = product.name;
                    productImage.classList.add('product-image');
                    productLink.appendChild(productImage); 

                    const productDetails = document.createElement('div');
                    productDetails.classList.add('product-details');
                    productDetails.innerHTML = `<h2>${product.name}</h2>`;
                    productElement.appendChild(productDetails); 

                    sliderContainer.appendChild(productElement); 
                });

                productList.appendChild(sliderContainer); 
                $(sliderContainer).slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev"></button>', 
                    nextArrow: '<button type="button" class="slick-next"></button>', 
                });

                // Call function to attach listeners after updating DOM
                attachImageListeners();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
    
});


  
  
  
