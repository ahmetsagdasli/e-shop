import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Order from '../models/Order.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('📊 MongoDB Connected for seeding')
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`)
    process.exit(1)
  }
}

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Category.deleteMany({})
    await Order.deleteMany({})

    console.log('🗑️  Cleared existing data')

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@prium.com',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true
    })

    // Create sample users
    const users = await User.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        isEmailVerified: true
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        isEmailVerified: true
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike@example.com',
        password: 'password123',
        isEmailVerified: true
      }
    ])

    console.log('👥 Created users')

    // Create categories
    const categories = await Category.create([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        icon: 'electronics'
      },
      {
        name: 'Fashion',
        description: 'Clothing and accessories',
        icon: 'fashion'
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden items',
        icon: 'home'
      },
      {
        name: 'Sports',
        description: 'Sports and outdoor equipment',
        icon: 'sports'
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        icon: 'books'
      }
    ])

    console.log('📁 Created categories')

    // Create products
    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features and improved camera system',
        shortDescription: 'Premium smartphone with cutting-edge technology',
        price: 999.99,
        originalPrice: 1099.99,
        category: categories[0]._id,
        brand: 'Apple',
        sku: 'IPH15PRO001',
        stock: 50,
        images: [
          {
            public_id: 'iphone15pro_1',
            url: 'https://via.placeholder.com/500x500.png?text=iPhone+15+Pro',
            alt: 'iPhone 15 Pro'
          }
        ],
        specifications: [
          { name: 'Storage', value: '128GB' },
          { name: 'RAM', value: '8GB' },
          { name: 'Display', value: '6.1-inch Super Retina XDR' },
          { name: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP Telephoto' }
        ],
        features: ['5G Connectivity', 'Face ID', 'Wireless Charging', 'Water Resistant'],
        tags: ['smartphone', 'apple', 'premium', '5g'],
        weight: 187,
        isFeatured: true,
        isNewArrival: true,
        createdBy: adminUser._id
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Powerful Android smartphone with S Pen and advanced camera',
        shortDescription: 'Professional-grade smartphone with S Pen',
        price: 899.99,
        originalPrice: 999.99,
        category: categories[0]._id,
        brand: 'Samsung',
        sku: 'SGS24ULTRA001',
        stock: 30,
        images: [
          {
            public_id: 'galaxy_s24_ultra_1',
            url: 'https://via.placeholder.com/500x500.png?text=Galaxy+S24+Ultra',
            alt: 'Samsung Galaxy S24 Ultra'
          }
        ],
        specifications: [
          { name: 'Storage', value: '256GB' },
          { name: 'RAM', value: '12GB' },
          { name: 'Display', value: '6.8-inch Dynamic AMOLED 2X' },
          { name: 'Camera', value: '200MP Main + 50MP Periscope + 10MP Telephoto + 12MP Ultra Wide' }
        ],
        features: ['S Pen', '5G Connectivity', 'Wireless Charging', 'Water Resistant'],
        tags: ['smartphone', 'samsung', 'android', 's-pen'],
        weight: 232,
        isFeatured: true,
        isBestSeller: true,
        createdBy: adminUser._id
      },
      {
        name: 'MacBook Pro 16"',
        description: 'Professional laptop with M3 Pro chip for demanding workflows',
        shortDescription: 'High-performance laptop for professionals',
        price: 2499.99,
        category: categories[0]._id,
        brand: 'Apple',
        sku: 'MBP16M3001',
        stock: 20,
        images: [
          {
            public_id: 'macbook_pro_16_1',
            url: 'https://via.placeholder.com/500x500.png?text=MacBook+Pro+16',
            alt: 'MacBook Pro 16 inch'
          }
        ],
        specifications: [
          { name: 'Processor', value: 'Apple M3 Pro chip' },
          { name: 'RAM', value: '18GB' },
          { name: 'Storage', value: '512GB SSD' },
          { name: 'Display', value: '16.2-inch Liquid Retina XDR' }
        ],
        features: ['Touch ID', 'Magic Keyboard', 'Force Touch trackpad', 'Thunderbolt 4'],
        tags: ['laptop', 'apple', 'professional', 'm3'],
        weight: 2150,
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Nike Air Jordan 1',
        description: 'Classic basketball sneakers with iconic design',
        shortDescription: 'Iconic basketball sneakers',
        price: 170.00,
        category: categories[1]._id,
        brand: 'Nike',
        sku: 'NAJ1001',
        stock: 100,
        images: [
          {
            public_id: 'air_jordan_1_1',
            url: 'https://via.placeholder.com/500x500.png?text=Air+Jordan+1',
            alt: 'Nike Air Jordan 1'
          }
        ],
        variants: [
          {
            name: 'Size',
            options: [
              { value: '8', stock: 20 },
              { value: '9', stock: 25 },
              { value: '10', stock: 30 },
              { value: '11', stock: 25 }
            ]
          },
          {
            name: 'Color',
            options: [
              { value: 'Black/Red', stock: 50 },
              { value: 'White/Black', stock: 50 }
            ]
          }
        ],
        specifications: [
          { name: 'Material', value: 'Leather and synthetic' },
          { name: 'Sole', value: 'Rubber' },
          { name: 'Type', value: 'Basketball shoes' }
        ],
        features: ['Air cushioning', 'High-top design', 'Classic colorway'],
        tags: ['shoes', 'nike', 'basketball', 'jordan'],
        isBestSeller: true,
        createdBy: adminUser._id
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling wireless headphones',
        shortDescription: 'Premium noise-canceling headphones',
        price: 399.99,
        originalPrice: 449.99,
        category: categories[0]._id,
        brand: 'Sony',
        sku: 'SWXM5001',
        stock: 75,
        images: [
          {
            public_id: 'sony_wh1000xm5_1',
            url: 'https://via.placeholder.com/500x500.png?text=Sony+WH-1000XM5',
            alt: 'Sony WH-1000XM5'
          }
        ],
        specifications: [
          { name: 'Driver', value: '30mm' },
          { name: 'Battery Life', value: 'Up to 30 hours' },
          { name: 'Connectivity', value: 'Bluetooth 5.2' },
          { name: 'Weight', value: '250g' }
        ],
        features: ['Active Noise Cancellation', 'Quick Charge', 'Touch Controls', 'Multipoint Connection'],
        tags: ['headphones', 'sony', 'wireless', 'noise-canceling'],
        weight: 250,
        isOnSale: true,
        createdBy: adminUser._id
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        description: 'Classic straight-leg jeans with timeless style',
        shortDescription: 'Classic straight-leg denim jeans',
        price: 89.99,
        category: categories[1]._id,
        brand: 'Levi\'s',
        sku: 'LEV501001',
        stock: 150,
        images: [
          {
            public_id: 'levis_501_1',
            url: 'https://via.placeholder.com/500x500.png?text=Levis+501',
            alt: 'Levi\'s 501 Original Jeans'
          }
        ],
        variants: [
          {
            name: 'Size',
            options: [
              { value: '30', stock: 25 },
              { value: '32', stock: 35 },
              { value: '34', stock: 40 },
              { value: '36', stock: 30 },
              { value: '38', stock: 20 }
            ]
          },
          {
            name: 'Color',
            options: [
              { value: 'Blue', stock: 80 },
              { value: 'Black', stock: 70 }
            ]
          }
        ],
        specifications: [
          { name: 'Material', value: '100% Cotton' },
          { name: 'Fit', value: 'Straight' },
          { name: 'Rise', value: 'Mid rise' }
        ],
        features: ['Button fly', 'Five-pocket styling', 'Original fit', 'Shrink-to-fit'],
        tags: ['jeans', 'levis', 'denim', 'classic'],
        createdBy: adminUser._id
      }
    ]

    const createdProducts = await Product.create(products)

    // Update category product counts
    for (const category of categories) {
      const productCount = createdProducts.filter(p => p.category.toString() === category._id.toString()).length
      await Category.findByIdAndUpdate(category._id, { productCount })
    }

    console.log('📦 Created products')

    // Create sample orders
    const sampleOrders = [
      {
        user: users[0]._id,
        items: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].name,
            image: createdProducts[0].images[0].url,
            price: createdProducts[0].price,
            quantity: 1,
            sku: createdProducts[0].sku
          }
        ],
        shippingAddress: {
          fullName: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          phone: '+1-555-0123'
        },
        billingAddress: {
          fullName: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          phone: '+1-555-0123'
        },
        paymentMethod: 'card',
        subtotal: 999.99,
        shippingCost: 0,
        taxAmount: 79.99,
        totalAmount: 1079.98,
        status: 'delivered',
        isPaid: true,
        paidAt: new Date(),
        isDelivered: true,
        deliveredAt: new Date()
      },
      {
        user: users[1]._id,
        items: [
          {
            product: createdProducts[1]._id,
            name: createdProducts[1].name,
            image: createdProducts[1].images[0].url,
            price: createdProducts[1].price,
            quantity: 1,
            sku: createdProducts[1].sku
          },
          {
            product: createdProducts[4]._id,
            name: createdProducts[4].name,
            image: createdProducts[4].images[0].url,
            price: createdProducts[4].price,
            quantity: 1,
            sku: createdProducts[4].sku
          }
        ],
        shippingAddress: {
          fullName: 'Jane Smith',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
          phone: '+1-555-0456'
        },
        billingAddress: {
          fullName: 'Jane Smith',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
          phone: '+1-555-0456'
        },
        paymentMethod: 'paypal',
        subtotal: 1299.98,
        shippingCost: 15.99,
        taxAmount: 103.99,
        totalAmount: 1419.96,
        status: 'processing',
        isPaid: true,
        paidAt: new Date()
      }
    ]

    await Order.create(sampleOrders)

    console.log('🛒 Created sample orders')

    console.log('✅ Sample data seeded successfully!')
    console.log('👤 Admin user: admin@prium.com / admin123')
    console.log('👤 Test user: john@example.com / password123')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}

const runSeed = async () => {
  await connectDB()
  await seedData()
  process.exit(0)
}

runSeed()
