const mongoose = require('mongoose')

const shortid = require ('shortid')


//creating the ufull url schema
const shortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate()
    },
    clicks:{
        type: Number,
        required: true,
        default:0
    }
})

const shortUrl = mongoose.model('shortUrl', shortUrlSchema)
module.exports = shortUrl