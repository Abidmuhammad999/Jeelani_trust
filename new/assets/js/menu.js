
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
  }

  function closeMenu() {
    mobileMenu.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
  }

  menuToggle?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
