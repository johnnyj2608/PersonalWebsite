// Anchors
function jump(h) {
  var top = document.getElementById(h).offsetTop;
  window.scrollTo(0, top - 45);
}

// Toggle navbar from navbar-brand
function toggleNavbar(h) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse.classList.contains("show")) {
    const navbarToggle = document.querySelector(".navbar-toggler");
    navbarToggle.click(); // Collapse the navbar
  }
  jump(h);
}

// Transparent navbar while in landing page
window.addEventListener("scroll", function () {
  const aboutSection = document.getElementById("about");
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > aboutSection.offsetTop - 46) {
    navbar.classList.add("solid-navbar");
    navbar.classList.remove("transparent-navbar");
  } else {
    navbar.classList.remove("solid-navbar");
    navbar.classList.add("transparent-navbar");
  }
});

// Overlay for preloader
Pace.on("done", function () {
  var overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none"; // Remove preloader
  }
});
