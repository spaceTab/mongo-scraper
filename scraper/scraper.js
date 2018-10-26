const request = require("request"),
    cheerio   = require("cheerio")
    axios     = require("axios"),
    db = require("../models/Articles");
    //console.log(db);


const onion_scraper = cb => {

    //had to change the url, becasue i couln't get the onion to work properly
    const scrape_link = "https://www.linuxjournal.com/news"      //"https://politics.theonion.com/"
    axios.get(scrape_link).then( elements => {
        console.log(scrape_link)
        //console.log(elements.data)
        const $ = cheerio.load(elements.data);
        const results = {};

            $("article").each(function(i, elem) {

                results.title = $(this)
                    .find("h2")
                    .text();

               results.link = $(this)
                    .find("a")
                    .attr("href")
                
                results.body = $(this)
                    .find("div.content-body")
                    .text();

                results.date = $(this)
                    .find("div.author")
                    .text();
//
                db.findOne({ title: results.title }, (error, doc) => {
                    console.log(doc, error)
                    console.log(`heres`)
                    if (doc) {
                        console.log("Article already added", doc);
                    } else {
                        const newArticle = new db(results);
                        console.log('new',newArticle)
                        newArticle.save((error, doc) => {
                            if (error) {
                                throw error;
                            } else {
                                console.log(`Article: ${doc}-> Saved`);
                            }
                        })
                    }
                })
                
            })
        cb();
    }).catch(err=>console.log(err));
}
//onion_scraper(()=>console.log('here'))
module.exports = onion_scraper;