import { Router } from 'express'
import { getHealth } from '../controllers/api.controller'
import { getImages, saveImage, deleteImage } from '../controllers/images.controller'
import { generateImage } from '../controllers/generate.controller'
import { getSettings } from '../controllers/settings.controller'
import { getPage } from '../controllers/pages.controller'
import { chat } from '../controllers/chat.controller'
import { ebooksRoutes } from './ebooks.routes'
import { adminRoutes } from './admin.routes'
import { contactRoutes } from './contact.routes'
import { uploadRoutes } from './upload.routes'

const router = Router()

router.get('/health', getHealth)
router.get('/images', getImages)
router.post('/images', saveImage)
router.delete('/images/:id', deleteImage)
router.post('/generate', generateImage)
router.get('/settings', getSettings)
router.get('/pages/:slug', getPage)
router.post('/chat', chat)

router.use('/ebooks', ebooksRoutes)
router.use('/admin', adminRoutes)
router.use('/contact', contactRoutes)
router.use('/upload', uploadRoutes)

export { router as apiRoutes }
