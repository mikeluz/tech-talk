// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// // create Oscillator node
var oscillator = audioCtx.createOscillator();

//set up the different audio nodes we will use for the app
var analyser = audioCtx.createAnalyser();
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();
var convolver = audioCtx.createConvolver();

// // connect oscillator to gainNode to speakers
oscillator.connect(distortion);
analyser.connect(analyser);
distortion.connect(gainNode);
// biquadFilter.connect(convolver); // why not working?
// convolver.connect(gainNode); // why not working?
gainNode.connect(audioCtx.destination);

oscillator.type = 'sine';
oscillator.frequency.value = 950; // value in hertz
oscillator.start();

gainNode.gain.value = 0.03;
// // create web audio api context
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// // create Oscillator node
// var oscillator = audioCtx.createOscillator();
// var gainNode = audioCtx.createGain();

// // connect oscillator to gainNode to speakers
// oscillator.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// // set oscillator parameters
// var WIDTH = window.innerWidth;
// var HEIGHT = window.innerHeight;

// var maxFreq = 2000;
// var maxVol = 0.03;

// var initialFreq = 1000;
// var initialVol = 0.00000001;

// // oscillator.type = 'square';
// // oscillator.frequency.value = 3000; // value in hertz
// // oscillator.start();

// oscillator.detune.value = 1000; // value in cents
// oscillator.start(0);

// oscillator.onended = function() {
//   console.log('Your tone has now stopped playing!');
// }

// gainNode.gain.value = initialVol;

// // Mouse pointer coordinates

// var CurX;
// var CurY;

// // Get new mouse pointer coordinates when mouse is moved
// // then set new gain and pitch values

// document.onmousemove = updatePage;

// function updatePage(e) {
//     KeyFlag = false;

//     CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
//     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
//     oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
//     gainNode.gain.value = (CurY/HEIGHT) * maxVol;

//     canvasDraw();
// }

// // mute button

// var mute = document.querySelector('.mute');

// mute.onclick = function() {
//   if(mute.getAttribute('data-muted') === 'false') {
//     gainNode.disconnect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'true');
//     mute.innerHTML = "Unmute";
//   } else {
//     gainNode.connect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'false');
//     mute.innerHTML = "Mute";
//   };
// }

// // canvas visualization

// function random(number1,number2) {
//   var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
//   return randomNo;
// } 

// var canvas = document.querySelector('.canvas');
// canvas.width = WIDTH;
// canvas.height = HEIGHT; 

// var canvasCtx = canvas.getContext('2d');

// function canvasDraw() {
//   if(KeyFlag == true) {
//     rX = KeyX;
//     rY = KeyY;
//   } else {
//     rX = CurX;
//     rY = CurY;
//   }
//   rC = Math.floor((gainNode.gain.value/maxVol)*30);
  
//   canvasCtx.globalAlpha = 0.2;
  
//   for(i=1;i<=15;i=i+2) {
//     canvasCtx.beginPath();
//     canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
//     canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
//     canvasCtx.fill();
//     canvasCtx.closePath();     
//   }    
// }

// // clear screen

// var clear = document.querySelector('.clear');

// clear.onclick = function() {
//   canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
// }

// // keyboard controls

// var body = document.querySelector('body');

// var KeyX = 1;
// var KeyY = 0.01;
// var KeyFlag = false;

// body.onkeydown = function(e) {
//   KeyFlag = true;

//   // 37 is arrow left, 39 is arrow right,
//   // 38 is arrow up, 40 is arrow down

//   if(e.keyCode == 37) {
//     KeyX -= 200;
//   };

//   if(e.keyCode == 39) {
//     KeyX += 20;
//   };

//   if(e.keyCode == 38) {
//     KeyY -= 200;
//   };

//   if(e.keyCode == 40) {
//     KeyY += 20;
//   };

//   // set max and min constraints for KeyX and KeyY

//   if(KeyX < 1) {
//     KeyX = 1;
//   };

//   if(KeyX > WIDTH) {
//     KeyX = WIDTH;
//   };

//   if(KeyY < 0.01) {
//     KeyY = 0.01;
//   };

//   if(KeyY > HEIGHT) {
//     KeyY = HEIGHT;
//   };

//   oscillator.frequency.value = (KeyX/WIDTH) * maxFreq;
//   gainNode.gain.value = (KeyY/HEIGHT) * maxVol;

//   canvasDraw();
// }