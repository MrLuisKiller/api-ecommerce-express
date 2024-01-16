import { request, response } from 'express'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'

const chkToken = async (req = request, res = response, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            const token = authorization.split(' ')[1]
            if (JWT.verify(token, config().parsed.SECRET))
                next()
        } else {
            res.status(401).json({
                message: 'No hay token Bearer'
            })
        }
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
}

export { chkToken as guardToken }