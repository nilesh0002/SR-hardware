// Enhanced Cart logic for Add to Cart, cart badge, and cart page rendering
(function() {
  // Product data for demo (should match index.html/products.html)
  const PRODUCTS = [
    // Cement brands
    { id: 'cement-ultratech', name: 'UltraTech Cement', price: 420, image: 'images/cement.jpg', rating: 4.8, reviews: 2150 },
    { id: 'cement-acc', name: 'ACC Cement', price: 410, image: 'images/cement.jpg', rating: 4.7, reviews: 1890 },
    { id: 'cement-ambuja', name: 'Ambuja Cement', price: 415, image: 'images/cement.jpg', rating: 4.6, reviews: 1650 },
    { id: 'cement-shree', name: 'Shree Cement', price: 405, image: 'images/cement.jpg', rating: 4.5, reviews: 1420 },
    { id: 'cement-jk-lakshmi', name: 'JK Lakshmi Cement', price: 400, image: 'images/cement.jpg', rating: 4.4, reviews: 1280 },
    // Paint brands
    { id: 'paint-asian-paints', name: 'Asian Paints', price: 850, image: 'images/paint.jpg', rating: 4.7, reviews: 1820 },
    { id: 'paint-berger', name: 'Berger Paints', price: 820, image: 'images/paint.jpg', rating: 4.6, reviews: 1650 },
    { id: 'paint-nerolac', name: 'Nerolac Paints', price: 800, image: 'images/paint.jpg', rating: 4.5, reviews: 1480 },
    { id: 'paint-dulux', name: 'Dulux Paints', price: 780, image: 'images/paint.jpg', rating: 4.4, reviews: 1320 },
    { id: 'paint-indigo', name: 'Indigo Paints', price: 760, image: 'images/paint.jpg', rating: 4.3, reviews: 1180 },
    { id: 'paint-kansai', name: 'Kansai Nerolac', price: 790, image: 'images/paint.jpg', rating: 4.4, reviews: 1250 },
    { id: 'paint-shalimar', name: 'Shalimar Paints', price: 750, image: 'images/paint.jpg', rating: 4.2, reviews: 980 },
    { id: 'paint-crown', name: 'Crown Paints', price: 720, image: 'images/paint.jpg', rating: 4.1, reviews: 850 },
    { id: 'paint-sherwin', name: 'Sherwin Williams', price: 920, image: 'images/paint.jpg', rating: 4.6, reviews: 1450 },
    { id: 'paint-jotun', name: 'Jotun Paints', price: 880, image: 'images/paint.jpg', rating: 4.5, reviews: 1350 },
    { id: 'paint-primer-asian', name: 'Asian Paints Primer', price: 450, image: 'images/paint.jpg', rating: 4.4, reviews: 920 },
    { id: 'paint-primer-berger', name: 'Berger Primer', price: 420, image: 'images/paint.jpg', rating: 4.3, reviews: 850 },
    { id: 'paint-sealer-asian', name: 'Asian Paints Sealer', price: 380, image: 'images/paint.jpg', rating: 4.2, reviews: 780 },
    { id: 'paint-texture-asian', name: 'Asian Paints Texture', price: 650, image: 'images/paint.jpg', rating: 4.5, reviews: 1100 },
    { id: 'paint-texture-berger', name: 'Berger Texture', price: 620, image: 'images/paint.jpg', rating: 4.4, reviews: 980 },
    { id: 'paint-emulsion-asian', name: 'Asian Paints Emulsion', price: 580, image: 'images/paint.jpg', rating: 4.6, reviews: 1250 },
    { id: 'paint-emulsion-berger', name: 'Berger Emulsion', price: 550, image: 'images/paint.jpg', rating: 4.5, reviews: 1150 },
    { id: 'paint-enamel-asian', name: 'Asian Paints Enamel', price: 720, image: 'images/paint.jpg', rating: 4.4, reviews: 980 },
    { id: 'paint-enamel-berger', name: 'Berger Enamel', price: 690, image: 'images/paint.jpg', rating: 4.3, reviews: 920 },
    { id: 'paint-exterior-asian', name: 'Asian Paints Exterior', price: 680, image: 'images/paint.jpg', rating: 4.5, reviews: 1150 },
    { id: 'paint-exterior-berger', name: 'Berger Exterior', price: 650, image: 'images/paint.jpg', rating: 4.4, reviews: 1080 },
    { id: 'paint-interior-asian', name: 'Asian Paints Interior', price: 620, image: 'images/paint.jpg', rating: 4.6, reviews: 1350 },
    { id: 'paint-interior-berger', name: 'Berger Interior', price: 590, image: 'images/paint.jpg', rating: 4.5, reviews: 1280 },
    { id: 'paint-ceiling-asian', name: 'Asian Paints Ceiling', price: 480, image: 'images/paint.jpg', rating: 4.3, reviews: 850 },
    { id: 'paint-ceiling-berger', name: 'Berger Ceiling', price: 450, image: 'images/paint.jpg', rating: 4.2, reviews: 780 },
    // Tools & Equipment
    { id: 'tools-bosch', name: 'Bosch Drill Machine', price: 1299, image: 'images/tools.jpg', rating: 4.6, reviews: 1680 },
    { id: 'tools-makita', name: 'Makita Hammer Drill', price: 1499, image: 'images/tools.jpg', rating: 4.5, reviews: 1450 },
    { id: 'tools-dewalt', name: 'DeWalt Circular Saw', price: 1899, image: 'images/tools.jpg', rating: 4.7, reviews: 1920 },
    { id: 'tools-hilti', name: 'Hilti Impact Driver', price: 2499, image: 'images/tools.jpg', rating: 4.8, reviews: 2100 },
    { id: 'tools-milwaukee', name: 'Milwaukee Tool Set', price: 3299, image: 'images/tools.jpg', rating: 4.6, reviews: 1780 },
    // Doors & Windows
    { id: 'door-wooden', name: 'Classic Wooden Door', price: 2499, image: 'images/door.jpg', rating: 4.5, reviews: 1250 },
    { id: 'door-steel', name: 'Steel Security Door', price: 1899, image: 'images/steel door.jpg', rating: 4.4, reviews: 980 },
    { id: 'door-glass', name: 'Glass Panel Door', price: 3299, image: 'images/glass door.webp', rating: 4.6, reviews: 1450 },
    { id: 'window-aluminum', name: 'Aluminum Window', price: 899, image: 'images/door.jpg', rating: 4.3, reviews: 890 },
    { id: 'door-composite', name: 'Composite Door', price: 1799, image: 'images/door.jpg', rating: 4.5, reviews: 1120 },
    // Plumbing & Fixtures
    { id: 'pipe-pvc', name: 'PVC Pipes Set', price: 299, image: 'images/tools.jpg', rating: 4.4, reviews: 890 },
    { id: 'tap-brass', name: 'Brass Tap Set', price: 599, image: 'images/tools.jpg', rating: 4.5, reviews: 1120 },
    { id: 'sink-stainless', name: 'Stainless Steel Sink', price: 899, image: 'images/tools.jpg', rating: 4.6, reviews: 1450 },
    { id: 'toilet-ceramic', name: 'Ceramic Toilet', price: 1499, image: 'images/tools.jpg', rating: 4.3, reviews: 780 },
    { id: 'shower-head', name: 'Rain Shower Head', price: 399, image: 'images/tools.jpg', rating: 4.4, reviews: 920 },
    // Wall Putty & Adhesives
    { id: 'putty-asian', name: 'Asian Paints Putty', price: 299, image: 'images/wall putty.jpg', rating: 4.4, reviews: 980 },
    { id: 'putty-berger', name: 'Berger Wall Putty', price: 279, image: 'images/wall putty.jpg', rating: 4.3, reviews: 850 },
    { id: 'putty-jk', name: 'JK Putty', price: 259, image: 'images/wall putty.jpg', rating: 4.2, reviews: 720 },
    { id: 'putty-ultratech', name: 'UltraTech Putty', price: 289, image: 'images/wall putty.jpg', rating: 4.5, reviews: 1100 },
    { id: 'putty-ambuja', name: 'Ambuja Putty', price: 269, image: 'images/wall putty.jpg', rating: 4.1, reviews: 680 }
  ];

  // Backend-powered Cart logic for Add to Cart, cart badge, and cart page rendering
  const API_BASE = 'http://localhost:3000/api/cart';

  function getToken() {
    return localStorage.getItem('authToken');
  }

  async function fetchCart() {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(API_BASE, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    return data.success ? data.data : null;
  }

  async function addToCart(productId, quantity = 1) {
    const token = getToken();
    if (!token) {
      alert('Please log in to add items to cart.');
      return;
    }
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    const data = await res.json();
    if (data.success) {
      updateCartBadge();
      showCartConfirm();
    } else {
      alert(data.error || 'Failed to add to cart.');
    }
  }

  async function removeFromCart(productId) {
    const token = getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success) {
      renderCartPage();
      updateCartBadge();
    }
  }

  async function updateQty(productId, quantity) {
    const token = getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
    });
    const data = await res.json();
    if (data.success) {
      renderCartPage();
      updateCartBadge();
    }
  }

  async function updateCartBadge() {
    const token = getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/count`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const count = data.success ? data.data.count : 0;
    document.querySelectorAll('.fk-cart-badge').forEach(badge => {
      badge.textContent = count;
    });
  }

  async function renderCartPage() {
    const cart = await fetchCart();
    const cartList = document.getElementById('cart-list');
    const priceDetail = document.querySelector('.cart-price-detail');
    const discountDetail = document.querySelector('.cart-discount-detail');
    const totalDetail = document.querySelector('.cart-total');
    const savingsText = document.querySelector('.savings-text');
    if (!cartList) return;
    cartList.innerHTML = '';
    if (!cart || !cart.items || cart.items.length === 0) {
      cartList.innerHTML = `<div class='empty-cart'><i class='fa fa-shopping-cart'></i><h3>Your cart is empty!</h3><p>Add items to it now.</p><a href='products.html' class='continue-shopping-btn'>Shop Now</a></div>`;
      if (priceDetail) priceDetail.textContent = '₹0';
      if (discountDetail) discountDetail.textContent = '-₹0';
      if (totalDetail) totalDetail.textContent = '₹0';
      if (savingsText) savingsText.textContent = 'You will save ₹0 on this order';
      return;
    }
    let originalTotal = 0, discount = 0;
    cart.items.forEach(item => {
      const product = item.product;
      const originalPrice = Math.round(product.price * 1.12);
      originalTotal += originalPrice * item.quantity;
      discount += (originalPrice - product.price) * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${product.images && product.images[0] ? product.images[0] : 'images/no-image.png'}" alt="${product.name}" />
        <div class="cart-item-details">
          <div class="cart-item-title">${product.name}</div>
          <div class="cart-item-brand">${product.brand || ''}</div>
          <div class="cart-item-price">₹${product.price.toLocaleString()} <span class="cart-item-original-price">₹${originalPrice.toLocaleString()}</span> <span class="cart-item-discount">${Math.round((originalPrice-product.price)/originalPrice*100)}% off</span></div>
          <div class="cart-item-quantity">
            <input type="number" min="1" value="${item.quantity}" data-id="${product._id}" class="qty-input" />
            <button class="cart-item-remove" data-id="${product._id}"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      `;
      cartList.appendChild(div);
    });
    // Add event listeners
    cartList.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        removeFromCart(this.dataset.id);
      });
    });
    cartList.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', function() {
        let val = parseInt(this.value);
        if (isNaN(val) || val < 1) val = 1;
        this.value = val;
        updateQty(this.dataset.id, val);
      });
    });
    if (priceDetail) priceDetail.textContent = '₹' + originalTotal.toLocaleString();
    if (discountDetail) discountDetail.textContent = '-₹' + discount.toLocaleString();
    if (totalDetail) totalDetail.textContent = '₹' + cart.totalAmount.toLocaleString();
    if (savingsText) savingsText.textContent = `You will save ₹${discount.toLocaleString()} on this order`;
  }

  function showCartConfirm() {
    let toast = document.querySelector('.cart-confirm');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-confirm';
      toast.style.cssText = `
        position: fixed;
        left: 50%;
        bottom: 48px;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #2874f0, #0059c8);
        color: #fff;
        padding: 1rem 2.2rem;
        border-radius: 1.2rem;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(40,116,240,0.25);
        z-index: 2001;
        font-size: 1.12rem;
        display: flex;
        align-items: center;
        gap: 0.7rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
      `;
      toast.innerHTML = '<span style="font-size:1.3rem;display:inline-block;"><i class="fa fa-check-circle"></i></span> Added to cart!';
      document.body.appendChild(toast);
    }
    
    toast.style.display = 'flex';
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    clearTimeout(window._cartToastTimeout);
    window._cartToastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => { toast.style.display = 'none'; }, 350);
    }, 2000);
  }

  // --- Enhanced Cart Icon Symbol Update ---
  function updateCartIconSymbol() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    
    // Add subtle animation to cart icon
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    cartIcons.forEach(icon => {
      icon.style.transform = 'scale(1.2)';
      icon.style.color = '#ffe500';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
        icon.style.color = '#fff';
      }, 300);
    });
  }

  // --- Setup event listeners ---
  document.addEventListener('DOMContentLoaded', function() {
    setupAddToCartButtons();
    updateCartBadge();
    
    // Add CSS for ripple animation
    if (!document.querySelector('#cart-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'cart-ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  });

  // --- Expose functions globally ---
  window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQty,
    updateCartBadge,
    renderCartPage
  };
  
  // Also expose setupAddToCartButtons globally for direct access
  window.setupAddToCartButtons = setupAddToCartButtons;
  window.renderCartPage = renderCartPage;
})(); 

// Render cart page when loaded
document.addEventListener('DOMContentLoaded', function() {
  // Call renderCartPage to display cart items
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  } else if (window.cartFunctions && window.cartFunctions.renderCartPage) {
    window.cartFunctions.renderCartPage();
  }
});