require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors')


app.use(express.json());
app.use(cors())
const connectionDB = require('./config/db');
const transactionRouter = require('./routes/transactionRoute');
const purchaseRouter = require('./routes/purchaseRoute');
const saleRouter = require('./routes/saleRoute');
const branchRouter = require('./routes/branchRoute');
const productRouter = require('./routes/productRoute');
const stockRouter = require('./routes/stockRoute');
const invoiceRouter = require('./routes/invoiceRoute');
const PORT_NO = '5000';

app.use('/transaction',transactionRouter)
app.use('/purchase',purchaseRouter)
app.use('/sale',saleRouter)
app.use('/branch',branchRouter)
app.use('/product',productRouter)
app.use('/stock',stockRouter)   
app.use('/invoice',invoiceRouter)

app.listen(PORT_NO,async()=>{
    try {
        await connectionDB()
        console.log(`Server is running at Port No ${PORT_NO}`)
        
    } catch (error) {
        console.log(`Server is not running at Port No : ${PORT_NO} " " ${error}`)
    }
})