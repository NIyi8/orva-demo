function logMood(mood) {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistory.push({ mood, date: new Date().toLocaleString() });
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  orvaResponse(mood);
}

function saveJournal() {
  const input = document.getElementById("journalInput").value.trim();
  if (!input) return;
  const entries = JSON.parse(localStorage.getItem("journals")) || [];
  entries.push(input);
  localStorage.setItem("journals", JSON.stringify(entries));
  document.getElementById("journalInput").value = "";
  displayJournal();
}

function displayJournal() {
  const entries = JSON.parse(localStorage.getItem("journals")) || [];
  const container = document.getElementById("journalEntries");
  container.innerHTML = "";
  entries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${entry}</p>
      <button onclick="deleteJournal(${index})">Delete</button>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function deleteJournal(index) {
  const entries = JSON.parse(localStorage.getItem("journals")) || [];
  entries.splice(index, 1);
  localStorage.setItem("journals", JSON.stringify(entries));
  displayJournal();
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendToChat("You", message);
  const response = getOrvaReply(message);
  appendToChat("Orva", response);
  input.value = "";
}

function appendToChat(sender, message) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function orvaResponse(mood) {
  const responses = {
    "Happy": "That's amazing! Keep smiling today 💛",
    "Sad": "I'm here for you. Want to write in your journal?",
    "Anxious": "Try taking a deep breath. You've got this.",
    "Excited": "I love your energy! What's making you excited?"
  };
  appendToChat("Orva", responses[mood] || "I'm here for you.");
}

function getOrvaReply(msg) {
  const text = msg.toLowerCase();
  if (text.includes("sad")) return "Want to talk about it?";
  if (text.includes("happy")) return "Yay! I'm so glad to hear that!";
  if (text.includes("help")) return "Of course! Tell me what you need help with.";
  return "I'm here to listen 💜";
}

window.onload = () => {
  displayJournal();
};
