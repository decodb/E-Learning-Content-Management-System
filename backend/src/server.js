import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pool from './config/db.js'
import { errorHandler } from "./middlewares/error-handler.js";
import authRoutes from './routes/auth-route.js'
import adminRoutes from './routes/admin-routes.js'
import lecturerRoutes from './routes/lecturer-routes.js'
import studentRoutes from './routes/student-routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.use('/api/auth/', authRoutes)
app.use('/api/admin/', adminRoutes)
app.use('/api/lecturer/', lecturerRoutes)
app.use('/api/student/', studentRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})