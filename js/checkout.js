// Checkout page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items for checkout
    loadCheckoutItems();
    
    // Form navigation
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStep = currentStep.nextElementSibling;
            
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                currentStep.classList.add('hidden');
                nextStep.classList.remove('hidden');
                
                // Update progress indicator
                const currentStepIndex = Array.from(formSteps).indexOf(currentStep);
                progressSteps[currentStepIndex + 1].classList.add('active');
                
                // If moving to review step, populate review data
                if (nextStep.id === 'review-step') {
                    populateReviewData();
                }
            }
        });
    });
    
    prevStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;
            
            currentStep.classList.add('hidden');
            prevStep.classList.remove('hidden');
            
            // Update progress indicator
            const currentStepIndex = Array.from(formSteps).indexOf(currentStep);
            progressSteps[currentStepIndex].classList.remove('active');
        });
    });
    
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const paypalForm = document.getElementById('paypal-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardForm.classList.remove('hidden');
                paypalForm.classList.add('hidden');
            } else if (this.value === 'paypal') {
                creditCardForm.classList.add('hidden');
                paypalForm.classList.remove('hidden');
            }
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to your server
        // For this demo, we'll just show a success message
        
        // Clear cart
        localStorage.removeItem('cart');
        localStorage.removeItem('cartTotals');
        
        // Redirect to success page (or show success message)
        window.location.href = 'index.html?checkout=success';
    });
});

// Mock getCart function (replace with your actual implementation)
function getCart() {
    // This is a placeholder. Replace with your actual cart retrieval logic.
    // For example, you might fetch it from localStorage or a server-side API.
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Mock showNotification function (replace with your actual implementation)
function showNotification(message) {
    // This is a placeholder. Replace with your actual notification logic.
    alert(message); // Or use a more sophisticated notification library
}

function loadCheckoutItems() {
    const cart = getCart();
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    // Clear checkout items container
    checkoutItemsContainer.innerHTML = '';
    
    // Add checkout items
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        
        checkoutItem.innerHTML = `
            <div class="checkout-item-details">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        
        checkoutItemsContainer.appendChild(checkoutItem);
    });
    
    // Get cart totals from localStorage
    const cartTotals = JSON.parse(localStorage.getItem('cartTotals')) || {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    };
    
    // Update summary
    document.getElementById('checkout-subtotal').textContent = `$${cartTotals.subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = cartTotals.shipping === 0 ? 'Free' : `$${cartTotals.shipping.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${cartTotals.tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${cartTotals.total.toFixed(2)}`;
}

function validateStep(step) {
    // Get all required inputs in the current step
    const requiredInputs = step.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields');
    }
    
    return isValid;
}

function populateReviewData() {
    // Shipping information
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const phone = document.getElementById('phone').value;
    
    const shippingReview = document.getElementById('shipping-review');
    shippingReview.innerHTML = `
        <p>${firstName} ${lastName}</p>
        <p>${email}</p>
        <p>${address}</p>
        <p>${city}, ${state} ${zip}</p>
        <p>${country}</p>
        <p>${phone}</p>
    `;
    
    // Payment information
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const paymentReview = document.getElementById('payment-review');
    
    if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const maskedCardNumber = '**** **** **** ' + cardNumber.slice(-4);
        
        paymentReview.innerHTML = `
            <p>Credit Card</p>
            <p>${maskedCardNumber}</p>
            <p>${cardName}</p>
        `;
    } else if (paymentMethod === 'paypal') {
        paymentReview.innerHTML = `
            <p>PayPal</p>
            <p>${email}</p>
        `;
    }
    
    // Order items
    const cart = getCart();
    const orderItemsReview = document.getElementById('order-items-review');
    orderItemsReview.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item-review';
        
        orderItem.innerHTML = `
            <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        
        orderItemsReview.appendChild(orderItem);
    });
    
    // Get cart totals from localStorage
    const cartTotals = JSON.parse(localStorage.getItem('cartTotals')) || {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    };
    
    // Add totals to order items review
    const totalsReview = document.createElement('div');
    totalsReview.className = 'order-totals-review';
    
    totalsReview.innerHTML = `
        <p>Subtotal: $${cartTotals.subtotal.toFixed(2)}</p>
        <p>Shipping: ${cartTotals.shipping === 0 ? 'Free' : '$' + cartTotals.shipping.toFixed(2)}</p>
        <p>Tax: $${cartTotals.tax.toFixed(2)}</p>
        <p><strong>Total: $${cartTotals.total.toFixed(2)}</strong></p>
    `;
    
    orderItemsReview.appendChild(totalsReview);
}