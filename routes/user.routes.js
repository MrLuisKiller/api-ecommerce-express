import { Router } from 'express'
import { usersGet, usersPost, usersPut, usersDelete, loginPost } from '../controllers/user.controller.js'

const router = Router()

router.get('/users', usersGet)

router.post('/users', usersPost)

router.post('/login', loginPost)

router.put('/users', usersPut)

router.delete('/users', usersDelete)

export { router as userRoutes}