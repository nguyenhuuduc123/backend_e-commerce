const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const categoryRouter = require('./routes/productCategoryRoute');
const blogcategoryRouter = require('./routes/blogCategoryRoute');
const brandRouter = require('./routes/brandRoute');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;

dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser())
app.use('/api/user',authRouter)
app.use('/api/product',productRouter)
app.use('/api/blog',blogRouter)
app.use('/api/category',categoryRouter)
app.use('/api/blogcategory',blogcategoryRouter)
app.use('/api/brand',brandRouter)
app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=> {
        console.log(`server is running on ${PORT}`)
});
