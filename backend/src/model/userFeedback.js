const mongoose = require('mongoose');

const userFeedbackSchema = mongoose.Schema({
    username: String,
    email: String,
    category: String,
    feedback: String
}, { timestamps : true });

module.exports = mongoose.model('feedback', userFeedbackSchema);