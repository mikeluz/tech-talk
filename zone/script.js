function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//set up the different audio nodes we will use for the app
var distortion = audioCtx.createWaveShaper();
var delay = audioCtx.createDelay(1.0);
var gainNode = audioCtx.createGain();

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

// distortion settings
// distortion.curve = makeDistortionCurve(0);
// distortion.oversample = '1x';

// volume control
function changeVolume(event) {
  gainNode.gain.value = volumeControl.value
}
let volumeControl = document.querySelector("input[name='volume']");
volumeControl.addEventListener("change", changeVolume, false);

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
	// osc.type = "square";
	osc.frequency.value = startingFreqValue;
	startingFreqValue = Math.floor(Math.random() * 1000);
	arrOfOsc.push(osc);
}

arrOfOsc.forEach(osc => {
	osc.connect(distortion);
	distortion.connect(delay);
	delay.connect(gainNode);
	gainNode.connect(audioCtx.destination);
})

// global volume
gainNode.gain.value = 0.5;
let globalPitchInterval = 50;
let bool = false;

window.addEventListener('keypress', (e) => {

	function sequencer() {
		setTimeout(() => {
			osc.frequency.value += 100;
		}, 500);
		setTimeout(() => {
			osc.frequency.value += 100;
		}, 1000);
		setTimeout(() => {
			osc.frequency.value += 100;
		}, 1500);
		setTimeout(() => {
			osc.frequency.value += 100;
		}, 2000);
	}

		console.log(e.which);

		// 'a' on keyboard -- osc1
		if (e.which === 97) {
			arrOfOsc[0].start();
			one.style.backgroundColor = getRandomColor();
		}

			if (e.which === 113) {
				one.style.backgroundColor = getRandomColor();
				arrOfOsc[0].frequency.value += 10;
			}

			if (e.which === 122) {
				one.style.backgroundColor = getRandomColor();
				arrOfOsc[0].frequency.value -= 10;
			}

		// 's' on keyboard
		if (e.which === 115) {
			arrOfOsc[1].start();
			two.style.backgroundColor = getRandomColor();
		}

			if (e.which === 119) {
				two.style.backgroundColor = getRandomColor();
				arrOfOsc[1].frequency.value += 10;
			}

			if (e.which === 120) {
				two.style.backgroundColor = getRandomColor();
				arrOfOsc[1].frequency.value -= 10;
			}

		// 'd' on keyboard
		if (e.which === 100) {
			arrOfOsc[2].start();
			three.style.backgroundColor = getRandomColor();
		}

			if (e.which === 101) {
				three.style.backgroundColor = getRandomColor();
				arrOfOsc[2].frequency.value += 10;
			}

			if (e.which === 99) {
				three.style.backgroundColor = getRandomColor();
				arrOfOsc[2].frequency.value -= 10;
			}

		// 'f' on keyboard
		if (e.which === 102) {
			arrOfOsc[3].start();
			four.style.backgroundColor = getRandomColor();
		}

			if (e.which === 114) {
				four.style.backgroundColor = getRandomColor();
				arrOfOsc[3].frequency.value += 10;
			}

			if (e.which === 118) {
				four.style.backgroundColor = getRandomColor();
				arrOfOsc[3].frequency.value -= 10;
			}

		// 'j' on keyboard
		if (e.which === 106) {
			arrOfOsc[4].start();
			five.style.backgroundColor = getRandomColor();
		}

			if (e.which === 117) {
				five.style.backgroundColor = getRandomColor();
				arrOfOsc[4].frequency.value += 10;
			}

			if (e.which === 109) {
				five.style.backgroundColor = getRandomColor();
				arrOfOsc[4].frequency.value -= 10;
			}

		// 'k' on keyboard
		if (e.which === 107) {
			arrOfOsc[5].start();
			six.style.backgroundColor = getRandomColor();
		}

			if (e.which === 105) {
				six.style.backgroundColor = getRandomColor();
				arrOfOsc[5].frequency.value += 10;
			}

			if (e.which === 44) {
				six.style.backgroundColor = getRandomColor();
				arrOfOsc[5].frequency.value -= 10;
			}

		// 'l' on keyboard
		if (e.which === 108) {
			arrOfOsc[6].start();
			seven.style.backgroundColor = getRandomColor();
		}

			if (e.which === 111) {
				seven.style.backgroundColor = getRandomColor();
				arrOfOsc[6].frequency.value += 10;
			}

			if (e.which === 46) {
				seven.style.backgroundColor = getRandomColor();
				arrOfOsc[6].frequency.value -= 10;
			}

		// ';' on keyboard
		if (e.which === 59) {
			arrOfOsc[7].start();
			eight.style.backgroundColor = getRandomColor();
		}

			if (e.which === 112) {
				eight.style.backgroundColor = getRandomColor();
				arrOfOsc[7].frequency.value += 10;
			}

			if (e.which === 47) {
				eight.style.backgroundColor = getRandomColor();
				arrOfOsc[7].frequency.value -= 10;
			}

		if (e.which === 103) {
			globalPitchInterval -= 50;
		}

		if (e.which === 104) {
			globalPitchInterval += 50;
		}

		// left bracket to decrease pitch
		if (e.which === 91) {
			arrOfOsc.forEach(osc => {
				osc.frequency.value -= globalPitchInterval;
			});
		}

		// right bracket to increase pitch
		if (e.which === 93) {
			arrOfOsc.forEach(osc => {
				osc.frequency.value += globalPitchInterval;
			});
		}

		// space bar to stop
		if (e.which === 32) {
			e.preventDefault();
			arrOfOsc.forEach(osc => {
				if (osc.start) osc.stop();
			});
		}


});
