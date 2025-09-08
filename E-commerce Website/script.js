// Sample products data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality audio with noise cancellation",
        price: 299.99,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health and fitness goals",
        price: 199.99,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Professional Camera",
        description: "Capture life's precious moments",
        price: 799.99,
        emoji: "📷"
    },
    {
        id: 4,
        name: "Gaming Laptop",
        description: "High-performance laptop for gaming",
        price: 1299.99,
        emoji: "💻"
    },
    {
        id: 5,
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for your devices",
        price: 49.99,
        emoji: "🔌"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        description: "Portable speaker with amazing sound",
        price: 89.99,
        emoji: "🔊"
    }
];

let cart = [];

// Load products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showCartNotification();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalAmount = document.getElementById('totalAmount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update cart count
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('show', totalItems > 0);

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartTotal.style.display = 'block';
        checkoutBtn.style.display = 'block';
        totalAmount.textContent = total.toFixed(2);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\n\nThis is a demo. In a real application, this would redirect to a payment processor.`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    toggleCart();
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});