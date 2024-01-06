import mongoose from "mongoose"
import { config } from "dotenv"

const dbConnection = async () => {
    try {
        await mongoose.connect(config().parsed.MONGO_DB)
        console.log('Conexion a base de datos exitosa!!')
    } catch (err) {
        console.error(err)
        throw new Error("Error a la hora de conectar con la base de datos...")
    }
}

export { dbConnection }