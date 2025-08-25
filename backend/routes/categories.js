import express from 'express'
import asyncHandler from 'express-async-handler'
import Category from '../models/Category.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { body, validationResult } from 'express-validator'
import { isConnected } from '../config/database.js'

const router = express.Router()

// Simple mock data to use when DB is not available
const mockCategories = [
  { _id: 'mock1', name: 'Electronics', productCount: 12, isActive: true },
  { _id: 'mock2', name: 'Fashion', productCount: 8, isActive: true },
  { _id: 'mock3', name: 'Home', productCount: 5, isActive: false }
]

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  // If DB isn't connected, return mock data to avoid timeouts
  if (!isConnected) {
    return res.json({ success: true, data: mockCategories })
  }

  const categories = await Category.find({ isActive: true })
    .populate('subcategories')
    .sort({ sortOrder: 1, name: 1 })

  res.json({
    success: true,
    data: categories
  })
}))

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  // Fallback to mock data when DB is not available
  if (!isConnected) {
    const found = mockCategories.find(m => m._id === req.params.id || m.name === req.params.id)
    if (!found) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }
    return res.json({ success: true, data: found })
  }

  const category = await Category.findById(req.params.id)
    .populate('subcategories')

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    })
  }

  res.json({
    success: true,
    data: category
  })
}))

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', protect, admin, [
  body('name').trim().notEmpty().withMessage('Category name is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  const category = await Category.create(req.body)

  res.status(201).json({
    success: true,
    data: category
  })
}))

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    })
  }

  res.json({
    success: true,
    data: category
  })
}))

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    })
  }

  await category.deleteOne()

  res.json({
    success: true,
    message: 'Category deleted successfully'
  })
}))

export default router
