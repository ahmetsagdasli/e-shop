import express from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  const { firstName, lastName, email, password } = req.body

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    })
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      }
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}))

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  const { email, password } = req.body

  // Check for user and include password
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    })
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    })
  }

  // Check password
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    })
  }

  // Update last login
  user.lastLogin = new Date()
  await user.save()

  res.json({
    success: true,
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id)
    }
  })
}))

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
import { protect } from '../middleware/authMiddleware.js'

router.get('/me', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  
  res.json({
    success: true,
    data: user
  })
}))

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
}))

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with this email'
    })
  }

  // For now, just return success message
  // In production, you would generate reset token and send email
  res.json({
    success: true,
    message: 'Password reset email sent'
  })
}))

export default router
