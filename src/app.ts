// ENV variables
require("dotenv").config()

import express from "express"
import config from "config"

const app = express()

// JSON middleware
app.use(express.json())

// DB
import db from "../config/db"

// Router
import router from "./router"

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware"
app.use(morganMiddleware)
app.use("/api", router)

// Logger
import Logger from "../config/logger"

// app port
const port = config.get<number>("port")

app.listen(port, async() => {
    await db()
    Logger.info(`Server list in port ${port}`)
})