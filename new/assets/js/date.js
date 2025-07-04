  // Gregorian Date Display
const gregorianDate = document.getElementById('gregorian-date');
const today = new Date();

if (gregorianDate) {
  const Gday = today.getDate();
  const Gmonth = today.toLocaleDateString('en-IN', { month: 'long' });
  const Gyear = today.getFullYear();

  gregorianDate.innerHTML = `${Gday} <span class="text-[#138d75]">${Gmonth}</span> ${Gyear}`;
}
