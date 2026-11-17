document.addEventListener("DOMContentLoaded", function () {

  // TAHUN FOOTER OTOMATIS
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // SIDEBAR MOBILE
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const backdrop = document.getElementById("mobileBackdrop");
  const navLinks = document.querySelectorAll(".side-nav .nav-link");

  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
  }

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("show");
  });

  backdrop.addEventListener("click", closeSidebar);

  // NAVIGASI SIDEBAR
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
      closeSidebar();
    });
  });

  // MENU AKTIF SESUAI SECTION YANG DIBUKA
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + currentId;
            link.classList.toggle("active", active);
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // TAB WIREFRAME
  const wireTabs = document.querySelectorAll(".wire-tab");
  const wirePanels = document.querySelectorAll(".wire-panel");

  wireTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = tab.getAttribute("data-panel");

      wireTabs.forEach(function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      wirePanels.forEach(function (panel) {
        panel.classList.remove("active");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const targetPanel = document.getElementById(targetId);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // INDIKATOR PROGRESS SCROLL
  const progress = document.createElement("div");

  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");

  document.body.appendChild(progress);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

    progress.style.width = percentage + "%";
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  window.addEventListener("resize", updateProgress);

  updateProgress();

  // AOS ANIMATION
  if (window.AOS) {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      delay: 0,
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    });
  }

  // VANILLA TILT: EFEK 3D PADA KARTU
  if (
    window.VanillaTilt &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    const tiltElements = document.querySelectorAll(
      ".feature-card, .technology-card, .info-card, .content-card, .role-card"
    );

    VanillaTilt.init(tiltElements, {
      max: 5,
      speed: 550,
      scale: 1.015,
      glare: true,
      "max-glare": 0.12
    });
  }

  // TUTUP SIDEBAR SAAT LAYAR KEMBALI DESKTOP
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      closeSidebar();
    }
  });

});