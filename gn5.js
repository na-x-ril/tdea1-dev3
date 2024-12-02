function createAudioNode(videoElement) {
  const audioContext = new AudioContext();
  const audioStream = audioContext.createMediaElementSource(videoElement);
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

  Object.values(equalizer).forEach(({ frequency, gain }) => {
    biquadFilter.frequency.value = frequency;
    biquadFilter.Q.value = 4.0;
    biquadFilter.gain.value = gain;
  });

  inGain.gain.value = 0.2;
  outGain.gain.value = 6.5;

  audioStream.connect(inGain).connect(biquadFilter).connect(outGain).connect(audioContext.destination);
  console.log('Bass Boosted!');
  return true;
}
