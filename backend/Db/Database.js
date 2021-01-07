
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDb = async (db) =>{
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('---------- Mongo Db Is Connected ----------')
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}


module.exports = connectDb;