//Scraper routes
const express = require("express"),
      db        = require("../models"),
      scrape    = require("../scraper/scraper"),
      router    = express.Router()

 router.get('/api/scrape', (req, res) => {
    scrape(() => {
        res.redirect('/');
    });
});

router.get('/', (req, res) => {
    db.Article.find({}).then(grabFromDb => {
        console.log(grabFromDb, 'articles in database');

        const hbsObject = { articles: grabFromDb };
        res.render('index', hbsObject);
    }).catch(error => res.json(error));

});

router.post("/saved/:id", (req, res) => {
    const id = req.params.id;
    const updater = {
        "_id": id
    }
    db.Article.findOneAndUpdate(updater, {"saved": true})
        .then( save => {
            console.log('article saved', save);
        }).catch(error => res.json(error));
})


//post a note
router.post("/notes/:id", (req, res ) => {
    db.Note.create(req.body, (error, doc) => {
        console.log(doc)
        if (error) {
            res.json(error)
        } else {
            db.Note.findOneAndUpdate({
                "id": req.params.id
            }, {
                "$push": {
                    "Notes": doc.id
                }
            }, {
                "safe":   true,
                "upsert": true,
                "new":    true
            }).exec((error, doc) => { //if all true execute the query
                if (error) {
                    res.json(error);
                } else {
                    res.redirect("back")
                }
            });
        }
    });
});


router.post("/deleteNote/:id", (req, res) => {
    let {articleId, noteId} = req.body;
    db.Note.remove({"_id": noteId})
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

router.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    
    db.Article.findOne( { "_id": id } )
        .populate('note').then( notes => {
            res.json( notes );
        }).catch( error => console.log(error));
});

router.get('/saved', (req, res) => {
    db.Article.find({ saved: true })
        .sort({ time: -1 })
        .then(savedArt => {
            const saved = {
                articles: savedArt
            };
            console.log(`SAVED: ${saved.Article}`)
            res.render('saved', saved);
        }).catch(err => {
            res.json(`ERROR: ${err}`);
            console.log(`ERROR ${err}`);
        })
});

router.post("/remove/:id", (req, res) => {
    const removeID = req.params.id
    db.Article.deleteOne ({"_id": removeID})
        .then(result => res.json(result))
        .catch(error => res.json(error));
})


module.exports = router;
