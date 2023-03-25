const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {notesRouter}=require("./routes/notes.routes")
const{auth}=require("./middlewares/auth.middleware")
require("dotenv").config()
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use(auth)

app.use("/notes",notesRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on port ${process.env.port} `)
})