import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    data: users
  })
}))

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.json({
    success: true,
    data: user
  })
}))

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
    user.gender = req.body.gender || user.gender

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      success: true,
      data: updatedUser
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}))

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

  await user.deleteOne()

  res.json({
    success: true,
    message: 'User deleted successfully'
  })
}))

export default router
