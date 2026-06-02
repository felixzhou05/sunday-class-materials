const MAX_LENGTH = 30;
let greetingCount = 0;

const nameInput = document.getElementById("name-input");
const charCount = document.getElementById("char-count");
const greetButton = document.getElementById("greet-btn");
const greetingOutput = document.getElementById("greeting-output");

// click
// input
// keydown
// submit


nameInput.addEventListener("input", function() {
    const currentText = nameInput.value;
    const charsUsed = currentText.length;
    charCount.textContent = `${charsUsed} / ${MAX_LENGTH}`;

    if(charsUsed >= MAX_LENGTH * 0.8) {
        charCount.classList.add("warning");
    } else {
        charCount.classList.remove("warning");
    }
});

greetButton.addEventListener("click", handleGreet);

function handleGreet() {
    const name = nameInput.value.trim();
    if(name === "") {
        greetingOutput.textContent = "Please type your name!";
        return;
    }

    greetingCount++;

    const greeting = `Hello, ${name}! (This is greeting #${greetingCount}).`;
    greetingOutput.textContent = greeting;
}

// 1. When no text - disable button
// element.disabled = true/false;

// 2. if max length - "wow thats a long name!"

// 3. add second input for favorite movie, and greet with that too! "Hello, Andrii! I see your favorite movie is Inception!"
