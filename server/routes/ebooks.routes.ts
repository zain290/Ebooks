import { Router } from 'express'
import { getAllEbooks, getEbookById, createEbook } from '../controllers/ebooks.controller'

const router = Router()

router.get('/', getAllEbooks)
router.get('/:id', getEbookById)
router.post('/', createEbook)

export { router as ebooksRoutes }
