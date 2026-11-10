/* ---------- HEADER ---------- */

/* ============================================
     Переключения языка
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

/* ---------- ДАННЫЕ СЛАЙДОВ (только заголовки) ---------- */
const isEng = window.location.pathname.includes('/eng/');
const isUzb = window.location.pathname.includes('/uzb/');
const slideData = [
  {
    title_ru: 'Бухара —<br><span class="italic">Город, где</span><br>время<br>остановилось',
    title_en: 'Bukhara —<br><span class="italic">The city where</span><br>time<br>stands still',
    title_uz: 'Buxoro —<br><span class="italic">Vaqt</span><br>to\'xtab qolgan<br>shahar'
  },
  {
    title_ru: 'Самарканд —<br><span class="italic">Сердце</span><br>Шёлкового<br>пути',
    title_en: 'Samarkand —<br><span class="italic">Heart of</span><br>the Silk<br>Road',
    title_uz: 'Samarqand —<br><span class="italic">Buyuk ipak</span><br>yo\'lining<br>yuragi'
  },
  {
    title_ru: 'Турция —<br><span class="italic">Мост между</span><br>Востоком<br>и Западом',
    title_en: 'Turkey —<br><span class="italic">A bridge between</span><br>East<br>and West',
    title_uz: 'Turkiya —<br><span class="italic">Sharq va</span><br>G\'arb<br>o\'rtasidagi ko\'prik'
  },
  {
    title_ru: 'ОАЭ —<br><span class="italic">Роскошь</span><br>и пустыня<br>контрастов',
    title_en: 'UAE —<br><span class="italic">Luxury</span><br>and a desert<br>of contrasts',
    title_uz: 'BAA —<br><span class="italic">Hashamat</span><br>va qarama-qarshiliklar<br>cho\'li'
  },
  {
    title_ru: 'Малайзия —<br><span class="italic">Азия в</span><br>миниатюре<br>и гармонии',
    title_en: 'Malaysia —<br><span class="italic">Asia in</span><br>miniature<br>and harmony',
    title_uz: 'Malayziya —<br><span class="italic">Miniatyuradagi</span><br>Osiyo<br>va uyg\'unlik'
  },
  {
    title_ru: 'Мальдивы —<br><span class="italic">Рай</span><br>на земле<br>и в океане',
    title_en: 'Maldives —<br><span class="italic">Paradise</span><br>on land<br>and in the ocean',
    title_uz: 'Maldiv orollari —<br><span class="italic">Yerda va</span><br>okeanda<br>jannat'
  }
];

/* ---------- SLIDER ---------- */
const slides = document.querySelectorAll('.slide');
const total = slides.length;
const currentNumEl = document.getElementById('currentNum');
const totalNumEl = document.getElementById('totalNum');
const dotsContainer = document.getElementById('dotsContainer');
const titleText = document.getElementById('titleText');

let currentIndex = 0;
let autoplayTimer;
const AUTOPLAY_DELAY = 6000;

const pad = (n) => String(n).padStart(2, '0');
totalNumEl.textContent = pad(total);

// Создать точки
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.dataset.index = i;
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function updateSlide() {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
  });

  let displayTitle = slideData[currentIndex].title_ru; // по умолчанию русский
if (isEng) displayTitle = slideData[currentIndex].title_en;
if (isUzb) displayTitle = slideData[currentIndex].title_uz;

titleText.innerHTML = displayTitle;
  currentNumEl.textContent = pad(currentIndex + 1);

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === currentIndex) {
      void dot.offsetWidth;
      dot.classList.add('active');
    }
  });
}

function goTo(index) {
  currentIndex = (index + total) % total;
  updateSlide();
  resetAutoplay();
}
function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

function resetAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
}

document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);

// Клавиатура
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

// Свайпы
let touchStartX = 0;
document.getElementById('slider').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('slider').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) next();
    else prev();
  }
});

// Старт
updateSlide();
resetAutoplay();





/* ============================================
     ФИЛЬТР ОТЗЫВОВ
  ============================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Активная кнопка
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.textContent.trim();

      reviewCards.forEach(card => {
        const tag = card.querySelector('.review-tag').textContent.trim();

        if (filter === 'Все' || filter === tag) {
          card.style.display = 'flex';
          // Плавное появление
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });




  /* ============================================
     АККОРДЕОН — ПЛАВНОЕ РАСКРЫТИЕ
  ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Закрыть все открытые (если хотите, чтобы открывался только один)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Переключить текущий
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });



  /* ============================================
     CTA-FORM
  ============================================ */
  document.querySelector('.cta-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.querySelector('.cta-input').value;
    alert(`Заявка отправлена!\nНомер: ${phone}\nМы свяжемся с вами в течение 15 минут.`);
  });



  