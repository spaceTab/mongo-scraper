require("dotenv").config();
const express  = require("express");
const exphbs   = require("express-handlebars");
const mongoose = require("mongoose");
const MONGODB  = process.env.MONGODB_URI || process.env.MONGO_LOCAL
const parser   = require("body-parser");
const routes   = require("./routes/apiroute");
const PORT     = process.env.PORT || 3000;

const app    = express();

app.use(parser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//setting up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/", routes);

//connect to mongo
mongoose.Promise = Promise;
mongoose.connect(MONGODB, { useNewUrlParser: true });

//checking if there's an error
const db  = mongoose.connection;
db.on("Error", error => { console.log(`Mongo-error: ${error}`) })
db.once("open", () => { console.log("[Connection to Mongoose] -> Success") });

app.listen(PORT, () => {
    console.log(`[LISTENING ON:${PORT}]`);
})