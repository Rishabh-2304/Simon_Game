var buttonColours=["red","blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
// $(".btn").click(checkAnswer(userClickedPattern.length-1));
function nextSequence(){
    level+=1;
     $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
   
}
function playSound(name){
      var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");

    },100);
   
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+level);
        started=true;
    }
});
function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("Sucess");
    if(userClickedPattern.length==gamePattern.length){
    setTimeout(nextSequence(),1000);
userClickedPattern=[];
    }
   }
else{
    console.log("Wrong");
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
        $('body').removeClass("game-over");
},200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
}
function startOver(){
started=false;
level=0;
}


}



