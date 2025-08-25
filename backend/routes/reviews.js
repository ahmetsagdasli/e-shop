import express from 'express'
import asyncHandler from 'express-async-handler'
import Review from '../models/Review.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get('/product/:productId', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ 
    product: req.params.productId, 
    isApproved: true 
  })
    .populate('user', 'firstName lastName avatar')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    data: reviews
  })
}))

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { product, rating, title, comment, pros, cons } = req.body

  // Check if product exists
  const productExists = await Product.findById(product)
  if (!productExists) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  // Check if user has purchased this product
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    'items.product': product,
    status: { $in: ['delivered', 'completed'] }
  })

  const review = await Review.create({
    product,
    user: req.user._id,
    rating,
    title,
    comment,
    pros,
    cons,
    isVerifiedPurchase: !!hasPurchased,
    isApproved: true // Auto-approve for now
  })

  const populatedReview = await Review.findById(review._id)
    .populate('user', 'firstName lastName avatar')

  res.status(201).json({
    success: true,
    data: populatedReview
  })
}))

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Private/Admin
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'firstName lastName email')
    .populate('product', 'name')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    data: reviews
  })
}))

// @desc    Approve/Reject review
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
router.put('/:id/approve', protect, admin, asyncHandler(async (req, res) => {
  const { isApproved } = req.body

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isApproved },
    { new: true }
  ).populate('user', 'firstName lastName')

  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    })
  }

  res.json({
    success: true,
    data: review
  })
}))

export default router
