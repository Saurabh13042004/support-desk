const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const {errorHandler} =  require('./middleware/errorMiddleware')

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.json({message:'Hello from server'})
})
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})