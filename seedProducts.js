const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shree-raam-hardware';

const sampleProducts = [
  // Cement
  {
    name: 'UltraTech Cement',
    brand: 'UltraTech',
    price: 460,
    originalPrice: 520,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'High-quality cement for strong construction.',
    sku: 'CEMENT-001'
  },
  {
    name: 'ACC Cement',
    brand: 'ACC',
    price: 410,
    originalPrice: 470,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'Reliable cement for all building needs.',
    sku: 'CEMENT-002'
  },
  {
    name: 'Ambuja Cement',
    brand: 'Ambuja',
    price: 415,
    originalPrice: 475,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'Durable cement for long-lasting structures.',
    sku: 'CEMENT-003'
  },
  {
    name: 'Shree Cement',
    brand: 'Shree',
    price: 405,
    originalPrice: 465,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'Affordable and strong cement.',
    sku: 'CEMENT-004'
  },
  {
    name: 'JK Lakshmi Cement',
    brand: 'JK Lakshmi',
    price: 400,
    originalPrice: 460,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'Trusted cement for all projects.',
    sku: 'CEMENT-005'
  },
  {
    name: 'Birla Cement',
    brand: 'Birla',
    price: 425,
    originalPrice: 485,
    images: ['images/cement.jpg'],
    category: 'cement',
    isActive: true,
    description: 'Premium cement for premium builds.',
    sku: 'CEMENT-006'
  },
  // Paints
  {
    name: 'Asian Paints',
    brand: 'Asian Paints',
    price: 850,
    originalPrice: 1000,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Premium paint for vibrant and long-lasting color.',
    sku: 'PAINTS-001'
  },
  {
    name: 'Berger Paints',
    brand: 'Berger',
    price: 820,
    originalPrice: 970,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Smooth finish and excellent coverage.',
    sku: 'PAINTS-002'
  },
  {
    name: 'Nerolac Paints',
    brand: 'Nerolac',
    price: 800,
    originalPrice: 950,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Durable and eco-friendly paint.',
    sku: 'PAINTS-003'
  },
  {
    name: 'Dulux Paints',
    brand: 'Dulux',
    price: 780,
    originalPrice: 930,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Rich colors for every wall.',
    sku: 'PAINTS-004'
  },
  {
    name: 'Indigo Paints',
    brand: 'Indigo',
    price: 760,
    originalPrice: 910,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Innovative paint for modern homes.',
    sku: 'PAINTS-005'
  },
  {
    name: 'Kansai Nerolac',
    brand: 'Kansai',
    price: 790,
    originalPrice: 940,
    images: ['images/paint.jpg'],
    category: 'paints',
    isActive: true,
    description: 'Trusted paint for generations.',
    sku: 'PAINTS-006'
  },
  // Tools
  {
    name: 'Bosch Drill Machine',
    brand: 'Bosch',
    price: 1299,
    originalPrice: 1599,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'Durable drill machine for all your DIY needs.',
    sku: 'TOOLS-001'
  },
  {
    name: 'Makita Hammer Drill',
    brand: 'Makita',
    price: 1499,
    originalPrice: 1799,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'Powerful hammer drill for professionals.',
    sku: 'TOOLS-002'
  },
  {
    name: 'DeWalt Circular Saw',
    brand: 'DeWalt',
    price: 1899,
    originalPrice: 2199,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'Precision saw for clean cuts.',
    sku: 'TOOLS-003'
  },
  {
    name: 'Hilti Impact Driver',
    brand: 'Hilti',
    price: 2499,
    originalPrice: 2799,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'High-torque impact driver.',
    sku: 'TOOLS-004'
  },
  {
    name: 'Milwaukee Tool Set',
    brand: 'Milwaukee',
    price: 3299,
    originalPrice: 3699,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'Complete tool set for every job.',
    sku: 'TOOLS-005'
  },
  {
    name: 'Black & Decker Drill',
    brand: 'Black & Decker',
    price: 899,
    originalPrice: 1099,
    images: ['images/tools.jpg'],
    category: 'tools',
    isActive: true,
    description: 'Affordable drill for home use.',
    sku: 'TOOLS-006'
  },
  // Doors
  {
    name: 'Classic Wooden Door',
    brand: 'Premium Woods',
    price: 2499,
    originalPrice: 3199,
    images: ['images/door.jpg'],
    category: 'doors',
    isActive: true,
    description: 'Elegant wooden door for homes and offices.',
    sku: 'DOORS-001'
  },
  {
    name: 'Steel Security Door',
    brand: 'Secure Steel',
    price: 1899,
    originalPrice: 2399,
    images: ['images/steel door.jpg'],
    category: 'doors',
    isActive: true,
    description: 'Strong steel door for maximum security.',
    sku: 'DOORS-002'
  },
  {
    name: 'Glass Panel Door',
    brand: 'Crystal Glass',
    price: 3299,
    originalPrice: 3999,
    images: ['images/glass door.webp'],
    category: 'doors',
    isActive: true,
    description: 'Modern glass door for stylish interiors.',
    sku: 'DOORS-003'
  },
  {
    name: 'Composite Door',
    brand: 'CompoTech',
    price: 1799,
    originalPrice: 2299,
    images: ['images/door.jpg'],
    category: 'doors',
    isActive: true,
    description: 'Durable composite door for all weather.',
    sku: 'DOORS-004'
  },
  {
    name: 'uPVC Door',
    brand: 'UPVCTech',
    price: 1599,
    originalPrice: 1999,
    images: ['images/door.jpg'],
    category: 'doors',
    isActive: true,
    description: 'Energy-efficient uPVC door.',
    sku: 'DOORS-005'
  },
  {
    name: 'Bamboo Door',
    brand: 'EcoBamboo',
    price: 1899,
    originalPrice: 2399,
    images: ['images/door.jpg'],
    category: 'doors',
    isActive: true,
    description: 'Eco-friendly bamboo door.',
    sku: 'DOORS-006'
  },
  // Plumbing
  {
    name: 'PVC Pipes Set',
    brand: 'PipeTech',
    price: 299,
    originalPrice: 399,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Reliable PVC pipes for plumbing solutions.',
    sku: 'PLUMBING-001'
  },
  {
    name: 'Brass Tap Set',
    brand: 'TapMaster',
    price: 599,
    originalPrice: 799,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Durable brass taps for kitchens and bathrooms.',
    sku: 'PLUMBING-002'
  },
  {
    name: 'Stainless Steel Sink',
    brand: 'SinkPro',
    price: 899,
    originalPrice: 1199,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Premium sink for modern kitchens.',
    sku: 'PLUMBING-003'
  },
  {
    name: 'Ceramic Toilet',
    brand: 'ToiletTech',
    price: 1499,
    originalPrice: 1899,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Comfortable and hygienic toilet.',
    sku: 'PLUMBING-004'
  },
  {
    name: 'Rain Shower Head',
    brand: 'ShowerPro',
    price: 399,
    originalPrice: 599,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Luxury rain shower experience.',
    sku: 'PLUMBING-005'
  },
  {
    name: 'Pipe Fittings Set',
    brand: 'FitTech',
    price: 499,
    originalPrice: 699,
    images: ['images/tools.jpg'],
    category: 'plumbing',
    isActive: true,
    description: 'Complete set of pipe fittings.',
    sku: 'PLUMBING-006'
  },
  // Hardware
  {
    name: 'Door Hinges Set',
    brand: 'HingeTech',
    price: 299,
    originalPrice: 399,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'High-quality hinges for all types of doors.',
    sku: 'HARDWARE-001'
  },
  {
    name: 'Security Locks',
    brand: 'LockTech',
    price: 499,
    originalPrice: 699,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'Secure locks for home and office doors.',
    sku: 'HARDWARE-002'
  },
  {
    name: 'Door Handles',
    brand: 'HandleTech',
    price: 199,
    originalPrice: 299,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'Stylish handles for all doors.',
    sku: 'HARDWARE-003'
  },
  {
    name: 'Door Closers',
    brand: 'CloserTech',
    price: 399,
    originalPrice: 499,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'Smooth and silent door closers.',
    sku: 'HARDWARE-004'
  },
  {
    name: 'Door Stoppers',
    brand: 'StopperTech',
    price: 99,
    originalPrice: 149,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'Durable stoppers for all floors.',
    sku: 'HARDWARE-005'
  },
  {
    name: 'Safety Equipment Set',
    brand: '3M',
    price: 1499,
    originalPrice: 1799,
    images: ['images/tools.jpg'],
    category: 'hardware',
    isActive: true,
    description: 'Complete safety set for workers.',
    sku: 'HARDWARE-006'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 