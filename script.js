fetch(window.location.origin + window.location.pathname.replace(/[^\/]*$/, '') + "header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;

                // Ajout dynamique de la classe active
        const currentPage = window.location.pathname.split("/").pop();
        document.querySelectorAll("nav a").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentPage) {
                        link.classList.add("active");
            }
        });
    });

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

        document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            // --- Activer automatiquement le lien actif ---
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            document.querySelectorAll("nav a").forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });

            // --- Sélection des éléments APRÈS injection ---
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
            } else {
                console.error("Modal ou logo introuvable après injection !");
            }
        })
        .catch(error => console.error("Erreur lors du chargement du header :", error));
});

