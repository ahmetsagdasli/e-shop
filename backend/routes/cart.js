import express from 'express'
import asyncHandler from 'express-async-handler'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product', 'name images price stock isActive')

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] })
  }

  res.json({
    success: true,
    data: cart
  })
}))

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
router.post('/items', protect, asyncHandler(async (req, res) => {
  const { productId, quantity = 1, variant } = req.body

  // Check if product exists and is active
  const product = await Product.findById(productId)
  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }

  // Check stock
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient stock'
    })
  }

  let cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] })
  }

  // Check if item already exists in cart
  const existingItem = cart.items.find(item => 
    item.product.toString() === productId &&
    JSON.stringify(item.variant) === JSON.stringify(variant)
  )

  if (existingItem) {
    existingItem.quantity += quantity
    existingItem.price = product.price
  } else {
    cart.items.push({
      product: productId,
      quantity,
      variant,
      price: product.price
    })
  }

  await cart.save()

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name images price stock isActive')

  res.json({
    success: true,
    data: populatedCart
  })
}))

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:itemId
// @access  Private
router.put('/items/:itemId', protect, asyncHandler(async (req, res) => {
  const { quantity } = req.body

  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    })
  }

  const item = cart.items.id(req.params.itemId)
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    })
  }

  // Check stock
  const product = await Product.findById(item.product)
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient stock'
    })
  }

  item.quantity = quantity
  await cart.save()

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name images price stock isActive')

  res.json({
    success: true,
    data: populatedCart
  })
}))

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
router.delete('/items/:itemId', protect, asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    })
  }

  cart.items.pull({ _id: req.params.itemId })
  await cart.save()

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name images price stock isActive')

  res.json({
    success: true,
    data: populatedCart
  })
}))

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
router.delete('/', protect, asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    })
  }

  cart.items = []
  await cart.save()

  res.json({
    success: true,
    message: 'Cart cleared successfully'
  })
}))

export default router
