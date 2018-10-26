const mongoose = require("mongoose");
const MONGODB  = process.env.MONGODB_URI || process.env.MONGO_LOCAL
//connect to mongo
mongoose.Promise = Promise;
mongoose.connect(MONGODB, { useNewUrlParser: true });
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        "type": String,
        "required": true
    },

    link: {
        "type": String,
        "required": true
    },
    
    date: {
        "type": String,
        "requried": true
    },
    
    body: {
        "type": String,
        "required": true,
    },

    saved: {
        "type": Boolean,
        "default": false,
        "false": false

    },

    note: {
        "type": Schema.Types.ObjectId,
        "ref": "Note"
    }
});

//creates model from schema above. 
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;