
const mongoose = require('mongoose');
require('dotenv').config()

async function dbConnect(){

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Successfully connected to mongoDB atlas')
    }).catch((error) => {
        console.log('unable to connect to mongoDB atlas')
        console.error(error)
    })
}

module.exports = dbConnect;