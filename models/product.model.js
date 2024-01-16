import { Schema, model } from 'mongoose'

const productsSchema = Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    categories: { type: Array },
    manufacturer: { type: String },
    sku: { type: String },
    image: { type: String },
    active: { type: Number },
}, { versionKey: false })

const productModel = model('Product', productsSchema)

export { productModel }