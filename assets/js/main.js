
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
      "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
      "Jumada al-Awwal", "Jumada al-Thani", "Rajab",
      "Sha'ban", "Ramadan", "Shawwal", "Dhul Qa'dah", "Dhul Hijjah"
    ];
    const hijriYear = today.getFullYear() - 579;
    const hijriMonth = hijriMonths[today.getMonth()];
    const hijriDay = today.getDate();
    document.getElementById('hijri-date').textContent = `${hijriDay} ${hijriMonth} ${hijriYear} AH`;
