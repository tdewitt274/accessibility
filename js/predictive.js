function addOption(value) {
// Example usage:
//addOption('New Value 1');
    const datalist = document.getElementById('dynamic-list');
    const option = document.createElement('option');
    option.value = value;
    datalist.appendChild(option);
}
function addArrayOptions() {
    const dataList = document.getElementById('dynamic-list');
    const optionsArray = ['Apple', 'Banana', 'Cherry', 'Date'];
 
    // Clear existing options first if needed
    dataList.innerHTML = '';
 
    // Option A: Loop and append (standard DOM method)
    optionsArray.forEach(itemValue => {
    const option = document.createElement('option');
    option.value = itemValue;
    dataList.appendChild(option);
    });
 
    // Option B: Using innerHTML (more performant for large lists)
    /*
    let optionsHTML = '';
    optionsArray.forEach(itemValue => {
    optionsHTML += `<option value="${itemValue}">`;
    });
    dataList.innerHTML = optionsHTML;
    */
}
/*var dictionary = new Typo("en_US", false, false, { dictionaryPath: "typo/dictionaries" });
var word = "mispelled";
 
if (!dictionary.check(word)) {
  var suggestions = dictionary.suggest(word);
  console.log("Misspelled word:", word);
  console.log("Suggestions:", suggestions);
}*/
 
let aryWords = [];
let aryPhrases = [];
let minLength = 2;
function addValue(val) {
// Adds the phrases and words in the text to the arrays.
    // Checks for spaces in the phrase and then adds them to the phrase array.
    if (countWords(val) > 0) { addEntry('phrase',val); }
 
    //TODO: Need to strip out special characters.
       
    // Splits the phrase on the " " and adds the words.
    aryWrd = val.split(' ');
    for (let i=0; i < aryWrd.length; i++) {
        addEntry('word',aryWrd[i]);
    }
 
}
function addEntry(typ,val) {
// Takes the type ('phrase' or 'word') and the value, adds to the appropriate array
    val = val.trim().toUpperCase();
    // Gets the index of the value depending on the type.
    checkIdx = typ === 'phrase' ? findSubArray(aryPhrases,val) : findSubArray(aryWords,val);
       
    // If it is shorter than the minLength, exit
    if (val.length <= minLength) { return; }
       
    // If the value is not in the array, add to the array with a count of 1.
    if (checkIdx === -1) {
      typ === 'phrase' ? aryPhrases.push([val,1]) : aryWords.push([val,1]);
    } else {
    // If the value is in the array, update the array count by 1.
      typ === 'phrase' ? aryPhrases[checkIdx][1]++ : aryWords[checkIdx][1]++;
    }
}
function findSubArray(mainArray, aryVal) {
// Finds and returns the index of the array passed
    const index = mainArray.findIndex(currentInnerArray => {
        // Check if the first element (index 0) of the current inner array matches the target value
        return currentInnerArray[0] === aryVal;
    });
    return index;
}
function countWords(str, char = " ") {
  // Use length property of the resulting array after splitting
  return str.split(char).length - 1;
}
const copyToClipboard = async (textToCopy) => {
// TODO: Need to customize
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      console.log('Text copied to clipboard');
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};