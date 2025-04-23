// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const header = document.querySelector("header");

  // Add scroll event for header shadow
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Animation for elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".feature-card, .registration-content, .about-content, .download-buttons, .footer-language-selector");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate");
      }
    });
  };

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Run once on page load
  animateOnScroll();

  // Add animation classes to CSS dynamically
  const style = document.createElement("style");
  style.innerHTML = `
        .feature-card, .registration-content, .about-content, .download-buttons, .footer-language-selector {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .registration-content.animate, .about-content.animate, .download-buttons.animate, .footer-language-selector.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
  document.head.appendChild(style);

  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Close menu when clicking on nav links or register button
  document.querySelectorAll(".nav-links .nav-item, .nav-links .nav-button").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  // Language selector functionality
  const currentPage = window.location.pathname.split("/").pop();
  const langOptions = document.querySelectorAll(".lang-option");

  // Set active language based on current page
  langOptions.forEach((option) => {
    const href = option.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });

  // Add animation to footer language selector
  const footerLangSelector = document.querySelector(".footer-language-selector");
  if (footerLangSelector) {
    window.addEventListener("scroll", function () {
      const footerPosition = footerLangSelector.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerPosition < windowHeight - 50) {
        footerLangSelector.classList.add("animate");
      }
    });
  }
});
