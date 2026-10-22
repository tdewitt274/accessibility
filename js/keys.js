const config = {
    multiClickDelay: 400, // Time to wait for next tap
    longPressDelay: 700,  // How long to hold for a long press
    keysToTrack: ['Control', 'Alt', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24'] // These are the keys the system is looking for
};

let clickCount = 0;
let clickTimer = null;
let longPressTimer = null;
let activeKeys = new Set();
let isLongPressActive = false;

function handleAction(label) {
    console.log("TRIGGERED:", label);
    // Trigger your accessibility features here
}

window.addEventListener('keydown', (e) => {
// This function checks for a key down.  The reason is for long press and multiple press of a button.
    if (!config.keysToTrack.includes(e.key)) return;
    if (e.repeat) return; // Prevent OS auto-repeat from firing multiple times
// TODO: Allow for regular keyboard input.
    e.preventDefault(); // Stop page scrolling/form submission
    activeKeys.add(e.key);  // Adds to a Set, keeping the unique value for evaluation

    // 1. Check for Two-Button Chord
    if (activeKeys.size === 2) {
        clearTimeout(clickTimer);
        clearTimeout(longPressTimer);
        handleAction('Both Buttons Pressed');
        autoComplete();
        console.log('Pedictive Mode');
        isLongPressActive = true; // Prevents "Single Click" on release
        return;
    }

    // 2. Start Long Press Timer
    isLongPressActive = false;
    longPressTimer = setTimeout(() => {
        if (activeKeys.has(e.key) && activeKeys.size === 1) {
            switch (e.key) {
                case config.keysToTrack[0]:  // Control - LEFT
                    break;
                case config.keysToTrack[1]: // Alt - RIGHT
                    handleEvents('BACKSPACE');  // Backspace
                    break;
                default:
                    break;
            }
            isLongPressActive = true;
            clickCount = 0;
        }
    }, config.longPressDelay);
});

window.addEventListener('keyup', (e) => {
    processEvent(e);
});
function processEvent(e) {
    handleControlEvent(e.key)
}
const scanModes = ['ROW','COL','PAUSED'];
let scanModeVal = 0;
function handleControlEvent(keyVal) {
    if (isHidden('keyboard')) { console.log('Keyboard inaccessible'); return; }
// This function looks for the release of a button.  This is a reliable method for doing single actions.
// Makes sure that the key is a not new key being pressed 
    if (!config.keysToTrack.includes(keyVal)) {
        handleEvents(keyVal.toUpperCase());
        return;
    }
// Timer is no longer needed because the key is released
    clearTimeout(longPressTimer);
    activeKeys.delete(keyVal);

    // Only process click counts if it wasn't a long press or a chord
    if (activeKeys.size === 0) {
        clickCount++;
// If there isn't an active timer, set one
        if (!clickTimer) {
            clickTimer = setTimeout(() => {
                const keyName = keyVal === ' ' ? 'Space' : keyVal;  // Error handling for space key

                let dirVal = arrows[Number(!click1)][Number(click2)];
// Enter logic to send the appropriate button to the handleEvents()
// This logic will take the key that's being pushed and and checking it with appropriate keys
                switch (keyName) {
                    case 'xControl': // Control - LEFT
// Basically, if a single click, then swap the logic on the "click1" and "click2" options and logging
                        if (clickCount === 1) { click1 = !click1; console.log('Switched Coordinates'); }  // Switch XY option
                        if (clickCount === 2) { click2 = !click2; console.log('Switched Movement'); }  // Switch movement direction
                        if (clickCount === 3) { predictMode(); console.log('Pedictive Mode'); } // Predictive Mode
                        break;
                    case 'xAlt': // Alt - RIGHT
// Basically, if a single/double/triple click, send a command to the function that handles the keyboard
                        dirVal = arrows[Number(!click1)][Number(click2)];

                        if (clickCount === 1 && !autoScanEnabled) { 
                            handleEvents('arrow'+dirVal); //console.log(`Moved ${'arrow'+dirVal}`); 
                        } else if (clickCount === 1 && autoScanEnabled) { 
                            if (scanMode === 'ROW') {
                                click1 = !click1;
                                scanMode = 'COL';
//                                handleEvents('arrow'+dirVal); //console.log(`Moved ${'arrow'+dirVal}`); 
                            } else if (scanMode === 'COL') {
                                scanMode = 'PAUSED';
                            }
                            if (scanMode === 'PAUSED') {
                                handleEvents('ENTER'); 
                                if (currCol === maxCol) { scanMode = 'ROW'; } else { scanMode = 'COL'; }
                                break;
                            }
                        }
                        if (clickCount === 2 && !autoScanEnabled) { 
                            handleEvents('ENTER'); // Add text
                        } else if (clickCount === 2 && autoScanEnabled) { 
                            break;
                        }
                        if (clickCount === 3 && !autoScanEnabled) { 
                            handleEvents('ESCAPE');   // Register
                        } else if (clickCount === 3 && autoScanEnabled) { 

                        }
                        break;

// In the event of additional buttons or changes to the code from CTRL + ALT
                    case 'Control': // Control - LEFT
                    case 'F13': // Button 1
                        if (autoScanEnabled) { 
                            if (clickCount === 1 && !isLongPressActive) { click1 = !click1; console.log('Switched Coordinates'); }  // Switch XY option
                            if (clickCount === 2 && !isLongPressActive) { click2 = !click2; console.log('Switched Coordinates'); }  // Switch XY option
                            if (clickCount === 3 && !isLongPressActive) { predictMode();    console.log('Pedictive Mode');       } // Predictive Mode
                            if (isLongPressActive) { } // Predictive Mode
                        } else {
                            if (clickCount === 1 && !isLongPressActive) { click1 = !click1; console.log('Switched Coordinates'); }  // Switch XY option
                            if (clickCount === 2 && !isLongPressActive) { click2 = !click2; console.log('Switched Coordinates'); }  // Switch XY option
                            if (clickCount === 3 && !isLongPressActive) { predictMode();    console.log('Pedictive Mode');       } // Predictive Mode
                            if (isLongPressActive) { } // Predictive Mode
                        }
                        break;
                    case 'Alt': // Alt - RIGHT
                    case 'F14': // Button 2
                        dirVal = arrows[Number(!click1)][Number(click2)];
                        if (autoScanEnabled) { 
                            if (clickCount === 1 && !isLongPressActive) { 
                                if (scanModes[scanModeVal] === 'ROW') {
                                    scanModeVal++;
                                    click1 = !click1;
                                    scanMode = 'COL';
                                } else if (scanModes[scanModeVal] === 'COL') {
                                    scanModeVal++;
                                    scanMode = 'PAUSED';
                                }
                                if (scanModes[scanModeVal] === 'PAUSED') {
                                    handleEvents('ENTER'); 
                                    if (currCol === maxCol) { 
                                        scanModeVal = 0;
                                        scanMode = 'ROW'; 
                                    } else { 
                                        scanModeVal = 1;
                                        scanMode = 'COL'; 
                                    }
                                    break;
                                }
                                scanModeVal = scanModeVal > scanModes.length-1 ? 0 : scanModeVal;
                            }
                            if (clickCount === 2 && !isLongPressActive) { handleEvents('ESCAPE');  } 
//                            if (clickCount === 3) { handleEvents('');  } 
                            if (isLongPressActive && !isLongPressActive) { handleEvents('BACKSPACE'); } 
                        } else {
                            if (clickCount === 1 && !isLongPressActive) { handleEvents('arrow'+dirVal); }  // Switch XY option
                            if (clickCount === 2 && !isLongPressActive) { handleEvents('ENTER');        } 
                            if (clickCount === 3 && !isLongPressActive) { handleEvents('ESCAPE');       } 
                            if (isLongPressActive) { handleEvents('BACKSPACE');   } 
                        }
                        break;
                    case 'F15': // Button 3
                    case 'END': // Button 3
                        if (clickCount === 1 && !isLongPressActive) {  }  // Switch XY option
                        if (clickCount === 2 && !isLongPressActive) {         } 
                        if (clickCount === 3 && !isLongPressActive) {        } 
                        if (isLongPressActive) { addWord("previous", 100); } 
                        break;
                    case 'F16': // Button 4
                        break;
                    case 'F17': // Button 5
                        break;
                    case 'F18': // Button 6
                        break;
                    case 'F19': // Button 7
                        break;
                    case 'F20': // Button 8
                        break;
                    case 'F21': // Button 9
                        break;
                    case 'F22': // Button 10
                        break;
                    case 'F23': // Button 11
                        break;
                    case 'F24': // Button 12
                        break;
                    default:
                        break;
                }
// Update the "turn signal" in the upper right corner as needed and log the informaiton
                turnSignal(arrows[Number(!click1)][Number(click2)]);
                if (clickCount ===      1) { handleAction(`${keyName} Single Click`); }
                else if (clickCount === 2) { handleAction(`${keyName} Double Click`); }
                else if (clickCount >=  3) { handleAction(`${keyName} Triple Click`); }

                clickCount = 0;
                clickTimer = null;
//TODO: Modify the multiClickDelay in a training program
            }, config.multiClickDelay);
        }
    }
}
// click1/2 are for the movement of the keyboard coordinates
let click1 = false; // false = right/left; true = down/up
let click2 = false; // false = horizontal; true = vertical

let toggle = true;  // For future use
let tglVal = 0;  // For the turn signal
// Array of values for the arrow logic
let arrows = [['right','left'],['down','up']];
function turnSignal(arrow) {
//TODO: Consider making this the primary process for switching the direction
//  Option 1: Double Click L1, Click L1.
//  Option 2: Clockwise rotation through the options.
    switch (arrow) {
        case 'right' : 
            val = '&#8680; '
            break;
        case 'left' : 
            val = '&#8678; '
            break;
        case 'down' : 
            val = '&#8681; '
            break;
        case 'up' : 
            val = '&#8679; '
            break;
    }
    if (tglVal >= 4) { tglVal = 0; }
    if (tglVal <  0) { tglVal = 4; }
    document.getElementById('turnSignal').innerHTML = val;
//    return arrow;
}