var express = require('express');
var app = express();
var userAgent = require('user-agents');
var ua = new userAgent();
var port = 3000;

app.get("/api/whoami",  (req, res)=> {
  res.json({
    "ipaddress": req.ip,
    "language": req.acceptsLanguages("en-US", "en"),
    "software": ua.toString()
  });
});


var listener = app.listen(port, function () {
  console.log(`Server is listening on port no. ${port}`);
});
