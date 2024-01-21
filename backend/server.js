require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("./utils/cors")
const port = 5000

// api routes
const FaqRoutes = require("./routes/faqRoutes")
const ServicesRoutes = require("./routes/serviceRoutes")
// start the app
const app = express()

// middleware
app.use(cors)
app.use(bodyParser.json({limit: "10mb"}))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true}))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({ limit: "10mb", extended: true}))



// base route
app.get("/", (req,res) => {
    res.send("Welcome to crash course api")
})
// api routes
app.use("/api/faqs", FaqRoutes)
app.use("/api/services", ServicesRoutes)
// database connection
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.log("Couldn't connect to MongoDB...", err))
// start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
