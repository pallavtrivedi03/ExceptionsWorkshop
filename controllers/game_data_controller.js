'use strict';

  var mongoose = require('mongoose');
  var TeamInfo = mongoose.model('TeamInfo');
  var GameSchedule = mongoose.model('GameSchedule');

  exports.processRequest = function(req, res) {
console.log("Request received");

    if (req.body.result.action == "schedule") {
     getTeamSchedule(req,res)
   }
   else if (req.body.result.action == "team.info")
   {
    getTeamInfo(req,res)
   }
   else if (req.body.result.action == "team.squad")
   {
    console.log("Squad Request received");
    getTeamSquad(req,res);
   }
 };

  function getTeamInfo(req,res)
  {
  
      let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';

    TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
        {
          if (err)
          {
            return res.json({
                speech: 'Sorry, I am not having information about this club.',
                displayText: 'Sorry, I am not having information about this club.',
                source: 'team info'
            });
          }
  
          if (teamExists)
          {
            return res.json({
                  speech: teamExists.description,
                  displayText: teamExists.description,
                  source: 'team info'
              });
          }
          else {
            console.log('team name is '+teamToSearch);
            return res.json({
                  speech: 'Currently I am not having information about this team',
                  displayText: 'Currently I am not having information about this team',
                  source: 'team info'
              });
          }
        });
  }

  function getTeamSquad(req,res)
  {
      let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';
      console.log("team to search is "+teamToSearch);
    TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
        {
          if (err)
          {
            return res.json({
                speech: 'Sorry, I am not having information about this club.',
                displayText: 'Sorry, I am not having information about this club.',
                source: 'team info'
            });
          }
  
          if (teamExists)
          {
            console.log("Team found "+teamExists);
            return res.json({
                  speech: (teamExists.squad == "" ? "Sorry, I don't have information about squad of this club." : teamExists.squad),
                  displayText: (teamExists.squad == "" ? "Sorry, I don't have information about squad of this club." : teamExists.squad),
                  source: 'team info'
              });
          }
          else {
            console.log('team name is '+teamToSearch);
            return res.json({
              speech: 'Sorry, I am not having information about this club.',
                displayText: 'Sorry, I am not having information about this club.',
                source: 'team info'
              });
          }
        });
  }
  
  function getTeamSchedule(req,res)
  {
    let parameters = req.body.result.parameters;
    if (parameters.team1 == "")
    {
      let game_occurence = parameters.game_occurence;
      let team = parameters.team;
      if (game_occurence == "previous")
      {
        //previous game
        GameSchedule.find({opponent:team},function(err,games)
        {
          if (err)
          {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
          }
          if (games)
          {
            var requiredGame;
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
  
                var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
                console.log('converted game date is -------> '+convertedGameDate);
                console.log('converted current date is -------> '+convertedCurrentDate);
  
                if (convertedGameDate > convertedCurrentDate)
                {
                  if(games.length > 1)
                  {
                    requiredGame = games[i-1];
  
                    var winningStatement = "";
                    if (requiredGame.isWinner)
                    {
                        winningStatement = "Kings won this match by "+requiredGame.score;
                    }
                    else {
                      winningStatement = "Kings lost this match by "+requiredGame.score;
                    }
                    return res.json({
                        speech: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                        displayText: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                        source: 'game schedule'
                    });
                    break;
                  }
                  else {
                    return res.json({
                        speech: 'Cant find any previous game played between Kings and '+parameters.team,
                        displayText: 'Cant find any previous game played between Kings and '+parameters.team,
                        source: 'game schedule'
                    });
                  }
                }
            }
  
  
  
          }
  
        });
      }
      else {
        return res.json({
            speech: 'Next game schedules will be available soon',
            displayText: 'Next game schedules will be available soon',
            source: 'game schedule'
        });
      }
    }
    else {
      return res.json({
          speech: 'Cant handle the queries with two teams now. I will update myself',
          displayText: 'Cant handle the queries with two teams now. I will update myself',
          source: 'game schedule'
      });
    }
  }