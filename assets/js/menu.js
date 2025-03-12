let itemNameMap = new Map();

function renderMenu(items) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    // Group items by category
    const groupedItems = items.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});

    for (const category in groupedItems) {
        const section = document.createElement("div");
        
        section.className = "category";
        section.id = category;

        const title = document.createElement("h2");
        title.textContent = category;
        section.appendChild(title);

        const row = document.createElement("div");
        row.className = "row";

        groupedItems[category].forEach((item, index) => {
            const col = document.createElement("div");
            col.className = "col-md-6";

            const itemID = item.name.toLowerCase().replace(/\s+/g, '-');
            const imageName = item.name.replaceAll(' ', '-').toLowerCase();
            let imagePath = `/assets/images/menu/${category}/${imageName}.jpg`;

            const card = `
                <div id="${itemID}" class="card" onclick="toggleFood('${itemID}')">
                    <img src="${imagePath}" class="card-img" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text"><strong>Price:</strong> $${item.price}</p>
                        <p class="card-text"><strong>Ingredients:</strong> ${item.ingredients}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="cuisine-triangle" data-tooltip="${item.cuisine}"></div>
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

        menuContainer.appendChild(section);
    }
}

async function loadMenu() {

    const categories = [
        "breakfast",
        "appetizer",
        "soup",
        "noodle",
        "chicken",
        "beef",
        "pork",
        "seafood",
        "vegetable",
        "sandwich",
        "sides",
        "dessert",
    ];    

    async function fetchCategoryData(category) {
        const file = `assets/data/menu/${category}.json`;
        try {
            const response = await fetch(file);
            const data = await response.json();

            const randomPrice = () => (Math.random() * (9.99 - 1) + 1).toFixed(2);

            data.forEach(item => {
                const key = item.name.toLowerCase().replace(/\s+/g, '-');
                itemNameMap.set(key, {
                    ...item, 
                    category,
                    price: randomPrice() 
                });
            });

            return data;
        } catch (error) {
            console.error("Error loading " + file, error);
            return null;
        }
    }

    for (const category of categories) {
        await fetchCategoryData(category);
        renderMenu(Array.from(itemNameMap.values()));
    }
}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

function jump(section) {
    window.removeEventListener('scroll', updateNavHighlight);

    var top = document.getElementById(section).offsetTop;
    var offset = window.innerWidth >= 1200 ? 24 : 85;
    window.scrollTo(0, top - offset);

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
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
    } else {
        searchContainer.classList.add('active');
        searchInput.focus();

    }

    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.remove('active');
        document.removeEventListener('click', closeDropdownOnOutsideClick);
    }
}

function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.remove('active');
        document.removeEventListener('click', closeDropdownOnOutsideClick);
    } else {
        dropdownMenu.classList.add('active');
        document.addEventListener('click', closeDropdownOnOutsideClick);
    }
}

function closeDropdownOnOutsideClick(event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const searchContainer = document.getElementById('search-container');
    const dropdownIcon = document.querySelector('.dropdown-icon');
    
    if (!searchContainer.contains(event.target) && !dropdownIcon.contains(event.target)) {
        if (dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        }
    }
}

function filterMenu() {
    const selectedCuisines = Array.from(document.querySelectorAll('.dropdown-menu input:checked'))
        .map(input => input.name);

    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const filteredItems = Array.from(itemNameMap.values()).filter(item => {
        const matchesCuisine = selectedCuisines.includes(item.cuisine);
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        return matchesCuisine && matchesSearch;
    });

    renderMenu(filteredItems);
}

const foodPanel = document.getElementById('food-panel');
const cartPanel = document.getElementById('cart-panel');
const blackOverlay = document.getElementById('black-overlay');
const body = document.body;

function toggleOverlay() {
    if (foodPanel.classList.contains('active')) {
        foodPanel.classList.remove('active')
        
    } else if (cartPanel.classList.contains('active')) {
        cartPanel.classList.remove('active')
    }

    if (blackOverlay.classList.contains('active')) {
        blackOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
    } else {
        blackOverlay.classList.add('active');
        body.classList.add('no-scroll');
    }
}

function toggleFood(itemID) {
    const item = itemNameMap.get(itemID.toLowerCase());
    toggleOverlay();

    foodPanel.scrollTop = 0;
    foodPanel.classList.add('active');

    const foodName = document.getElementById('food-name');
    const foodImage = document.getElementById('food-image');
    const foodPrice = document.getElementById('food-price');
    const foodIngredients = document.getElementById('food-ingredients');
    const foodCuisine = document.getElementById('food-cuisine');
    const foodAddons = document.getElementById('food-addons');
    const foodInstructions = document.getElementById('food-instructions');
    const foodCount = document.getElementById('food-count');
    const foodOrderPrice = document.getElementById('order-price');

    foodName.textContent = item.name || '';
    foodImage.src = `/assets/images/menu/${item.category}/${itemID}.jpg`;
    foodPrice.textContent = `$${item.price}`;
    foodIngredients.innerHTML = `<strong>Ingredients:</strong> ${item.ingredients}`;
    foodCuisine.innerHTML = `<strong>Cuisine:</strong> ${item.cuisine}`;
    foodCount.textContent = '1';
    foodOrderPrice.textContent = `$${item.price}`;

    const sentences = item.instructions.split(/(?<=[.!?])\s+/).filter(Boolean);
    const numberedInstructions = sentences.map((sentence, index) => `${index + 1}) ${sentence}`);
    foodInstructions.innerHTML = numberedInstructions.join('<br>');

    foodAddons.innerHTML = '';
    if (item.addons) {
        const addonsArray = item.addons.split(',').map(addon => addon.trim());

        addonsArray.forEach(addon => {
            const label = document.createElement('label');
            label.classList.add('food-addons-label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = addon;
            checkbox.name = addon;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${addon}`));

            foodAddons.appendChild(label);
        });
    }
}

function toggleInstructions() {
    const instructionsContainer = document.getElementById('food-instructions');
    const instructionsButton = document.querySelector('.food-instructions-btn');

    if (instructionsContainer.classList.contains('hidden')) {
        instructionsContainer.classList.remove('hidden');
        instructionsButton.textContent = 'Hide Instructions';
    } else {
        instructionsContainer.classList.add('hidden');
        instructionsButton.textContent = 'Show Instructions';
    }
}

function updateCount(amount) {
    const foodPrice = document.getElementById('food-price');
    const foodOrderPrice = document.getElementById('order-price');
    const foodOrderCount = document.getElementById('food-count');
    let quantity = parseInt(foodOrderCount.textContent);
  
    if (quantity + amount >= 1) {
        foodOrderCount.textContent = quantity + amount;

        const priceString = foodPrice.textContent;
        const price = parseFloat(priceString.replace(/[^\d.-]/g, ''));
        const totalPrice = (price * (quantity+amount)).toFixed(2);
        foodOrderPrice.textContent = `$${totalPrice}`;
    }
}

const cart = [];
function toggleCart() {
    toggleOverlay();
    cartPanel.scrollTop = 0;
    cartPanel.classList.add('active');
}

function addOrder() {
    toggleOverlay();

    const foodOrderCount = document.getElementById('food-count');
    const foodName = document.getElementById('food-name').textContent;
    const foodImage = document.getElementById('food-image').src;
    const quantity = parseInt(foodOrderCount.textContent);

    const foodPrice = document.getElementById('food-price');
    const priceString = foodPrice.textContent;
    const price = parseFloat(priceString.replace(/[^\d.-]/g, ''));

    const selectedAddons = Array.from(document.querySelectorAll('#food-addons input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const existingItem = cart.find(item => item.name === foodName && 
        item.addons && 
        JSON.stringify(item.addons) === JSON.stringify(selectedAddons))

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: foodName,
            image: foodImage,
            quantity: quantity,
            price: price,
            addons: selectedAddons,
        });
    }
    updateCart();
}

function closeDropdown(event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const searchContainer = document.getElementById('search-container');
    
    if (!searchContainer.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
    }
}

function updateCart() {
    const cartPanelBody = document.querySelector('.cart-panel-body');
    cartPanelBody.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const addonsHTML = item.addons && item.addons.length > 0 
                ? `<p class="cart-item-addons">Add-ons: ${item.addons.join(', ')}</p>` 
                : '<p class="cart-item-addons" style="visibility: hidden;">Add-ons: </p>';

            const minusButtonHTML = item.quantity === 1 
                ? `<i onclick="updateCartItem(${index}, -1)" class="fas fa-trash trash-can-icon"></i>`
                : `<button onclick="updateCartItem(${index}, -1)">-</button>`;

            const cartItem = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        ${addonsHTML}
                        <div class="cart-item-quantity">
                            ${minusButtonHTML}
                            <span>${item.quantity}</span>
                            <button onclick="updateCartItem(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <h5 class="original-price">$${(item.price * item.quantity).toFixed(2)}</h5>
                        <h5 class="discounted-price">Free</h5>
                    </div>
                </div>
            `;
            cartPanelBody.innerHTML += cartItem;
        });
    }

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Cumulative add quantities to calculate total. 0 is initial value
    document.getElementById('cart-count').textContent = cartCount;

    checkSubmitButton();
}

function updateCartItem(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);  // (Start index, # of items to remove after index)
    }

    updateCart();
}

function removeCartItem(index) {
    cart.splice(index, 1);  // (Start index, # of items to remove after index)
    updateCart();
}

function checkSubmitButton() {
    const orderName = document.getElementById('cart-panel-name').value;
    const submitButton = document.getElementById('cart-panel-submit');

    if (orderName.trim() !== '' && cart.length !== 0) {
        submitButton.classList.add('active');
    } else {
        submitButton.classList.remove('active');
    }
}

function submitOrder() {
    const orderName = document.getElementById('cart-panel-name').value;
    const orderNote = document.getElementById('cart-panel-note').value;

    const orderDetails = cart.map(item => {
        const totalPrice = (item.price * item.quantity).toFixed(2); // 100% Discounts
        
        const addons = item.addons && item.addons.length > 0 
            ? ` (${item.addons.join(', ')})`
            : '';

        return `${item.quantity} x ${item.name}${addons} - Free`;
    }).join("\n");
  
    document.getElementById('email-name').value = orderName;
    document.getElementById('email-order').value = orderDetails;
    document.getElementById('email-note').value = orderNote;
  
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
  
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`${orderName}, you have successfully placed your order!`);

            cart.length = 0;
            document.getElementById('cart-panel-note').value = '';
            updateCart();
            toggleOverlay();
        } else {
            alert('There was an error submitting your order. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your order. Please try again.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    document.addEventListener('click', closeDropdown);
    window.addEventListener('scroll', updateNavHighlight);
    document.getElementById('current-year').textContent = new Date().getFullYear();
});