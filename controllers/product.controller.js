import { request, response } from 'express'
import { productModel } from '../models/product.model.js'

const productsGet = async (req = request, res = response) => {
    const products = await productModel.find()
    res.status(200).json({
        message: 'Datos cargados correctamente',
        data: products
    })
}

const productsPost = async (req = request, res = response) => {
    const { body } = req
    let product = productModel(body)
    const newProduct = await product.save()
    res.status(200).json({
        message: 'Datos agregados correctamente',
        data: newProduct
    })
}

const productsPut = async (req = request, res = response) => {
    const { id, data } = req.body
    const updatedProduct = await productModel.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({
        message: 'Producto actualizado',
        data: updatedProduct
    })
}

const productsDelete = async (req = request, res = response) => {
    const { id } = req.body
    const product = await productModel.findByIdAndDelete(id)
    res.status(200).json({
        message: 'Registro eliminado correctamente',
        data: product
    })
}

export { productsGet, productsPost, productsPut, productsDelete }