import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { isConnected } from '../config/database.js'
import { mockAnalytics } from '../data/mockData.js'

const router = express.Router()

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Public (for demo purposes)
router.get('/dashboard', asyncHandler(async (req, res) => {
  // Use mock data if database is not connected
  if (!isConnected) {
    return res.json({
      success: true,
      data: mockAnalytics,
      message: 'Using demo data - database not connected'
    })
  }

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    totalOrders,
    totalRevenue,
    totalUsers,
    totalProducts,
    recentOrders,
    monthlyRevenue,
    topProducts,
    ordersByStatus
  ] = await Promise.all([
    // Total orders
    Order.countDocuments(),
    
    // Total revenue
    Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    
    // Total users
    User.countDocuments(),
    
    // Total products
    Product.countDocuments(),
    
    // Recent orders
    Order.find({})
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10),
    
    // Monthly revenue (last 30 days)
    Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    
    // Top selling products
    Product.find({})
      .sort({ salesCount: -1 })
      .limit(5)
      .select('name salesCount price images'),
    
    // Orders by status
    Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
  ])

  res.json({
    success: true,
    data: {
      overview: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        totalProducts
      },
      recentOrders,
      monthlyRevenue,
      topProducts,
      ordersByStatus: ordersByStatus.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {})
    }
  })
}))

// @desc    Get sales analytics
// @route   GET /api/analytics/sales
// @access  Private/Admin
router.get('/sales', protect, admin, asyncHandler(async (req, res) => {
  const { period = 'month' } = req.query
  
  let dateFormat = '%Y-%m-%d'
  let dateFilter = new Date()
  
  switch (period) {
    case 'week':
      dateFilter.setDate(dateFilter.getDate() - 7)
      break
    case 'month':
      dateFilter.setMonth(dateFilter.getMonth() - 1)
      break
    case 'year':
      dateFilter.setFullYear(dateFilter.getFullYear() - 1)
      dateFormat = '%Y-%m'
      break
    default:
      dateFilter.setMonth(dateFilter.getMonth() - 1)
  }

  const salesData = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: { $gte: dateFilter }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
        revenue: { $sum: '$totalAmount' },
        orders: { $sum: 1 },
        averageOrderValue: { $avg: '$totalAmount' }
      }
    },
    { $sort: { _id: 1 } }
  ])

  res.json({
    success: true,
    data: salesData
  })
}))

// @desc    Get product analytics
// @route   GET /api/analytics/products
// @access  Private/Admin
router.get('/products', protect, admin, asyncHandler(async (req, res) => {
  const [
    topSellingProducts,
    lowStockProducts,
    categoryWiseSales,
    recentlyAddedProducts
  ] = await Promise.all([
    // Top selling products
    Product.find({})
      .sort({ salesCount: -1 })
      .limit(10)
      .populate('category', 'name')
      .select('name salesCount price stock images category'),
    
    // Low stock products
    Product.find({ stock: { $lte: 10 }, isActive: true })
      .sort({ stock: 1 })
      .limit(10)
      .select('name stock lowStockAlert'),
    
    // Category wise sales
    Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$categoryInfo.name' },
          totalSales: { $sum: '$salesCount' },
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      },
      { $sort: { totalSales: -1 } }
    ]),
    
    // Recently added products
    Product.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('category', 'name')
      .select('name price stock createdAt images category')
  ])

  res.json({
    success: true,
    data: {
      topSellingProducts,
      lowStockProducts,
      categoryWiseSales,
      recentlyAddedProducts
    }
  })
}))

// @desc    Get user analytics
// @route   GET /api/analytics/users
// @access  Private/Admin
router.get('/users', protect, admin, asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    userGrowth,
    activeUsers,
    usersByRole,
    topCustomers
  ] = await Promise.all([
    // User growth over time
    User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          newUsers: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    
    // Active users (logged in last 30 days)
    User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    }),
    
    // Users by role
    User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]),
    
    // Top customers by order value
    Order.aggregate([
      {
        $match: { isPaid: true }
      },
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          totalSpent: 1,
          orderCount: 1,
          userName: { $concat: [{ $arrayElemAt: ['$userInfo.firstName', 0] }, ' ', { $arrayElemAt: ['$userInfo.lastName', 0] }] },
          userEmail: { $arrayElemAt: ['$userInfo.email', 0] }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ])
  ])

  res.json({
    success: true,
    data: {
      userGrowth,
      activeUsers,
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {}),
      topCustomers
    }
  })
}))

export default router
