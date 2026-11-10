/* ============================================
   ВЫПАДАЮЩИЙ ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Открытие/закрытие меню
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  const langDropdown = document.getElementById('langDropdown');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
      }
    });
  }

  // 2. Переключение с сохранением страницы
  const langButtons = document.querySelectorAll('#langMenu button[data-lang]');

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.dataset.lang.toLowerCase();
      
      const currentPath = window.location.pathname;
      
      // 1. Вычисляем, где находится корень сайта, и получаем путь к текущей странице внутри языка
      let siteRoot = '';
      let pagePath = currentPath;

      if (currentPath.includes('/eng/')) {
        siteRoot = currentPath.split('/eng/')[0]; // Корень сайта
        pagePath = currentPath.split('/eng/')[1]; // Например: pages/blog.html
      } else if (currentPath.includes('/uzb/')) {
        siteRoot = currentPath.split('/uzb/')[0];
        pagePath = currentPath.split('/uzb/')[1]; 
      } else {
        // Если мы в корне (русская версия)
        siteRoot = '';
        pagePath = currentPath.replace(/^\//, ''); // Убираем первый слеш, получаем: pages/blog.html или index.html
      }

      // Если мы на главной странице (путь пустой или просто index.html), 
      // то pagePath должен быть просто index.html
      if (!pagePath || pagePath === '') {
        pagePath = 'index.html';
      }

      // 2. Формируем новый URL, подставляя нужный язык
      let newUrl = '';
      
      if (targetLang === 'ru') {
        newUrl = siteRoot + '/' + pagePath;
      } else if (targetLang === 'en') {
        newUrl = siteRoot + '/eng/' + pagePath;
      } else if (targetLang === 'uz') {
        newUrl = siteRoot + '/uzb/' + pagePath;
      }

      // Убираем двойные слеши, если они случайно образовались (например, //)
      newUrl = newUrl.replace(/\/+/g, '/');

      console.log("Переходим на:", newUrl); // Проверка в консоли
      window.location.href = newUrl;
    });
  });
});

/* ---------- MOBILE MENU ---------- */
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});



  let galleryImages = []; // Здесь будут храниться ссылки
  let currentImageIndex = 0;
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // Функция открытия
  function openLightbox(element) {
    // 1. Находим все картинки на странице внутри галереи
    const allImgs = document.querySelectorAll('.gallery-grid img');
    
    // 2. Записываем их ссылки (src) в массив
    galleryImages = Array.from(allImgs).map(img => img.src);

    // 3. Находим индекс картинки, на которую кликнули
    const clickedImg = element.querySelector('img') || element; // Если кликнули на кнопку, берем картинку из родителя
    currentImageIndex = galleryImages.indexOf(clickedImg.src);

    // Если индекс не найден (на всякий случай), ставим 0
    if (currentImageIndex === -1) currentImageIndex = 0;

    // 4. Показываем модалку
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Функция закрытия
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Функция листания
  function changeImage(direction) {
    if (galleryImages.length === 0) return;

    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
      currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
      currentImageIndex = galleryImages.length - 1;
    }
    
    lightboxImg.src = galleryImages[currentImageIndex];
  }

  // Закрытие по клику на фон
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });







/* ---------- Скрипт для кнопки бронирования ---------- */


document.getElementById('tourBookingForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Останавливаем обычную перезагрузку страницы

  const form = this;
  const submitBtn = form.querySelector('.btn-submit-booking');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = 'Отправка...';
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  // Собираем данные из всех полей формы
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());
  
  // Добавляем название тура (берем из заголовка h1)
  const pageTitleElement = document.querySelector('h1'); 
  dataObj.tour = pageTitleElement ? pageTitleElement.innerText : "Неизвестный тур";

  const formspreeUrl = 'https://formspree.io/f/xoeejkea'; // Ваша ссылка

  fetch(formspreeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dataObj)
  })
  .then(response => {
    if (response.ok) {
      showNotification('Успешно! Ваш запрос отправлен менеджеру.');
      form.reset(); // Очищаем форму после успешной отправки
    } else {
      showNotification('Ошибка при отправке. Попробуйте позже.');
    }
  })
  .catch(() => {
    showNotification('Ошибка сети. Проверьте интернет.');
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.opacity = '1';
    submitBtn.disabled = false;
  });
});

// Функция уведомления (та же, что мы писали ранее)
function showNotification(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%) translateY(20px)';
  toast.style.background = '#1A1A1A';
  toast.style.color = '#F5F0E8';
  toast.style.padding = '16px 32px';
  toast.style.borderRadius = '999px';
  toast.style.fontSize = '15px';
  toast.style.fontFamily = "'Inter', sans-serif";
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}