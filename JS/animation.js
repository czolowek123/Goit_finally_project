// static/js/intro.js
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('intro-overlay');
    
    if (!localStorage.getItem('visited')) {
        // Первый раз: показываем анимацию
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }, 2000);
        localStorage.setItem('visited', 'true');
    } else {
        // Уже был: убираем сразу
        overlay.remove();
    }
});