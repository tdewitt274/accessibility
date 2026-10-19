let currCol = 0;
let currRow = 0;
// TODO: Settings option that will overwrite "alpha" with the options
const aryKeyboards = [
    ['Alpha',[['A|B|C|D|E|F|&nbsp;|1|2']
              ,['G|H|I|J|K|L|&nbsp;|3|4']
              ,['M|N|O|P|Q|R|&nbsp;|5|6']
              ,['S|T|U|V|W|X|&nbsp;|7|8']
              ,['@|#|Y|Z|.|+|&nbsp;|9|0']
              ,[' -6|&nbsp;|&#9881;-2']]]
  , ['Alpha with Space',[['A|B|C|D|E|F|&nbsp;|1|2']
              ,['G|H|I|J|K|L|&nbsp;|3|4']
              ,['M|N|O|P|Q|R|&nbsp;|5|6']
              ,['S|T|U|V|W|X|&nbsp;|7|8']
              ,['@|#|Y|Z|.|+|&nbsp;|9|0']
              ,[' -6|&nbsp;|&#9881;-2']]]
  , ['QWERTY with Controls',[['&#128077;-1|1|2|3|4|5|6|7|8|9|0|&#9881;-2']
              ,['&#8660;-1|Q|W|E|R|T|Y|U|I|O|P|&#10096;&#10096;-2']
              ,['&#128078;-1|A|S|D|F|G|H|J|K|L|\'|&#9166;-2']
              ,['&#x26A0;-1|Z|X|C|V|B|N|M|,|.|?|:|/']
              ,['&#128214;-1| -11|CLR-1']]]
  , ['QWERTY Letters',[['1|2|3|4|5|6|7|8|9|0']
              ,['Q|W|E|R|T|Y|U|I|O|P']
              ,['A|S|D|F|G|H|J|K|L|\'']
              ,['Z|X|C|V|B|N|M|,|.|?']
              ,[' -8|&#9881;-2']]]
  , ['Morse Code',[['O-2|M-2|T-2|E-2|I-2|5-2|H-2']
              ,['Q-2|G-1|&nbsp;-1|U-2|V-2|']
              ,['Y-2|K-2|N-1|&nbsp;-2|U-2|V-2|']
    ]]
]
currKeyboard = 2;
const maxCol = (aryKeyboards[currKeyboard][1][0][0].split('|')).length;
const maxRow = aryKeyboards[currKeyboard][1].length;

function handleRadio(rowMod = null, colMod = null) {
  currCol = colMod === null ? currCol : colMod;
  currRow = rowMod === null ? currRow : rowMod;
  clearAllClassNamesFromTable("keyboard");
  const table = document.getElementById("keyboard");
  
  Array.from(table.rows).forEach((row, rowIndex) => {
    let visualColIndex = 0;

    Array.from(row.cells).forEach((cell) => {
      const width = cell.colSpan;
      const start = visualColIndex;
      const end = visualColIndex + width - 1;

      // Check if this cell occupies the target coordinates
      const isRowMatch = rowIndex === currRow;
      const isColMatch = currCol >= start && currCol <= end;

      if (isRowMatch) { cell.classList.toggle("highlight_rows"); } 
      if (isColMatch) { cell.classList.toggle(`highlight_cols`); }

      // Increment the visual index by the width of the cell
      visualColIndex += width;
    });
  });
}
function clearAllClassNamesFromTable(tableId) {
// Clear the keyboard highlights
    const table = document.getElementById(tableId);
 
    // Select all elements within the table (including table, tr, td, th, etc.)
    const allElementsInTable = table.querySelectorAll('*');
 
    // Iterate over the elements and clear their class lists
    allElementsInTable.forEach(element => {
        // Spread the classList items as arguments to the remove method
        element.classList.remove(...element.classList);
    });
}
function getCheckedValue(rdo) {
// Cycles through the radio buttons to determine which column/row is checked, return that value
    const radioButtons = document.getElementsByName(rdo);
    let selectedValue = null;
 
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
            break; // Exit the loop once the checked one is found
        }
    }
    return null;
}
function handleMovement(x = 0,y = 0) {
  if (y != 0) { currCol += y; }
  if (x != 0) { currRow += x; }

  if (currCol > maxCol-1) { currCol = 0; }
  if (currCol < 0) { currCol = maxCol-1; }
  if (currRow < 0) { currRow = maxRow-1; }
  if (currRow > maxRow-1) { currRow = 0; }
}
function handleEvents(keyVal,logInfo = true) {
// This function handles the key events that are passed from the press/release functions

  // Check the 'key' property to determine which key was pressed
  let key = keyVal.toUpperCase();  // Convert to Uppercase
  const curr = getActiveValue();  // Get the main text area
  if (key === 'SPACE (_)') { key = ' '; }

  // Keyboard controls are not needed, will bypass values
  if (
    key === 'CONTROL' || key === 'ALT' || key === 'SHIFT' || key === 'TAB' || key === 'CAPSLOCK' || key === 'META' || key === 'CONTEXTMENU' 
    || key === 'PRINTSCREEN' || key === 'SCROLLLOCK' || key === 'PAUSE' || key === 'INSERT' || key === 'HOME' || key === 'PAGEUP' || key === 'END' 
    || key === 'PAGEDOWN' || key === '`' || key === 'NUMLOCK'
    || key === 'F1' || key === 'F2' || key === 'F3' || key === 'F4' || key === 'F5' || key === 'F6' || key === 'F7' || key === 'F8' || key === 'F9' 
    || key === 'F10' || key === 'F11' || key === 'F12' || key === 'F13' || key === 'F14' || key === 'F15' || key === 'F16' || key === 'F17' 
    || key === 'F18' || key === 'F19' || key === 'F20' || key === 'F21' || key === 'F22' || key === 'F23' || key === 'F24'
  ) {
    return;
  }
  let qry = key;  // For logging

//  if (document.querySelectorAll('.highlight_rows.highlight_cols').length === 0) { return; }
/*
  let qryVal = typeof document.querySelectorAll('.highlight_rows.highlight_cols') === 'undefined' ? key : document.querySelectorAll('.highlight_rows.highlight_cols')[0].innerText;
  if (qryVal.toUpperCase() === "SPACE (_)") { qryVal = "_"; }
  
  key = qryVal;
*/
  // Determines what to do when a certain key is pressed. 
  // In the event where there is noting between cases, it will go to the next option and run that code.  Reduces overhead.
  let currVal = getActiveValue();
  let currTxt = getTextValue();
  switch (key) {
    case 'DEL':  // Will remove the last character
    case '❰❰': //&#10096;&#10096;
    case 'BACKSPACE':  // Will remove the last character
      speakText("DELETE");
      setActiveValue(currTxt.substring(0,currTxt.length-1));
//      speakText(getLastWord(getActiveValue() + "_"));
      break;
    case 'CLR':
    case 'DELETE':
      speakText("CLEAR");
      setActiveValue('');
      break;
    case 'ARROWRIGHT': // Right arrow key, iterate through the grid columns
      handleMovement(0,1);
      break; 
    case 'ARROWLEFT': // Left arrow key, iterate backward through the grid columns
      handleMovement(0,-1);
      break;
    case 'ARROWUP': // Up arrow key, iterate back through the grid rows
      handleMovement(-1,0);
      break;
    case 'ARROWDOWN': // Down arrow key, iterate through the grid rows
      handleMovement(1,0);
      break;
    case 'SPACE': // Adds an "_" character when the Space button is pushed
    case ' ':     // Adds an "_" character when the Space button is pushed
    case '_':     // Adds an "_" character when the Space button is pushed
      speakText("SPACE");
      setActiveValue("_",'add');
      break;
    case '👍':
      key = "YES";
    case 'YES':
    case '👎':
      key = "NO";
    case 'NO':
    case '⇔':
    case 'MAYBE':
      if (key === '⇔') { key = "MAYBE"; }
      if (key === '👍') { key = "YES"; }
      if (key === '👎') { key = "NO"; }
      document.getElementById("previous").value = key;
      addWord();
      speakText(key);
      break;
    case '⚠':
    case 'HELP':
      key = "HELP"; 
      speakText(key);
//      alert('HELP');
      break;
    case 'SETTINGS': // Brings up the Settings menu
    case '⚙': //'&#x2699;&#9881;' 
      openSettingsModal()
      key = "SETTINGS"; 
      speakText(key);
      break;
    case '🕮': //'&#x2699;&#9881;' 
    case '📖': //'&#x2699;&#9881;' 
//      alert('Predict');
      key = "DICTIONARY"; 
      speakText(key);
      break;
    case 'ENTER': // Registers the intersection value.  If it's the "SPACE (_)" option, include only a "_"
      qry = document.querySelectorAll('.highlight_rows.highlight_cols');
      qry = qry[0].innerText;
      
      if (qry.toUpperCase() === "SPACE (_)") { qry = "_"; }
      
      setActiveValue(qry,'add');
      speakText(qry);
      addWord();
      break;
    case '⏎':       // Keyboard option to register the data in the main field
    case 'ESCAPE':  // Keyboard option to register the data in the main field
      currVal = currVal.replaceAll('_',' ');
      document.getElementById("previous").value = currVal;
      addWord();
      setActiveValue(currVal,'add');
      speakText(currVal);
      setActiveValue("");
      break;
    case `'`:
      speakText("APOSTRAPHE");
    case ',':
      speakText("COMMA");
    case '.':
      speakText("PERIOD");
    case '?':
      speakText("QUESTION MARK");
    case ':':
      speakText("COLON");
    case '/':
      speakText("SLASH");
    case 'FAVORITE':
      //speakText("SLASH");
    default: // All other keys, do what was pushed
      setActiveValue(key,'add');
      speakText(key);

  }
  handleRadio();
  if (key.substring(0,5) != 'ARROW') { predictWord(); }

  if (logInfo) { console.log("Key: ",qry," using ",keyVal,Date.now()); } // LOGGING: Used for time tracking to determine how long it is taking to register values.
  return;
/*
//If needed
    // Example of a keyboard shortcut: Detect Ctrl + S (for Windows/Linux) or Cmd + S (for Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent the browser's default save action
        console.log('Save shortcut triggered!');
    }
*/
}
function setActiveValue(val,typ = 'replace') {
  currObj = document.getElementById("textValue");
  if (typ === 'replace') {
    currObj.innerText  = val;
  } else {
    currObj.innerText += val;
  }
}
function getActiveValue(ctrlField = "keyEntry") {
//TODO: Replace any instances that add to this value with the innerHTML.
  let ans = "";
  if (ctrlField === "previous") { ans = document.getElementById(ctrlField).value; }
  else { ans = document.getElementById(ctrlField).innerText; }
  return ans;
// return document.getElementById("textValue").innerText;
}
function getEnteredValue(ctrlField = "previous") {
//TODO: Replace any instances that add to this value with the innerHTML.
  return document.getElementById(ctrlField).value;
// return document.getElementById("textValue").innerText;
}
function getTextValue(ctrlField = "textValue") {
//TODO: Replace any instances that add to this value with the innerHTML.
  return document.getElementById(ctrlField).innerText;
// return document.getElementById("textValue").innerText;
}
function setKeyboard() {
// Function to generate the HTML table
  let dataArray = aryKeyboards[currKeyboard][1]
  // Start the table HTML
  let tableHTML = '';
  tableHTML += '<table border=1 id="keyboard">';

  // Map over the data array
  dataArray.map((rowArr, rowIndex) => {
    // Split the single string in the array (e.g., 'A|B|C...') by the pipe '|' delimiter
    const cells = rowArr[0].split('|');

    // Map over the resulting cells array and create <td> elements
    let collIndex = 0;
    let colSpan = '';
    let dataCol = '';
    let dataRow = '';
    cells.map(cellContent => {
        if (cellContent.length > 1) {
          let tmp = cellContent.split('-');
          cellContent = tmp[0];
          colSpanVal = Number(tmp[1]);
          colSpan = ` colspan="${tmp[1]}"`;

          dataCol = `cols${collIndex}`;
          dataCol = dataCol.trim();
          collIndex += colSpanVal-1;
        } else {
          colSpan = '';
          dataCol = `cols${collIndex}`;
        }
        if (cellContent.trim() === '') { cellContent = 'Space (_)'; }

        tableHTML += `<td${colSpan} data-cols-id="${dataCol}" data-rows-id="rows${rowIndex}">${cellContent.trim()}</td>`; // Use .trim() to remove leading/trailing spaces if any
        collIndex++;
    });

    // End the table row
    tableHTML += '</tr>';
  });

  // End the table HTML
  tableHTML += '</table>';

  return tableHTML;
}
function setTableEvents() {
const table = document.getElementById('keyboard');

// Add the touchstart event listener to the table
table.addEventListener('touchstart', function(event) {
    // 'event.target' is the actual element that was touched (could be text *inside* the <td>)
    // Use .closest('td') to find the nearest ancestor that is a table cell (<td>)
    const cell = event.target.closest('td');
    
    // Ensure a cell was actually found within the table
    if (cell && cell.parentNode.parentNode === table) {
        event.key = eventcell.innerText;
        processEvent(event);
    }
});

table.addEventListener('click', function(event) {
      // 3. Check if the clicked element is a table cell (td or th)
      const clickedCell = event.target.closest('td, th');

      if (clickedCell) {
          handleRadio(Number(clickedCell.dataset.rowsId.replace('rows','')), Number(clickedCell.dataset.colsId.replace('cols','')));
          // The event target is the specific cell that was clicked
          event.key = clickedCell.textContent;
          processEvent(event);
      }
  });
}
function isHidden(elem) {
  const styles = document.getElementById(elem).style;
  return styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0';
}