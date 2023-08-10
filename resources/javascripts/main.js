document.addEventListener("DOMContentLoaded", () => {
  const circlesArray = document.querySelectorAll("span[class^=circle]");
  const skillsSection = document.querySelector("div[class=skills-container]");
  const progressBars = document.querySelectorAll(".skill-item-progress-bar");

  const map = L.map("map").setView(
    [39.28759292141628, -0.41172800972340184],
    13
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  const circle = L.circle([39.2925, -0.41172800972340184], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.25,
    radius: 1200,
  }).addTo(map);

  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  circlesArray.forEach((circle) => {
    circle.addEventListener("mouseover", (event) => {
      const selectedCircle = event.target;
      const selectedCircleClassName = "." + selectedCircle.className;
      const tween = gsap.fromTo(
        selectedCircleClassName,
        {
          duration: 5,
          scale: 1.2,
          ease: "circ",
          paused: true,
        },
        {
          duration: 3,
          scale: 1,
          ease: "power4.out",
          paused: true,
        }
      );
      tween.play();
    });
  });

  window.addEventListener("scroll", function () {
    // Experience timeline circles effect
    gsap.fromTo(
      ".circle-1",
      { y: 50, opacity: 0 },
      { opacity: 1, duration: 2, y: 0 }
    );
    gsap.fromTo(
      ".circle-2",
      { y: 50, opacity: 0 },
      { opacity: 1, duration: 2, y: 0 }
    );
    gsap.fromTo(
      ".circle-3",
      { y: 50, opacity: 0 },
      { opacity: 1, duration: 2, y: 0 }
    );
    gsap.fromTo(
      ".circle-4",
      { y: 50, opacity: 0 },
      { opacity: 1, duration: 2, y: 0 }
    );

    // Distancia al borde superior del viewport
    const sectionPos = skillsSection.getBoundingClientRect().top;
    // Altura del viewPort
    const screenPos = window.innerHeight / 2;
    if (sectionPos < screenPos) {
      // Animamos los progress bar cuando aparecen en el viewPort
      showProgress();
    } else {
      // Fin animación progress bar cuando dejan de aparecer en el viewPort
      hideProgress();
    }
  });

  /* SMOOTH SCROLL */
  const menu_items = document.querySelectorAll(".nav__item a");
  menu_items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget.getAttribute("href");
      const offsetTop = document.querySelector(target).offsetTop;
      const mov = offsetTop - 170;
      scroll({
        top: mov,
        behavior: "smooth",
      });
    });
  });
  /* SMOOTH SCROLL */
  const pageHeaders = document.querySelectorAll(".header-text");
  console.log('pageHeaders', pageHeaders);
  pageHeaders.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget.getAttribute("id");
      const offsetTop = target.offsetTop;
      const mov = offsetTop - 150;
      scroll({
        top: mov,
        behavior: "smooth",
      });
    });
  });

  // MENU STICKY EFFECT
  window.addEventListener("scroll", function () {
    // Menu Sticky effect
    const header = document.getElementById("nav");
    header.classList.toggle("sticky", window.scrollY > 0);

  
  });

  function showProgress() {
    progressBars.forEach((progressBar) => {
      const value = progressBar.dataset.progress;
      progressBar.style.opacity = 1;
      progressBar.style.width = `${value}%`;
    });
  }

  function hideProgress() {
    progressBars.forEach((progressBar) => {
      const value = progressBar.dataset.progress;
      progressBar.style.opacity = 0;
      progressBar.style.width = 0;
    });
  }
});
