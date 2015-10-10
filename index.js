var express = require('express')
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var exec = require('child_process').exec;
var cmd = 'phantomjs eta.js ';
var url = require('url');
var timestring = require('timestring');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/eta/:route', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var eta = query.eta || 10 + Math.floor(Math.random() * 20);
  res.send(eta.toString());
  return;

});

app.get('/api/:route/name', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.eta) res.send(query.eta.toString());
  else {
    exec(cmd + req.params.route, function(error, stdout, stderr) {
      if (stdout) res.send(stdout.parseTime('m').toString());
      else res.send('0');
    });
  }
});

http.listen(process.env.PORT || 4000, function(){
  console.log('listening on *:4000');
});
