var maxPlayers = 4;
var connectedPlayers;
var scoreColumn = $('.scoreColumn');
var titleColumn = $('.titleColumn');

var titleBoard = $('#titleBoard');
var scoreBoard = $('#scoreBoard');
var pointBoard = $('#pointBoard');



var pointImages = [
  "point_0.png",
  "point_5.png",
  "point_10.png",
  "point_15.png",
  "point_20.png",
  "point_25.png",
  "point_30.png",
  "point_35.png",
  "point_40.png",
  "point_45.png",
  "point_50.png"
];

var players = [
  {
    "name":"Ruslan",
    "score":0
  },
  {
    "name":"Ruslan",
    "score":0
  },
  {
    "name":"Huseyn",
    "score":0
  },
  {
    "name":"Aslan",
    "score":0
  }
];


/*
var header = document.getElementById("titlePlace");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
*/

// для баннера на главной страницы
function checkHeight() {
 var height = $("#titlePlace").height() + 30;
 $('#scoreSetRaw').css('padding-top', height+'px');
}

checkHeight();
$(window).resize(checkHeight);

var mainPageStep = 0;




function initMain(){

  var back = $("#backButton");
  var create = $("#createGame");
  var join = $("#joinGame");
  var local = $("#localGame");
  var network = $("#networkGame");

  var createPanel = $("#createGameButtons");
  var homePanel = $("#homeButtons");
  var localGamePanel = $("#localGamePanel");
  var networkGamePanel = $("#networkGamePanel");
  var joinGamePanel = $("#joinGamePanel");
  var prevPanel;
  var panels = [];

  $(".mainPages").hide();
  back.hide();
  homePanel.show();

  create.click(function(){
    panels.push(homePanel);
    $(".mainPages").hide();
    createPanel.show();
    back.show();
  });

  local.click(function(){
    panels.push(createPanel);
    $(".mainPages").hide();
    localGamePanel.show();
    back.show();
  });

  network.click(function(){
    panels.push(createPanel);
    $(".mainPages").hide();
    networkGamePanel.show();
    back.show();
  });

  join.click(function(){
    panels.push(homePanel);
    $(".mainPages").hide();
    joinGamePanel.show();
    back.show();
  });

  back.click(function(){
    $(".mainPages").hide();

    if (panels.length > 0){
      panels.pop().show();
    }

    if (panels.length == 0){
      back.hide();
    }
  });
}

initMain();

function initBoard(){
  titleBoard.empty();
  scoreBoard.empty();
  pointBoard.empty();

  for (i = 0; i < players.length; i++){

    var currentImage = players[i].score / 5;

    titleBoard.append('<div class="col titleColumn"  align="center" >' +
        '<h3 class="titleText">'+ players[i].name + '</h3>' +
        '</div>');

    scoreBoard.append('<div class="col scoreColumn"  align="center" ><img src="'+ pointImages[currentImage]+'" width="50"></div>');
    pointBoard.append(' <div class="col titleColumn"  align="center" >'+
                          '<h3 class="titleText">' + players[i].score + '</h3>'+
                        '</div>');
  }
}

function updateBoard(index){
  players[index].score += 5;
  pointBoard.find(".titleColumn:nth-child(" + (index + 1) + ") h3").html(players[index].score);
  var currentPoint = players[index].score % 50;
  var imageIndex = (players[index].score - currentPoint) / 50;
  var currentImage = currentPoint / 5;

  if(imageIndex > 0){
    if(currentPoint == 0){
      currentImage = 10;
    }
  }

  var imageSize = scoreBoard.find(".scoreColumn:nth-child(" + (index + 1) + ") img").length;

  scoreBoard.find(".scoreColumn:nth-child(" + (index + 1) + ") img:nth-child("+(imageIndex + 1)+")").attr("src",pointImages[currentImage]);
  if (imageIndex == imageSize){

      scoreBoard.find(".scoreColumn:nth-child(" + (index + 1) + ") img:nth-child("+(imageIndex)+")").attr("src",pointImages[currentImage]);
      scoreBoard.find(".scoreColumn:nth-child(" + (index + 1) + ")").append('<img src="'+ pointImages[0]+'" width="50">');

  }
}



initBoard();

$(function() {
    $(".scoreColumn").click(function() {
       var index = $(this).index();
       updateBoard(index);
     });
});
