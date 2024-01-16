import { Router } from 'express'
import { productsGet, productsPost, productsPut, productsDelete } from '../controllers/product.controller.js'
import { guardToken } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/products', productsGet)

router.post('/products', guardToken, productsPost)

router.put('/products', productsPut)

router.delete('/products', productsDelete)

export { router as productRoutes }