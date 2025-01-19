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
            section.className = "category mt-5";

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

loadMenu();