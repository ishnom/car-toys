// Cart page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    loadCartItems();
    
    // Load recommended products
    loadRecommendedProducts();
    
    // Apply promo code button
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = document.getElementById('promo-code').value.trim();
            
            if (promoCode === 'DISCOUNT20') {
                // Apply 20% discount
                applyDiscount(0.2);
                showNotification('Promo code applied: 20% discount!');
            } else {
                showNotification('Invalid promo code');
            }
        });
    }
});

// Mock functions for missing dependencies
function showNotification(message) {
    alert(message); // Replace with a proper notification system
}

function getCart() {
    // Replace with actual cart retrieval logic (e.g., from localStorage or server)
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function updateCartQuantity(id, quantity) {
    let cart = getCart();
    cart.forEach(item => {
        if (item.id == id) {
            item.quantity = quantity;
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price, quantity) {
    let cart = getCart();
    let existingItem = cart.find(item => item.id == id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: id, name: name, price: price, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyContainer = document.getElementById('cart-empty');
    const cartSummaryContainer = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        // Show empty cart message
        cartEmptyContainer.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartSummaryContainer.style.display = 'none';
        return;
    }
    
    // Hide empty cart message, show cart items and summary
    cartEmptyContainer.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummaryContainer.style.display = 'block';
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    // Add cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons and remove buttons
    const minusButtons = document.querySelectorAll('.cart-item-quantity .minus');
    const plusButtons = document.querySelectorAll('.cart-item-quantity .plus');
    const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.cart-item-quantity input[data-id="${id}"]`);
            let quantity = parseInt(input.value);
            
            if (quantity > 1) {
                quantity--;
                input.value = quantity;
                updateCartQuantity(id, quantity);
                updateCartDisplay();
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.cart-item-quantity input[data-id="${id}"]`);
            let quantity = parseInt(input.value);
            
            quantity++;
            input.value = quantity;
            updateCartQuantity(id, quantity);
            updateCartDisplay();
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const id = this.getAttribute('data-id');
            let quantity = parseInt(this.value);
            
            if (quantity < 1) {
                quantity = 1;
                this.value = quantity;
            }
            
            updateCartQuantity(id, quantity);
            updateCartDisplay();
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removeFromCart(id);
            loadCartItems();
            updateCartDisplay();
        });
    });
    
    // Update cart summary
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = getCart();
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Update summary
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    // Store cart totals in localStorage for checkout page
    localStorage.setItem('cartTotals', JSON.stringify({
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    }));
}

function applyDiscount(discountRate) {
    const cart = getCart();
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const discountedSubtotal = subtotal - discount;
    const shipping = discountedSubtotal > 100 ? 0 : 10;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + shipping + tax;
    
    // Update summary
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)} (-$${discount.toFixed(2)})`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    // Store cart totals in localStorage for checkout page
    localStorage.setItem('cartTotals', JSON.stringify({
        subtotal: subtotal,
        discount: discount,
        discountedSubtotal: discountedSubtotal,
        shipping: shipping,
        tax: tax,
        total: total
    }));
}

function loadRecommendedProducts() {
    const recommendedProductsContainer = document.getElementById('recommended-products');
    
    // In a real application, you would fetch recommended products from a server
    // For this demo, we'll use static data
    const recommendedProducts = [
        {
            id: 5,
            name: 'Modern Sedan',
            price: 119.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 6,
            name: 'Luxury Coupe',
            price: 189.99,
            image: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 7,
            name: 'Vintage Muscle Car',
            price: 169.99,
            image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 8,
            name: 'Modern Hatchback',
            price: 109.99,
            image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ];
    
    recommendedProducts.forEach(product => {
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
        
        recommendedProductsContainer.appendChild(productCard);
    });
    
    // Add event listeners to recommended product add to cart buttons
    const addToCartButtons = document.querySelectorAll('#recommended-products .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productId, productName, productPrice, 1);
            showNotification(`${productName} added to cart!`);
            loadCartItems();
        });
    });
}