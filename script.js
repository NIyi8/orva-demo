// AI Emotional Response with Tone
function getEmotionalResponse(mood) {
  const responses = {
    happy: "That's wonderful to hear! 😊 Keep shining and spreading that positive energy!",
    sad: "I'm really sorry you're feeling that way. It’s okay to feel sad sometimes. Want to talk more? 💙",
    anxious: "Breathe deeply, you’ve got this. Let's work through the anxiety together, step by step. 🌱",
    angry: "It's perfectly okay to feel angry. Let's try to calm down and focus on something that soothes you. 🔥",
    tired: "Rest is essential. Take your time. We’ll be here when you’re ready to continue. 😴",
    excited: "Woo! I can feel your excitement. This is going to be amazing! Keep that energy flowing! 🚀"
  };
  return responses[mood] || "I'm here for you, no matter how you feel. ❤️";
}

// Mood Button Action
function handleMood(mood) {
  const response = getEmotionalResponse(mood);
  document.getElementById("ai-response").innerText = response;
  saveMoodHistory(mood);
}

// Voice Journal
let mediaRecorder;
let audioChunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    document.getElementById("audioPlayback").src = audioUrl;
  };

  mediaRecorder.start();
  alert("Recording started! 🎤");
}

function stopRecording() {
  mediaRecorder.stop();
  alert("Recording stopped. Playback below. 🎶");
}

// Save mood history
function saveMoodHistory(mood) {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistory.push({ mood: mood, date: new Date() });
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
}

// Journal Saving Feature
function saveJournal() {
  const journalText = document.getElementById('journalEntry').value;
  if (journalText) {
    const journalHistory = JSON.parse(localStorage.getItem('journalHistory')) || [];
    journalHistory.push({ entry: journalText, date: new Date() });
    localStorage.setItem('journalHistory', JSON.stringify(journalHistory));
    alert("Your journal entry has been saved!");
    document.getElementById('journalEntry').value = ""; // Clear input
    displayJournal();
  } else {
    alert("Please write something before saving.");
  }
}

// Display saved journal entries
function displayJournal() {
  const journalHistory = JSON.parse(localStorage.getItem('journalHistory')) || [];
  const journalList = document.getElementById('savedJournals');
  journalList.innerHTML = "";
  journalHistory.forEach((entry, index) => {
    const div = document.createElement("div");
    div.classList.add("journal-entry");
    div.innerHTML = `
      <p><strong>${entry.date}</strong></p>
      <p>${entry.entry}</p>
      <button onclick="deleteJournal(${index})">Delete</button>
    `;
    journalList.appendChild(div);
  });
}

// Delete journal entry
function deleteJournal(index) {
  const journalHistory = JSON.parse(localStorage.getItem('journalHistory')) || [];
  journalHistory.splice(index, 1);
  localStorage.setItem('journalHistory', JSON.stringify(journalHistory));
  displayJournal();
}

// Voice Chat
let recognition;

function startVoiceChat() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const speech = event.results[0][0].transcript;
    document.getElementById('ai-response').innerText = "You said: " + speech;
    respondToUser(speech);
  };

  recognition.onerror = function(event) {
    alert("Sorry, I couldn't understand you. Please try again.");
  };
}

// Respond to voice input
function respondToUser(speech) {
  let response;
  if (speech.includes("hello") || speech.includes("hi")) {
    response = "Hello! How are you feeling today? 😊";
  } else if (speech.includes("sad")) {
    response = "I’m sorry you’re feeling sad. Let’s talk about it!";
  } else if (speech.includes("happy")) {
    response = "That’s amazing! Keep up the positive vibes!";
  } else {
    response = "I’m here for you, tell me more!";
  }

  const utterance = new SpeechSynthesisUtterance(response);
  window.speechSynthesis.speak(utterance);
}

// Handle text input (conversations)
function handleTextInput() {
  const userInput = document.getElementById('textInput').value;
  const response = respondToUserText(userInput);
  document.getElementById('ai-response').innerText = response;
  document.getElementById('textInput').value = ""; // Clear input
}

// Text-based response to input
function respondToUserText(input) {
  let response;
  if (input.includes("hello") || input.includes("hi")) {
    response = "Hello there! How can I assist you today?";
  } else if (input.includes("sad")) {
    response = "I’m really sorry to hear that. Do you want to talk more about it?";
  } else if (input.includes("happy")) {
    response = "That’s fantastic! Keep smiling!";
  } else {
    response = "I’m here for you. Tell me how you're feeling!";
  }
  return response;
}

// Initial display of saved journals
displayJournal();
