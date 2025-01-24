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
        "dessert": 0,
        "sauce": 0,
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

                const imageName = item.name.replaceAll(' ', '-').toLowerCase();
                let imagePath;

                if (category !== "sauce") {
                    imagePath = `/assets/images/menu/${category}/${imageName}.jpg`;
                } else {
                    imagePath = '/assets/images/menu/cookoutjohn.png';
                }
                const randomPrice = (Math.random() * (9.99 - 1) + 1).toFixed(2);

                const card = `
                    <div class="card" onclick="toggleFood(
                        '${item.name}', 
                        '${item.ingredients}', 
                        '${item.cuisine}', 
                        '${randomPrice}', 
                        '${imagePath}')">
                        <img src="${imagePath}" class="card-img" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text"><strong>Price:</strong> $${randomPrice}</p>
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

const foodPanel = document.getElementById('food-panel');
const cartPanel = document.getElementById('cart-panel');
const blackOverlay = document.getElementById('black-overlay');
const body = document.body;

function toggleOverlay() {
    if (foodPanel.classList.contains('active')) {
        foodPanel.classList.toggle('active')
        
    } else if (cartPanel.classList.contains('active')) {
        cartPanel.classList.toggle('active')
    }

    blackOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

function toggleFood(name, ingredients, cuisine, price, image) {
    foodPanel.classList.toggle('active');
    blackOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
    foodPanel.scrollTop = 0;

    const foodName = document.getElementById('food-name');
    const foodImage = document.getElementById('food-image');
    const foodPrice = document.getElementById('food-price');
    const foodIngredients = document.getElementById('food-ingredients');
    const foodCuisine = document.getElementById('food-cuisine');
    const foodCount = document.getElementById('food-count');
    const foodOrderPrice = document.getElementById('order-price');

    foodName.textContent = name || '';
    foodImage.src = image || '';
    foodPrice.textContent = `Price: $${price}`;
    foodIngredients.textContent = `Ingredients: ${ingredients}`;
    foodCuisine.textContent = `Cuisine: ${cuisine}`;
    foodCount.textContent = '1';
    foodOrderPrice.textContent = `$${price}`;
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
    cartPanel.classList.toggle('active');
    blackOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
    cartPanel.scrollTop = 0;
}

function addOrder() {
    const foodOrderCount = document.getElementById('food-count');
    const foodName = document.getElementById('food-name').textContent;
    const foodImage = document.getElementById('food-image').src;
    const quantity = parseInt(foodOrderCount.textContent);

    const foodPrice = document.getElementById('food-price');
    const priceString = foodPrice.textContent;
    const price = parseFloat(priceString.replace(/[^\d.-]/g, ''));


    const existingItem = cart.find(item => item.name === foodName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: foodName,
            image: foodImage,
            quantity: quantity,
            price: price,
        });
    }
    updateCart();
    toggleFood();
}

function updateCart() {
    const cartPanelBody = document.querySelector('.cart-panel-body');
    cartPanelBody.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const cartItem = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <div class="cart-item-quantity">
                            <button onclick="updateCartItem(${index}, -1)">-</button>
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
    const userName = document.getElementById('cart-panel-name').value;
    const submitButton = document.getElementById('cart-panel-submit');

    if (userName.trim() !== '' && cart.length !== 0) {
        submitButton.classList.add('active');
    } else {
        submitButton.classList.remove('active');
    }
}

function submitOrder() {
    const userName = document.getElementById('cart-panel-name').value;
    const emailMessage = cart.map(item => {
        const totalPrice = (item.price * item.quantity).toFixed(2); // 100% Discounts
        return `${item.name} x ${item.quantity} - Free`;
    }).join("\n");
  
    document.getElementById('email-name').value = userName;
    document.getElementById('email-message').value = `Order Details:\n\n${emailMessage}`;
  
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
  
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`${userName}, you have successfully placed your order!`);

            cart.length = 0;
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
    window.addEventListener('scroll', updateNavHighlight);
});