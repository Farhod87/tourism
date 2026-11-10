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


