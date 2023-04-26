const mongoose = require('mongoose')

const Schema = mongoose.Schema

const calSchema = new Schema({
    muscle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        require: true
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number,
        required: true
    },
    exp: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Calisthenic', calSchema)