
const cartButton = document.querySelector("#cart-button");
const cartPanel = document.querySelector("#cart-panel");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector("#cart-total");
const clearCart = document.querySelector("#clear-cart");

let cart = [];

cartButton.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
});

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        button.textContent = "Added";
        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 700);
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const details = document.createElement("span");
        details.textContent = `${item.quantity} × $${item.price.toFixed(2)}`;

        info.append(name, details);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        cartItem.append(info, removeButton);
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

clearCart.addEventListener("click", () => {
    cart = [];
    updateCart();
});

document.addEventListener("click", event => {
    if (!event.target.closest(".cart")) {
        cartPanel.classList.remove("active");
    }
});

const bookingForm = document.querySelector("#booking-form");
const bookingMessage = document.querySelector("#booking-message");

bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    bookingMessage.textContent = "Your reservation has been received!";
    bookingForm.reset();
});

const contactForm = document.querySelector("#contact-form");
const contactMessage = document.querySelector("#contact-message");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    contactMessage.textContent = "Your message has been received!";
    contactForm.reset();
});
