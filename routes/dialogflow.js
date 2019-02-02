var express = require('express');
var router = express.Router();
var gameDataController = require('../controllers/game_data_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.post('/processDialogFlowRequest',function(req,res,next) {
    gameDataController.processRequest(req,res);
});

module.exports = router;
