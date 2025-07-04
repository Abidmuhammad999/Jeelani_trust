
  window.onload = function () {
    let currentSlide = 0;
    const slidesContainer = document.getElementById('carouselSlides');
    const totalSlides = slidesContainer.children.length;

    function updateSlide() {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
    }

    function closeSpecialPhotoModal() {
      document.getElementById("specialPhotoModal").style.display = "none";
      localStorage.setItem("specialShownTime", new Date().getTime());
    }

    // Run the slider every 5 seconds
    setInterval(nextSlide, 5000);

    // Auto close modal after 30 seconds
    setTimeout(closeSpecialPhotoModal, 60000);

    // Attach close to button
    window.closeSpecialPhotoModal = closeSpecialPhotoModal;
  }