const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.router');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter)


app.listen(8080,async()=>{
await connection
console.log("DB is connected")
console.log("Port is running at 8080")
})