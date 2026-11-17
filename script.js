/* ============================================================
   BLACKLINE BARBER — script.js
   Vanilla JS : menu mobile, scroll spy, formulaire, année
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Menu hamburger mobile ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("main-nav");

  function closeMenu() {
    nav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  burger.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  /* Fermer le menu quand on clique sur un lien */
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* Fermer avec la touche Échap */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) closeMenu();
  });

  /* ---------- 2. Lien actif dans la navigation (scroll spy) ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll("main section[id]");

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = "accueil";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });

    navLinks.forEach(function (link) {
      var target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 3. Animations d'apparition au scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 4. Formulaire de rendez-vous (démo front-end) ---------- */
  var form = document.getElementById("appointment-form");
  var note = document.getElementById("form-note");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nom = document.getElementById("nom").value.trim();
    var tel = document.getElementById("telephone").value.trim();
    var service = document.getElementById("service").value;
    var date = document.getElementById("date").value;

    if (!nom || !tel || !service || !date) {
      note.textContent = "Merci de remplir tous les champs obligatoires.";
      note.classList.add("error");
      return;
    }

    note.classList.remove("error");
    note.textContent = "Merci " + nom + " ! Votre demande a bien été enregistrée (démo). Nous vous rappellerons au " + tel + " pour confirmer votre créneau.";
    form.reset();
  });

  /* ---------- 5. Année automatique du copyright ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
