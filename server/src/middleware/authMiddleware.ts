import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  userId?: string
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication required',
    })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
  return res.status(401).json({
    message: 'Authentication token is missing',
  })
} 
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined')
  }

 try {
  const decoded = jwt.verify(token, jwtSecret)

  if (
    typeof decoded === 'string' ||
    !decoded.userId ||
    typeof decoded.userId !== 'string'
  ) {
    return res.status(401).json({
      message: 'Invalid token',
    })
  }

  req.userId = decoded.userId

  next()
} catch {
  return res.status(401).json({
    message: 'Invalid or expired token',
  })
}
}

export { authMiddleware, type AuthRequest }