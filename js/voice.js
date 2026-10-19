let voiceMsg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
let voices = [];
let voiceID = 2;

function loadVoices() {
  // 1. Fetch the voices
  voices = synth.getVoices();
  
  if (voices.length === 0) return;

  // 2. Do something with the voices (e.g., log them or populate a dropdown)
  console.log(`Loaded ${voices.length} voices.`);
  
  // Example: Find a specific language or premium voice
  const englishVoice = voices.find(voice => voice.lang === 'en-US');
}

// Execute immediately for browsers that load voices synchronously (e.g., Firefox)
loadVoices();

// Chrome and Safari load voices asynchronously; listen for the change event
if (synth.onvoiceschanged !== undefined) { synth.onvoiceschanged = loadVoices; }

function speakText(strWord = '') {
  if (!ttsEnabled) { return; }

  if (voices.length === 0) {
  // Wait for voices to load, then try again
    const waitForVoices = () => {
       if (voicesLoaded && englishVoices.length > 0) {
         speak(text, options);
       } else {
         setTimeout(waitForVoices, 100);
       }
    };
    waitForVoices();
    return;
  }
  // BUG:  Sometimes it repeats itself.  Something to review.
  if (strWord === '') {
    voiceMsg.text = "., , " + getLastWord();
  } else {
    voiceMsg.text = "., , " + strWord;
  }
  synth.cancel();
  //        window.speechSynthesis.speak(voiceMsg);
  //const  = voiceMsg.text;
  synth.speak(voiceMsg);
}
function getLastWord(strPhrase) {
        textVal = strPhrase; //document.getElementById("voiceText").value.replace("_"," ");
        //textVal = textVal.split(' ');
        if (textVal !='') { return ''; }
        if (textVal[textVal.length-1] === ' ' || textVal[textVal.length-1] === '_') {
            // Get the last word   
            return textVal.replaceAll('_',' ');
        }
        console.log(textVal[textVal.length-1]);
        return textVal[textVal.length-1];
}
function setVoiceSettings() {
        voiceMsg.voice  = voices[voiceID]; // document.getElementById("voiceVoice").value
        voiceMsg.volume = parseFloat(document.getElementById("voiceVolume").value); // From 0 to 1
        voiceMsg.rate   = parseFloat(document.getElementById("voiceRate").value); // From 0.1 to 10
        voiceMsg.pitch  = parseFloat(document.getElementById("voicePitch").value); // From 0 to 2
        voiceMsg.lang   = 'en'; // document.getElementById("voiceLanguage").value
}
ttsEnabled = true;