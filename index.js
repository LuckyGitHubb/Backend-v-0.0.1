require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors')


app.use(express.json());
app.use(cors())
const connectionDB = require('./config/db');
const router = require('./routes/transactionRoute');
const PORT_NO = '5000';

app.use('/transaction',router)

app.listen(PORT_NO,async()=>{
    try {
        await connectionDB()
        console.log(`Server is running at Port No ${PORT_NO}`)
        
    } catch (error) {
        console.log(`Server is not running at Port No : ${PORT_NO} " " ${error}`)
    }
})