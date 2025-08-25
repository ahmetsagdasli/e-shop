const API_BASE_URL = 'http://localhost:5000/api'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: any[]
  pagination?: any
  message?: string
}

class ApiService {
  private baseURL = API_BASE_URL
  private token: string | null = null

  constructor() {
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Auth endpoints
  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  // Product endpoints
  async getProducts(params: any = {}): Promise<ApiResponse<Product[]>> {
    const query = new URLSearchParams(params).toString()
    return this.request(`/products?${query}`)
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  async getProductBySlug(slug: string) {
    return this.request(`/products/slug/${slug}`)
  }

  async getRelatedProducts(id: string) {
    return this.request(`/products/${id}/related`)
  }

  // Categories
  async getCategories() {
    return this.request('/categories')
  }

  async getCategory(id: string) {
    return this.request(`/categories/${id}`)
  }

  // Admin category management
  async createCategory(data: { name: string; description?: string; parent?: string }) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateCategory(id: string, data: any) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    })
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart')
  }

  async addToCart(productId: string, quantity: number = 1, variant?: any) {
    return this.request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, variant }),
    })
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  }

  async removeFromCart(itemId: string) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'DELETE',
    })
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE',
    })
  }

  // Orders
  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getMyOrders() {
    return this.request('/orders/myorders')
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`)
  }

  // Reviews
  async getProductReviews(productId: string) {
    return this.request(`/reviews/product/${productId}`)
  }

  async createReview(reviewData: {
    product: string
    rating: number
    title?: string
    comment?: string
    pros?: string[]
    cons?: string[]
  }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  // Analytics (Admin only)
  async getAnalytics() {
    return this.request('/analytics/dashboard')
  }

  // User profile
  async getUserProfile() {
    return this.request('/users/profile')
  }

  async updateUserProfile(userData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  // Payment
  async getPaymentMethods() {
    return this.request('/payment/methods')
  }

  async processPayment(paymentData: any) {
    return this.request('/payment/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }
}

export const apiService = new ApiService()
export default apiService
