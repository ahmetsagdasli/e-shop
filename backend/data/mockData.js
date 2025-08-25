// Mock data for when database is not available
export const mockProducts = [
  {
    _id: '1',
    name: 'MacBook Pro 14"',
    description: 'Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD',
    price: 21597,
    originalPrice: 24000,
    discount: 10,
    brand: 'Apple',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    numReviews: 124,
    countInStock: 15,
    isActive: true,
    isFeatured: true,
    specifications: {
      processor: 'Apple M2 Pro',
      memory: '16GB',
      storage: '512GB SSD',
      display: '14.2-inch Liquid Retina XDR'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'iPhone 14 Pro',
    description: 'iPhone 14 Pro with Dynamic Island, 48MP camera, A16 Bionic chip',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    brand: 'Apple',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    numReviews: 89,
    countInStock: 25,
    isActive: true,
    isFeatured: true,
    specifications: {
      processor: 'A16 Bionic',
      storage: '128GB',
      camera: '48MP',
      display: '6.1-inch Super Retina XDR'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'iPad Air',
    description: 'iPad Air with M1 chip, 10.9-inch Liquid Retina display',
    price: 4299,
    originalPrice: 4799,
    discount: 10,
    brand: 'Apple',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    numReviews: 67,
    countInStock: 20,
    isActive: true,
    isFeatured: false,
    specifications: {
      processor: 'Apple M1',
      storage: '64GB',
      display: '10.9-inch Liquid Retina',
      connectivity: 'Wi-Fi'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'AirPods Pro (2nd Gen)',
    description: 'AirPods Pro with Active Noise Cancellation and Spatial Audio',
    price: 1899,
    originalPrice: 2199,
    discount: 14,
    brand: 'Apple',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    numReviews: 156,
    countInStock: 50,
    isActive: true,
    isFeatured: true,
    specifications: {
      batteryLife: '6 hours',
      features: 'Active Noise Cancellation',
      connectivity: 'Bluetooth 5.3',
      charging: 'Wireless Charging Case'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Apple Watch Series 8',
    description: 'Apple Watch Series 8 with advanced health sensors',
    price: 2799,
    originalPrice: 3199,
    discount: 13,
    brand: 'Apple',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    numReviews: 78,
    countInStock: 30,
    isActive: true,
    isFeatured: false,
    specifications: {
      display: '45mm Always-On Retina',
      sensors: 'ECG, Blood Oxygen',
      battery: '18 hours',
      connectivity: 'Cellular + GPS'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Samsung Galaxy S23 Ultra with S Pen, 200MP camera',
    price: 9499,
    originalPrice: 10999,
    discount: 14,
    brand: 'Samsung',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    numReviews: 92,
    countInStock: 18,
    isActive: true,
    isFeatured: true,
    specifications: {
      processor: 'Snapdragon 8 Gen 2',
      storage: '256GB',
      camera: '200MP',
      display: '6.8-inch Dynamic AMOLED 2X'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockAnalytics = {
  totalRevenue: 847200,
  totalOrders: 2847,
  totalUsers: 1234,
  totalProducts: 456,
  revenueChange: 12.4,
  ordersChange: 8.2,
  usersChange: 5.7,
  productsChange: 2.1,
  topProducts: [
    { name: 'MacBook Pro', sales: 142, revenue: 305724 },
    { name: 'iPhone 14', sales: 98, revenue: 98000 },
    { name: 'iPad Air', sales: 76, revenue: 171000 },
    { name: 'AirPods Pro', sales: 54, revenue: 48546 },
    { name: 'Apple Watch', sales: 32, revenue: 41568 }
  ],
  recentOrders: [
    { id: '#12345', customer: 'Ahmet Yılmaz', product: 'MacBook Pro', amount: 21597, status: 'completed' },
    { id: '#12346', customer: 'Ayşe Demir', product: 'iPhone XS Max', amount: 3150, status: 'processing' },
    { id: '#12347', customer: 'Mehmet Kaya', product: 'iPad Air', amount: 2250, status: 'pending' },
    { id: '#12348', customer: 'Fatma Öz', product: 'AirPods Pro', amount: 899, status: 'completed' },
    { id: '#12349', customer: 'Ali Çelik', product: 'Apple Watch', amount: 1299, status: 'cancelled' }
  ]
}

export const mockCategories = [
  { _id: '1', name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', isActive: true },
  { _id: '2', name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories', isActive: true },
  { _id: '3', name: 'Home', slug: 'home', description: 'Home and garden products', isActive: true },
  { _id: '4', name: 'Sports', slug: 'sports', description: 'Sports and outdoor equipment', isActive: true },
  { _id: '5', name: 'Beauty', slug: 'beauty', description: 'Beauty and personal care', isActive: true }
]
