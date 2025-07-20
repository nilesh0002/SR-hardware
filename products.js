// Static product data (all products)
const staticProducts = [
    // Cement brands
    { _id: 'cement-ultratech', name: 'UltraTech Cement', brand: 'UltraTech', price: 420, originalPrice: 450, images: ['images/cement.jpg'], category: 'cement' },
    { _id: 'cement-acc', name: 'ACC Cement', brand: 'ACC', price: 410, originalPrice: 440, images: ['images/cement.jpg'], category: 'cement' },
    { _id: 'cement-ambuja', name: 'Ambuja Cement', brand: 'Ambuja', price: 415, originalPrice: 445, images: ['images/cement.jpg'], category: 'cement' },
    { _id: 'cement-shree', name: 'Shree Cement', brand: 'Shree', price: 405, originalPrice: 430, images: ['images/cement.jpg'], category: 'cement' },
    { _id: 'cement-jk-lakshmi', name: 'JK Lakshmi Cement', brand: 'JK Lakshmi', price: 400, originalPrice: 420, images: ['images/cement.jpg'], category: 'cement' },
    // Paint brands
    { _id: 'paint-asian-paints', name: 'Asian Paints', brand: 'Asian Paints', price: 850, originalPrice: 900, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-berger', name: 'Berger Paints', brand: 'Berger', price: 820, originalPrice: 870, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-nerolac', name: 'Nerolac Paints', brand: 'Nerolac', price: 800, originalPrice: 850, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-dulux', name: 'Dulux Paints', brand: 'Dulux', price: 780, originalPrice: 830, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-indigo', name: 'Indigo Paints', brand: 'Indigo', price: 760, originalPrice: 800, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-kansai', name: 'Kansai Nerolac', brand: 'Kansai', price: 790, originalPrice: 830, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-shalimar', name: 'Shalimar Paints', brand: 'Shalimar', price: 750, originalPrice: 790, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-crown', name: 'Crown Paints', brand: 'Crown', price: 720, originalPrice: 760, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-sherwin', name: 'Sherwin Williams', brand: 'Sherwin Williams', price: 920, originalPrice: 970, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-jotun', name: 'Jotun Paints', brand: 'Jotun', price: 880, originalPrice: 930, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-primer-asian', name: 'Asian Paints Primer', brand: 'Asian Paints', price: 450, originalPrice: 500, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-primer-berger', name: 'Berger Primer', brand: 'Berger', price: 420, originalPrice: 470, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-sealer-asian', name: 'Asian Paints Sealer', brand: 'Asian Paints', price: 380, originalPrice: 420, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-texture-asian', name: 'Asian Paints Texture', brand: 'Asian Paints', price: 650, originalPrice: 700, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-texture-berger', name: 'Berger Texture', brand: 'Berger', price: 620, originalPrice: 670, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-emulsion-asian', name: 'Asian Paints Emulsion', brand: 'Asian Paints', price: 580, originalPrice: 630, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-emulsion-berger', name: 'Berger Emulsion', brand: 'Berger', price: 550, originalPrice: 600, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-enamel-asian', name: 'Asian Paints Enamel', brand: 'Asian Paints', price: 720, originalPrice: 770, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-enamel-berger', name: 'Berger Enamel', brand: 'Berger', price: 690, originalPrice: 740, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-exterior-asian', name: 'Asian Paints Exterior', brand: 'Asian Paints', price: 680, originalPrice: 730, images: ['images/exterior paint.jpg'], category: 'paints' },
    { _id: 'paint-exterior-berger', name: 'Berger Exterior', brand: 'Berger', price: 650, originalPrice: 700, images: ['images/exterior paint.jpg'], category: 'paints' },
    { _id: 'paint-interior-asian', name: 'Asian Paints Interior', brand: 'Asian Paints', price: 620, originalPrice: 670, images: ['images/interior paint.webp'], category: 'paints' },
    { _id: 'paint-interior-berger', name: 'Berger Interior', brand: 'Berger', price: 590, originalPrice: 640, images: ['images/interior paint.webp'], category: 'paints' },
    { _id: 'paint-ceiling-asian', name: 'Asian Paints Ceiling', brand: 'Asian Paints', price: 480, originalPrice: 530, images: ['images/paint.jpg'], category: 'paints' },
    { _id: 'paint-ceiling-berger', name: 'Berger Ceiling', brand: 'Berger', price: 450, originalPrice: 500, images: ['images/paint.jpg'], category: 'paints' },
    // Tools & Equipment
    { _id: 'tools-bosch', name: 'Bosch Drill Machine', brand: 'Bosch', price: 1299, originalPrice: 1499, images: ['images/tools.jpg'], category: 'tools' },
    { _id: 'tools-makita', name: 'Makita Hammer Drill', brand: 'Makita', price: 1499, originalPrice: 1699, images: ['images/tools.jpg'], category: 'tools' },
    { _id: 'tools-dewalt', name: 'DeWalt Circular Saw', brand: 'DeWalt', price: 1899, originalPrice: 2099, images: ['images/tools.jpg'], category: 'tools' },
    { _id: 'tools-hilti', name: 'Hilti Impact Driver', brand: 'Hilti', price: 2499, originalPrice: 2699, images: ['images/tools.jpg'], category: 'tools' },
    { _id: 'tools-milwaukee', name: 'Milwaukee Tool Set', brand: 'Milwaukee', price: 3299, originalPrice: 3499, images: ['images/tools.jpg'], category: 'tools' },
    // Doors & Windows
    { _id: 'door-wooden', name: 'Classic Wooden Door', brand: 'Classic', price: 2499, originalPrice: 3199, images: ['images/woodendoor.jpg'], category: 'doors' },
    { _id: 'door-steel', name: 'Steel Security Door', brand: 'Steel', price: 1899, originalPrice: 2399, images: ['images/steel door.jpg'], category: 'doors' },
    { _id: 'door-glass', name: 'Glass Panel Door', brand: 'Glass', price: 3299, originalPrice: 3799, images: ['images/glass door.webp'], category: 'doors' },
    { _id: 'window-aluminum', name: 'Aluminum Window', brand: 'Aluminum', price: 899, originalPrice: 1199, images: ['images/door.jpg'], category: 'doors' },
    { _id: 'door-composite', name: 'Composite Door', brand: 'Composite', price: 1799, originalPrice: 2299, images: ['images/door.jpg'], category: 'doors' },
    // Plumbing & Fixtures
    { _id: 'pipe-pvc', name: 'PVC Pipes Set', brand: 'PVC', price: 299, originalPrice: 399, images: ['images/tools.jpg'], category: 'plumbing' },
    { _id: 'tap-brass', name: 'Brass Tap Set', brand: 'Brass', price: 599, originalPrice: 699, images: ['images/tools.jpg'], category: 'plumbing' },
    { _id: 'sink-stainless', name: 'Stainless Steel Sink', brand: 'Stainless', price: 899, originalPrice: 1099, images: ['images/tools.jpg'], category: 'plumbing' },
    { _id: 'toilet-ceramic', name: 'Ceramic Toilet', brand: 'Ceramic', price: 1499, originalPrice: 1799, images: ['images/tools.jpg'], category: 'plumbing' },
    { _id: 'shower-head', name: 'Rain Shower Head', brand: 'Rain', price: 399, originalPrice: 499, images: ['images/tools.jpg'], category: 'plumbing' },
    // Wall Putty & Adhesives
    { _id: 'putty-asian', name: 'Asian Paints Putty', brand: 'Asian Paints', price: 299, originalPrice: 349, images: ['images/wall putty.jpg'], category: 'wall-putty' },
    { _id: 'putty-berger', name: 'Berger Wall Putty', brand: 'Berger', price: 279, originalPrice: 329, images: ['images/wall putty.jpg'], category: 'wall-putty' },
    { _id: 'putty-jk', name: 'JK Putty', brand: 'JK', price: 259, originalPrice: 309, images: ['images/wall putty.jpg'], category: 'wall-putty' },
    { _id: 'putty-ultratech', name: 'UltraTech Putty', brand: 'UltraTech', price: 289, originalPrice: 339, images: ['images/wall putty.jpg'], category: 'wall-putty' },
    { _id: 'putty-ambuja', name: 'Ambuja Putty', brand: 'Ambuja', price: 269, originalPrice: 319, images: ['images/wall putty.jpg'], category: 'wall-putty' }
];

function renderProducts(products, category) {
    const container = document.getElementById('products-container');
    const titleElement = document.getElementById('category-title');
    
    if (!products || products.length === 0) {
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
    
    titleElement.textContent = category ? categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ') : 'All Products';
    
    container.innerHTML = products.map(product => {
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
}

function fetchAndRenderProducts() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    
    let filteredProducts = staticProducts;
    
    if (category) {
        // Filter by exact category match
        filteredProducts = staticProducts.filter(product => {
            return product.category === category;
        });
    }
    
    console.log(`Showing ${filteredProducts.length} products for category: ${category || 'all'}`);
    renderProducts(filteredProducts, category);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchAndRenderProducts();
    setupAddToCartButtons();
});

// Add event listeners to Add to Cart buttons after products are rendered
async function setupAddToCartButtons() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-cart-btn')) {
            const productId = e.target.getAttribute('data-id');
            if (productId && window.cartFunctions && window.cartFunctions.addToCart) {
                window.cartFunctions.addToCart(productId);
            }
        }
    });
} 