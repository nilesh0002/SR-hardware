// Fetch and render products from backend
async function fetchAndRenderProducts() {
    const container = document.getElementById('products-container');
    const titleElement = document.getElementById('category-title');
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:#666;">Loading products...</div>';
    let apiUrl = 'http://localhost:3000/api/products';
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
        apiUrl = `http://localhost:3000/api/products/category/${category}`;
    }
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:2rem; color:#666;">No products found for this category.</div>';
            titleElement.textContent = category ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ') : 'All Products';
            return;
        }
        const categoryNames = {
            'cement': 'Cement & Building Materials',
            'paints': 'Paints & Coatings',
            'tools': 'Tools & Equipment',
            'doors': 'Doors & Windows',
            'plumbing': 'Plumbing & Fixtures',
            'wall-putty': 'Wall Putty & Adhesives'
        };
        titleElement.textContent = categoryNames[category] || 'All Products';
        container.innerHTML = data.data.map(product => {
            const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
            return `
                <div class="product-card" id="${product._id}">
                    <img src="${product.images && product.images[0] ? product.images[0] : 'images/placeholder.png'}" alt="${product.name}">
                    <div class="product-title">${product.name}</div>
                    <div class="product-brand">${product.brand || ''}</div>
                    <div class="product-rating">
                        <span class="rating-stars">★ ★ ★ ★ ★</span>
                        <span class="rating-text">-</span>
                    </div>
                    <div class="product-price">
                        ₹${product.price.toLocaleString()}
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                        ${discount > 0 ? `<span class="discount">${discount}% off</span>` : ''}
                    </div>
                    <button class="add-cart-btn" data-id="${product._id}">Add to Cart</button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
        container.innerHTML = '<div style="text-align:center; padding:2rem; color:#666;">An error occurred while loading products.</div>';
    }
}

fetchAndRenderProducts();

// Add event listeners to Add to Cart buttons after products are rendered
async function setupAddToCartButtons() {
    // Wait for products to be rendered
    const container = document.getElementById('products-container');
    if (!container) return;
    // Use event delegation for better performance
    container.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-cart-btn')) {
            const productId = e.target.getAttribute('data-id');
            if (productId && window.cartFunctions && window.cartFunctions.addToCart) {
                window.cartFunctions.addToCart(productId);
            }
        }
    });
}

// Call after products are rendered
fetchAndRenderProducts().then(setupAddToCartButtons); 