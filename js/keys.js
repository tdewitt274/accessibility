const config = {
    multiClickDelay: 400, // Time to wait for next tap
    longPressDelay: 700,  // How long to hold for a long press
//TODO: Update with the F13-F24 keys
    keysToTrack: ['Control', 'Alt'] // These are the keys the system is looking for
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
        isLongPressActive = true; // Prevents "Single Click" on release
        return;
    }

    // 2. Start Long Press Timer
    isLongPressActive = false;
    longPressTimer = setTimeout(() => {
        if (activeKeys.has(e.key) && activeKeys.size === 1) {
            switch (e.key) {
                case config.keysToTrack[0]:  // Control - LEFT
//                    handleEvents('ENTER'); // TODO: Predictive
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
// This function looks for the release of a button.  This is a reliable method for doing single actions.
// Makes sure that the key is a not new key being pressed 
    if (!config.keysToTrack.includes(e.key)) return;
// Timer is no longer needed because the key is released
    clearTimeout(longPressTimer);
    activeKeys.delete(e.key);

    // Only process click counts if it wasn't a long press or a chord
    if (!isLongPressActive && activeKeys.size === 0) {
        clickCount++;
// If there isn't an active timer, set one
        if (!clickTimer) {
            clickTimer = setTimeout(() => {
                const keyName = e.key === ' ' ? 'Space' : e.key;  // Error handling for space key

// Enter logic to send the appropriate button to the handleEvents()
// This logic will take the key that's being pushed and and checking it with appropriate keys
                switch (keyName) {
                    case config.keysToTrack[0]: // Control - LEFT
// Basically, if a single click, then swap the logic on the "click1" and "click2" options and logging
                        if (clickCount === 1) { click1 = !click1; console.log('Switched Coordinates'); }  // Switch XY option
                        if (clickCount === 2) { click2 = !click2; console.log('Switched Movement'); }  // Switch movement direction
//                        if (clickCount === 3) { handleEvents('ENTER'); }
                        break;
                    case config.keysToTrack[1]: // Alt - RIGHT
// Basically, if a single/double/triple click, send a command to the function that handles the keyboard
                        let dirVal = arrows[Number(!click1)][Number(click2)];

                        if (clickCount === 1) { handleEvents('arrow'+dirVal); console.log(`Moved ${'arrow'+dirVal}`); }
                        if (clickCount === 2) { handleEvents('ENTER'); }   // Add text
                        if (clickCount === 3) { handleEvents('ESCAPE'); }  // Register
                        break;
                    default:
                        break;
                }
// Update the "turn signal" in the upper right corner as needed and log the informaiton
                turnSignal(arrows[Number(!click1)][Number(click2)]);
                if (clickCount === 1) handleAction(`${keyName} Single Click`);
                else if (clickCount === 2) handleAction(`${keyName} Double Click`);
                else if (clickCount >= 3) handleAction(`${keyName} Triple Click`);

                clickCount = 0;
                clickTimer = null;
//TODO: Modify the multiClickDelay in a training program
            }, config.multiClickDelay);
        }
    }
});
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
