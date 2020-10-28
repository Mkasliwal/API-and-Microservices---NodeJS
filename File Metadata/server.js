var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
// require and use "multer"...
var multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// end point for file upload
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
    });
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
