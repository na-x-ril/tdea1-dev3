const audioContext = new AudioContext();

// Function to create and connect audio nodes
function setupAudioNodes(sourceNode) {
    const inGain = audioContext.createGain();
    const biquadFilter = audioContext.createBiquadFilter();
    const outGain = audioContext.createGain();

    const equalizer = {
        31: { frequency: 31, gain: 15 },
        62: { frequency: 62, gain: 10 },
        125: { frequency: 125, gain: 5 },
        250: { frequency: 250, gain: 0 },
        500: { frequency: 500, gain: -5 },
        1000: { frequency: 1000, gain: -5 },
        2000: { frequency: 2000, gain: 0 },
        4000: { frequency: 4000, gain: 5 },
        8000: { frequency: 8000, gain: 10 },
        16000: { frequency: 16000, gain: 1 }
    };

    for (const frequency in equalizer) {
        const filterSettings = equalizer[frequency];
        biquadFilter.frequency.value = filterSettings.frequency;
        biquadFilter.Q.value = 3.0;
        biquadFilter.gain.value = filterSettings.gain;
    }

    inGain.gain.value = 0.2;
    outGain.gain.value = 2.7;

    sourceNode.connect(inGain);
    inGain.connect(biquadFilter);
    biquadFilter.connect(outGain);
    outGain.connect(audioContext.destination);
}

// Handle video elements
const videoElements = document.querySelectorAll('video');
videoElements.forEach(videoElement => {
    const videoSource = audioContext.createMediaElementSource(videoElement);
    setupAudioNodes(videoSource);
});

// Handle audio elements
const audioElements = document.querySelectorAll('audio');
audioElements.forEach(audioElement => {
    const audioSource = audioContext.createMediaElementSource(audioElement);
    setupAudioNodes(audioSource);
});

console.log('Bass Boosted for all audio and video elements!');
