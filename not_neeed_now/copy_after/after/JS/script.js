const products = [
    {
        id: "gold_emerald",
        name: "AVANGARD SPECIAL",
        collection: "Avangard",
        material: "Золото 585",
        stone: "Бриллиант - Форма огранки груша, круг, багет",
        price: "4 000",
        images: ["avangard 1.jpg"] 
    },
    {
        id: "silver_pear",
        name: "BALANCE GOLD",
        collection: "Balance",
        material: "Золото 585",
        stone: "Бриллиант - форма огранки груша",
        price: "2 500",
        images: ["balance 1.jpg", "balance 2.jpg"]
    },
    {
        id: "multi_stone",
        name: "CLASSIC EDITION",
        collection: "Classic",
        material: "Золото 585",
        stone: "Бриллиант - форма огранки изумруд",
        price: "2 500",
        images: ["classic 1.jpg", "classic 2.jpg"]
    }
];

let cart = JSON.parse(localStorage.getItem('vca_cart')) || [];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => {
        const hasManyImages = product.images.length > 1;
        
        // Создаем HTML для всех картинок. Первая получает класс 'active'
        const imagesHTML = product.images.map((img, index) => `
            <img src="/static/${img}" class="slide ${index === 0 ? 'active' : ''}" data-index="${index}" alt="${product.name}">
        `).join('');

        // Если картинок больше одной, добавляем стрелочки
        const arrowsHTML = hasManyImages ? `
            <button class="slider-arrow prev" onclick="event.stopPropagation(); changeSlide(this, -1)">&#10094;</button>
            <button class="slider-arrow next" onclick="event.stopPropagation(); changeSlide(this, 1)">&#10095;</button>
        ` : '';

        // Вся карточка кликабельна для перехода, КРОМЕ стрелок
        return `
            <div class="product-card" onclick="window.location.href='/product/${product.id}/'">
                <div class="slider-container">
                    ${imagesHTML}
                    ${arrowsHTML}
                </div>
                <div class="product-info">
                    <div class="product-collection">${product.collection}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">€ ${product.price}</div>
                </div>
            </div>
        `;
    }).join('');
}

function changeSlide(button, direction) {
    const container = button.parentElement;
    const slides = container.querySelectorAll('.slide');
    
    // Ищем, какая картинка сейчас видна (у какой класс active)
    let activeIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
    
    // Прячем текущую
    slides[activeIndex].classList.remove('active');
    
    // Вычисляем следующую
    activeIndex += direction;
    if (activeIndex >= slides.length) activeIndex = 0;
    if (activeIndex < 0) activeIndex = slides.length - 1;
    
    // Показываем новую
    slides[activeIndex].classList.add('active');
}

// Запуск функций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Логика корзины
function updateCartUI() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
        if (modal.style.display === 'block') renderCartList();
    }
}

function renderCartList() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="empty-cart-msg">
                <p>Ваша корзина пуста</p>
                <button class="find-btn" onclick="window.location.href='/collections/'">Найти что-то для себя</button>
            </div>`;
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <span style="font-weight: 600;">${item.name}</span>
                    <span style="color:rgb(212, 175, 55); font-weight:600; margin-left:15px;">€ ${item.price}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">✖</button>
            </div>
        `).join('');
        list.innerHTML += `<button class="buy-now-btn" style="margin-top:50px" onclick="window.location.href='/support/'">Перейти к оформлению</button>`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('vca_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartList();
}