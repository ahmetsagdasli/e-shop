import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { protect, admin, optionalAuth } from '../middleware/authMiddleware.js'
import { body, query, validationResult } from 'express-validator'
import { isConnected } from '../config/database.js'
import { mockProducts } from '../data/mockData.js'

const router = express.Router()

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be non-negative'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be non-negative'),
  query('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
], optionalAuth, asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  // Use mock data if database is not connected
  if (!isConnected) {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit

    let filteredProducts = [...mockProducts]

    // Apply filters
    if (req.query.category) {
      filteredProducts = filteredProducts.filter(p => p.category === req.query.category)
    }

    if (req.query.brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase().includes(req.query.brand.toLowerCase())
      )
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filteredProducts = filteredProducts.filter(p => {
        if (req.query.minPrice && p.price < parseFloat(req.query.minPrice)) return false
        if (req.query.maxPrice && p.price > parseFloat(req.query.maxPrice)) return false
        return true
      })
    }

    // Apply search
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
      )
    }

    // Apply sorting
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1

    filteredProducts.sort((a, b) => {
      if (sortBy === 'price') return sortOrder * (a.price - b.price)
      if (sortBy === 'rating') return sortOrder * (a.rating - b.rating)
      if (sortBy === 'name') return sortOrder * a.name.localeCompare(b.name)
      return sortOrder * (new Date(b.createdAt) - new Date(a.createdAt))
    })

    // Apply pagination
    const paginatedProducts = filteredProducts.slice(skip, skip + limit)

    return res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / limit)
      },
      message: 'Using demo data - database not connected'
    })
  }

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 12
  const skip = (page - 1) * limit

  // Build filter object
  let filter = { isActive: true }

  // Category filter
  if (req.query.category) {
    filter.category = req.query.category
  }

  // Brand filter
  if (req.query.brand) {
    filter.brand = { $regex: req.query.brand, $options: 'i' }
  }

  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {}
    if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice)
    if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice)
  }

  // Rating filter
  if (req.query.rating) {
    filter['ratings.average'] = { $gte: parseFloat(req.query.rating) }
  }

  // Search filter
  if (req.query.search) {
    filter.$text = { $search: req.query.search }
  }

  // Special filters
  if (req.query.featured === 'true') filter.isFeatured = true
  if (req.query.newArrival === 'true') filter.isNewArrival = true
  if (req.query.bestSeller === 'true') filter.isBestSeller = true
  if (req.query.onSale === 'true') filter.isOnSale = true

  // Build sort object
  let sort = {}
  switch (req.query.sort) {
    case 'price_asc':
      sort.price = 1
      break
    case 'price_desc':
      sort.price = -1
      break
    case 'rating':
      sort['ratings.average'] = -1
      break
    case 'sales':
      sort.salesCount = -1
      break
    case 'newest':
      sort.createdAt = -1
      break
    case 'oldest':
      sort.createdAt = 1
      break
    default:
      sort.createdAt = -1
  }

  const products = await Product.find(filter)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select('-createdBy -updatedBy')

  // Increment view count for each product
  if (products.length > 0) {
    const productIds = products.map(p => p._id)
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $inc: { viewsCount: 1 } }
    )
  }

  const total = await Product.countDocuments(filter)
  const totalPages = Math.ceil(total / limit)

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  })
}))

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('createdBy', 'firstName lastName')

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  if (!product.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Product not available'
    })
  }

  // Increment view count
  product.viewsCount += 1
  await product.save()

  res.json({
    success: true,
    data: product
  })
}))

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be non-negative integer')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  // Check if category exists
  const category = await Category.findById(req.body.category)
  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Category not found'
    })
  }

  // Check if SKU already exists
  const existingSku = await Product.findOne({ sku: req.body.sku.toUpperCase() })
  if (existingSku) {
    return res.status(400).json({
      success: false,
      message: 'Product with this SKU already exists'
    })
  }

  const product = await Product.create({
    ...req.body,
    createdBy: req.user._id
  })

  // Update category product count
  await Category.findByIdAndUpdate(req.body.category, {
    $inc: { productCount: 1 }
  })

  const populatedProduct = await Product.findById(product._id)
    .populate('category', 'name slug')
    .populate('createdBy', 'firstName lastName')

  res.status(201).json({
    success: true,
    data: populatedProduct
  })
}))

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  // If category is being changed
  if (req.body.category && req.body.category !== product.category.toString()) {
    // Check if new category exists
    const newCategory = await Category.findById(req.body.category)
    if (!newCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      })
    }

    // Update category product counts
    await Category.findByIdAndUpdate(product.category, {
      $inc: { productCount: -1 }
    })
    await Category.findByIdAndUpdate(req.body.category, {
      $inc: { productCount: 1 }
    })
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user._id },
    { new: true, runValidators: true }
  ).populate('category', 'name slug')
    .populate('createdBy', 'firstName lastName')

  res.json({
    success: true,
    data: product
  })
}))

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  // Update category product count
  await Category.findByIdAndUpdate(product.category, {
    $inc: { productCount: -1 }
  })

  await product.deleteOne()

  res.json({
    success: true,
    message: 'Product deleted successfully'
  })
}))

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
router.get('/slug/:slug', optionalAuth, asyncHandler(async (req, res) => {
  const product = await Product.findOne({ 'seo.slug': req.params.slug, isActive: true })
    .populate('category', 'name slug')
    .populate('createdBy', 'firstName lastName')

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  // Increment view count
  product.viewsCount += 1
  await product.save()

  res.json({
    success: true,
    data: product
  })
}))

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
router.get('/:id/related', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true
  })
    .populate('category', 'name slug')
    .limit(8)
    .select('-createdBy -updatedBy')

  res.json({
    success: true,
    data: relatedProducts
  })
}))

export default router
