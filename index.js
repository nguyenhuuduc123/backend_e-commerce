const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const authRouter = require('./routes/authRoute')
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser())

app.use('/api/user',authRouter)

app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=> {
        console.log(`server is running on ${PORT}`)
});
