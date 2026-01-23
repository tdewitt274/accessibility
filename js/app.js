const APP_VERSION = "1.0.0";
const VERSION_URL = "version.json";

const topLine1 = document.getElementById("top-line-1");
const topLine2 = document.getElementById("top-line-2");
const screens = document.querySelectorAll(".screen");
const keyboard = document.getElementById("keyboard");

let tapTimer = null;
let tapCount = 0;
let keyboardVisible = false;
let currentScreen = "center";

/* ---------------- VERSION CHECK ---------------- */
async function checkVersion() {
  try {
    const res = await fetch(VERSION_URL, { cache: "no-store" });
    const data = await res.json();
    const stored = localStorage.getItem("appVersion");

    if (stored !== data.version) {
      localStorage.setItem("appVersion", data.version);
      location.reload();
    }
  } catch {
    // offline: ignore
  }
}

/* ---------------- SCREEN NAV ---------------- */
function activateScreen(name) {
  screens.forEach(s => s.classList.remove("active"));
  document.querySelector(`[data-screen="${name}"]`).classList.add("active");
  currentScreen = name;
}

/* ---------------- NAVIGATION MAP ---------------- */
/*
Finger moves toward the screen you want:

- From HOME:
    swipe down (top → bottom) → UP
    swipe up (bottom → top) → DOWN
    swipe right (left → right) → LEFT
    swipe left (right → left) → RIGHT

- From directional screens → Home:
    UP screen: swipe up → Home
    DOWN screen: swipe down → Home
    LEFT screen: swipe right → Home
    RIGHT screen: swipe left → Home

- Any other swipes → no action
*/
const navMap = {
  center: { 
    up: "down",    // swipe up (bottom→top) → DOWN screen
    down: "up",    // swipe down (top→bottom) → UP screen
    left: "left", // swipe left (right→left) → RIGHT screen
    right: "right"  // swipe right (left→right) → LEFT screen
  },
  up:     { up: "center" },    // swipe bottom→top → HOME
  down:   { down: "center" },  // swipe top→bottom → HOME
  left:   { right: "center" }, // swipe left→right → HOME
  right:  { left: "center" }   // swipe right→left → HOME
};


function handleSwipe(direction) {
  const target = navMap[currentScreen]?.[direction];
  if (target) {
    activateScreen(target);
  }
}

/* ---------------- TAP HANDLING ---------------- */
document.addEventListener("touchend", () => {
  tapCount++;

  if (!tapTimer) {
    tapTimer = setTimeout(() => {
      if (tapCount === 3) toggleKeyboard();
      tapCount = 0;
      tapTimer = null;
    }, 600);
  }
});

/* ---------------- TILE TAP ---------------- */
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    document.querySelectorAll(".tile").forEach(t => t.classList.remove("selected"));
    tile.classList.add("selected");
    topLine1.textContent = tile.textContent;
  });
});

/* ---------------- SWIPE ---------------- */
let startX = 0, startY = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 50) handleSwipe("right");
    if (dx < -50) handleSwipe("left");
  } else {
    if (dy > 50) handleSwipe("down");
    if (dy < -50) handleSwipe("up");
  }
});

/* ---------------- KEYBOARD ---------------- */
function toggleKeyboard() {
  keyboardVisible = !keyboardVisible;
  keyboard.classList.toggle("hidden", !keyboardVisible);
  topLine2.textContent = keyboardVisible ? "Keyboard Open" : "Keyboard Closed";
}

function buildKeyboard() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let index = 0;

  // Alphabet: 6 per row
  while (index < letters.length) {
    const row = document.createElement("div");
    row.className = "key-row";

    for (let c = 0; c < 8 && index < letters.length; c++) {
      const key = document.createElement("div");
      key.className = "key";
      key.textContent = letters[index++];
      key.onclick = () => topLine1.textContent += key.textContent;
      row.appendChild(key);
    }

    keyboard.appendChild(row);
  }

  // Space bar row
  const spaceRow = document.createElement("div");
  spaceRow.className = "key-row";
  const space = document.createElement("div");
  space.className = "key space";
  space.textContent = "SPACE";
  space.onclick = () => topLine1.textContent += " ";
  spaceRow.appendChild(space);
  keyboard.appendChild(spaceRow);

  // Numbers: 10 per row
  const numbers = "0123456789".split("");
  const numberRow = document.createElement("div");
  numberRow.className = "key-num-row";

  numbers.forEach(n => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = n;
    key.onclick = () => topLine1.textContent += n;
    numberRow.appendChild(key);
  });

  keyboard.appendChild(numberRow);
}

/* ---------------- INIT ---------------- */
topLine1.textContent = "Ready";
topLine2.textContent = "";
checkVersion();
buildKeyboard();
