var screen_width = 0;
var screen_height = 0;

var speak_data = "";

var to_number = "";

var x = 0;
var y = 0;

var draw_apple = "";
var apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening. Please speak.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  console.log(event); 
  var content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized as: " + content + ".";
  to_number = Number(content);

  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "The system has started drawing apples.";
    draw_apple = "set";
  }
  else {
    document.getElementById("status").innerHTML = "The speech has not been recognized as a number.";
  }
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  var canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " apples drawn.";
    speak_data = to_number + " apples drawn."
    speak();
    draw_apple = "";

    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
  }
}

function speak() {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}

function preload() {
  apple = loadImage("apple.png");
}