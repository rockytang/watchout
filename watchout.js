// start slingin' some d3 here.

var points = 0;
var highScore = 0;
var enemies = [{id:1},{id:2},{id:3}];

var canvas = d3.select("body").append("svg")
  .attr("width", 800)
  .attr("height", 800)
  .style("background-color", "gray");

var Update = function(data){
  UpdateScore();
}

setInterval(function(){Update()}, 1000);

var ResetScore = function(){
  points = 0;
}

var UpdateScore = function(){
  points++;
  highScore = Math.max(highScore, points);

  console.log(points);

  d3.select(".current").select("span").text(points);
  d3.select(".high").select("span").text(highScore);
}

var AppendEnemies = function(){

  var selectEnemies = canvas.selectAll(".enemy")
  .data(enemies, function(d, i){return d.id;});

  var enemy = selectEnemies.enter().append("circle");
  enemy.attr("class", "enemy")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 5);

  enemy.transition().duration(2000).attr("cx", 300);

}

AppendEnemies();
