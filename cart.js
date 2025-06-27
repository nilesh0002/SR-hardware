// Cart logic for Add to Cart, cart badge, and cart page rendering
(function() {
  // Product data for demo (should match index.html/products.html)
  const PRODUCTS = [
    // Cement brands
    { id: 'cement-ultratech', name: 'UltraTech Cement', price: 420, image: 'images/cement.jpg' },
    { id: 'cement-acc', name: 'ACC Cement', price: 410, image: 'images/cement.jpg' },
    { id: 'cement-ambuja', name: 'Ambuja Cement', price: 415, image: 'images/cement.jpg' },
    { id: 'cement-shree', name: 'Shree Cement', price: 405, image: 'images/cement.jpg' },
    { id: 'cement-jk-lakshmi', name: 'JK Lakshmi Cement', price: 400, image: 'images/cement.jpg' },
    // Paint brands
    { id: 'paint-asian-paints', name: 'Asian Paints', price: 850, image: 'images/paint.jpg' },
    { id: 'paint-berger', name: 'Berger', price: 820, image: 'images/paint.jpg' },
    { id: 'paint-nerolac', name: 'Nerolac', price: 800, image: 'images/paint.jpg' },
    { id: 'paint-dulux', name: 'Dulux', price: 780, image: 'images/paint.jpg' },
    { id: 'paint-indigo', name: 'Indigo', price: 760, image: 'images/paint.jpg' },
    // Example for other products (add more as needed)
    { id: 'doors', name: 'Classic Wooden Door', price: 2499, image: 'images/door.jpg' },
    { id: 'tools', name: 'Hand Tools Set', price: 1299, image: 'images/tools.jpg' },
    { id: 'putty', name: 'Wall Putty/Primer', price: 299, image: 'images/wall putty.jpg' }
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

  // --- Cart Badge ---
  function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll('.fk-cart-badge').forEach(badge => {
      badge.textContent = count;
    });
  }

  // --- Add to Cart Button Logic ---
  function setupAddToCartButtons() {
    document.querySelectorAll('.add-cart-btn').forEach((btn, idx) => {
      btn.addEventListener('click', function() {
        // Try to get product id from parent card
        let card = btn.closest('.fk-product-card') || btn.closest('.product-card');
        let id = card && card.id;
        if (!id && PRODUCTS[idx]) id = PRODUCTS[idx].id;
        if (id) addToCart(id);
      });
    });
  }

  // --- Cart Confirm Toast ---
  function showCartConfirm() {
    let toast = document.querySelector('.cart-confirm');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-confirm';
      toast.textContent = 'Added to cart!';
      document.body.appendChild(toast);
    }
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1200);
  }

  // --- Cart Page Rendering ---
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
        // Add empty state if not present
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'fk-cart-empty';
        emptyDiv.style = 'text-align:center;padding:2.5rem 0;color:#888;';
        emptyDiv.innerHTML = `
          <i class="fa fa-shopping-cart" style="font-size:3rem;color:#2874f0;margin-bottom:1rem;"></i>
          <div style="font-size:1.2rem;font-weight:600;">Your cart is empty!</div>
          <div style="margin-top:0.7rem;">Add items to it now.</div>
          <a href="products.html" class="fk-checkout-btn" style="margin-top:1.5rem;display:inline-block;">Shop Now</a>
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
      // Simulate original price for discount (10% higher)
      const originalPrice = Math.round(item.price * 1.12);
      originalTotal += originalPrice * item.qty;
      total += item.price * item.qty;
      discount += (originalPrice - item.price) * item.qty;
      const div = document.createElement('div');
      div.className = 'fk-cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="fk-cart-image">
        <div class="fk-cart-details">
          <div class="fk-cart-title">${item.name}</div>
          <div class="fk-cart-price">₹${item.price.toLocaleString()} <span style="color:#888;font-size:1rem;font-weight:400;text-decoration:line-through;margin-left:8px;">₹${originalPrice.toLocaleString()}</span> <span style="color:#388e3c;font-size:0.98rem;font-weight:600;margin-left:8px;">${Math.round((originalPrice-item.price)/originalPrice*100)}% off</span></div>
          <div class="fk-cart-quantity">
            <button class="fk-qty-btn" data-id="${item.id}" data-delta="-1">-</button>
            <span>${item.qty}</span>
            <button class="fk-qty-btn" data-id="${item.id}" data-delta="1">+</button>
          </div>
          <div style="color:#388e3c;font-size:0.98rem;margin-top:0.5rem;">You save ₹${((originalPrice-item.price)*item.qty).toLocaleString()} on this item</div>
        </div>
        <button class="fk-cart-remove" data-id="${item.id}"><i class="fa fa-trash"></i></button>
      `;
      cartList.appendChild(div);
    });
    if (priceDetail) priceDetail.textContent = '₹' + originalTotal.toLocaleString();
    if (discountDetail) discountDetail.textContent = '-₹' + discount.toLocaleString();
    if (totalDetail) totalDetail.textContent = '₹' + total.toLocaleString();
    if (savingsDetail) savingsDetail.textContent = `You will save ₹${discount.toLocaleString()} on this order`;
    // Remove/Qty listeners
    cartList.querySelectorAll('.fk-cart-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        removeFromCart(btn.getAttribute('data-id'));
      });
    });
    cartList.querySelectorAll('.fk-qty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        updateQty(btn.getAttribute('data-id'), parseInt(btn.getAttribute('data-delta')));
      });
    });
  }

  // --- On Page Load ---
  document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    setupAddToCartButtons();
    renderCartPage();
  });
})(); 