import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pool from './config/db.js'
import { errorHandler } from "./middlewares/error-handler.js";
import authRoutes from './routes/auth-route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.use('/api/auth/', authRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})