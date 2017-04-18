function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

console.log('window', window);
console.log('window.AudioContext', window.AudioContext);
console.log("audioCtx", audioCtx);

//set up the different audio nodes we will use for the app
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();

var delay = new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5
});

// sound.play();

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
// distortion.curve = makeDistortionCurve(500);
// distortion.oversample = '4x';

// filter settings
// biquadFilter.type = "allpass";
// biquadFilter.frequency.value = 1000;
// biquadFilter.gain.value = 25;

// volume control
// const changeVolume = event => gainNode.gain.value = volumeControl.value;
// let volumeControl = document.querySelector("input[name='volume']");
// volumeControl.addEventListener("change", changeVolume, false);

function createNoteTable() {
  let noteFreq = [];
  for (let i=0; i< 6; i++) {
    noteFreq[i] = [];
  }
  noteFreq[0]["C"] = 65.406391325149658;
  noteFreq[0]["C#"] = 69.295657744218024;
  noteFreq[0]["D"] = 73.416191979351890;
  noteFreq[0]["D#"] = 77.781745930520227;
  noteFreq[0]["E"] = 82.406889228217482;
  noteFreq[0]["F"] = 87.307057858250971;
  noteFreq[0]["F#"] = 92.498605677908599;
  noteFreq[0]["G"] = 97.998858995437323;
  noteFreq[0]["G#"] = 103.826174394986284;
  noteFreq[0]["A"] = 110.000000000000000;
  noteFreq[0]["A#"] = 116.540940379522479;
  noteFreq[0]["B"] = 123.470825314031027;

  noteFreq[1]["C"] = 130.812782650299317;
  noteFreq[1]["C#"] = 138.591315488436048;
  noteFreq[1]["D"] = 146.832383958703780;
  noteFreq[1]["D#"] = 155.563491861040455;
  noteFreq[1]["E"] = 164.813778456434964;
  noteFreq[1]["F"] = 174.614115716501942;
  noteFreq[1]["F#"] = 184.997211355817199;
  noteFreq[1]["G"] = 195.997717990874647;
  noteFreq[1]["G#"] = 207.652348789972569;
  noteFreq[1]["A"] = 220.000000000000000;
  noteFreq[1]["A#"] = 233.081880759044958;
  noteFreq[1]["B"] = 246.941650628062055;

  noteFreq[2]["C"] = 261.625565300598634;
  noteFreq[2]["C#"] = 277.182630976872096;
  noteFreq[2]["D"] = 293.664767917407560;
  noteFreq[2]["D#"] = 311.126983722080910;
  noteFreq[2]["E"] = 329.627556912869929;
  noteFreq[2]["F"] = 349.228231433003884;
  noteFreq[2]["F#"] = 369.994422711634398;
  noteFreq[2]["G"] = 391.995435981749294;
  noteFreq[2]["G#"] = 415.304697579945138;
  noteFreq[2]["A"] = 440.000000000000000;
  noteFreq[2]["A#"] = 466.163761518089916;
  noteFreq[2]["B"] = 493.883301256124111;

  noteFreq[3]["C"] = 523.251130601197269;
  noteFreq[3]["C#"] = 554.365261953744192;
  noteFreq[3]["D"] = 587.329535834815120;
  noteFreq[3]["D#"] = 622.253967444161821;
  noteFreq[3]["E"] = 659.255113825739859;
  noteFreq[3]["F"] = 698.456462866007768;
  noteFreq[3]["F#"] = 739.988845423268797;
  noteFreq[3]["G"] = 783.990871963498588;
  noteFreq[3]["G#"] = 830.609395159890277;
  noteFreq[3]["A"] = 880.000000000000000;
  noteFreq[3]["A#"] = 932.327523036179832;
  noteFreq[3]["B"] = 987.766602512248223;

  noteFreq[4]["C"] = 1046.502261202394538;
  noteFreq[4]["C#"] = 1108.730523907488384;
  noteFreq[4]["D"] = 1174.659071669630241;
  noteFreq[4]["D#"] = 1244.507934888323642;
  noteFreq[4]["E"] = 1318.510227651479718;
  noteFreq[4]["F"] = 1396.912925732015537;
  noteFreq[4]["F#"] = 1479.977690846537595;
  noteFreq[4]["G"] = 1567.981743926997176;
  noteFreq[4]["G#"] = 1661.218790319780554;
  noteFreq[4]["A"] = 1760.000000000000000;
  noteFreq[4]["A#"] = 1864.655046072359665;
  noteFreq[4]["B"] = 1975.533205024496447;
  noteFreq[5]["C"] = 2093.004522404789077;
  return noteFreq;
}

function createLinearNoteTable() {
  let noteFreq = [];
  for (let i=0; i< 6; i++) {
    noteFreq[i] = [];
  }
  noteFreq[0] = 65.406391325149658; // C
  noteFreq[1] = 69.295657744218024; // C# ...
  noteFreq[2] = 73.416191979351890;
  noteFreq[3] = 77.781745930520227;
  noteFreq[4] = 82.406889228217482;
  noteFreq[5] = 87.307057858250971;
  noteFreq[6] = 92.498605677908599;
  noteFreq[7] = 97.998858995437323;
  noteFreq[8] = 103.826174394986284;
  noteFreq[9] = 110.000000000000000;
  noteFreq[10] = 116.540940379522479;
  noteFreq[11] = 123.470825314031027;  // B

  noteFreq[12] = 130.812782650299317;
  noteFreq[13] = 138.591315488436048;
  noteFreq[14] = 146.832383958703780;
  noteFreq[15] = 155.563491861040455;
  noteFreq[16] = 164.813778456434964;
  noteFreq[17] = 174.614115716501942;
  noteFreq[18] = 184.997211355817199;
  noteFreq[19] = 195.997717990874647;
  noteFreq[20] = 207.652348789972569;
  noteFreq[21] = 220.000000000000000;
  noteFreq[22] = 233.081880759044958;
  noteFreq[23] = 246.941650628062055;

  noteFreq[24] = 261.625565300598634;
  noteFreq[25] = 277.182630976872096;
  noteFreq[26] = 293.664767917407560;
  noteFreq[27] = 311.126983722080910;
  noteFreq[28] = 329.627556912869929;
  noteFreq[29] = 349.228231433003884;
  noteFreq[30] = 369.994422711634398;
  noteFreq[31] = 391.995435981749294;
  noteFreq[32] = 415.304697579945138;
  noteFreq[33] = 440.000000000000000;
  noteFreq[34] = 466.163761518089916;
  noteFreq[35] = 493.883301256124111;


  noteFreq[36] = 523.251130601197269;
  noteFreq[37] = 554.365261953744192;
  noteFreq[38] = 587.329535834815120;
  noteFreq[39] = 622.253967444161821;
  noteFreq[40] = 659.255113825739859;
  noteFreq[41] = 698.456462866007768;
  noteFreq[42] = 739.988845423268797;
  noteFreq[43] = 783.990871963498588;
  noteFreq[44] = 830.609395159890277;
  noteFreq[45] = 880.000000000000000;
  noteFreq[46] = 932.327523036179832;
  noteFreq[47] = 987.766602512248223;

  noteFreq[48] = 1046.502261202394538;
  noteFreq[49] = 1108.730523907488384;
  noteFreq[50] = 1174.659071669630241;
  noteFreq[51] = 1244.507934888323642;
  noteFreq[52] = 1318.510227651479718;
  noteFreq[53] = 1396.912925732015537;
  noteFreq[54] = 1479.977690846537595;
  noteFreq[55] = 1567.981743926997176;
  noteFreq[56] = 1661.218790319780554;
  noteFreq[57] = 1760.000000000000000;
  noteFreq[58] = 1864.655046072359665;
  noteFreq[59] = 1975.533205024496447;
  noteFreq[60] = 2093.004522404789077;
  return noteFreq;
}

// grab squares
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");

// create oscillators
const arrayOfSynthTypes = ['sine', 'square', 'triangle', 'sawtooth', 'sine', 'square', 'triangle', 'sawtooth'];
const arrOfOsc = [];
let startingFreqValue = 261.625565300598634;

for (let i = 0; i < 8; i++) {
	let osc = audioCtx.createOscillator();
	osc.type = arrayOfSynthTypes[Math.floor((Math.random() * 10) / 8)];
	// osc.type = "square";
	osc.frequency.value = Math.floor(Math.random() * 1000);
	// startingFreqValue = ;
	arrOfOsc.push(osc);
}

// connect each oscillator
arrOfOsc.forEach(osc => {
	osc.connect(distortion);
	distortion.connect(biquadFilter);
	biquadFilter.connect(gainNode);
	gainNode.connect(audioCtx.destination);
});

console.log("arrOfOsc", arrOfOsc);
// arrOfOsc.addEffect(delay);

// global volume and pitch values
gainNode.gain.value = 0.08;
let globalPitchInterval = 50; 

// create keyboard events
window.addEventListener('keypress', (e) => {

	const notes = createNoteTable();
	const linearNotes = createLinearNoteTable();

	function sequencer(osc, notes) {
		setTimeout(() => {
			osc.frequency.value = notes[3]['E']; // E
		}, 0);
		setTimeout(() => {
			osc.frequency.value = notes[3]['D#']; // Eflat
		}, 400);
		setTimeout(() => {
			osc.frequency.value = notes[3]['E']; // E
		}, 800);
		setTimeout(() => {
			osc.frequency.value = notes[2]['A']; // A
		}, 1200);
		setTimeout(() => {
			osc.frequency.value = notes[3]['E']; // E
		}, 1600);
		setTimeout(() => {
			osc.frequency.value = notes[3]['D#']; // Eflat
		}, 2000);
		setTimeout(() => {
			osc.frequency.value = notes[3]['E']; // E
		}, 2400);
		setTimeout(() => {
			osc.frequency.value = notes[3]['F']; // F
		}, 2800);
		setTimeout(() => {
			osc.frequency.value = notes[3]['G']; // F
		}, 3200);
		setTimeout(() => {
			osc.frequency.value = notes[3]['F']; // F
		}, 3600);
		setTimeout(() => {
			osc.frequency.value = notes[3]['E']; // F
		}, 4000);
		setTimeout(() => {
			osc.frequency.value = notes[2]['G#']; // F
		}, 4400);
	}

	function sequencerA(osc, notes) {
		var go = setInterval(() => {
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // E
			}, 0);
			setTimeout(() => {
				osc.frequency.value = notes[3]['D#']; // Eflat
			}, 400);
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // E
			}, 800);
			setTimeout(() => {
				osc.frequency.value = notes[2]['A']; // A
			}, 1200);
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // E
			}, 1600);
			setTimeout(() => {
				osc.frequency.value = notes[3]['D#']; // Eflat
			}, 2000);
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // E
			}, 2400);
			setTimeout(() => {
				osc.frequency.value = notes[3]['F']; // F
			}, 2800);
			setTimeout(() => {
				osc.frequency.value = notes[3]['G']; // F
			}, 3200);
			setTimeout(() => {
				osc.frequency.value = notes[3]['F']; // F
			}, 3600);
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // F
			}, 4000);
			setTimeout(() => {
				osc.frequency.value = notes[2]['G#']; // F
			}, 4400);
		}, 5200)
	}

	function sequencerB(osc, notes) {
		var go = setInterval(() => {
			setTimeout(() => {
				osc.frequency.value = notes[3]['B']; // E
			}, 0);
			setTimeout(() => {
				osc.frequency.value = notes[3]['A']; // Eflat
			}, 400);
			setTimeout(() => {
				osc.frequency.value = notes[3]['B']; // E
			}, 800);
			setTimeout(() => {
				osc.frequency.value = notes[3]['E']; // A
			}, 1200);
			setTimeout(() => {
				osc.frequency.value = notes[3]['B']; // E
			}, 1600);
			setTimeout(() => {
				osc.frequency.value = notes[3]['A']; // Eflat
			}, 2000);
			setTimeout(() => {
				osc.frequency.value = notes[3]['B']; // E
			}, 2400);
			setTimeout(() => {
				osc.frequency.value = notes[4]['C']; // F
			}, 2800);
			setTimeout(() => {
				osc.frequency.value = notes[4]['D']; // F
			}, 3200);
			setTimeout(() => {
				osc.frequency.value = notes[4]['C']; // F
			}, 3600);
			setTimeout(() => {
				osc.frequency.value = notes[3]['B']; // F
			}, 4000);
			setTimeout(() => {
				osc.frequency.value = notes[3]['D#']; // F
			}, 4400);
		}, 5200)
	}

	function chromaA(osc, notes) {	
		setTimeout(() => {
			osc.frequency.value = notes[36];
		}, 0);
		setTimeout(() => {
			osc.frequency.value = notes[38];
		}, 400);
		setTimeout(() => {
			osc.frequency.value = notes[40];
		}, 800);
		setTimeout(() => {
			osc.frequency.value = notes[42];
		}, 1200);
		setTimeout(() => {
			osc.frequency.value = notes[44];
		}, 1600);
		setTimeout(() => {
			osc.frequency.value = notes[46];
		}, 2000);
		setTimeout(() => {
			osc.frequency.value = notes[48];
		}, 2400);
		setTimeout(() => {
			osc.frequency.value = notes[50];
		}, 2800);
		setTimeout(() => {
			osc.frequency.value = notes[52];
		}, 3200);
		setTimeout(() => {
			osc.frequency.value = notes[54];
		}, 3600);
		setTimeout(() => {
			osc.frequency.value = notes[56];
		}, 4000);
		setTimeout(() => {
			osc.frequency.value = notes[58];
		}, 4400);
	}

	function chromaB(osc, notes) {
		setTimeout(() => {
			osc.frequency.value = notes[40];
		}, 0);
		setTimeout(() => {
			osc.frequency.value = notes[42];
		}, 400);
		setTimeout(() => {
			osc.frequency.value = notes[44];
		}, 800);
		setTimeout(() => {
			osc.frequency.value = notes[46];
		}, 1200);
		setTimeout(() => {
			osc.frequency.value = notes[48];
		}, 1600);
		setTimeout(() => {
			osc.frequency.value = notes[50];
		}, 2000);
		setTimeout(() => {
			osc.frequency.value = notes[52];
		}, 2400);
		setTimeout(() => {
			osc.frequency.value = notes[54];
		}, 2800);
		setTimeout(() => {
			osc.frequency.value = notes[56];
		}, 3200);
		setTimeout(() => {
			osc.frequency.value = notes[58];
		}, 3600);
		setTimeout(() => {
			osc.frequency.value = notes[60];
		}, 4000);
		setTimeout(() => {
			osc.frequency.value = notes[58];
		}, 4400);
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

		var intervalCounter = 0;
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

		if (e.which === 13) {
			// setInterval(() => {
				arrOfOsc.forEach((osc) => {
					sequencer.call(null, osc, notes);
				});
				// arrOfOsc.forEach((osc) => {
				// 	chroma.call(null, osc, linearNotes);
				// });
			// }, 500);
		}

		// 1 key
		if (e.which === 49) {
			sequencerA.call(null, arrOfOsc[0], notes);
			sequencerB.call(null, arrOfOsc[1], notes);
		}

		// 2 key
		if (e.which === 50) {
			chromaA.call(null, arrOfOsc[2], linearNotes);
			chromaB.call(null, arrOfOsc[3], linearNotes);
		}


});
