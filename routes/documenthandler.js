'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

});

  router.get('/downloadPrerequisites', function (req, res) {
    var filepath = "downloadables/Requirements.pdf";
    var lastIndex = __dirname.lastIndexOf("/");
    var pathTillRoot = __dirname.substring(0, lastIndex);
    res.download(pathTillRoot + '/' + filepath, "Requirements.pdf");
  });
  
  router.get('/downloadCollectionsData', function (req, res) {
    var filepath = "downloadables/collections_data.zip";
    var lastIndex = __dirname.lastIndexOf("/");
    var pathTillRoot = __dirname.substring(0, lastIndex);
    res.download(pathTillRoot + '/' + filepath, "CollectionsData.zip");
  });

  router.get('/assets', function (req, res) {
    var filepath = "downloadables/assets.zip";
    var lastIndex = __dirname.lastIndexOf("/");
    var pathTillRoot = __dirname.substring(0, lastIndex);
    res.download(pathTillRoot + '/' + filepath, "Assets.zip");
  });
module.exports = router;
