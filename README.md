Workflow:

## 2 Button Approach
Have the webpage look for multiple commands coming from the microcontroller.
- All based on the "Click" event.
- If click is followed by the same button, determine if it is a double or triple click.
  - This may be a problem with double letters (ex, "Hello")
  - Maybe have him wait a second for double letters
  - This will need to be tuned through a tutorial and run frequently
- Not sure of long presses.
  - But, this is done on the website
  - Maybe check for "Key Down" and "Key Up"

### R Button:
- Click    (F13) = move in the direction of the current mode (Right or Up)
- DClick (F15) = select character
- TClick  (F17) = register line
- Long     (F19) = erase

### L Button:
- Click    (F14) = toggle movement mode
- DClick (F16) = toggle backward movement mode
- TClick  (F18) = register line
- Long     (F20) = move to predictive values
### R/L Button:
- Registers line
