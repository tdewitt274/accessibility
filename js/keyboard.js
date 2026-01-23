let currCol = -1;
let currRow = -1;
// TODO: Settings option that will overwrite "alpha" with the options
const aryKeyboards = [
    ['Alpha','A|B|C|D|E|F| |1|2;G|H|I|J|K|L| |3|4;M|N|O|P|Q|R| |5|6;S|T|U|V|W|X| |7|8;@|#|Y|Z|.|+| |9|0;Space (_)|Space (_)|Space (_)|Space (_)|Space (_)|Space (_)|Space (_)|Space (_)|Space (_)']
  , ['QWERTY','Q|W|E|R|T|Y|U|I|O|P;A|S|D|F|G|H|J|K|L;Z|X|C|V|B|N|M,|.']
]
//let alpha = 'ABCDEF 12GHIJKL 34MNOPQR 56STUVWX 78@#YZ.+ 90';
//const maxCol = 9;
//const maxRow = Math.ceil(alpha.length/maxCol);
currKeyboard = 0;

let alpha = aryKeyboards[currKeyboard][1].replaceAll(';','').replaceAll('|','');
let tmpKeys = aryKeyboards[currKeyboard][1].split(';');
const maxCol = tmpKeys[0].split('|').length;
const maxRow = tmpKeys.length;

//const nums = '01234@56789!';

function handleRadio(rdo,val) {
// This function takes the radio option (columns or rows) and the row/column number
//   to clear out the keyboard and display the new coordinates.
  const radioButtons = document.querySelectorAll(`input[name="${rdo}"]`);
  let selectedSize = 'None selected';

  for (const button of radioButtons) {
    if (button.checked) {
      button.checked = false;
    }
    if (button.value === val.toString()) {
      button.checked = true;
    }
}
// Reset the table
  clearAllClassNamesFromTable("keyboard");

// Determine the current column, get the columns, and toggle the appropriate column
  let colVal = getCheckedValue("cols");
  cellsToHighlight = document.querySelectorAll(`[data-cols-id="cols${colVal}"],[data-cols-id="colSpan"]`);
  cellsToHighlight.forEach(colCell => {
    colCell.classList.toggle(`highlight_cols`);
  });
// Same as before, but with the rows
  let rowVal = getCheckedValue("rows");
  cellsToHighlight = document.querySelectorAll(`[data-rows-id="rows${rowVal}"]`);
  cellsToHighlight.forEach(rowCell => {
    rowCell.classList.toggle(`highlight_rows`);
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
function handleEvents(keyVal) {
// This function handles the key events that are passed from the press/release functions

  // Check the 'key' property to determine which key was pressed
  const key = keyVal.toUpperCase();  // Convert to Uppercase
  const curr = document.getElementById("active");  // Get the main text area

  // Keyboard controls are not needed, will bypass values
  if (key === 'CONTROL' || key === 'ALT' || key === 'SHIFT' || key === 'TAB' || key === 'CAPSLOCK') {
    return;
  }
  let qry = key;  // For logging

  // Determines what to do when a certain key is pressed.
  switch (key) {
    case 'BACKSPACE':  // Will remove the last character
      curr.value = curr.value.substring(0,curr.value.length-1);
      break;
    case 'ARROWRIGHT': // Right arrow key, iterate through the grid columns
      currCol += 1;
      if (currCol === 6) { currCol++; }
      if (currCol >  maxCol-1) { currCol = 0; }
      handleRadio("cols",currCol);
      break;
    case 'ARROWLEFT': // Left arrow key, iterate backward through the grid columns
      currCol += -1;
      if (currCol === 6) { currCol--; }
      if (currCol < 0) { currCol = maxCol-1; }
      handleRadio("cols",currCol);
      break;
    case 'ARROWUP': // Up arrow key, iterate back through the grid rows
      currRow += -1;
      if (currRow < 0) { currRow = maxRow; }
      handleRadio("rows",currRow);
      break;
    case 'ARROWDOWN': // Down arrow key, iterate through the grid rows
      currRow += 1;
      if (currRow >  maxRow) { currRow = 0; }
      handleRadio("rows",currRow);
      break;
    case 'SPACE': // Adds an "_" character when the Space button is pushed
      curr.value += "_";
      break;
    case ' ': // Adds an "_" character when the Space button is pushed
      curr.value += "_";
      break;
    case 'DELETE': 
      document.getElementById('active').value = '';
      break;
    case 'ENTER': // Registers the intersection value.  If it's the "SPACE (_)" option, include only a "_"
      let colVal = getCheckedValue("cols");
      let rowVal = getCheckedValue("rows");
      qry = document.querySelectorAll('.highlight_rows.highlight_cols');
      qry = qry[0].innerText;
      
      if (qry === "SPACE (_)") { qry = "_"; }
      
      curr.value += qry;
      break;
    case 'ESCAPE':  // Keyboard option to register the data in the main field
      document.getElementById("previous").value = curr.value.replaceAll('_',' ');
      addValue(curr.value.replaceAll('_',' '));
      curr.value = "";
      break;
    default: // All other keys, do what was pushed
      curr.value += key;
  }

  console.log("Key: ",qry," using ",keyVal,Date.now()); // LOGGING: Used for time tracking to determine how long it is taking to register values.
  return;
  /*// For future implementations (F13-F24)
  if (key === 'F13' || key === 'F14' || key === 'F15' || key === 'F16') {
                  return;
  }
//If needed
    // Example of a keyboard shortcut: Detect Ctrl + S (for Windows/Linux) or Cmd + S (for Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent the browser's default save action
        console.log('Save shortcut triggered!');
    }
*/
}
function setKeyboard() {
// Gathers the layout for the keyboard.  The data is sent in a string and pulled out as needed.

// Keyboard is laid out in an HTML table
    let tbl = `<table border=1 id="keyboard">`;
// This will display the user entry
    tbl += `<tr><input type="text" id="active" disabled><br /><input type="text" id="predict" disabled><br /><input type="text" id="previous" disabled></tr>`
// Loop will throw the columns and rows for the keyboard
    for (var r=-1; r<maxRow; r++) {
      tbl += `<tr>`;
      for (var c=-1; c<maxCol; c++) {
        if (r === -1 && c === -1) {
// This is the 0,0 coordinate and is only really used on initialization
            tbl += `<th><input type="radio" name="cols" id="cols" value=${c} checked><input type="radio" name="rows" id="rows" value=${r} checked></th>`;
        } else if (r === -1) {
// Column radio button
            tbl += `<th><input type="radio" name="cols" id="cols" value=${c}></th>`;
        } else {
            if (c === -1 && !(c===-1 && r === -1)) {
// Row radio button
            tbl += `<th><input type="radio" name="rows" id="rows" value=${r}></th>`;
            } else {
            if ((r*maxCol+c) < alpha.length) {
// Key text
                tbl += `<td data-cols-id="cols${c}" data-rows-id="rows${r}">${alpha[r*maxCol+c]}</td>`;
                }
            }
        }
      }
      tbl += `</tr>`;
    }
// Space bar row
    tbl += `<tr><th><input type="radio" name="rows" id="rows" value=${maxRow}></th>`;
//    tbl += `<td>&crarr;</td><td data-cols-id="colSpan" data-rows-id="rows${maxRow}" colspan=${maxCol-2}>SPACE (_)</td><td>␡</td></tr>`;
    tbl += `<td data-cols-id="colSpan" data-rows-id="rows${maxRow}" colspan=${maxCol}>SPACE (_)</td></tr>`;
// Finishing up and returning the table code
    tbl += `<table>`;
    return tbl;
}
function x_setKeyboard() {
// This function is to utilize a multi-dimensional array to populate the table instead of a string.
    let tbl = `<table border=1 id="keyboard">`;
    tbl += `<tr><input type="text" id="active" disabled><br /><input type="text" id="predict" disabled><br /><input type="text" id="previous" disabled></tr>`
    let keys = alpha;
// Gathers the currentKeyboard and splits along the semicolon for the rows.
    let rows = aryKeyboards[currKeyboard][1].split(';');  // TODO: have the keyboard value passed into the function
    let prevVal = "";

// Iterates through the rows
    for (let r=0; r<rows.length; r++) {
      tbl += `<tr>`;
// Gathers the current row and splits the value into an array for iterating through the columns.
      let cols = rows[r].split('|');
      for (let c=0; c<cols.length; c++) {
// Initializing for value input
        let thR = "";  // Header Rows
        let thC = "";  // Header Columns

        if (r === 0 && c === 0) { // Upper left corner, for initialization only
          thR += `<input type="radio" name="cols" id="cols" value="-1" checked>`;
          thC += `<input type="radio" name="rows" id="rows" value="-1" checked>`;
        } else if (r === 0) { // Column numbers
          thR += `<input type="radio" name="cols" id="cols" value="${r}">`;
        } else if (c === 0) { // Row numbers
          thC += `<input type="radio" name="rows" id="rows" value="${c}">`;
        } 
// If the current value is the same as the next value, iterate through and keep track of the number of columns to span.
        let count = 1;
        while (c + 1 < cols[r].length && cols[c] === cols[c + 1]) {
            count++;
            c++; // Increment i to skip the duplicates that will be merged
        }
// Place the value in a cell, or add the colspan value if there are duplicates
        tbl += `<td data-cols-id="cols${c}" colspan=${count} data-rows-id="rows${r}">${cols[c]}</td>`;

      }
      // close columns
      thC = thC !== '' ? `<th>${thC}</th>` : '';
      thR = thR !== '' ? `<th>${thR}</th>` : '';
      tbl += thC + thR;
    }
// Finish up and exit
    tbl += `<table>`;
    return tbl;
}