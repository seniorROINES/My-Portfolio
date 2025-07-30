fetch(window.location.origin + "/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;

        // On attend que le DOM mis à jour soit prêt
        requestAnimationFrame(() => {
            const currentPage = window.location.pathname.split("/").pop() || "index.html";

            // Appliquer active sur nav ET side-menu après injection
            document.querySelectorAll("nav a, #side-menu a").forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });

            // --- Modal logo ---
            const logo = document.querySelector(".logo");
            const modal = document.getElementById("logoModal");
            const closeBtn = document.querySelector(".close-btn");

            if (logo && modal && closeBtn) {
                logo.addEventListener("click", (e) => {
                    e.preventDefault();
                    modal.style.display = "flex";
                });
                closeBtn.addEventListener("click", () => modal.style.display = "none");
                window.addEventListener("click", (e) => {
                    if (e.target === modal) modal.style.display = "none";
                });
            }

            // --- Menu toggle ---
            const menuToggle = document.getElementById("menu-toggle");
            const sideMenu = document.getElementById("side-menu");
            const overlay = document.getElementById("overlay");

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
                console.error("Menu toggle elements introuvables !");
            }
        });
    });

// Effet d'écriture
const roles = ["Web Developer", "Graphic Designer", "Software Developer"];
const typedText = document.getElementById("typed-text");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

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
