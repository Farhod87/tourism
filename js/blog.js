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



/* ============================================
     HERO SLIDER
  ============================================ */
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;
  let autoplayTimer;
  const AUTOPLAY_DELAY = 5000;

  // Создать точки
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.dataset.index = i;
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('button');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  resetAutoplay();


  document.addEventListener('DOMContentLoaded', function () {



      /* ============================================
         1. УПРАВЛЕНИЕ СЕТКОЙ
      ============================================ */
      const grid = document.getElementById('bentoGrid');
      const allCards = Array.from(document.querySelectorAll('.bento-card'));
    
      // Функция для расстановки больших карточек по макету
      function applyLayout() {
        // 1. Убираем класс card-lg у всех
        allCards.forEach(card => card.classList.remove('card-lg'));
    
        // 2. Если активен фильтр "Все" (макетный вид)
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;
        
        if (activeFilter === 'all') {
          grid.classList.remove('dense'); // Выключаем плотную сетку
          
          // Делаем большими 1-ю и 10-ю карточки
          const visibleCards = allCards.filter(card => !card.classList.contains('hidden'));
          if (visibleCards.length >= 1) visibleCards[0].classList.add('card-lg');
          if (visibleCards.length >= 10) visibleCards[9].classList.add('card-lg');
          
        } else {
          // Если выбран фильтр — включаем плотную сетку (без пустот)
          grid.classList.add('dense');
          
          // Делаем большую только самую первую карточку, чтобы было красиво
          const visibleCards = allCards.filter(card => !card.classList.contains('hidden'));
          if (visibleCards.length >= 1) visibleCards[0].classList.add('card-lg');
        }
      }
    
      // Применяем при загрузке
      applyLayout();
    
      /* ============================================
         2. ФИЛЬТРЫ
      ============================================ */
      const filterBtns = document.querySelectorAll('.filter-btn');
    
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
    
          const filter = this.dataset.filter;
    
          // Скрываем/Показываем
          allCards.forEach(card => {
            if (filter === 'all' || card.dataset.cat === filter) {
              card.classList.remove('hidden');
              card.style.display = '';
            } else {
              card.classList.add('hidden');
              card.style.display = 'none';
            }
          });
    
          // Перестраиваем сетку
          applyLayout();
        });
      });
    
      /* ============================================
         3. КНОПКА "СМОТРЕТЬ ВСЕ"
      ============================================ */
      const showMoreBtn = document.getElementById('showMoreBtn');
      if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
          filterBtns.forEach(b => b.classList.remove('active'));
          const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (allBtn) allBtn.classList.add('active');
    
          allCards.forEach(card => {
            card.classList.remove('hidden');
            card.style.display = '';
          });
    
          applyLayout();
          
          this.textContent = 'ВСЕ ИСТОРИИ ПОКАЗАНЫ ✓';
          this.style.background = '#F5C842';
          this.style.color = '#000';
          this.disabled = true;
        });
      }
    
      /* ============================================
         4. МОДАЛКА
      ============================================ */
      const bentoModal = document.getElementById('bentoModal');
      const bentoModalClose = document.getElementById('bentoModalClose');
      const bentoModalImg = document.getElementById('bentoModalImg');
      const bentoModalTitle = document.getElementById('bentoModalTitle');
      const bentoModalCategory = document.getElementById('bentoModalCategory');
      const bentoModalDesc = document.getElementById('bentoModalDesc');
    

      if (bentoModal) {
        allCards.forEach(card => {
          card.addEventListener('click', function () {
            const bg = this.querySelector('.card-img')?.style.backgroundImage || 'none';
            const title = this.querySelector('h3')?.textContent || '';
            const tag = this.querySelector('.card-tag')?.textContent || '';
            const desc  = this.dataset.desc || '';
    
            bentoModalImg.style.backgroundImage = bg;
            bentoModalTitle.textContent = title;
            bentoModalCategory.textContent = tag;
            bentoModalDesc.textContent = desc;
    
            bentoModal.classList.add('show');
            document.body.style.overflow = 'hidden';
          });
        });
    
        function closeBentoModal() {
          bentoModal.classList.remove('show');
          document.body.style.overflow = '';
        }
    
        bentoModalClose.addEventListener('click', closeBentoModal);
        bentoModal.addEventListener('click', (e) => {
          if (e.target === bentoModal) closeBentoModal();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closeBentoModal();
        });
      }
    
    })