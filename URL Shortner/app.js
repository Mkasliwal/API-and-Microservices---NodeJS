var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var app = express();
var port = 3000;
var shortid = require('shortid');

// mongoose.connect('mongodb://localhost:27017/urlshortner', {useNewUrlParser: true});

// var url_schema = new mongoose.Schema({
//     "origional_url": String,
//     "short_url": String
// });

// var Short_Url = mongoose.model("Short_Url", url_schema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    //res.sendStatus(200);
});

app.listen(port, function(){
    console.log(`Server is running on port ` + port);
})

