import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discountPercentage: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%'],
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Product brand is required'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'Product SKU is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  lowStockAlert: {
    type: Number,
    default: 10
  },
  variants: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    options: [{
      value: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        default: 0
      },
      stock: {
        type: Number,
        default: 0
      },
      sku: {
        type: String,
        trim: true,
        uppercase: true
      }
    }]
  }],
  specifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: {
      type: Number,
      min: [0, 'Length cannot be negative']
    },
    width: {
      type: Number,
      min: [0, 'Width cannot be negative']
    },
    height: {
      type: Number,
      min: [0, 'Height cannot be negative']
    }
  },
  shipping: {
    isFreeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      min: [0, 'Shipping cost cannot be negative'],
      default: 0
    },
    estimatedDelivery: {
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 7
      }
    }
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  ratings: {
    average: {
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  salesCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// Indexes for better query performance
productSchema.index({ category: 1 })
productSchema.index({ brand: 1 })
productSchema.index({ price: 1 })
productSchema.index({ 'ratings.average': -1 })
productSchema.index({ salesCount: -1 })
productSchema.index({ createdAt: -1 })
productSchema.index({ isActive: 1 })
productSchema.index({ isFeatured: 1 })
productSchema.index({ tags: 1 })
productSchema.index({ 'seo.slug': 1 })
productSchema.index({ sku: 1 })

// Text search index
productSchema.index({
  name: 'text',
  description: 'text',
  brand: 'text',
  tags: 'text'
})

// Virtual for discount amount
productSchema.virtual('discountAmount').get(function() {
  if (this.originalPrice && this.discountPercentage > 0) {
    return this.originalPrice - this.price
  }
  return 0
})

// Virtual for in stock status
productSchema.virtual('inStock').get(function() {
  return this.stock > 0
})

// Virtual for low stock status
productSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.lowStockAlert && this.stock > 0
})

// Auto-generate slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  next()
})

// Calculate discount percentage if original price is provided
productSchema.pre('save', function(next) {
  if (this.originalPrice && this.price && this.originalPrice > this.price) {
    this.discountPercentage = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
    this.isOnSale = true
  } else if (this.discountPercentage > 0) {
    this.isOnSale = true
  } else {
    this.isOnSale = false
  }
  next()
})

export default mongoose.model('Product', productSchema)
