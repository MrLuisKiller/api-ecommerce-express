import { request, response } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'
import { userModel } from '../models/user.model.js'

const salt = 10

const usersGet = async (req = request, res = response) => {
    const users = await userModel.find()
    res.status(200).json({
        message: 'Datos cargados correctamente',
        data: users
    })
}

const usersPost = async (req = request, res = response) => {
    const { body } = req
    let user = userModel(body)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.status(200).json({
        message: 'Datos agregados correctamente',
        data: user
    })
}

const usersPut = async (req = request, res = response) => {
    const { id, data } = req.body
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({
        message: 'Usuario actualizado',
        data: updatedUser
    })
}

const usersDelete = async (req = request, res = response) => {
    const { id } = req.body
    const user = await userModel.findByIdAndDelete(id)
    res.status(200).json({
        message: 'Registro eliminado correctamente',
        data: user
    })
}

const loginPost = async (req = request, res = response) => {
    let status, message, data, token = null
    const body = req.body
    const userInfo = await userModel.findOne({ email: body.email, active: true })
    if (userInfo === null) {
        status = 400
        message = 'User not found or not active'
        data = null
    } else {
        const comparePassword = await bcrypt.compare(body.password, userInfo.password)
        if (!comparePassword) {
            status = 401
            message = 'Invalid password'
        } else {
            const { id, email, password } = userInfo
            status = 200
            token = JWT.sign({ id, email, password }, config().parsed.SECRET)
            message = 'Login success'
        }
        data = comparePassword
    }
    if (token == null)
        res.status(status).json({ message, data })
    else
        res.status(status).cookie('JWT', token).json({ message, data })
}

export { usersGet, usersPost, usersPut, usersDelete, loginPost }