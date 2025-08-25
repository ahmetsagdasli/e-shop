import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`)
    isConnected = true
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`)
    console.log(`🔄 Continuing without database - using mock data`)
    isConnected = false
  }
}

export { connectDB, isConnected }
export default connectDB
