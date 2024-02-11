const express = require('express');
const dotenv = require('dotenv');
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require("./config/db")

const app = express();
const PORT = process.env.PORT || 5000;


//Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('API is running....')
})

app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})