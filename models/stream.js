const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StreamSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    msg: [{
        order: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
});

mongoose.model('stream', StreamSchema);
