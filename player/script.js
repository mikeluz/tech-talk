// create context
let audioCtx = new (window.AudioContext || window.webkitAudioContext);

// js link to audio
let myAudio = document.querySelector('audio');
myAudio.crossOrigin = "anonymous";
myAudio.src = "songs/astleyforever.mp3";
// myAudio.autoplay = true;

// create buffer source
let source = audioCtx.createMediaElementSource(myAudio);

// Create a gain node
let gainNode = audioCtx.createGain();
let distortion = audioCtx.createWaveShaper();

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

distortion.curve = makeDistortionCurve(400);
distortion.oversample = '4x';

console.log(myAudio);
console.log(source);

gainNode.gain.value = 0.04;

source.connect(distortion);
distortion.connect(gainNode);
gainNode.connect(audioCtx.destination);