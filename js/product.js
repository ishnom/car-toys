// Product page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 1; // Default to product 1 if no ID provided
    
    // In a real application, you would fetch the product data from a server
    // For this demo, we'll use a static product object
    const product = {
        id: productId,
        name: 'Luxury Sports Car',
        price: 129.99,
        category: 'Modern Cars',
        description: 'This premium 1:18 scale luxury sports car toy is meticulously crafted with attention to detail. Features include opening doors, hood, and trunk, as well as realistic interior details. Made from high-quality die-cast metal with plastic components, this collectible model is perfect for enthusiasts and collectors alike.',
        features: [
            'Die-cast metal body with plastic details',
            'Opening doors, hood, and trunk',
            'Detailed interior and dashboard',
            'Rubber tires with realistic tread patterns',
            'Authentic paint finish',
            'Display stand included'
        ],
        images: [
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80&ar=4:3',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80&ar=1:1',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80&ar=16:9'
        ]
    };
    
    // Populate product details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-price').textContent = product.price.toFixed(2);
    document.getElementById('product-description').textContent = product.description;
    
    // Populate features
    const featuresElement = document.getElementById('product-features');
    featuresElement.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresElement.appendChild(li);
    });
    
    // Set main product image
    document.getElementById('main-product-image').src = product.images[0];
    
    // Set add to cart button data
    document.getElementById('add-to-cart-btn').setAttribute('data-id', product.id);
    
    // Thumbnail image functionality
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    thumbnailImages.forEach((thumbnail, index) => {
        // Set thumbnail sources
        if (product.images[index]) {
            thumbnail.src = product.images[index];
        }
        
        thumbnail.addEventListener('click', function() {
            // Update main image
            document.getElementById('main-product-image').src = this.src;
            
            // Update active class
            thumbnailImages.forEach(img => img.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
    
    // Image zoom functionality
    const mainImage = document.querySelector('.main-image');
    const imageZoomModal = document.getElementById('image-zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeModal = document.querySelector('.close-modal');
    
    mainImage.addEventListener('click', function() {
        imageZoomModal.style.display = 'flex';
        zoomedImage.src = document.getElementById('main-product-image').src;
    });
    
    closeModal.addEventListener('click', function() {
        imageZoomModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    imageZoomModal.addEventListener('click', function(e) {
        if (e.target === imageZoomModal) {
            imageZoomModal.style.display = 'none';
        }
    });
    
    // Load related products
    const relatedProductsContainer = document.querySelector('.related-products .products');
    
    // In a real application, you would fetch related products from a server
    // For this demo, we'll use static data
    const relatedProducts = [
        {
            id: 2,
            name: 'Vintage Roadster',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 3,
            name: 'Premium SUV',
            price: 179.99,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 4,
            name: 'Classic Convertible',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ];
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="quick-view">
                    <button class="btn btn-secondary">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            </div>
        `;
        
        relatedProductsContainer.appendChild(productCard);
    });
    
    // Add event listeners to related product add to cart buttons
    const addToCartButtons = document.querySelectorAll('.related-products .add-to-cart');
    
    // Mock addToCart and showNotification functions
    function addToCart(productId, productName, productPrice, quantity) {
        console.log(`Adding ${quantity} of ${productName} (ID: ${productId}) to cart. Price: $${productPrice}`);
        // In a real application, you would update the cart data and potentially redirect to the cart page
    }

    function showNotification(message) {
        console.log(message);
        // In a real application, you would display a user-friendly notification
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productId, productName, productPrice, 1);
            showNotification(`${productName} added to cart!`);
        });
    });
});