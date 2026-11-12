import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'


const router = express.Router()

// Regiter route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters',
      })
    }

    // Check whether this email is already registered
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exists',
      })
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)

    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined')
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      }
    )

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})


export default router