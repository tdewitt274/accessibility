let voiceMsg = new SpeechSynthesisUtterance();
/*
speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? voice.default :'');
});
*/
function getVoices() {
        return window.speechSynthesis.getVoices();
}
function speakText(strWord = '') {
// BUG:  Sometimes it repeats itself.  Something to review.
        if (!ttsEnabled) { return; }
        if (strWord === '') {
            voiceMsg.text = getLastWord();
        } else {
            voiceMsg.text = strWord;
        }
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(voiceMsg);
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
        voiceMsg.voice  = voices[0]; // document.getElementById("voiceVoice").value
        voiceMsg.volume = parseFloat(document.getElementById("voiceVolume").value); // From 0 to 1
        voiceMsg.rate   = parseFloat(document.getElementById("voiceRate").value); // From 0.1 to 10
        voiceMsg.pitch  = parseFloat(document.getElementById("voicePitch").value); // From 0 to 2
        voiceMsg.lang   = 'en'; // document.getElementById("voiceLanguage").value
}
ttsEnabled = true;