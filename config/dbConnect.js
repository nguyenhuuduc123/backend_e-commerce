const {default: mongoose} = require('mongoose')
mongoose.set('strictQuery', true);


const dbConnect = () => {
        try {
            const conn = mongoose.connect(process.env.MONGODB_URL);
            console.log('database connected succesfully')
        } catch (error) {
            console.log('database error');
        }

}

module.exports = dbConnect;