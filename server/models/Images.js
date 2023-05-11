const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    url: {
        type: String
    },
    embed: {
        type: String,
        default: 'No embed.' // well hang on to this for reference
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
})

const DailyImage = model('Image', imageSchema );

module.exports = DailyImage;