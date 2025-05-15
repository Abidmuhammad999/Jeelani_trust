 function getFirstSunday(year, month) {
    let date = new Date(year, month, 1);
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function showSwalathCountdown() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    let swalathDate = getFirstSunday(year, month);

    if (today > swalathDate) {
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      swalathDate = getFirstSunday(year, month);
    }

    const daysLeft = Math.ceil((swalathDate - today) / (1000 * 60 * 60 * 24));

    const box = document.getElementById("swalath-box");
    const message = document.getElementById("swalath-message");
    const dateLine = document.getElementById("swalath-date");

    if (daysLeft >= 0 && daysLeft <= 20) {
      box.classList.remove("hidden");

      if (daysLeft === 0) {
        message.innerHTML = "<span class='animate-pulse'>Today is Swalath!</span> ";
        box.classList.add("ring-2", "ring-amber-400");
      } else {
        message.innerHTML = `${daysLeft} day${daysLeft > 1 ? "s" : ""} <span class='text-navy'>until Swalath</span>`;
      }

      dateLine.innerHTML = `<span class="font-medium">${formatDate(swalathDate)}</span> <span class="text-nsvy"></span>`;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    showSwalathCountdown();

    const closeBtn = document.getElementById("swalath-close");
    const box = document.getElementById("swalath-box");

    closeBtn.addEventListener("click", function () {
      box.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        box.classList.add("hidden");
        box.classList.remove("opacity-0", "scale-95");
      }, 300);
    });
  });