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

# Features List
## Current Features        
 - Coordinate based typing  
	 - Direction indicator  
	 - Row, Column, Cell highlighting  
 - Phrase registering  
## Enhancements  
- Predictive Text - HIGH
	- Registered Words and Phrases are stored in a Dictionary that can be brought up for quick selection  
	- Autocomplete - MEDIUM 
		- Based on letters entered, populate the highest ranked word/phrase  
	- Phrase/Word Ranking - MEDIUM HIGH  
		- Each time a word/phrase registered, populate and increment the word/phrase  
	- Phrase Chooser - MEDIUM  
		- Initial screen with classifications, sub screen with words/phrases that don't need the keyboard
	- Text to Speach (TTS) - LOW
		- Speak out the letter/word/phrase selected  
- Settings  
	- Click Trainer - HIGH  
		- Registers the average time for single, double, triple, and long presses to ensure accuracy over time  
	- Keyboard Trainer - LOW  
		- Tests user on navigation of the keyboard using phrases that have all letters of the alphabet  
	- Interaction Tracker - MEDIUM  
		- Registers the text entered for timing purposes  
			- Can be used for diagnostics  
	- Phrase/Word Entry - LOW  
		- Manual entry and assignment of weighting for common and important words/phrases  
- Button Hardware  
	- Two Single Button - HIGH  
	- Two Five Button - LOW
- Screens  
	- Keyboard  
	- Settings  
		- TTS - On/Off  
		- Keyboard Type - Radio  
		- Click Trainer - Open  
		- Keyboard Trainer - Open  
		- Key Mapping  
			- L/R  
			- Click/DblCl/TplCl/LngCl  
	- Main Screen  
		- Categories  
		- Keyboard  
		- Settings  
	- Keyboard Trainer  
	- Click Trainer  
	- Person Picture
		- Listing of words for areas  
## Keyboard Features  
- Recall last word/Phrase - MEDIUM HIGH  
	- Show a list of the recent words/phrases entered for quick retreival       
- Touch Interaction - MEDIUM  
	- Ability for touch typing on the keyboard for other users  
- Physical Keyboard - MEDIUM  
	- Allow for physical keyboard interaction  
- Mouse Interaction - MEDIUM  
	- Allow for mouse input, in the event a touchscreen isn't available  
- Screen Interactivity - MEDIUM  
	- Allow disabling of keystrokes for when the keyboard is inactive  
	- Keyboard will work with a different set of rules than navigation screens  
- Custom Support - MEDIUM HIGH  
	- QWERTY keyboard or others as needed  
- Keyword Detection  - LOW
	- Ex, "PAIN" brings up the Person screen  
- Sounds  - LOW
	- Maybe on the Raspberry Pi?  
	- Maybe with Macros?  
## Phrase Chooser - MEDIUM  
- Initial screen with classifications, sub screen with words/phrases that don't need the keyboard  
- Populate Categories and clicking will bring the up the listing  
- Up/Down List of Categories  
- Two Column Word/Phrase listing  
- Static Sorting  
- CONSIDER: Adds to the Dictionary  
## Predictive Text - HIGH  
- Sorting:  
	- Sorted by Characters entered, Ranking (Priority + Occurrence), then Occurrence  
- Filtering:  
	- Will filter based on characters listed  
	- When a new character is entered, re-evaluate  
	- Do not include words that are less than the length of the word/phrase entered  
- Track words/phrases over two character long and add to a dictionary  
- New values get an "Occurrence" of 1  
- Each time a word is used, increase the Occurrence by 1  
	- Phrases are also stored, but each word is incremented as well  
- Likelihood is Priority + Occurrence  
- Long Left press will toggle to the Predictive Text  
	- Hides the keyboard and shows a list of words/phrases  
- When a word "hits", the text will be prepopulated  
- Both Right and Left clicks will activate the prepopulated text  
- Predictive will populate based on the keyup  
- On Register  
	- Break out all words  
	- Add words to the db, increasing the values by 1  
	- Add phrase to the db (if more than one word, over 2 characters), increasing by 1  
- If no text is in the field and predictive is populated, go to phrases  
- CONSIDER:  
	- Modify the keyboard to be more compact and all the Predictive Text down the right side  
	- Add the "Top 5" under the text entry string.  
	- Move the "Registered" above the Entry  
## Dictionary - HIGH  
- Create an interface that shows the words in the database  
- Allow grouping by Category (ex, Food, Needs, etc)  
- IndexedDB  
	- DB: Accessibility  
	- Store: Predictive  
	- ID: Word/Phrase  
	- Occurrence: 1 (Numeric)  
	- Importance: High = 500/Medium = 250/Low = 1 as Numeric  
	- isActive = true  
	- Category: Text  
- Dictionary is replicated in an array  
	- Array is updated, then Dictionary  
- Allow modifications to the Dictionary  
- Add new words/phrases  
- Delete words/phrases  
- Assign a "priority" to a word or phrase  
	- High = 500  
	- Medium = 250  
	- Low = 1  
- Management:  
	- Storage: IndexedDB storage  
	- Export: CSV  
	- Import: CSV  
## Autocomplete - MEDIUM  
[https://www.w3schools.com/howto/howto_js_autocomplete.asp](https://www.w3schools.com/howto/howto_js_autocomplete.asp)  
- CONSIDER: Modify the Text box to be a Span with an additional span after  
	- The latter span will be used to show the most often used word  
- Add a key combination that will handle the completion task  
- Move on to the next popular word/phrase if the word/phrase is not selected  
## Text to Speach (TTS) - LOW  
// Use what I have?  
- Speak the letter that is highlighted  
- When registered, speak the sentance out  
- When a predictive text item is chosen, speak the word  
- When a suggested text is available, speak the word  
	- Do not repeat if a new character is listed  
## Click Trainer - HIGH  
- Include a "Settings" option on the keyboard  
- In the Settings, as a new page, allow for the click training  
- Randomly generate an option from a list of actions (single, double, triple, long)  
- Track how long the keypress is held.  
	- keydown to keyup  
- Average the amount of time each is pressed and add a padding  
- For multiple clicks, average the amount of time between keyup and keydown  
- Add some kind of weekly/monthly reminder to do click training  
## Keyboard Trainer - LOW  
[https://github.com/MIKATYPE/English-text-typing-trainer](https://github.com/MIKATYPE/English-text-typing-trainer)  
- Similar to the Click Trainer, but populates sentences with every character in the alphabet  
- Also, populate important phrases  
- Is meant to practice the keyboard interface for navigation purposes  
- Triple Click to start, goes until the period is pressed  
## Morse Code - VERY LOW  
- Ability to use Morse Code instead of the Keyboard  
## Interaction Tracker - MEDIUM  
        Keep track of the response times for each of the button pushes  
        Store in IndexedDB for diagnosics  
## Hardware  
- Raspberry Pi Pico W keyboard  
- Option 1  
	- Tablet  
	- USB-C to USB Micro cable (or dongle)  
	- Tablet Arm  
- Option 2  
	- Raspberry Pi  
	- USB Micro cable  
	- Portable Monitor  
	- Monitor Arm  
	- Speakers  
  
## 2x One Button Keyboard  
- Left  
	- Click   = Toggle Movement  
	- DblCl   = Toggle Backward  
	- TplCl   = Autocomplete  
	- LngCl   = Predictive  
- Right  
	- Click   = Navigation  
	- DblCl   = Select  
	- TplCl   = Register  
	- LngCl   = Erase  
- Right & Left  
	- Click   = Register  
  
## 2x Five Button Keyboard  
- Left  
	- Up              = Navigation  
	- Down    = Navigation  
	- Left    = Navigation  
	- Right   = Navigation  
	- Click   =  
	- DblCl   =  
	- TplCl   = Emergency Words  
	- LngCl   = High Priority Words  
- Right  
	- Up              = Predictive Up  
	- Down    = Predictive Down  
	- Left    =  
	- Right   = Autocomplete  
	- Click   = Select  
	- DblCl   = Register  
	- TplCl   = Emergency Words  
	- LngCl   = Erase
