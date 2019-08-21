const express = require('express');
const config = require('./config/db')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const clientRouter = require('./routes/client');
const productRouter = require('./routes/product');
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(config.mongoUrl, { useNewUrlParser: true }, (err) => {
    if (err) { throw err; }
    console.log("connection successfully to zero database !");
})
app.get('/', (req, res) => {
    res.write("hello");
    res.end();
})

app.use('/client/', clientRouter);
app.use('/product/', productRouter);

const port = process.env.PORT||4000;
app.listen(port,()=>console.log(`server up and running on port ${port}`));
