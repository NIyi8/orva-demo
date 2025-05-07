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
    alert("Your journal entry has been saved!");
    document.getElementById('journalEntry').value = ""; // Clear input
  } else {
    alert("Please write something before saving.");
  }
}
