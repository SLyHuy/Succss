var express = require('express');


var _ = require('underscore');
var os = require('os');
var argv = require('yargs').argv;
var bodyParser = require('body-parser');

var autoShutDownMs = (Number(argv.t) === argv.t && argv.t % 1 === 0) ? 1000 * 60 * argv.t : 1000 * 60 * 15;
var app = express();

//app.use(express.json());
//app.use(express.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('report'));
app.use('/imagediff', express.static('imagediff'));
app.use('/resemble', express.static('resemble'));
app.use('/screenshots', express.static('screenshots'));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('CSS Regression Testing app listening at: ');
  _.each(getAddresses(), function(add){
  console.log('+ %s:%s', add ,port);
  });

  //Stop server after 15 mins
  
  if (autoShutDownMs > 0){
    console.log('['+new Date()+'] Server will automating shutdown in ' + Math.round(autoShutDownMs / 60000 * 100) / 100 + ' mins');
    setTimeout(function(){
      server.close();
    }, autoShutDownMs);
  }
  

});

function getAddresses(){
  var interfaces = os.networkInterfaces(),
    addresses = [];

  _.each(interfaces,function(net) {
    _.each(net,function(address) {
      if (address.family == 'IPv4' && !address.internal) addresses.push(address.address);
    });
  });

  return addresses;
}