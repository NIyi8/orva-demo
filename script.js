// Save mood to local storage and update the mood tracker
function logMood(mood) {
  // Save mood to local storage
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistory.push({ mood: mood, date: new Date() });
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

  // Update the mood chart
  updateMoodChart();

  // Emotional Response from Orva
  orvaResponse(mood);
}

// Update the mood chart
function updateMoodChart() {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  const moodCount = {
    happy: 0,
    sad: 0,
    anxious: 0,
    angry: 0,
    tired: 0,
    excited: 0
  };

  moodHistory.forEach(entry => {
    moodCount[entry.mood]++;
  });

  const ctx = document.getElementById('moodChart').getContext('2d');
  const moodChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Happy', 'Sad', 'Anxious', 'Angry', 'Tired', 'Excited'],
      datasets: [{
        label: 'Mood Frequency',
        data: Object.values(moodCount),
        backgroundColor: [
          'rgba(0, 123, 255, 0.5)',
          'rgba(220, 53, 69, 0.5)',
          'rgba(255, 193, 7, 0.5)',
          'rgba(233, 62, 140, 0.5)',
          'rgba(108, 117, 125, 0.5)',
          'rgba(23, 162, 184, 0.5)'
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(233, 62, 140, 1)',
          'rgba(108, 117, 125, 1)',
          'rgba(23, 162, 184, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Orva's emotional response based on mood
function orvaResponse(mood) {
  const responseText = {
    happy: "I'm so glad you're feeling happy! Keep shining!",
    sad: "I'm here for you. It's okay to feel sad sometimes.",
    anxious: "Take a deep breath. You're doing great.",
    angry: "It's okay to feel angry. Let's calm down together.",
    tired: "Rest is important. Take care of yourself.",
    excited: "I can feel your excitement! Enjoy the moment!"
  };

  document.getElementById('orva-text').textContent = responseText[mood] || "I'm here to listen.";
}

// Save journal entry to local storage
function saveJournal() {
  const journalEntry = document.getElementById('journal-entry').value;
  if (journalEntry.trim() !== "") {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    journalEntries.push(journalEntry);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

    displayJournalEntries();
    document.getElementById('journal-entry').value = ''; // Clear the text area
  }
}

// Display saved journal entries
function displayJournalEntries() {
  const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const journalList = document.getElementById('journal-list');
  journalList.innerHTML = ''; // Clear the list before displaying again
  journalEntries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = entry;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteJournalEntry(index);
    li.appendChild(deleteBtn);
    journalList.appendChild(li);
  });
}

// Delete a journal entry
function deleteJournalEntry(index) {
  const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  journalEntries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  displayJournalEntries();
}

// Clear all journal entries
function clearJournal() {
  localStorage.removeItem('journalEntries');
  displayJournalEntries();
}

// Initial setup: Display saved journal entries and mood chart
document.addEventListener('DOMContentLoaded', () => {
  displayJournalEntries();
  updateMoodChart();
});
