import { request, response } from "express"
import { productModel } from "../models/product.model.js"

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
    await product.save()
    res.status(200).json({
        message: 'Datos agregados correctamente',
        data: body
    })
}

const productsPut = async (req = request, res = response) => {
    const { id, data } = req.body
    res.status(200).json({
        message: 'Datos actualizados correctamente',
        data: {id, data}
    })
}

const productsDelete = async (req = request, res = response) => {
    const { id } = req.body
    await productModel.findByIdAndDelete(id)
    res.status(200).json({
        message: 'Dato eliminado correctamente',
        data: {id}
    })
}

export { productsGet, productsPost, productsPut, productsDelete }