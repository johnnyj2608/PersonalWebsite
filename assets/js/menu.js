function loadMenu() {

    const categories = {
        "appetizer": 0,
        "beef": 0,
        "breakfast": 0,
        "chicken": 0,
        "dessert": 0,
        "noodle": 0,
        "pie": 0,
        "pork": 0,
        "sandwich": 0,
        "sauce": 0,
        "seafood": 0,
        "sides": 0,
        "vegetable": 0,
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

    for (let category in categories) {
        const file = `assets/data/menu/${category}.json`;
        fetch(file)
            .then(response => response.json())
            .then(data => {
                categories[category] = data.length;
                data.forEach(item => {
                    const cuisine = item.cuisine;

                    if (cuisine in cuisines) {
                        cuisines[cuisine]++;
                    } else {
                        cuisines["Other"]++;
                    }
                });
        })
        .catch(error => {
            console.error('Error loading ' + file, error);
        });
    };
    console.log(categories, cuisines);
}

loadMenu();