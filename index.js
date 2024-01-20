import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { dbConnection } from './database/config.js'
import { userRoutes } from './routes/user.routes.js'
import { productRoutes } from './routes/product.routes.js'

const app = express()
const PORT = config().parsed.PORT

app.use(json())
app.use(cors({ 'Access-Control-Allow-Origin': '*' }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API ecommerce UCamp v1.0')
})

; (async () => {
    await dbConnection()
    app.use(userRoutes)
    app.use(productRoutes)
})()

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
