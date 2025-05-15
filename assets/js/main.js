// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      menuButton.setAttribute('aria-expanded', 'true');
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  // Close menu on mobile nav link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  // Gregorian Date Display
const gregorianDate = document.getElementById('gregorian-date');
const today = new Date();

if (gregorianDate) {
  const Gday = today.getDate();
  const Gmonth = today.toLocaleDateString('en-IN', { month: 'long' });
  const Gyear = today.getFullYear();

  gregorianDate.innerHTML = `${Gday} <span class="text-gold">${Gmonth}</span> ${Gyear}`;
}


  // Special Day Redirect Logic
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const lastShown = localStorage.getItem('specialShownTime');
  const now = Date.now();

  if (!lastShown || now - parseInt(lastShown) > SIX_HOURS) {
    localStorage.setItem('specialShownTime', now.toString());
    window.location.href = "special-day.html";
  }

  // ScrollSpy Section Highlight
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.classList.remove('active', 'bg-white', 'bg-opacity-5', 'text-gold', 'border-l-4', 'border-gold');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active', 'bg-white', 'bg-opacity-5', 'text-gold', 'border-l-4', 'border-gold');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50% 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Initial active state
  const navHome = document.querySelector('.nav-link[href="#home"]');
  const mobileNavHome = document.querySelector('.mobile-nav-link[href="#home"]');

  navHome?.classList.add('active');
  mobileNavHome?.classList.add('active', 'bg-white', 'bg-opacity-5', 'text-gold', 'border-l-4', 'border-gold');

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }

  // Hijri Date from Google Sheet
  fetchHijriData();
});

// Hijri Date Fetching Function
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
    const hijriDay = columns[0]?.trim();
    const hijriMonth = columns[1]?.trim();
    const hijriYear = columns[2]?.trim();

    document.getElementById('day').textContent = hijriDay;
    document.getElementById('month').textContent = hijriMonth;
    document.getElementById('year').textContent = hijriYear;
    document.getElementById('monthOnly').textContent = hijriMonth;
    document.getElementById('yearOnly').textContent = hijriYear;
    document.getElementById('output').innerHTML = `A3: ${hijriDay} | B3: ${hijriMonth} | C3: ${hijriYear}`;
  } catch (error) {
    document.getElementById('output').innerText = 'Error loading data.';
    console.error('Error fetching Hijri data:', error);
  }
}

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const imageTitle = document.getElementById("imageTitle");
  const imageDesc = document.getElementById("imageDesc");

  const galleryItems = Array.from(document.querySelectorAll('[class*="aspect-"]'));
  let currentIndex = 0;

  // Extract image data
  const images = galleryItems.map(item => {
    const img = item.querySelector('img');
    const title = item.parentElement.querySelector('h3')?.textContent || '';
    const desc = item.parentElement.querySelector('p')?.textContent || '';
    return {
      src: img.src,
      alt: img.alt,
      title,
      desc
    };
  });

  function openModal(index) {
    currentIndex = index;
    const { src, alt, title, desc } = images[currentIndex];
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    modalImg.src = src;
    modalImg.alt = alt;
    imageTitle.textContent = title;
    imageDesc.textContent = desc;
    downloadBtn.href = src;
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    const { src, alt, title, desc } = images[currentIndex];
    
    modalImg.src = src;
    modalImg.alt = alt;
    imageTitle.textContent = title;
    imageDesc.textContent = desc;
    downloadBtn.href = src;
  }

  // Event Listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  });

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    }
  });

  // Close when clicking outside image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });