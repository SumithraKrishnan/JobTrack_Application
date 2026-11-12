import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import applicationRoutes from './routes/applicationsRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/api', (req, res) => {
  res.json({
    message: 'JobTrack API is running',
  })
})

// connecting Mongoose to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined')
    }

    await mongoose.connect(mongoUri)

    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  }
}

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})