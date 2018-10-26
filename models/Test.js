const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;