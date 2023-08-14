function jump(h) {
  var top = document.getElementById(h).offsetTop;
  window.scrollTo(0, top - 45);
}

function toggleNavbar(h) {
  const navbarToggle = document.querySelector(".navbar-toggler");
  if (navbarToggle) {
    navbarToggle.click(); // Trigger the collapse toggle
  }
  jump(h);
}

function toggleNavbar(h) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse.classList.contains("show")) {
    const navbarToggle = document.querySelector(".navbar-toggler");
    navbarToggle.click(); // Collapse the navbar
  }
  jump(h);
}
