import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  images: [{
    public_id: String,
    url: String
  }],
  pros: [{
    type: String,
    trim: true
  }],
  cons: [{
    type: String,
    trim: true
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isHelpful: {
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    },
    votedUsers: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      vote: {
        type: String,
        enum: ['up', 'down']
      }
    }]
  },
  adminResponse: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
})

// Indexes
reviewSchema.index({ product: 1 })
reviewSchema.index({ user: 1 })
reviewSchema.index({ rating: 1 })
reviewSchema.index({ isApproved: 1 })
reviewSchema.index({ createdAt: -1 })

// Compound index to prevent duplicate reviews
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

// Update product ratings when review is saved
reviewSchema.post('save', async function() {
  const Review = mongoose.model('Review')
  const Product = mongoose.model('Product')
  
  const stats = await Review.aggregate([
    { $match: { product: this.product, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        distribution: {
          $push: '$rating'
        }
      }
    }
  ])
  
  if (stats.length > 0) {
    const { averageRating, totalReviews, distribution } = stats[0]
    
    // Calculate rating distribution
    const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    distribution.forEach(rating => {
      ratingDist[rating]++
    })
    
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': Math.round(averageRating * 10) / 10,
      'ratings.count': totalReviews,
      'ratings.distribution': ratingDist
    })
  }
})

// Update product ratings when review is deleted
reviewSchema.post('remove', async function() {
  const Review = mongoose.model('Review')
  const Product = mongoose.model('Product')
  
  const stats = await Review.aggregate([
    { $match: { product: this.product, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        distribution: {
          $push: '$rating'
        }
      }
    }
  ])
  
  if (stats.length > 0) {
    const { averageRating, totalReviews, distribution } = stats[0]
    
    const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    distribution.forEach(rating => {
      ratingDist[rating]++
    })
    
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': Math.round(averageRating * 10) / 10,
      'ratings.count': totalReviews,
      'ratings.distribution': ratingDist
    })
  } else {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': 0,
      'ratings.count': 0,
      'ratings.distribution': { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    })
  }
})

export default mongoose.model('Review', reviewSchema)
