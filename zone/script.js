// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//set up the different audio nodes we will use for the app
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();

// squares
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");

// oscillators (automated)
const arrayOfSynthTypes = ['sine', 'square', 'triangle', 'sawtooth', 'sine', 'square', 'triangle', 'sawtooth'];
const arrOfOsc = [];
let startingFreqValue = 550;

for (let i = 0; i < 8; i++) {
	let osc = audioCtx.createOscillator();
	osc.type = arrayOfSynthTypes[Math.floor((Math.random() * 10) / 8)];
	osc.frequency.value = startingFreqValue;
	startingFreqValue += Math.floor(Math.random() * 100);
	arrOfOsc.push(osc);
}

arrOfOsc.forEach(osc => {
	osc.connect(distortion);
	distortion.connect(gainNode);
	gainNode.connect(audioCtx.destination);
})

// global volume
gainNode.gain.value = 0.04;

let bool = false;

window.addEventListener('keypress', (e) => {

		console.log(e.which);

		// 'a' on keyboard
		if (e.which === 97) {
			if (bool === false) (arrOfOsc[0].start());
			else arrOfOsc[0].stop();
			one.style.backgroundColor = "blue";
			bool = !bool;
			console.log(bool);
		}

		// 's' on keyboard
		if (e.which === 115) {
			arrOfOsc[1].start();
			two.style.backgroundColor = "red";
		}

		// 'd' on keyboard
		if (e.which === 100) {
			arrOfOsc[2].start();
			three.style.backgroundColor = "green";
		}

		// 'f' on keyboard
		if (e.which === 102) {
			arrOfOsc[3].start();
			four.style.backgroundColor = "purple";
		}

		// 'j' on keyboard
		if (e.which === 106) {
			arrOfOsc[4].start();
		}

		// 'k' on keyboard
		if (e.which === 107) {
			arrOfOsc[5].start();
		}

		// 'l' on keyboard
		if (e.which === 108) {
			arrOfOsc[6].start();
		}

		// ';' on keyboard
		if (e.which === 59) {
			arrOfOsc[7].start();
		}

		// left bracket to decrease pitch
		if (e.which === 91) {
			arrOfOsc.forEach(osc => {
				osc.frequency.value -= 50;
			})
		}

		// right bracket to increase pitch
		if (e.which === 93) {
			arrOfOsc.forEach(osc => {
				osc.frequency.value += 50;
			})
		}

		// space bar to stop
		if (e.which === 32) {
			e.preventDefault();
			arrOfOsc.forEach(osc => {
				osc.stop();
			})
		}


});








// create Oscillator nodes (manually)
// var oscillatorOne = audioCtx.createOscillator();
// oscillatorOne.type = 'sine';
// oscillatorOne.frequency.value = 950; // value in hertz
// arrOfOsc[0].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// // var oscillatorTwo = audioCtx.createOscillator();
// // oscillatorTwo.type = 'square';
// // oscillatorTwo.frequency.value = 750; // value in hertz
// arrOfOsc[1].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// // var oscillatorThree = audioCtx.createOscillator();
// // oscillatorThree.type = 'triangle';
// // oscillatorThree.frequency.value = 550; // value in hertz
// arrOfOsc[2].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);


// // var oscillatorFour = audioCtx.createOscillator();
// // oscillatorFour.type = 'sawtooth';
// // oscillatorFour.frequency.value = 1050; // value in hertz
// arrOfOsc[3].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);
// //

// arrOfOsc[4].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// arrOfOsc[5].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// arrOfOsc[6].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// arrOfOsc[7].connect(distortion);
// distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);




















