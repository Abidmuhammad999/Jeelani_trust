document.addEventListener('DOMContentLoaded', () => {
  fetchHijriData();
});

const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/1913_i-nVTrLxWGLTb8j_V7jXMhPs3ZAPZzuL5vA6rbw/export?format=csv&gid=0';

async function fetchHijriData() {
  try {
    const response = await fetch(sheetCSVUrl);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');

    if (rows.length < 3) {
      showError('Row 3 not found.');
      return;
    }

    const [hijriDay, hijriMonth, hijriYear] = rows[2].split(',').map(col => col.trim());

    updateDOM({ hijriDay, hijriMonth, hijriYear });
    checkReminder(hijriDay, hijriMonth);

  } catch (error) {
    showError('Error loading data.');
    console.error('Error fetching Hijri data:', error);
  }
}

function updateDOM({ hijriDay, hijriMonth, hijriYear }) {
  document.getElementById('day').textContent = hijriDay;
  document.getElementById('month').textContent = hijriMonth;
  document.getElementById('year').textContent = hijriYear;
  document.getElementById('monthOnly').textContent = hijriMonth;
  document.getElementById('yearOnly').textContent = hijriYear;
  document.getElementById('output').textContent = `A3: ${hijriDay} | B3: ${hijriMonth} | C3: ${hijriYear}`;

}

function showError(message) {
  document.getElementById('output').textContent = message;
}

// 🌙 Reminder logic
function checkReminder(day, month) {
  const reminders = [
    { day: '18', month: 'Muharram', message: '⚫ Aashura – Fast and reflect on history.' },
    { day: '12', month: 'Rabi al-Awwal', message: '🕋 Mawlid – Celebrate the Prophet ﷺ birthday.' },
    { day: '27', month: 'Rajab', message: '🛫 Isra & Miraj – Night Journey of Prophet ﷺ.' },
    { day: '15', month: 'Sha\'ban', message: '🌌 Shab-e-Barat – Night of forgiveness.' },
    { day: '18', month: "Dhul Qa'dah", message: '🌙 Start of Ramadan – Time for fasting and reflection.' },
    { day: '27', month: 'Ramadan', message: '💫 Likely Laylat al-Qadr – Seek it!' },
    { day: '1', month: 'Shawwal', message: '🎉 Eid al-Fitr – Festival after fasting!' },
    { day: '9', month: 'Dhul-Hijjah', message: '🕋 Day of Arafah – Best day to fast.' },
    { day: '10', month: 'Dhul-Hijjah', message: '🕊️ Eid al-Adha – Day of sacrifice.' }
  ];

  const found = reminders.find(r => r.day === day && r.month === month);
  if (found) {
    const reminderBox = document.getElementById('reminder');
    if (reminderBox) {
      reminderBox.textContent = found.message;
      reminderBox.style.display = 'block';
    } else {
      console.log('Reminder:', found.message);
    }
  }
}
