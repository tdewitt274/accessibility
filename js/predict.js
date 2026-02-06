
let dictionary = [
         {word: `Pain`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Tired`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Nauseous`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Hot`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Cold`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Scared`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Itchy`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Dizzy`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Uncomfortable`, occurrence: 1, category: 'Urgent', importance: 500}
        ,{word: `Reposition Me`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Breathing is harder`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `I need help`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Use the bathroom`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Suction Mouth`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Suction trach`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Do not resuscitate`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Check my catheter`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `Do not intubate`, occurrence: 1, category: 'Help', importance: 500}
        ,{word: `TV control`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Call light`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Lights`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Lotion`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Glasses`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Medicine`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Wash face`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Chapstick`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Blanket`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Oral care`, occurrence: 1, category: 'Assist', importance: 500}
        ,{word: `Contact my family`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Talk to Doctor`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `What's happening?`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `What's Next`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Thank You`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Family Visit`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `How am I doing?`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `I have questions`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `How much longer`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Religious person`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Ask me Yes/No Questions`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Yes`, occurrence: 1, category: 'Universal', importance: 1000}
        ,{word: `No`, occurrence: 1, category: 'Universal', importance: 1000}
        ,{word: `Not Sure`, occurrence: 1, category: 'Universal', importance: 1000}
        ,{word: `Music`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `I should, but I don't`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Dealer's Choice`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Shake`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Milk`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Pop`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Juice`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Coffee`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Float`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Baclofen`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Spit, please grab cup`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Chimichanga`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Burrito`, occurrence: 1, category: 'Phrases', importance: 500}
        ,{word: `Green Sauce`, occurrence: 1, category: 'Phrases', importance: 500}
];
console.log(dictionary.length);
function addWord() {
        currVal = document.getElementById("textString").value.trim();
        if (!dictionary.some(words => words.word === currVal)) {
                dictionary.push({ word: currVal, occurrence: 1, category: 'Entry', importance: 1 });
        } else {
                dictionary.forEach(words => {
                  if (words.word === currVal) {
                        words.occurrence = words.occurrence + 1;
                  }
                })
        }
        sortDictionary();
}
function predictWord() {
        let filterValue = document.getElementById("textValue").innerText.trim().replaceAll(' ','_').toUpperCase();
//        document.getElementById("textValue").innerText = filterValue;
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
sortDictionary();

function fillExisting() {
    dictionary.forEach((entry, index) => {
//    console.log(`Index ${entry.word}: ${entry.occurrence}, ${entry.category}, ${entry.importance}`);
        addItem(getJsonData(`${entry.word}`,entry.importance,1,1,`${entry.category}`));
    });
}