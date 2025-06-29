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

  // --- Cart Storage ---
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function addToCart(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty += 1;
    } else {
      const prod = PRODUCTS.find(p => p.id === productId);
      if (prod) cart.push({ ...prod, qty: 1 });
    }
    setCart(cart);
    updateCartBadge();
    showCartConfirm();
    
    // Enhanced Add to Cart Button Feedback
    const btn = document.querySelector(
      `.add-cart-btn[data-id='${productId}'], .fk-add-to-cart[data-id='${productId}']`
    ) || document.querySelector(`#${productId} .add-cart-btn, #${productId} .fk-add-to-cart`);
    
    if (btn) {
      btn.classList.add('added-to-cart');
      btn.innerHTML = '<i class="fa fa-check"></i> Added';
      btn.style.background = '#388e3c';
      btn.style.color = '#fff';
      
      setTimeout(() => {
        btn.classList.remove('added-to-cart');
        btn.innerHTML = 'Add to Cart';
        btn.style.background = '#ffe500';
        btn.style.color = '#181a1b';
      }, 1500);
    }
    
    // Update Cart Icon Symbol with animation
    updateCartIconSymbol();
  }
  
  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== productId);
    setCart(cart);
    updateCartBadge();
    renderCartPage();
  }
  
  function updateQty(productId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty < 1) item.qty = 1;
      setCart(cart);
      renderCartPage();
      updateCartBadge();
    }
  }

  // --- Enhanced Cart Badge ---
  function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const badges = document.querySelectorAll('.fk-cart-badge');
    
    badges.forEach(badge => {
      const oldCount = parseInt(badge.textContent) || 0;
      badge.textContent = count;
      
      // Add animation if count increased
      if (count > oldCount) {
        badge.style.transform = 'scale(1.3)';
        badge.style.background = '#ff6b35';
        setTimeout(() => {
          badge.style.transform = 'scale(1)';
          badge.style.background = '#ff3d00';
        }, 300);
      }
    });
  }

  // Update badge on page load
  document.addEventListener('DOMContentLoaded', updateCartBadge);

  // --- Enhanced Add to Cart Button Logic ---
  function setupAddToCartButtons() {
    // Remove existing event listeners to avoid duplicates
    document.querySelectorAll('.add-cart-btn, .fk-add-to-cart').forEach(btn => {
      btn.removeEventListener('click', handleAddToCart);
    });
    
    // Add event listeners to all current buttons
    document.querySelectorAll('.add-cart-btn, .fk-add-to-cart').forEach((btn, idx) => {
      // Skip explore buttons that are meant for navigation
      if (btn.classList.contains('fk-explore-btn')) return;
      
      btn.addEventListener('click', handleAddToCart);
    });
  }

  // Separate function to handle add to cart clicks
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Try to get product id from parent card or data attribute
    let card = this.closest('.fk-product-card') || this.closest('.product-card');
    let id = this.dataset.id || (card && card.id);
    
    if (id) {
      addToCart(id);
      
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 600);
    }
  }

  // --- Enhanced Cart Confirm Toast ---
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

  // --- Enhanced Cart Page Rendering ---
  function renderCartPage() {
    const cartList = document.querySelector('.fk-cart-list');
    const summary = document.querySelector('.fk-cart-summary');
    const priceDetail = document.querySelector('.fk-cart-price-detail');
    const discountDetail = document.querySelector('.fk-cart-discount-detail');
    const totalDetail = document.querySelector('.fk-cart-total');
    const savingsDetail = document.querySelector('.fk-cart-savings');
    const emptyState = document.querySelector('.fk-cart-empty');
    
    if (!cartList) return;
    
    const cart = getCart();
    cartList.innerHTML = '';
    let total = 0, originalTotal = 0, discount = 0;
    
    if (cart.length === 0) {
      if (summary) summary.style.display = 'none';
      if (emptyState) emptyState.style.display = '';
      else {
        // Enhanced empty state
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'fk-cart-empty';
        emptyDiv.style.cssText = `
          text-align: center;
          padding: 3rem 0;
          color: #666;
        `;
        emptyDiv.innerHTML = `
          <i class="fa fa-shopping-cart" style="font-size:4rem;color:#2874f0;margin-bottom:1.5rem;opacity:0.7;"></i>
          <div style="font-size:1.4rem;font-weight:600;color:#181a1b;margin-bottom:0.5rem;">Your cart is empty!</div>
          <div style="margin-bottom:2rem;color:#666;">Add items to it now.</div>
          <a href="products.html" class="fk-checkout-btn" style="
            margin-top:1.5rem;
            display:inline-block;
            background: linear-gradient(135deg, #2874f0, #0059c8);
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            box-shadow: 0 4px 16px rgba(40,116,240,0.2);
            transition: all 0.3s ease;
          ">Shop Now</a>
        `;
        cartList.appendChild(emptyDiv);
      }
      
      if (priceDetail) priceDetail.textContent = '₹0';
      if (discountDetail) discountDetail.textContent = '-₹0';
      if (totalDetail) totalDetail.textContent = '₹0';
      if (savingsDetail) savingsDetail.textContent = 'You will save ₹0 on this order';
      return;
    } else {
      if (summary) summary.style.display = '';
      if (emptyState) emptyState.style.display = 'none';
    }
    
    cart.forEach(item => {
      // Simulate original price for discount (12% higher)
      const originalPrice = Math.round(item.price * 1.12);
      originalTotal += originalPrice * item.qty;
      total += item.price * item.qty;
      discount += (originalPrice - item.price) * item.qty;
      
      const div = document.createElement('div');
      div.className = 'fk-cart-item';
      div.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1.5rem;
        padding: 1rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        margin-bottom: 1rem;
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
      `;
      
      div.innerHTML = `
        <div class="fk-cart-image-wrap">
          <img src="${item.image}" alt="${item.name}" class="fk-cart-image" style="
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          ">
        </div>
        <div class="fk-cart-details" style="flex: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span class="fk-cart-title" style="font-weight: 600; font-size: 1.1rem; color: #181a1b;">${item.name}</span>
          <span class="fk-cart-price" style="font-size: 1.1rem; font-weight: 700; color: #181a1b;">
            ₹${item.price.toLocaleString()} 
            <span style="color:#666;font-size:1rem;font-weight:400;text-decoration:line-through;margin-left:8px;">₹${originalPrice.toLocaleString()}</span> 
            <span style="color:#388e3c;font-size:0.98rem;font-weight:600;margin-left:8px;">${Math.round((originalPrice-item.price)/originalPrice*100)}% off</span>
          </span>
          <span style="color: #388e3c; font-size: 0.98rem; font-weight: 600;">You save ₹${((originalPrice-item.price)*item.qty).toLocaleString()} on this item</span>
          <div style="display: flex; align-items: center; gap: 0.7rem; margin-top: 0.2rem;">
            <input type="number" class="fk-qty-input" data-id="${item.id}" min="1" value="${item.qty}" style="
              width: 56px;
              padding: 6px 8px;
              border-radius: 6px;
              border: 1.5px solid #dbeafe;
              font-size: 1rem;
              text-align: center;
            ">
            <button class="fk-cart-remove" data-id="${item.id}" style="
              background: #ff3d00;
              color: #fff;
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
            "><i class="fa fa-trash"></i></button>
          </div>
        </div>
      `;
      
      cartList.appendChild(div);

      // Add event listener for quantity input
      setTimeout(() => {
        const qtyInput = div.querySelector('.fk-qty-input');
        if (qtyInput) {
          qtyInput.addEventListener('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val) || val < 1) val = 1;
            this.value = val;
            updateQty(item.id, val - item.qty);
          });
        }
      }, 0);
    });
    
    if (priceDetail) priceDetail.textContent = '₹' + originalTotal.toLocaleString();
    if (discountDetail) discountDetail.textContent = '-₹' + discount.toLocaleString();
    if (totalDetail) totalDetail.textContent = '₹' + total.toLocaleString();
    if (savingsDetail) savingsDetail.textContent = `You will save ₹${discount.toLocaleString()} on this order`;
    
    // Enhanced Remove/Qty listeners
    document.querySelectorAll('.fk-cart-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id;
        removeFromCart(id);
      });
    });
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
    getCart,
    updateCartBadge,
    setupAddToCartButtons,
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