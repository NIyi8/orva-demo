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
  speak(response);  // Make Orva speak
  saveMoodHistory(mood);
}

// Speech synthesis (Make Orva speak)
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  // Try to find a more natural, feminine voice
  const voice = voices.find(v => v.name.toLowerCase().includes("female"));
  if (voice) {
    utterance.voice = voice;
  }

  // Set more emotional tone
  utterance.pitch = 1.3;  // Slightly higher pitch for warmth
  utterance.rate = 0.9;   // Slightly slower speed for a more soothing voice

  window.speechSynthesis.speak(utterance);
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
    speak("Your recording has been saved.");
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
    const div = document.createElement('div');
    div.classList.add('journal-entry');
    div.innerHTML = `
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
  displayJournal(); // Re-display journal after deletion
}

// Text Chat with Orva
function handleTextInput() {
  const input = document.getElementById('textInput').value;
  const response = generateTextResponse(input);
  document.getElementById('ai-response').innerText = response;
  speak(response);
}

// Basic Text Response Logic
function generateTextResponse(input) {
  if (input.includes("hello")) {
    return "Hi there! How can I help you today? 😊";
  } else if (input.includes("how are you")) {
    return "I'm doing great, thank you! How are you? 💖";
  } else {
    return "I’m here for you. Tell me how you're feeling, and I’ll help! 💫";
  }
}

displayJournal();
