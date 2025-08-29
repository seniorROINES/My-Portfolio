// Charger dynamiquement le contenu du header
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    // Insère le code HTML du header dans la div #header
    document.getElementById("header").innerHTML = html;

    // On attend la fin de l'injection pour travailler sur les éléments ajoutés
    requestAnimationFrame(() => {
      // Déterminer le nom du fichier de la page courante (ex: "index.html")
      const currentPage = window.location.pathname.split("/").pop() || "index.html";

      // Activer le lien de navigation correspondant (dans #header et #side-menu)
      document.querySelectorAll("nav a, #side-menu a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });

      // Gestion du modal du logo
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

      // Bascule du menu responsive (toggle)
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

// Effet de texte animé (typewriter) – exemple
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
