// Shop page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Product data (in a real application, this would come from a server)
    const products = [
        {
            id: 1,
            name: 'Luxury Sports Car',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'modern'
        },
        {
            id: 2,
            name: 'Vintage Roadster',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'classic'
        },
        {
            id: 3,
            name: 'Premium SUV',
            price: 179.99,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'premium'
        },
        {
            id: 4,
            name: 'Classic Convertible',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'classic'
        },
        {
            id: 5,
            name: 'Modern Sedan',
            price: 119.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'modern'
        },
        {
            id: 6,
            name: 'Luxury Coupe',
            price: 189.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'premium'
        },
        {
            id: 7,
            name: 'Vintage Muscle Car',
            price: 169.99,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'classic'
        },
        {
            id: 8,
            name: 'Modern Hatchback',
            price: 109.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'modern'
        },
        {
            id: 9,
            name: 'Premium Limousine',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'premium'
        },
        {
            id: 10,
            name: 'Classic Pickup Truck',
            price: 139.99,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'classic'
        },
        {
            id: 11,
            name: 'Modern Electric Car',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'modern'
        },
        {
            id: 12,
            name: 'Premium Racing Car',
            price: 229.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category: 'premium'
        }
    ];

    // Display products
    const productsGrid = document.getElementById('products-grid');
    const productCountElement = document.getElementById('product-count');
    
    // Mock addToCart and showNotification functions for demonstration
    function addToCart(productId, productName, productPrice, quantity) {
        console.log(`Added to cart: ${productName} (ID: ${productId}), Quantity: ${quantity}, Price: $${productPrice}`);
        // In a real application, this would update the cart data
    }

    function showNotification(message) {
        alert(message); // Replace with a more user-friendly notification
    }
    
    function displayProducts(productsToDisplay) {
        productsGrid.innerHTML = '';
        
        productsToDisplay.forEach(product => {
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
            
            productsGrid.appendChild(productCard);
        });
        
        // Update product count
        productCountElement.textContent = productsToDisplay.length;
        
        // Add event listeners to new add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const productName = this.getAttribute('data-name');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                
                addToCart(productId, productName, productPrice, 1);
                showNotification(`${productName} added to cart!`);
            });
        });
    }
    
    // Initial display
    displayProducts(products);
    
    // Filter functionality
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const sortSelect = document.getElementById('sort');
    
    function filterProducts() {
        // Get selected categories
        const selectedCategories = [];
        categoryFilters.forEach(filter => {
            if (filter.checked) {
                selectedCategories.push(filter.value);
            }
        });
        
        // Get price range
        const maxPrice = parseInt(priceRange.value);
        
        // Filter products
        let filteredProducts = products;
        
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
        }
        
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        
        // Sort products
        const sortValue = sortSelect.value;
        
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Default is 'featured', no sorting needed
                break;
        }
        
        // Display filtered products
        displayProducts(filteredProducts);
    }
    
    // Add event listeners for filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
    
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `$${this.value}`;
        filterProducts();
    });
    
    sortSelect.addEventListener('change', filterProducts);
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.addEventListener('click', function() {
        // In a real application, this would load more products from the server
        showNotification('No more products to load');
    });
    
    // Check URL parameters for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        const categoryCheckbox = document.getElementById(categoryParam);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            filterProducts();
        }
    }
});