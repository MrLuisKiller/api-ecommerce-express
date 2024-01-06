import { Router } from "express"
import { productsGet, productsPost, productsPut, productsDelete } from '../controllers/product.controller.js'

const router = Router()

router.get('/products', productsGet)

router.post('/products', productsPost)

router.put('/products', productsPut)

router.delete('/products', productsDelete)

export { router as productRoutes }