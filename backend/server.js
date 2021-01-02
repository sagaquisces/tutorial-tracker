const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const server = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

server.use(cors(corsOptions))

server.use(bodyParser.json())

server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.json({ message: "Welcome to Tutorials."})
})

const port = process.env.PORT || 8080

const db = require("./models")

db.mongoose
    .connect(process.env.DB_HOST, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to the database!");    
    })
    .catch((err) => {
        console.log(err)
        process.exit()
    })

require("./routes/tutorial.routes")(server);

server.listen(port, () => console.log(`Server is running on port ${port}.`))
