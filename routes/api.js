const article   = require("../models/article");
const express   = require("express");
const router    = express.Router();
const mongoose  = require('mongoose');

const db = "mongodb://{{username}}:{{password}}@ds247688.mlab.com:47688/blogapp";

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err) {
        console.log('Error connecting to the db');
    }
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/all', (req, res) => {
    article.find({})
        .exec((err, articles) => {
            if(err) {
                console.log("Error getting the articles");
            } else {
                console.log("getting articles");
                res.json(articles);
            }
        })
});

router.get('/articles/:id', (req, res) => {
    console.log("requesting an specific article");
    article.findById(req.params.id)
        .exec((err, article) => {
            if(err) {
                console.log("Error getting the articles");
            } else {
                console.log("getting articles");
                res.json(article);
            }
        })
});

router.post('/create', (req, res) => {
    console.log("posting an article");
    var newArticle = new article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.save((err, article) => {
        if (err) {
            console.log("there was an error saving the article");
        } else {
            res.json(article);
        }
    });
});

router.post('/update/:id', (req, res) => {
    console.log("Updating an article");
    article.findById(req.params.id)
        .exec((err, article) => {
            if (err) {
                console.log("there was an error updating the article");
            } else {
                article.title = req.body.title;
                article.content = req.body.content;
                article.save();
                res.json(article);
            }
        })

});

router.get('/delete/:id', (req, res) => {
    console.log("deleting an specific article");
    article.findByIdAndRemove(req.params.id)
        .exec((err, article) => {
            if(err) {
                console.log("Error deleting the articles");
            } else {
                res.json(article);
            }
        })
});

module.exports = router;