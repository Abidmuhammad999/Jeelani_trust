  // Gregorian Date Display
const gregorianDate = document.getElementById('gregorian-date');
const today = new Date();

if (gregorianDate) {
  const Gday = today.getDate();
  const Gmonth = today.toLocaleDateString('en-IN', { month: 'long' });
  const Gyear = today.getFullYear();

  gregorianDate.innerHTML = `${Gday} <span class="text-trust-600"  style="  font-family:'Roboto Condensed', sans-serif;">${Gmonth}</span> ${Gyear}`;
}
