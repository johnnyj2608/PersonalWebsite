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

// Pop up youtube video for project demos
function popupVideo() {
  const playButtons = document.querySelectorAll('.play-video');
  const popup = document.querySelector('.popup-video');
  const iframe = document.querySelector('.popup-video iframe');
  const closeButton = document.querySelector('.popup-video span');

  playButtons.forEach(button => {
    button.onclick = () => {
      const videoId = button.getAttribute('data-video-id');
      const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
      iframe.src = youtubeUrl;
      popup.style.display = 'block';
    };
  });

  closeButton.onclick = () => {
    popup.style.display = 'none';
    iframe.src = ''; 
  };
}

document.addEventListener('DOMContentLoaded', popupVideo);

// Toggle button to see hidden projects
function toggleProjects() {
  var hiddenProjects = document.getElementById('hidden-projects');
  var seeMoreBtn = document.getElementById('see-more-btn');
  
  hiddenProjects.style.display = "block";
  seeMoreBtn.style.display = "none";
}

// function confirmDownload(linkUrl, fileName) {
//   if (confirm("Are you sure you want to download this file?")) {
//     var link = document.createElement("a");
//     link.href = linkUrl;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// }

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
