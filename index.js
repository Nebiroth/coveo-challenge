var bodyParser = require("body-parser");
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var request = require('request');
var url = require("url");

const app = express();
const port = 3000;
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ApiRequest', function (req, res) {
    var url = "https://cloudplatform.coveo.com/rest/search?access_token=";
    var token = "058c85fd-3c79-42a3-9236-b83d35588103"; 
    var minPrice = 0;
    var maxPrice = 10000;
  
    if (!isNaN(req.body.minPrice))
      minPrice = req.body.minPrice;
    if (!isNaN(req.body.maxPrice))
      maxPrice = req.body.maxPrice;
 
    var sortQuery;
    var sortBy = parseInt(req.body.sortBy);

    if (sortBy === 0)
      sortQuery = "";
    else if (sortBy === 1)
      sortQuery = "&sortCriteria=@tpprixnum ascending";
    else if (sortBy === 2) 
      sortQuery = "&sortCriteria=@tpprixnum descending";

    url = url + token + "&q=" +"@tpprixnum=" + minPrice.toString() + ".." + maxPrice.toString() + req.body.term + "&numberOfResults=" + req.body.numberOfResults + "&firstResult=" + req.body.firstResult + sortQuery; 
    var returnResponse;
    request(url, function (error, response, body) {
        returnResponse = response;
        res.send(returnResponse);
    });    
});

app.listen(port);