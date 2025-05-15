
  document.querySelector('nav button').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  });


    const today = new Date();

    // Gregorian date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('gregorian-date').textContent = today.toLocaleDateString('en-US', options);

    // Hijri approximation
    const hijriMonths = [
      "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Aqar",
      "Jumada al-Awwal", "Jumada al-Aqar", "Rajab",
      "Sha'ban", "Ramadan", "Shawwal", "Dhul Qa'dah", "Dhul Hijjah"
    ];
    const hijriYear = today.getFullYear() - 579;
    const hijriMonth = hijriMonths[today.getMonth()];
    const hijriDay = today.getDate();
    document.getElementById('hijri-date').textContent = `${hijriDay} ${hijriMonth} ${hijriYear} AH`;



        const sheetCSVUrl = 'https://docs.google.com/spreadsheets/d/1913_i-nVTrLxWGLTb8j_V7jXMhPs3ZAPZzuL5vA6rbw/export?format=csv&gid=0';

    async function fetchHijriData() {
      try {
        const response = await fetch(sheetCSVUrl);
        const csvText = await response.text();

        const rows = csvText.trim().split('\n');
        const row3 = rows[2]; // A3, B3, C3

        if (!row3) {
          document.getElementById('output').innerText = 'Row 3 not found.';
          return;
        }

        const columns = row3.split(',');

        const hijriDay = columns[0]?.trim();   // A3
        const hijriMonth = columns[1]?.trim(); // B3
        const hijriYear = columns[2]?.trim();  // C3

        // 🟢 Assign to multiple elements
        document.getElementById('day').textContent = hijriDay;
        document.getElementById('month').textContent = hijriMonth;
        document.getElementById('year').textContent = hijriYear;

        document.getElementById('monthOnly').textContent = hijriMonth;
        document.getElementById('yearOnly').textContent = hijriYear;

        // Optional combined preview
        document.getElementById('output').innerHTML = `A3: ${hijriDay} | B3: ${hijriMonth} | C3: ${hijriYear}`;

      } catch (error) {
        document.getElementById('output').innerText = 'Error loading data.';
        console.error('Error fetching data:', error);
      }
    }

    fetchHijriData();
