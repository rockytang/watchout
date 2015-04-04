// start slingin' some d3 here.

var points = 0;
var highScore = 0;
var enemies = [];
var playerList = [{id:1}];
var player = null;

var canvas = d3.select("body").append("svg")
  .attr("width", 800)
  .attr("height", 800)
  .style("background-color", "gray");

var drag = d3.behavior.drag()
  .on("drag", function(d,i)
  {
    var player = d3.select(this)
    var startPosX = + player.attr("cx");
    var startPosY = + player.attr("cy");
    player.attr("cx", startPosX + d3.event.dx);
    player.attr("cy", startPosY + d3.event.dy);
  });

var CreatePlayer = function()
{
  var playerObject = canvas.selectAll(".player").data(playerList, function(d)
  { return d.id; }
  );


  player = playerObject.enter()
  .append("circle")
  .attr("class", "player")
  .attr("cx", 400)
  .attr("cy", 400)
  .attr("r", 10)
  .style("fill", "blue");
  player.call(drag);
}

var CreateEnemies = function()
{
  for(var i = 1; i <= 20; i++)
  {
    enemies.push({id:i});
  }
}

CreatePlayer();
CreateEnemies();


var Update = function(data){
  UpdateScore();
  UpdateEnemies();
}


setInterval(function(){Update()}, 1000);

var ResetScore = function(){
  points = 0;
}

var UpdateScore = function(){
  points++;
  highScore = Math.max(highScore, points);

  d3.select(".current").select("span").text(points);
  d3.select(".high").select("span").text(highScore);
}

var UpdateEnemies = function(){
  var selectEnemies = canvas.selectAll(".enemy")
  .data(enemies, function(d, i){return d.id;});

  var enemy = selectEnemies.enter().append("circle")
  .attr("class", "enemy")
  .attr("cx", Math.random() * 800)
  .attr("cy", Math.random() * 800)
  .attr("r", 20);

  selectEnemies
  .transition().duration(1000).tween("custom", function()
  {
    var temp = d3.select(this);
    var startPosX = parseFloat(temp.attr("cx"));
    var startPosY = parseFloat(temp.attr("cy"));
    var randomX = Math.random() * 800;
    var randomY = Math.random() * 800;

    return function(t) {
      var pos1 = [parseFloat(player.attr("cx")), parseFloat(player.attr("cy"))];
      var pos2 = [ startPosX + (t * (randomX - startPosX)),
      startPosY + (t * (randomY - startPosY)) ];

      temp.attr("cx", pos2[0]);
      temp.attr("cy", pos2[1]);

      var playerRadius = parseFloat(player.attr("r"));
      var enemyRadius = parseFloat(temp.attr("r"));

      CheckCollision(pos1, pos2, playerRadius, enemyRadius);
    };
  });
}


var CheckCollision = function(pos1, pos2, playerRadius, enemyRadius){
  // i.e. pos1 = [posX, posY]

  if( Math.pow(pos1[0] - pos2[0], 2)
   + Math.pow(pos1[1] - pos2[1], 2) <= Math.pow(playerRadius+enemyRadius, 2) ){
    ResetScore();
    return true;
  }
    return false;
}
