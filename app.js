const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv/config")


const userRoute = require("./routes/userRoute")
const eventRoute = require("./routes/eventRoute")

const app = express()

app.use(express.json())
app.use(cors());

// middlewares
app.use("/api/user",userRoute)
app.use("/api/events",eventRoute)

// connection

app.listen( process.env.PORT || 5000)

app.get("/",(req,res)=>{
    res.send("home")
})

// db connection

async function db() {
    try {
        const res = await mongoose.connect(process.env.DB)
        console.log(res.STATES.connected);
    } catch (error) {
        console.log(error.message);
    }
}

db()