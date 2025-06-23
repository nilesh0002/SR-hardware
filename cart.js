// Cart logic for Add to Cart, cart badge, and cart page rendering
(function() {
  // Product data for demo (should match index.html/products.html)
  const PRODUCTS = [
    {
      id: 'cement',
      name: 'UltraStrong Cement',
      price: 399,
      image: 'images/cement.jpg'
    },
    {
      id: 'doors',
      name: 'Classic Wooden Door',
      price: 2499,
      image: 'images/door.jpg'
    },
    {
      id: 'paint',
      name: 'Vibrant Paints',
      price: 799,
      image: 'images/paint.jpg'
    },
    {
      id: 'tools',
      name: 'Hand Tools Set',
      price: 1299,
      image: 'images/tools.jpg'
    },
    {
      id: 'putty',
      name: 'Wall Putty/Primer',
      price: 299,
      image: 'images/wall putty.jpg'
    }
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
    if (!cartList) return;
    const cart = getCart();
    cartList.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
      cartList.innerHTML = '<div style="padding:2rem;text-align:center;color:#888;">Your cart is empty.</div>';
      if (summary) summary.style.display = 'none';
      return;
    }
    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement('div');
      div.className = 'fk-cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="fk-cart-img">
        <div class="fk-cart-details">
          <div class="fk-cart-title">${item.name}</div>
          <div class="fk-cart-price">₹${item.price.toLocaleString()}</div>
          <div class="fk-cart-qty">
            <button class="fk-qty-btn" data-id="${item.id}" data-delta="-1">-</button>
            <span>${item.qty}</span>
            <button class="fk-qty-btn" data-id="${item.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="fk-cart-remove" data-id="${item.id}"><i class="fa fa-trash"></i></button>
      `;
      cartList.appendChild(div);
    });
    if (summary) {
      summary.style.display = '';
      summary.querySelector('.fk-cart-total').textContent = '₹' + total.toLocaleString();
    }
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