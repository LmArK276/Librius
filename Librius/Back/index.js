const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')

var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)
const bookRoutes = require('./routes/books')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use("/books",bookRoutes)
app.use("/auth",authRoutes)
app.use("/user",userRoutes)

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})