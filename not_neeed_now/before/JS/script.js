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

function initSliderLogic(container, imageCount) {
    if (imageCount <= 1) return; // 

    let currentSlide = 0;
    const sliderTrack = container.querySelector('.slider');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % imageCount;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + imageCount) % imageCount;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    }
}

function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const imagesHtml = p.images.map(img => `<img src="/static/images/${img}" class="open-link">`).join('');

        card.innerHTML = `
            <div class="image-container">
                ${p.images.length > 1 ? '<button class="nav-btn prev">❮</button><button class="nav-btn next">❯</button>' : ''}
                <div class="slider">${imagesHtml}</div>
            </div>
            <div class="product-info open-link">
                <h3 class="product-title-large">${p.name}</h3>
                <div class="price" style="margin-top: 10px;">€ ${p.price}</div>
            </div>
        `;

        initSliderLogic(card, p.images.length);

        card.querySelectorAll('.open-link').forEach(el => {
            el.onclick = () => window.location.href = `/product/${p.id}/`;
        });

        grid.appendChild(card);
    });
}

function renderProductDetails() {
    const detailContainer = document.getElementById('product-detail-view');
    if (!detailContainer) return;

    const path = window.location.pathname.split('/');
    const pId = path[path.length - 2];
    const product = products.find(p => p.id === pId);

    if (product) {
        const imagesHtml = product.images.map(img => `<img src="/static/images/${img}">`).join('');
        const hasSlider = product.images.length > 1;

        detailContainer.innerHTML = `
            <div class="product-detail-layout">
                <div class="detail-img-box image-container">
                    ${hasSlider ? '<button class="nav-btn prev">❮</button><button class="nav-btn next">❯</button>' : ''}
                    <div class="slider">${imagesHtml}</div>
                </div>
                <div class="detail-text-box">
                    <h1 class="product-title-large">${product.name}</h1>
                    <div class="description-block">
                        <p><strong>Материал:</strong> ${product.material}</p>
                        <p><strong>Камни:</strong> ${product.stone}</p>
                    </div>
                    <div class="detail-price-large">€ ${product.price}</div>
                    <button class="buy-now-btn" onclick="window.location.href='/support/'">Приобрести</button>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Добавить в корзину</button>
                    
                    <div class="back-btn-container">
                        <a href="/collections/" class="back-btn">← Назад</a>
                    </div>
                </div>
            </div>
        `;
        
        initSliderLogic(detailContainer, product.images.length);
    }
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('vca_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartList(); 
    alert('Товар добавлен в корзину');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('vca_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartList(); 
}

function updateCartUI() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
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

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        renderCartList();
    }
}


renderProductGrid();
renderProductDetails();
updateCartUI();