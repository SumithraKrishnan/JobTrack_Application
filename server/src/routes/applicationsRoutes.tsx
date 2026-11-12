import express from 'express'
import Application from '../models/Application.js'
import {
  authMiddleware,
  type AuthRequest,
} from '../middleware/authMiddleware.js'

const router = express.Router()

// POST /api/applications - Create a new application
router.post(
  '/',
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      const {
        company,
        role,
        location,
        salary,
        status,
        appliedDate,
        jobUrl,
        notes,
      } = req.body

      if (!company || !role) {
        return res.status(400).json({
          message: 'Company and job role are required',
        })
      }

      if (!req.userId) {
        return res.status(401).json({
          message: 'Authentication required',
        })
      }

      const application = await Application.create({
        userId: req.userId,
        company,
        role,
        location,
        salary,
        status,
        appliedDate: appliedDate || undefined,
        jobUrl,
        notes,
      })

      return res.status(201).json({
        message: 'Application added successfully',
        application,
      })
    } catch (error) {
      console.error('Create application error:', error)

      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
)

// GET /api/applications - Get all applications for the authenticated user
router.get(
  '/',
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({
          message: 'Authentication required',
        })
      }

      const applications = await Application.find({
        userId: req.userId,
      }).sort({ createdAt: -1 })

      return res.status(200).json({
        applications,
      })
    } catch (error) {
      console.error('Get applications error:', error)

      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
)

// delete /api/applications/:id - Delete an application by ID
router.delete(
  '/:id',
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({
          message: 'Authentication required',
        })
      }

      const application = await Application.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

      if (!application) {
        return res.status(404).json({
          message: 'Application not found',
        })
      }

      return res.status(200).json({
        message: 'Application deleted successfully',
      })
    } catch (error) {
      console.error('Delete application error:', error)

      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
)

// PUT /api/applications/:id - Update an application by ID
router.put(
  '/:id',
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({
          message: 'Authentication required',
        })
      }

      const {
        company,
        role,
        location,
        salary,
        status,
        appliedDate,
        jobUrl,
        notes,
      } = req.body

      if (!company || !role) {
        return res.status(400).json({
          message: 'Company and job role are required',
        })
      }

      const application = await Application.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          company,
          role,
          location,
          salary,
          status,
          appliedDate: appliedDate || undefined,
          jobUrl,
          notes,
        },
        {
          returnDocument: 'after',
          runValidators: true,
        }
      )

      if (!application) {
        return res.status(404).json({
          message: 'Application not found',
        })
      }

      return res.status(200).json({
        message: 'Application updated successfully',
        application,
      })
    } catch (error) {
      console.error('Update application error:', error)

      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
)

// GET /api/applications/:id - Get a specific application by ID for editing the form so that the user can edit the application and submit it to update the application in the database.
router.get(
  '/:id',
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({
          message: 'Authentication required',
        })
      }

      const application = await Application.findOne({
        _id: req.params.id,
        userId: req.userId,
      })

      if (!application) {
        return res.status(404).json({
          message: 'Application not found',
        })
      }

      return res.status(200).json({
        application,
      })
    } catch (error) {
      console.error('Get application error:', error)

      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
)


export default router