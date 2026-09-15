import { Router } from 'express'
import { submitContact, getContacts } from '../controllers/contact.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.post('/', submitContact)
router.get('/', authMiddleware, getContacts)

export { router as contactRoutes }
