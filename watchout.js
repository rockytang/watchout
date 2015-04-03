// start slingin' some d3 here.

var points = 0;
var highScore = 0;
var enemies = [{},{},{}];

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



}
