let dictionary = [
     {word: `Pain`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Tired`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Nauseous`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Hot`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Cold`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Scared`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Itchy`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Dizzy`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Uncomfortable`, occurrence: 1, category: 'Urgent', importance: 500, pronounce: ""}
    ,{word: `Reposition Me`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Breathing is harder`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `I need help`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Use the bathroom`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Suction Mouth`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Suction Trach`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Do not resuscitate`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Check my catheter`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `Do not intubate`, occurrence: 1, category: 'Help', importance: 500, pronounce: ""}
    ,{word: `TV control`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Call light`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Lights`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Lotion`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Glasses`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Medicine`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Wash face`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Chapstick`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Blanket`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Oral care`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `I am hungry`, occurrence: 1, category: 'Assist', importance: 500, pronounce: ""}
    ,{word: `Contact my family`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Talk to Doctor`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `What's happening?`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `What's Next`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Thank You`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Family Visit`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `How am I doing?`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `I have questions`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `How much longer`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Religious person`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Ask me Yes/No Questions`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Yes`, occurrence: 1, category: 'Universal', importance: 1000, pronounce: ""}
    ,{word: `No`, occurrence: 1, category: 'Universal', importance: 1000, pronounce: ""}
    ,{word: `Not Sure`, occurrence: 1, category: 'Universal', importance: 1000, pronounce: ""}
    ,{word: `Music`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `I should, but I don't`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Dealer's Choice`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Shake`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Milk`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Pop`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Juice`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Coffee`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Float`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Baclofen`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Spit, please grab cup`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Chimichanga`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Burrito`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Green Sauce`, occurrence: 1, category: 'Phrases', importance: 500, pronounce: ""}
    ,{word: `Aon`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Bella`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Mom`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Doctor`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Athena Kellenberger`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Wade Kellenberger`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Pam Davidson`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `April`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Joanne Andersen`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Todd DeWitt`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `I Want My Phone`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Watch YouTube`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Watch TV`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Go to Room`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Get in Bed`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `I Want a Treat`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Too Hot`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Too Cold`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Get into Chair`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Wife`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Glasses`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Go Outside`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Reheat Food`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Daughter`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Coke`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Sprite`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Change Clothes`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Change Bedding`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
    ,{word: `Get Letter Board`, occurrence: 1, category: 'People', importance: 500, pronounce: ""}
//    ,{word: `LOL`, occurrence: 1, category: 'Abbreviations', importance: 1, pronounce: "Laugh Out Loud"}
];

// Helper function to update IndexedDB directly without warning prompt
async function saveWordToDB(item) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['dictionary'], 'readwrite');
        const store = transaction.objectStore('dictionary');
        const request = store.put(item);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}
async function addWord(currTxt = "textValue", incVal = 1) {
    let currVal = getEnteredValue("previous");
        currVal = currVal.trim();
    let index = dictionary.findIndex(item => item.word.toLowerCase() === currVal.toLowerCase());

    if (index === -1) {  // If it doesn't exist, add a new object to the dictionary array
        let targetWord = { word: currVal, occurrence: 1, category: 'Entry', importance: 1 };
        dictionary.push(targetWord);
    } else {  // If it exists, explicitly update the object at that index in the dictionary array
        dictionary[index].occurrence += incVal;
        targetWord = dictionary[index];
    }
    await saveWordToDB(dictionary[index]);
    sortDictionary();
}
function predictWord() {
    let filterValue = getActiveValue("textValue").trim().replaceAll(' ','_').toUpperCase();
    document.getElementById("textValue").innerText = filterValue;
    let container = document.getElementById("wordList");
    document.getElementById("predictText").innerText = '';
    container.innerHTML = '';

    if (dictionary.length <= 0 || filterValue === '') { console.log('ERROR: No Dictionary to review.'); return; }

    let result = dictionary.filter(option => option.word.replaceAll(' ','_').toUpperCase().startsWith(filterValue));
        result = result.filter(option => option.word.length > filterValue.length);

    if (result.length > 0) {
        let wordList = result.map(words => words.word.replaceAll(' ','_'));
        let firstItem = wordList.shift();
        document.getElementById("predictText").innerText = firstItem.toUpperCase().replace(filterValue,'');
        container.innerHTML = '';
        wordListVals = wordList.forEach(word => {
            const div = document.createElement('div');
            div.textContent = word;
            container.appendChild(div);
        });
    }
}
function sortDictionary () {
    dictionary.sort((a, b) => {
        // Sort by value descending (b - a)
        // If words are equal (result is 0/falsy), move to the next condition
        return (b.occurrence * b.importance)  - (a.occurrence * a.importance) || a.word.localeCompare(b.word); // Sort by word ascending (localeCompare for strings)
    })
}
function predictMode() {
    return false;
}
function autoComplete() {
    setActiveValue(document.getElementById('textValue').innerText + document.getElementById('predictText').innerText);
    handleEvents(' ');
}
function fillExisting() {
    dictionary.forEach((entry, index) => {
//    console.log(`Index ${entry.word}: ${entry.occurrence}, ${entry.category}, ${entry.importance}`);
        addItem(getJsonData(`${entry.word}`,entry.importance,1,1,`${entry.category}`));
    });
}

// Automatically load IndexedDB and merge values when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDictionaryDB();
});
