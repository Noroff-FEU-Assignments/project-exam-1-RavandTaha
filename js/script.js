document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://musclegymnation.local/wp-json/wc/store/products';

    // Function to fetch a single product by ID
    const fetchProductById = productId => {
        const apiUrl = `http://musclegymnation.local/wp-json/wc/store/products/${productId}`;

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
                    productLink.href = `product.html?productId=${product.id}`; 
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
        productLink.href = `product.html?productId=${product.id}`; // Link to product details with dynamic product ID
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

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
  
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
  
    let isValid = true;
  
    if (name.length <= 5) {
      nameError.textContent = 'Name should be more than 5 characters long';
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      emailError.textContent = 'Invalid email address';
      isValid = false;
    }
  
    if (subject.length <= 15) {
      subjectError.textContent = 'Subject should be more than 15 characters long';
      isValid = false;
    }
  
    if (message.length <= 25) {
      messageError.textContent = 'Message content should be more than 25 characters long';
      isValid = false;
    }
  
    if (isValid) {
      // Submit the form
      document.getElementById('contactForm').submit();
    }
  }
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  
  
