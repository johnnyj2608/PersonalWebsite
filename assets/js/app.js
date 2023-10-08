// Anchors
function jump(h) {
  var top = document.getElementById(h).offsetTop;
  window.scrollTo(0, top - 95);
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

  if (window.scrollY > aboutSection.offsetTop - 100) {
    navbar.classList.add("solid-navbar");
    navbar.classList.remove("transparent-navbar");
  } else {
    navbar.classList.remove("solid-navbar");
    navbar.classList.add("transparent-navbar");
  }
});

function confirmDownload() {
  if (confirm("Are you sure you want to download this file?")) {
    var link = document.createElement("a");
    link.href = "assets/NewGardenProject.jar";
    link.download = "NewGardenProject.jar";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/*
// Collapsable experiences
document.addEventListener("DOMContentLoaded", function () {
  const iconButtons = document.querySelectorAll(".exp-icon-button");
  iconButtons.forEach((iconButton) => {
    const collapseContent = iconButton.parentElement.querySelector(
      ".exp-collapse-content"
    );
    iconButton.addEventListener("click", function () {
      collapseContent.classList.toggle("collapsed");
      const icon = iconButton.querySelector("i"); // Get the icon element within the button
      icon.classList.toggle(
        "fa-plus",
        collapseContent.classList.contains("collapsed")
      ); // Set the class based on collapsed state
      icon.classList.toggle(
        "fa-minus",
        !collapseContent.classList.contains("collapsed")
      ); // Set the class based on collapsed state
    });
  });
});
*/

/*
// Overlay for preloader
Pace.on("done", function () {
  var overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none"; // Remove preloader
    document.body.style.overflow = ""; // Re-enable scrolling
  }
});
// Disable scrolling until Pace is done loading
document.body.style.overflow = "hidden";
*/
