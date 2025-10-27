
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;
    requestAnimationFrame(() => {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      document.querySelectorAll("nav a, #side-menu a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
      const logo = document.querySelector(".logo");
      const modal = document.getElementById("logoModal");
      const closeBtn = document.querySelector(".close-btn");
      if (logo && modal && closeBtn) {
        logo.addEventListener("click", e => {
          e.preventDefault();
          modal.style.display = "flex";
        });
        closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
        window.addEventListener("click", e => {
          if (e.target === modal) modal.style.display = "none";
        });
      }
      const menuToggle = document.getElementById("menu-toggle");
      const sideMenu   = document.getElementById("side-menu");
      const overlay    = document.getElementById("overlay");
      if (menuToggle && sideMenu && overlay) {
        menuToggle.addEventListener("click", () => {
          sideMenu.classList.toggle("active");
          overlay.classList.toggle("active");
        });
        overlay.addEventListener("click", () => {
          sideMenu.classList.remove("active");
          overlay.classList.remove("active");
        });
      } else {
        console.error("Éléments du menu responsive introuvables");
      }
    });
  })
  .catch(err => console.error("Erreur chargement header :", err));
const roles = ["Web Developer", "Designer", "Software Developer"];
const typedText = document.getElementById("typed-text");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeEffect() {
  let currentRole = roles[roleIndex];
  if (!deleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 100);
}
typeEffect();

