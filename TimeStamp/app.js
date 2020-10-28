var express = require('express');
var app = express();
var port = 3000;

app.get('/api/timestamp/', function(req, res){

    res.json({
        unix: Date.now(),
        utc: Date()
    });
});

app.get('/api/timestamp/:date', function(req, res){

    var date = req.params.date;

    if(/\d{5,}/.test(date)){
        var dateInt = parseInt(date);
        res.json({
            unix: date,
            utc: new Date(dateInt).toUTCString()
        });
    } else {

        var dObj = new Date(date);

        if(dObj.toString === "Invalid Date") {

            res.json({
                error: "Invalid Date"
            });
        } else {

            res.json({
                unix: dObj.valueOf(),
                utc: dObj.toUTCString()
            });

        }
    }
});

app.listen(port, (err)=>{
    if(err) return console.log(err)
    console.log(`Server is running on port ${port}`);
});
