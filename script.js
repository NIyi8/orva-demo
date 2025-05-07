// AI Emotional Response
function getEmotionalResponse(mood) {
  const responses = {
    happy: "That's wonderful to hear! 😊 Keep shining.",
    sad: "I'm here for you. Want to talk about it or try a breathing exercise? 💙",
    anxious: "Take a deep breath. You're not alone. 🌿",
    angry: "It’s okay to feel this way. Let’s find a calm moment together. 🔥",
    tired: "Rest is important. Let’s slow things down for a bit. 😴",
    excited: "Woo! Love the energy. Want to capture this moment? 🚀"
  };
  return responses[mood] || "I'm here for you no matter what. ❤️";
}

function handleMood(mood) {
  const response = getEmotionalResponse(mood);
  document.getElementById("ai-response").innerText = response;
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
  alert("Recording started!");
}

function stopRecording() {
  mediaRecorder.stop();
  alert("Recording stopped. Playback below.");
}

