import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { productRoutes } from './routes/product.routes.js'
import { dbConnection } from './database/config.js'

const app = express()
const PORT = config().parsed.PORT

app.use(json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API ecommerce UCamp v1.0')
})

; (async () => {
    await dbConnection()
    app.use(productRoutes)
})()

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
