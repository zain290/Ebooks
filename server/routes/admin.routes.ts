import { Router } from 'express'
import { login, logout, checkAuth } from '../controllers/admin.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, checkAuth)

export { router as adminRoutes }
