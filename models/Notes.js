const mongoose = require("mongoose");
const MONGODB  = process.env.MONGODB_URI || process.env.MONGO_LOCAL
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;