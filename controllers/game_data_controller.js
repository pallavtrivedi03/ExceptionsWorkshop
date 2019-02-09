'use strict';

  var mongoose = require('mongoose');
  var TeamInfo = mongoose.model('TeamInfo');
  var PlayerInfo = mongoose.model('PlayerInfo');
  var GameSchedule = mongoose.model('GameSchedule');
  var Event = mongoose.model('Event');

  exports.processRequest = function(req, res) {
console.log("Request received");

    if (req.body.result.action == "team.schedule") {
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
   else if (req.body.result.action == "player.info")
   {
    console.log("Player info received");
    getPlayerInfo(req,res);
   }
   else if (req.body.result.action == "event.info")
   {
    console.log("Event info received");
    getEventInfo(req,res);
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

  function getPlayerInfo(req,res)
  {
      // const player = new PlayerInfo({name:"David De Gea",position:"Goalkeeper",nationality:"Spain",appearances:"262",clean_sheets:"97",goals:"0",wins:"150",loses:"52",still_plays:"1"});
      // player.save();

      let playerToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.player ? req.body.result.parameters.player : 'Unknown';
    console.log("Player name is "+playerToSearch);
    
    

    PlayerInfo.findOne({name:playerToSearch},function(err,playerExists)
        {
          if (err)
          {
            return res.json({
                speech: 'Sorry, I am not having information about this player.',
                displayText: 'Sorry, I am not having information about this player.',
                source: 'team info'
            });
          }
  
          if (playerExists)
          {
            return res.json({
                  speech: "Name: "+playerExists.name+"\nPosition: "+playerExists.position+"\nNationality: "+playerExists.nationality+"\nAppearances: "+playerExists.appearances+"\nClean Sheets: "+playerExists.clean_sheets+"\nGoals: "+playerExists.goals+"\nWins: "+playerExists.wins+"\nLoses: "+playerExists.loses,
                  displayText: "Name: "+playerExists.name+"\nPosition: "+playerExists.position+"\nNationality: "+playerExists.nationality+"\nAppearances: "+playerExists.appearances+"\nClean Sheets: "+playerExists.clean_sheets+"\nGoals: "+playerExists.goals+"\nWins: "+playerExists.wins+"\nLoses: "+playerExists.loses,
                  source: 'player info'
              });
          }
          else {
            console.log('player name is '+playerExists);
            return res.json({
                  speech: 'Currently I am not having information about this player',
                  displayText: 'Currently I am not having information about this player',
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
    // var gameObject = new GameSchedule({
    //   date:Date.now(),
    //   opponent:"Juventus",
    //   hasBeenPlayed:true,
    //   isWinner:true,
    //   score:"3-4"
    // });
    // gameObject.save();

    // console.log("Object saved");
    // return;

    let parameters = req.body.result.parameters;
    if (parameters.team1 == "")
    {
      let game_occurence = parameters.game_occurence;
      let team = parameters.team;
      console.log("team is "+team);
      
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
          if (games.length > 0)
          {
            console.log("Length is "+games.length);
            
            var requiredGame;
            var isFound = false;
            var foundAtIndex = -1;
            var timeDifference = 9999999999;
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
                var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
                console.log('converted game date is -------> '+convertedGameDate);
                console.log('converted current date is -------> '+convertedCurrentDate);
  
                if(convertedGameDate < convertedCurrentDate){
                  isFound = true;
                  console.log("difference is "+(convertedCurrentDate - convertedGameDate));
                  
                  //now find the immediate
                  if((convertedCurrentDate - convertedGameDate) < timeDifference){
                    timeDifference = (convertedCurrentDate - convertedGameDate);
                    foundAtIndex = i;
                  }
                }
              }
                if(!isFound){
                  return res.json({
                            speech: 'Cant find any previous game played between Manchester United and '+parameters.team,
                            displayText: 'Cant find any previous game played between Manchester United and '+parameters.team,
                            source: 'game schedule'
                        });
                } else {
                  console.log("index is "+foundAtIndex);
                  
                  requiredGame = games[foundAtIndex];
                  console.log("Required game is "+requiredGame);
                  
                      var winningStatement = "";
                    if (requiredGame.isWinner)
                    {
                        winningStatement = "Manchester won this match by "+requiredGame.score;
                    }
                    else {
                      winningStatement = "Manchester lost this match by "+requiredGame.score;
                    }
                    return res.json({
                        speech: 'Last game between Manchester and '+parameters.team+' was played on '+requiredGame.date.toShortFormat()+' .'+winningStatement,
                        displayText: 'Last game between Manchester and '+parameters.team+' was played on '+requiredGame.date.toShortFormat()+' .'+winningStatement,
                        source: 'game schedule'
                    });
                } 
          }
  
        });
      }
      else {
        //next game
        console.log("Next game search");
        
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
          if (games.length > 0)
          {
            console.log("Length is "+games.length);
            console.log(games);
            
            var requiredGame;
            var isFound = false;
            var foundAtIndex = -1;
            var timeDifference = 0;
                
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
                var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
                console.log('converted game date is -------> '+convertedGameDate);
                console.log('converted current date is -------> '+convertedCurrentDate);
  
                if(convertedGameDate > convertedCurrentDate){
                  isFound = true;
                  console.log("difference is "+(convertedGameDate - convertedCurrentDate));
                  
                  //now find the immediate
                  if((convertedGameDate - convertedCurrentDate) > timeDifference){
                    timeDifference = (convertedGameDate - convertedCurrentDate);
                    foundAtIndex = i;
                  }
                }
              }
                if(!isFound){
                  return res.json({
                            speech: 'Cant find any upcoming game between Manchester United and '+parameters.team,
                            displayText: 'Cant find any upcoming game between Manchester United and '+parameters.team,
                            source: 'game schedule'
                        });
                } else {
                  console.log("index is "+foundAtIndex);
                  
                  requiredGame = games[foundAtIndex];
                  console.log("Required game is "+requiredGame);
                  
                      var winningStatement = "Next game between Manchester and "+parameters.team+" will be played on "+requiredGame.date.toShortFormat();
                    
                    return res.json({
                        speech: winningStatement,
                        displayText: winningStatement,
                        source: 'game schedule'
                    });
                }
          }
  
        });
      }
    }
    else {
      return res.json({
          speech: 'Cant handle the queries with two teams now. I will update myself soon.',
          displayText: 'Cant handle the queries with two teams now. I will update myself soon.',
          source: 'game schedule'
      });
    }
  }

  function getEventInfo(req,res)
  {
      // const event = new Event(
      //   {name:"Munich Air Disaster",
      //   description:"On February 6, 1958, a plane carrying a Manchester United team led by legendary manager Sir Matt Busby swerved off the Munich runway and crashed into a house causing an explosion. At least 23 people died in the crash, including eight players from that squad. Sixty-one years later, the people of Manchester still observe a moment of silence at 15.04 on this fateful day to remember their fallen heroes."});
      // console.log("Event created");
      
      //   event.save();
      //   console.log("Event saved");
      let eventToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.event ? req.body.result.parameters.event : 'Unknown';
    console.log("Event name is "+eventToSearch);
    Event.findOne({name:eventToSearch},function(err,eventExists)
        {
          if (err)
          {
            return res.json({
                speech: 'Sorry, I am not having information about this event.',
                displayText: 'Sorry, I am not having information about this event.',
                source: 'event info'
            });
          }
  
          if (eventExists)
          {
            return res.json({
                  speech: eventExists.description,
                  displayText: eventExists.description,
                  source: 'event info'
              });
          }
          else {
            console.log('event name is '+eventExists);
            return res.json({
                  speech: 'Currently I am not having information about this event',
                  displayText: 'Currently I am not having information about this event',
                  source: 'evnet info'
              });
          }
        });
  }

  Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + "-" + month_names[month_index] + "-" + year;
}
