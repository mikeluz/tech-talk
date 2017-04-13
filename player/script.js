// create context
let audioCtx = new (window.AudioContext || window.webkitAudioContext);

// js link to audio
let myAudio = document.querySelector('audio');
// myAudio.crossOrigin = "anonymous";
// myAudio.src = "songs/astleyforever.mp3";
// myAudio.autoplay = true;

// create buffer source
let source = audioCtx.createMediaElementSource(myAudio);

console.log(source);
console.log(myAudio);

// Create a gain node
// let gainNode = audioCtx.createGain();

source.connect(audioCtx.destination);
console.log(source);
// gainNode.connect(audioCtx.destination);
// gainNode.start(0);
