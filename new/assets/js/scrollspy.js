// 🌐 Global Script: Highlights nav links based on scroll position
// Used for both desktop and mobile menu to show active section

 document.addEventListener('DOMContentLoaded', () => {
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

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  // Set default active on page load
  const navHome = document.querySelector('.nav-link[href="#home"]');
  const mobileNavHome = document.querySelector('.mobile-nav-link[href="#home"]');

  navHome?.classList.add('active');
  mobileNavHome?.classList.add('active', 'bg-white', 'bg-opacity-5', 'text-gold', 'border-l-4', 'border-gold');
});
