const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

module.exports = {
    secret: process.env.JWT_SECRET
};