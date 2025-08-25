import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
    shippingCost = 0,
    taxAmount = 0,
    coupon
  } = req.body

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No order items'
    })
  }

  // Calculate order totals
  let subtotal = 0
  const items = []

  for (const item of orderItems) {
    const product = await Product.findById(item.product)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found: ${item.product}`
      })
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for product: ${product.name}`
      })
    }

    const orderItem = {
      product: product._id,
      name: product.name,
      image: product.images[0]?.url || '',
      price: product.price,
      quantity: item.quantity,
      variant: item.variant,
      sku: product.sku
    }

    items.push(orderItem)
    subtotal += product.price * item.quantity
  }

  let discountAmount = 0
  if (coupon) {
    // Apply coupon discount logic here
    // This is a simplified example
    if (coupon.discountType === 'percentage') {
      discountAmount = (subtotal * coupon.discountValue) / 100
    } else if (coupon.discountType === 'fixed') {
      discountAmount = coupon.discountValue
    }
  }

  const totalAmount = subtotal + shippingCost + taxAmount - discountAmount

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    taxAmount,
    discountAmount,
    totalAmount,
    coupon
  })

  // Update product stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity, salesCount: item.quantity }
    })
  }

  // Clear user's cart
  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [] }
  )

  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'firstName lastName email')
    .populate('items.product', 'name images')

  res.status(201).json({
    success: true,
    data: populatedOrder
  })
}))

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product', 'name images')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    data: orders
  })
}))

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'firstName lastName email')
    .populate('items.product', 'name images')

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    })
  }

  // Users can only see their own orders
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this order'
    })
  }

  res.json({
    success: true,
    data: order
  })
}))

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put('/:id/pay', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    })
  }

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address
  }

  const updatedOrder = await order.save()

  res.json({
    success: true,
    data: updatedOrder
  })
}))

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'firstName lastName email')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    data: orders
  })
}))

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, asyncHandler(async (req, res) => {
  const { status, note } = req.body

  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    })
  }

  order.status = status

  if (status === 'delivered') {
    order.isDelivered = true
    order.deliveredAt = Date.now()
  }

  // Add to status history
  order.statusHistory.push({
    status,
    note,
    updatedBy: req.user._id
  })

  const updatedOrder = await order.save()

  res.json({
    success: true,
    data: updatedOrder
  })
}))

export default router
