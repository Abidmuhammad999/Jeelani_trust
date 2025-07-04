

document.addEventListener('DOMContentLoaded', () => {
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const lastShown = localStorage.getItem('specialShownTime');
  const now = Date.now();

  if (!lastShown || now - parseInt(lastShown) > SIX_HOURS) {
    localStorage.setItem('specialShownTime', now.toString());
    window.location.href = "special-day.html";
  }
});
