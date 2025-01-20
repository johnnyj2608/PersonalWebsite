async function loadMenu() {

    const categories = {
        "breakfast": 0,
        "appetizer": 0,
        "noodle": 0,
        "chicken": 0,
        "beef": 0,
        "pork": 0,
        "seafood": 0,
        "vegetable": 0,
        "pie": 0,
        "sandwich": 0,
        "sides": 0,
        "sauce": 0,
        "dessert": 0,
    };

    const cuisines = {
        "American": 0,
        "Chinese": 0,
        "Fuzhounese": 0,
        "Japanese": 0,
        "Korean": 0,
        "Malaysian": 0,
        "Mexican": 0,
        "Vietnamese": 0,
        "Other": 0,
    };

    const menuContainer = document.getElementById("menu-container");

    async function fetchCategoryData(category) {
        const file = `assets/data/menu/${category}.json`;
        try {
            const response = await fetch(file);
            const data = await response.json();

            const section = document.createElement("div");
            section.className = "category my-4";
            section.id = category;

            const title = document.createElement("h2");
            title.textContent = category;
            section.appendChild(title);

            const row = document.createElement("div");
            row.className = "row";

            data.forEach((item, index) => {
                const col = document.createElement("div");
                col.className = "col-md-6";

                const card = `
                    <div class="card">
                        <img src="assets/images/menu/cookoutjohn.png" class="card-img" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text"><strong>Ingredients:</strong> ${item.ingredients}</p>
                            <p class="card-text"><strong>Cuisine:</strong> ${item.cuisine}</p>
                        </div>
                    </div>
                `;
                col.innerHTML = card;
                row.appendChild(col);

                if ((index + 1) % 2 === 0) {
                    section.appendChild(row.cloneNode(true));
                    row.innerHTML = "";
                }
            });

            if (row.innerHTML.trim()) {
                section.appendChild(row);
            }

            return section;
        } catch (error) {
            console.error("Error loading " + file, error);
            return null;
        }
    }

    for (let category in categories) {
        const section = await fetchCategoryData(category);
        if (section) {
            menuContainer.appendChild(section);
        }
    }
}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

function jump(section) {
    window.removeEventListener('scroll', updateNavHighlight);

    var top = document.getElementById(section).offsetTop;
    window.scrollTo(0, top - 95);

    navLinks.forEach(link => link.classList.remove('active'));

    const navLink = document.getElementById(`nav-${section}`);
    navLink?.classList.add('active');

    navbarCollapse.scrollTo({
        left: navLink.offsetLeft - navbarCollapse.offsetLeft,
        behavior: 'smooth'
    });

    window.addEventListener('scrollend', () => {
        window.addEventListener('scroll', updateNavHighlight);
    });
}

function updateNavHighlight() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const sections = document.querySelectorAll('.category');

    navLinks.forEach(link => link.classList.remove('active'));

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const navLink = document.getElementById(`nav-${section.id}`);
            navLink?.classList.add('active');

            navbarCollapse.scrollTo({
                left: navLink.offsetLeft - navbarCollapse.offsetLeft,
                behavior: 'smooth'
            });
        }
    });
}

function toggleSearch() {
    document.getElementById('search-container').classList.toggle('active');
    document.getElementById('search-input').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    updateNavHighlight();
    window.addEventListener('scroll', updateNavHighlight);
});