
    fetch("https://nizamiamadrasa.com/api/arabic-date/")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          document.getElementById("hijri-day").innerText = data.day;
          document.getElementById("hijri-month").innerText = data.month;
          document.getElementById("hijri-year").innerText = data.year;
        } else {
          document.getElementById("hijri-date").innerText = "Date unavailable";
        }
      })
      .catch(() => {
        document.getElementById("hijri-date").innerText = "Error fetching date";
      });