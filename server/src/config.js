const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })


module.exports = {
    secret: process.env.JWT_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
};