import { Router } from 'express'
import { getAllEbooks, getEbookById, createEbook, updateEbook, deleteEbook } from '../controllers/ebooks.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.get('/', getAllEbooks)
router.get('/:id', getEbookById)
router.post('/', authMiddleware, createEbook)
router.put('/:id', authMiddleware, updateEbook)
router.delete('/:id', authMiddleware, deleteEbook)

export { router as ebooksRoutes }
