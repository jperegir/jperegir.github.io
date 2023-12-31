document.addEventListener("DOMContentLoaded", () => {
  const circlesArray = document.querySelectorAll("span[class^=circle]");
  const skillsSection = document.querySelector("div[class=skills-container]");
  const progressBars = document.querySelectorAll(".skill-item-progress-bar");
  const accordionSummary = document.getElementById("accordion-summary");
  const accordionList = document.getElementById("accordion-list");
  const btnCloseProjectsAccord = document.getElementById("close-projectsList");
  const btnCloseLibsAccord = document.getElementById("close-libsList");
  const btnWrapper = document.getElementById("btn-wrapper");
  const btnDownload = document.getElementById("btn-download");
  const iconArrowUp = `bxs-chevron-up`;
  const iconArrowDown = `bxs-chevron-down`;

  btnWrapper.addEventListener("click", (event) => {
    btnDownload.classList.toggle("btn-hide");
    const domIcon = ask.nextElementSibling;
    if (domIcon.classList.contains(iconArrowUp)) {
      getRealisticConfetti();
      domIcon.classList.remove(iconArrowUp);
      domIcon.classList.add(iconArrowDown);
    } else if (domIcon.classList.contains(iconArrowDown)) {
      domIcon.classList.add(iconArrowUp);
      domIcon.classList.remove(iconArrowDown);
    }
  });

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  function getRealisticConfetti() {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  accordionSummary.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("border-summary");
    accordionList.classList.toggle("border-list");
  });

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
    /* EXPERIENCE TIMELINE CIRCLES EFFECT*/
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

    /* MENU STICKY EFFECT */
    const header = document.getElementById("nav");
    header.classList.toggle("sticky", window.scrollY > 0);
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

  const link = document.querySelector(".btn-wrapper__link");
  const pink = document.querySelector(".color");
  const hoverTL = gsap.timeline();
  hoverTL.pause();

  // from, to, fromTo Tweens
  hoverTL.to(pink, {
    width: "calc(100% + 1.3em)",
    ease: "Elastic.easeOut(0.25)",
    duration: 0.4,
  });
  hoverTL.to(pink, {
    width: "2em",
    left: "calc(100% - 1.45em)",
    ease: "Elastic.easeOut(0.4)",
    duration: 0.6,
  });

  link.addEventListener("mouseenter", () => {
    hoverTL.play();
  });

  link.addEventListener("mouseleave", () => {
    hoverTL.reverse();
  });

  window.onscroll = function (e) {
    // print "false" if direction is down and "true" if up
    let scrollDirection = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;
    if (scrollDirection === true) {
      hoverTL.reverse();
    } else if (scrollDirection === false) {
      hoverTL.play();
    }
  };

  const scrollTop = function () {
    const scrollBtn = document.createElement("a");
    scrollBtn.innerHTML = "";
    scrollBtn.setAttribute("href", "#top");
    scrollBtn.setAttribute("class", "scroll-btn");
    document.body.appendChild(scrollBtn);
    // hide/show button based on scroll distance
    const scrollBtnDisplay = function () {
      window.scrollY > window.innerHeight
        ? scrollBtn.classList.add("show")
        : scrollBtn.classList.remove("show");
    };
    window.addEventListener("scroll", scrollBtnDisplay);
  };
  scrollTop();

  btnCloseProjectsAccord.addEventListener("click", function () {
    const details = document.getElementById("projects-details");
    details.removeAttribute("open");
    details.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  });

  btnCloseLibsAccord.addEventListener("click", function () {
    const details = document.getElementById("libs-details");
    details.removeAttribute("open");
    details.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  });
});
