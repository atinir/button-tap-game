var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

// starting the game with a key press
var i = 0;
$(document).keypress(function() {
  i = i + 1;
  if (i === 1) {
    nextSequence();
  }
});


// GAME AREA : the function nextSequence generates the next sequence of buttons that the user needs to correctly press.
function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(4 * Math.random());

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); //randomChosenColour is a string of button color.
  console.log(gamePattern);

  $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);

  level = level + 1;
  $("#level-title").text("Level " + level);
  console.log(level);
}


// when user clicks a button, it plays the sound and animation
$(".btn").click(function detectClick() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout (function () {
      nextSequence();
    }, 1000);
  }
});

// checking the user's solution.
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    console.log("success");
    makeSound(gamePattern[currentIndex]);
    animatePress(gamePattern[currentIndex]);
  } else {
    console.log("fail");
    makeSound("fail");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout (function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver () {
  level = 0;
  gamePattern = [];
  i = 0;
}

// the animation function
function animatePress(currentColour) {
  // $(".btn").click(function(){
  var activeButton = $("." + currentColour);
  $(activeButton).addClass("pressed");

  setTimeout(function() {
    $(activeButton).removeClass("pressed");
  }, 100);

}


// the function to play the sound across the whole doc
function makeSound(name) {
  switch (name) {

    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

      case "fail":
      var failSound = new Audio("sounds/wrong.mp3");
      failSound.play();
      break;

    default:
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
  }
}
