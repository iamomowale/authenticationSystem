const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const userrouter = require('./routes/userRouter')
const passwordReset = require('./routes/passwordreset')
require('dotenv').config()

//set up express
const app = express()
app.use(express.json())
app.use(cors())

//Setting up Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has started at port: ${PORT}`))

//Setting up mongoose
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
    },
    (error) => {
        if(error) throw error
            
        console.log('MongoDB Connection Established')
    }
)

//Set up routes

//User routes
app.use("/users", userrouter.router)

//Password reser routes
app.use("/users/password-reset", passwordReset)