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

/* ============================================
   SHOW MORE — достопримечательности
============================================ */
const showMoreBtn = document.getElementById('showMoreBtn');
const hideBtn = document.getElementById('hideBtn');
const hiddenPlaces = document.querySelectorAll('.place-card.hidden');

showMoreBtn?.addEventListener('click', () => {
  hiddenPlaces.forEach((card, i) => {
    card.style.display = 'flex';
    card.animate(
      [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 400, delay: i * 25, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
    );
  });
  showMoreBtn.style.display = 'none';
  hideBtn.style.display = 'inline-block';
});

hideBtn?.addEventListener('click', () => {
  hiddenPlaces.forEach(card => card.style.display = 'none');
  hideBtn.style.display = 'none';
  showMoreBtn.style.display = 'inline-block';
  document.querySelector('.places')?.scrollIntoView({ behavior: 'smooth' });
});

/* ============================================
   FOOD — 33 блюда
============================================ */
// Определяем, на какой странице мы находимся
const isEng = window.location.pathname.includes('/eng/');
const isUzb = window.location.pathname.includes('/uzb/');
const dishes = [
  { 
    id:1, 
    name:'Бухарский плов', 
    name_en: 'Bukhara Pilaf', 
    name_uz: 'Buxoro palovi',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Ароматный рис с нежной курицей, золотистой морковью и нутом, томлённый в казане на открытом огне.', 
    desc_en: 'Aromatic rice with tender chicken, golden carrots, and chickpeas, slow-cooked in a cauldron over an open fire.',
    desc_uz: 'Ochiq olovda qozonda dimlangan, mayin tovuq go\'shti, oltin rang sabzi va no\'xat bilan xushbo\'y guruch.',
    full: 'Бухарский плов — это не просто блюдо, а настоящий символ гостеприимства и древних традиций. В отличие от классического самаркандского плова, здесь мясо (чаще курица или нут) не обжаривается до корочки, а томится вместе с рисом и овощами, приобретая невероятную нежность. Секрет кроется в особой технике приготовления: рис закладывается слоями, а зира и барбарис придают блюду тонкий, слегка пряный аромат. Подают его на больших блюдах, щедро посыпая свежей зеленью и запивая горячим зелёным чаем.', 
    full_en: 'Bukhara pilaf is not just a dish, but a true symbol of hospitality and ancient traditions. Unlike classic Samarkand pilaf, the meat (usually chicken or chickpeas) is not fried until crispy, but simmered together with rice and vegetables, becoming incredibly tender. The secret lies in a special cooking technique: rice is layered, and cumin and barberry give the dish a subtle, slightly spicy aroma. It is served on large platters, generously sprinkled with fresh herbs and accompanied by hot green tea.',
    full_uz: 'Buxoro palovi nafaqat taom, balki mehmondo\'stlik va qadimiy an\'analarning haqiqiy ramzidir. Klassik Samarqand palovidan farqli o\'laroq, bu yerda go\'sht (ko\'pincha tovuq yoki no\'xat) qizartirilmaydi, balki guruch va sabzavotlar bilan birga dimlanadi va nihoyatda mayin bo\'ladi. Sir maxsus pishirish texnikasida: guruch qatlamlarga solinadi, zira va barbaris taomga nozik, biroz achchiq hid beradi. U katta laganlarda, ko\'p miqdorda yangi ko\'katlar bilan sepilgan holda va issiq ko\'k choy bilan tortiladi.',
    tip: 'Обязательно попробуйте плов с маринованным луком и лепёшкой, только что из тандыра. И не стесняйтесь просить добавку — в Бухаре это признак того, что вы оценили старания хозяев!', 
    tip_en: 'Be sure to try the pilaf with pickled onions and fresh tandoor bread. And don\'t hesitate to ask for seconds — in Bukhara, this is a sign that you appreciated the hosts\' efforts!',
    tip_uz: 'Palovni tuzlangan piyoz va tandirdan yangi chiqqan non bilan tatib ko\'ring. Va qo\'shimcha so\'rashdan uyalmang — Buxoroda bu mezbonlarning mehnatini qadrlaganingiz belgisidir!',
    img:'/img/food/plov.webp' 
  },
  { 
    id:2, 
    name:'Шашлык', 
    name_en: 'Shashlik (Kebab)', 
    name_uz: 'Shashlik',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Сочные куски молодой баранины, маринованные в луке и специях, обжаренные на углях до идеальной корочки.', 
    desc_en: 'Juicy pieces of young lamb, marinated in onions and spices, grilled over coals to a perfect crust.',
    desc_uz: 'Piyoz va ziravorlarda marinadlangan, cho\'g\'da ideal qobiqqa qadar qovurilgan yosh qo\'zi go\'shtining sharbatli bo\'laklari.',
    full: 'Бухарский шашлык — это настоящий ритуал. Для него выбирают только молодую баранину (ягнятину), которую нарезают крупными кусками и маринуют в большом количестве лука, зиры и чёрного перца. Секрет кроется в угле — в Бухаре часто используют саксаул, который даёт особый, тонкий аромат дыма. Мясо нанизывают на шампуры и жарят над раскалёнными углями, постоянно переворачивая, чтобы сок остался внутри. Подают шашлык с лепёшкой, свежими овощами и, конечно, с маринованным луком, который нейтрализует жирность и добавляет пикантности.', 
    full_en: 'Bukhara shashlik is a true ritual. Only young lamb is chosen for it, cut into large pieces and marinated in a large amount of onions, cumin, and black pepper. The secret lies in the charcoal — Bukhara often uses saxaul, which gives a special, subtle smoky aroma. The meat is skewered and grilled over hot coals, constantly turning so the juice remains inside. Shashlik is served with flatbread, fresh vegetables, and, of course, pickled onions, which neutralize the fattiness and add piquancy.',
    full_uz: 'Buxoro shashligi haqiqiy marosimdir. Uning uchun faqat yosh qo\'zi go\'shti tanlanadi, u yirik bo\'laklarga kesiladi va ko\'p miqdorda piyoz, zira va qora qalampirda marinadlanadi. Sir cho\'g\'da — Buxoroda ko\'pincha saksovul ishlatiladi, bu maxsus, nozik tutun hidini beradi. Go\'sht sixlarga o\'tkaziladi va qizg\'in cho\'g\'da qovuriladi, sharbat ichkarida qolishi uchun doimiy ravishda aylantiriladi. Shashlik non, yangi sabzavotlar va, albatta, go\'shtning yog\'liligini yo\'qotadigan va achchiq ta\'m qo\'shadigan tuzlangan piyoz bilan tortiladi.',
    tip: 'Ешьте шашлык сразу, пока он горячий и сочный. Возьмите кусок мяса, положите на лепёшку, добавьте немного лука и заверните — получится идеальный «бухарский сэндвич»!', 
    tip_en: 'Eat the shashlik immediately while it is hot and juicy. Take a piece of meat, put it on a flatbread, add some onion and roll it up — you get the perfect "Bukhara sandwich"!',
    tip_uz: 'Shashlikni issiq va sharbatli bo\'lganda darhol iste\'mol qiling. Bir bo\'lak go\'sht oling, non ustiga qo\'ying, bir oz piyoz qo\'shing va o\'rab oling — siz mukammal "Buxoro sendvichi"ga ega bo\'lasiz!',
    img:'/img/food/shashlik.webp' 
  },
  { 
    id:3, 
    name:'Вагури', 
    name_en: 'Vaguri', 
    name_uz: 'Vaguri',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Мелко нарезанная баранина, томлённая в собственном соку с большим количеством лука и специй.', 
    desc_en: 'Finely chopped lamb, simmered in its own juices with a large amount of onions and spices.',
    desc_uz: 'Mayda to\'g\'ralgan qo\'zi go\'shti, ko\'p miqdorda piyoz va ziravorlar bilan o\'z sharbatida dimlangan.',
    full: 'Вагури — это старинное бухарское блюдо, которое готовят в каждом доме. Название происходит от способа приготовления: мясо мелко рубят (или режут мелкими кусочками) и тушат в казане вместе с луком, без добавления воды. Баранина выделяет достаточно сока, чтобы блюдо получилось невероятно насыщенным и ароматным. В конце добавляют зиру, чёрный перец и иногда курдючный жир для сытности. Подают вагури прямо в казане или на большом блюде, посыпав свежей зеленью. Это блюдо идеально сочетается с горячей лепёшкой, которой собирают вкуснейший мясной сок со дна.', 
    full_en: 'Vaguri is an ancient Bukhara dish prepared in every home. The name comes from the cooking method: the meat is finely chopped and stewed in a cauldron with onions, without adding water. The lamb releases enough juice to make the dish incredibly rich and aromatic. At the end, cumin, black pepper, and sometimes tail fat are added for richness. Vaguri is served directly in the cauldron or on a large platter, sprinkled with fresh herbs. This dish goes perfectly with hot flatbread, which is used to soak up the delicious meat juice from the bottom.',
    full_uz: 'Vaguri — har bir xonadonda tayyorlanadigan qadimiy Buxoro taomidir. Nomi pishirish usulidan kelib chiqqan: go\'sht mayda to\'g\'raladi va suv qo\'shmasdan piyoz bilan birga qozonda dimlanadi. Qo\'zi go\'shti taom nihoyatda to\'yimli va xushbo\'y bo\'lishi uchun yetarlicha sharbat chiqaradi. Oxirida zira, qora qalampir va ba\'zan to\'yimlilik uchun dumaloq yog\' qo\'shiladi. Vaguri to\'g\'ridan-to\'g\'ri qozonda yoki katta laganda, yangi ko\'katlar sepilgan holda tortiladi. Bu taom issiq non bilan juda yaxshi uyg\'unlashadi, u bilan tagidagi mazali go\'sht sharbati yig\'ib olinadi.',
    tip: 'Обязательно макайте свежую лепёшку в сок, который остался на дне — это самая вкусная часть блюда! И не забудьте запить всё это зелёным чаем.', 
    tip_en: 'Be sure to dip fresh flatbread into the juice left at the bottom — it is the most delicious part of the dish! And do not forget to wash it all down with green tea.',
    tip_uz: 'Yangi nonni idish tubida qolgan sharbatga botirishni unutmang — bu taomning eng mazali qismi! Va bularning barchasini ko\'k choy bilan yuvishni unutmang.',
    img:'/img/food/vaguri.webp' 
  },
  { 
    id:4, 
    name:'Тандыр-кабоб', 
    name_en: 'Tandir Kabob', 
    name_uz: 'Tandir kabob',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Сочная баранина, запечённая в раскалённом глиняном тандыре до хрустящей корочки.', 
    desc_en: 'Juicy lamb baked in a red-hot clay tandoor until crispy.',
    desc_uz: 'Qizg\'in loy tandirda qarsildoq qobiqqa qadar pishirilgan sharbatli qo\'zi go\'shti.',
    full: 'Тандыр-кабоб — это настоящее волшебство древней кулинарии. Кусочки молодой баранины, щедро приправленные зирой, солью и чёрным перцем, нанизывают на шампуры или специальные крюки и опускают в раскалённый глиняный тандыр. Мясо готовится в собственном соку, благодаря чему внутри оно остаётся невероятно нежным, а снаружи покрывается аппетитной, слегка обугленной корочкой. Секрет этого блюда — в особой температуре и глиняных стенах печи, которые отдают мясу тонкий древесный аромат. Подают его прямо с пылу с жару, накрыв лепёшкой, чтобы сохранить тепло.', 
    full_en: 'Tandir Kabob is true magic of ancient cuisine. Pieces of young lamb, generously seasoned with cumin, salt, and black pepper, are skewered or hooked and lowered into a red-hot clay tandoor. The meat is cooked in its own juices, making it incredibly tender inside, while the outside is covered with an appetizing, slightly charred crust. The secret of this dish lies in the special temperature and clay walls of the oven, which give the meat a subtle woody aroma. It is served piping hot, covered with flatbread to keep it warm.',
    full_uz: 'Tandir kabob — qadimiy oshpazlikning haqiqiy sehr-jodusi. Zira, tuz va qora qalampir bilan saxiylik bilan ziravorlangan yosh qo\'zi go\'shtining bo\'laklari sixlarga yoki maxsus ilgaklarga o\'tkaziladi va qizg\'in loy tandirga tushiriladi. Go\'sht o\'z sharbatida pishadi, shu tufayli ichkarida nihoyatda mayin bo\'lib qoladi, tashqarisi esa ishtahani ochuvchi, biroz kuygan qobiq bilan qoplanadi. Bu taomning siri — maxsus harorat va pechning loy devorlarida, ular go\'shtga nozik yog\'och hidini beradi. U to\'g\'ridan-to\'g\'ri qaynoq holda, issiqni saqlash uchun non bilan yopilgan holda tortiladi.',
    tip: 'Ешьте тандыр-кабоб руками, заворачивая горячие кусочки в свежую лепёшку вместе с маринованным луком — так вы почувствуете настоящий вкус Востока!', 
    tip_en: 'Eat tandir kabob with your hands, wrapping the hot pieces in fresh flatbread along with pickled onions — this way you will feel the true taste of the East!',
    tip_uz: 'Tandir kabobni qo\'llar bilan yeng, issiq bo\'laklarni tuzlangan piyoz bilan birga yangi nonga o\'rab — shunday qilib siz Sharqning haqiqiy ta\'mini his qilasiz!',
    img:'/img/food/tandir_kabob.webp' 
  },
  { 
    id:5, 
    name:'Казан-кабоб', 
    name_en: 'Kazan Kabob', 
    name_uz: 'Qozon kabob',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Сытное блюдо из нежной баранины, золотистого картофеля и лука, томлённое в казане.', 
    desc_en: 'A hearty dish of tender lamb, golden potatoes, and onions, slow-cooked in a cauldron.',
    desc_uz: 'Qozonda dimlangan mayin qo\'zi go\'shti, oltin rang kartoshka va piyozdan tayyorlangan to\'yimli taom.',
    full: 'Казан-кабоб — это настоящая классика узбекской кухни. В отличие от шашлыка, это блюдо готовится не на углях, а в толстостенном казане. Крупные куски баранины обжаривают до румяной корочки, затем добавляют картофель, морковь и лук. Всё это тушится под крышкой на медленном огне, пока мясо не станет мягким, а овощи не пропитаются мясным соком и ароматом специй. Секрет кроется в казане: он равномерно распределяет тепло, делая блюдо невероятно наваристым и ароматным. Это сытная еда для настоящих гурманов, которая согревает даже в самый прохладный вечер.', 
    full_en: 'Kazan Kabob is a true classic of Uzbek cuisine. Unlike shashlik, this dish is not cooked over coals, but in a thick-walled cauldron. Large pieces of lamb are fried until golden brown, then potatoes, carrots, and onions are added. All of this is stewed under a lid over low heat until the meat becomes tender and the vegetables are soaked in meat juice and the aroma of spices. The secret lies in the cauldron: it distributes heat evenly, making the dish incredibly rich and aromatic. This is hearty food for true gourmets that warms even on the coolest evening.',
    full_uz: 'Qozon kabob — o\'zbek oshxonasining haqiqiy klassikasi. Shashlikdan farqli o\'laroq, bu taom cho\'g\'da emas, balki qalin devorli qozonda tayyorlanadi. Qo\'zi go\'shtining yirik bo\'laklari qizg\'ish qobiqqa qadar qovuriladi, so\'ngra kartoshka, sabzi va piyoz qo\'shiladi. Bularning barchasi qopqoq ostida sekin olovda, go\'sht mayin bo\'lgunga va sabzavotlar go\'sht sharbati hamda ziravorlar hidiga to\'yingunga qadar dimlanadi. Sir qozonda: u issiqlikni teng taqsimlaydi, taomni nihoyatda to\'yimli va xushbo\'y qiladi. Bu haqiqiy gurmanlar uchun to\'yimli taom bo\'lib, eng salqin oqshomda ham isitadi.',
    tip: 'Обязательно ешьте казан-кабоб с горячей лепёшкой, макая её в густой соус на дне казана. И не забудьте про свежие овощи и зелень — они отлично дополняют вкус!', 
    tip_en: 'Be sure to eat Kazan Kabob with hot flatbread, dipping it into the thick sauce at the bottom of the cauldron. And do not forget about fresh vegetables and herbs — they perfectly complement the taste!',
    tip_uz: 'Qozon kabobni issiq non bilan yeng, uni qozon tubidagi quyuq sousga botirib. Va yangi sabzavotlar va ko\'katlar haqida unutmang — ular ta\'mni mukammal to\'ldiradi!',
    img:'/img/food/qozon_kabob.webp' 
  },
  { 
    id:6, 
    name:'Люля-кебаб', 
    name_en: 'Lula Kebab', 
    name_uz: 'Lula kabob',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Нежный шашлык из рубленой баранины с луком и специями, обжаренный на углях.', 
    desc_en: 'Tender minced lamb kebab with onions and spices, grilled over coals.',
    desc_uz: 'Piyoz va ziravorlar bilan maydalangan qo\'zi go\'shtidan tayyorlangan, cho\'g\'da qovurilgan mayin kabob.',
    full: 'Люля-кебаб — это блюдо, которое покоряет с первого кусочка. В отличие от классического шашлыка, здесь используется не цельное мясо, а рубленый фарш из молодой баранины. Секрет идеального кебаба кроется в правильном соотношении мяса и лука: лук добавляет сочности и не даёт фаршу пересохнуть на углях. Фарш нанизывают на широкие шампуры и жарят над раскалёнными углями, постоянно переворачивая до золотистой корочки. Подают люля-кебаб с тонким лавашом, свежими овощами и соусом, чтобы каждый мог завернуть его по своему вкусу.', 
    full_en: 'Lula Kebab is a dish that wins you over from the first bite. Unlike classic shashlik, it uses minced young lamb rather than whole meat. The secret to a perfect kebab lies in the correct ratio of meat to onion: the onion adds juiciness and prevents the minced meat from drying out over the coals. The minced meat is skewered on wide skewers and grilled over hot coals, constantly turning until golden brown. Lula kebab is served with thin lavash, fresh vegetables, and sauce so everyone can wrap it to their own taste.',
    full_uz: 'Lula kabob — birinchi luqmadayoq maftun etadigan taom. Klassik shashlikdan farqli o\'laroq, bu yerda butun go\'sht emas, balki yosh qo\'zi go\'shtidan tayyorlangan qiyma ishlatiladi. Ideal kabobning siri go\'sht va piyozning to\'g\'ri nisbatida: piyoz sharbatli qiladi va qiymaning cho\'g\'da qurib qolishiga yo\'l qo\'ymaydi. Qiyma keng sixlarga o\'tkaziladi va qizg\'in cho\'g\'da, oltin rang qobiqqa qadar doimiy aylantirib qovuriladi. Lula kabob yupqa lavash, yangi sabzavotlar va sous bilan tortiladi, shunda har kim uni o\'z didiga ko\'ra o\'rab yeyishi mumkin.',
    tip: 'Заверните горячий люля-кебаб в лаваш вместе с маринованным луком и зеленью — получится идеальный восточный стритфуд, который удобно есть на ходу!', 
    tip_en: 'Wrap the hot Lula Kebab in lavash along with pickled onions and herbs — you get the perfect Eastern street food that is convenient to eat on the go!',
    tip_uz: 'Issiq lula kabobni tuzlangan piyoz va ko\'katlar bilan birga lavashga o\'rang — siz yo\'lda yeyish uchun qulay bo\'lgan mukammal Sharq street-foodiga ega bo\'lasiz!',
    img:'/img/food/lula_kabob.webp' 
  },
  { 
    id:7, 
    name:'Жиз', 
    name_en: 'Jiz', 
    name_uz: 'Jiz',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Сочные кусочки баранины и курдючного жира, обжаренные до хрустящей корочки.', 
    desc_en: 'Juicy pieces of lamb and tail fat, fried until crispy.',
    desc_uz: 'Qarsildoq qobiqqa qadar qovurilgan qo\'zi go\'shti va dumaloq yog\'ning sharbatli bo\'laklari.',
    full: 'Жиз — это простое, но невероятно сытное и вкусное бухарское блюдо, которое готовят в каждом доме. В казане раскаляют курдючный жир, на котором затем обжаривают крупно нарезанную баранину до золотистой корочки. Добавляют много лука и специи (обычно зиру и чёрный перец), тушат до готовности. Благодаря тому, что мясо готовится в собственном соку и жире, оно получается очень нежным и ароматным. Это блюдо — настоящая «энергетическая бомба» для тех, кто ценит традиционную восточную кухню и не боится калорий.', 
    full_en: 'Jiz is a simple yet incredibly hearty and delicious Bukhara dish prepared in every home. Tail fat is heated in a cauldron, in which large pieces of lamb are then fried until golden brown. A lot of onions and spices (usually cumin and black pepper) are added, and it is stewed until cooked. Because the meat is cooked in its own juices and fat, it turns out very tender and aromatic. This dish is a true "energy bomb" for those who appreciate traditional Eastern cuisine and are not afraid of calories.',
    full_uz: 'Jiz — har bir xonadonda tayyorlanadigan oddiy, ammo nihoyatda to\'yimli va mazali Buxoro taomidir. Qozonda dumaloq yog\' qizdiriladi, so\'ngra unda yirik to\'g\'ralgan qo\'zi go\'shti oltin rang qobiqqa qadar qovuriladi. Ko\'p miqdorda piyoz va ziravorlar (odatda zira va qora qalampir) qo\'shiladi, tayyor bo\'lgunga qadar dimlanadi. Go\'sht o\'z sharbati va yog\'ida pishganligi tufayli u juda mayin va xushbo\'y bo\'ladi. Bu taom an\'anaviy Sharq oshxonasini qadrlaydigan va kaloriyalardan qo\'rqmaydiganlar uchun haqiqiy "energetik bomba"dir.',
    tip: 'Подавайте жиз с горячей лепёшкой, которая впитает в себя весь ароматный сок и жир. И обязательно заешьте это свежими овощами или зелёным чаем, чтобы сбалансировать вкус!', 
    tip_en: 'Serve Jiz with hot flatbread, which will absorb all the aromatic juice and fat. And be sure to eat it with fresh vegetables or green tea to balance the taste!',
    tip_uz: 'Jizni issiq non bilan torting, u barcha xushbo\'y sharbat va yog\'ni o\'ziga singdiradi. Va ta\'mni muvozanatlash uchun uni yangi sabzavotlar yoki ko\'k choy bilan iste\'mol qilishni unutmang!',
    img:'/img/food/jiz.webp' 
  },  
  { 
    id:8, 
    name:'Кефси', 
    name_en: 'Kefsi', 
    name_uz: 'Kefsi',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Хрустящая жареная курица в кляре, бухарский ответ фастфуду.', 
    desc_en: 'Crispy fried chicken in batter, Bukhara\'s answer to fast food.',
    desc_uz: 'Xamirda qovurilgan qarsildoq tovuq — Buxoroning fast-fudga javobi.',
    full: 'Кефси — это не традиционное блюдо старой Бухары, а современный местный фастфуд, который стал невероятно популярным. Название прочно ассоциируется с жареной курицей в хрустящей панировке или кляре, которую готовят в небольших кафе и закусочных по всему Узбекистану [citation:20][citation:23]. Это сытная и доступная еда, которую местные жители любят заказывать на вынос или перекусывать на ходу. В отличие от классических бухарских блюд, кефси не требует долгого томления в казане — его главное достоинство в быстроте приготовления и универсальности.', 
    full_en: 'Kefsi is not a traditional dish of old Bukhara, but a modern local fast food that has become incredibly popular. The name is strongly associated with fried chicken in a crispy breading or batter, prepared in small cafes and eateries across Uzbekistan. It is a hearty and affordable food that locals love to order for takeout or snack on the go. Unlike classic Bukhara dishes, Kefsi does not require long simmering in a cauldron — its main advantage is the speed of preparation and versatility.',
    full_uz: 'Kefsi — eski Buxoroning an\'anaviy taomi emas, balki butun O\'zbekiston bo\'ylab kichik kafelar va ovqatlanish shoxobchalarida tayyorlanadigan, nihoyatda mashhur bo\'lib ketgan zamonaviy mahalliy fast-fuddir. Nomi qarsildoq panirovkada yoki xamirda qovurilgan tovuq bilan chambarchas bog\'liq. Bu mahalliy aholi olib ketish uchun buyurtma berishni yoki yo\'lda gazak qilishni yaxshi ko\'radigan to\'yimli va hamyonbop taomdir. Klassik Buxoro taomlaridan farqli o\'laroq, Kefsi qozonda uzoq dimlashni talab qilmaydi — uning asosiy afzalligi tez tayyorlanishi va universalligidadir.',
    tip: 'Если вы хотите попробовать что-то максимально «местное», но не традиционное, возьмите кефси с собой и съешьте на ходу, как это делают сами бухарцы. И не забудьте про соус!', 
    tip_en: 'If you want to try something maximally "local" but not traditional, take Kefsi with you and eat it on the go, just like the Bukharans themselves do. And do not forget about the sauce!',
    tip_uz: 'Agar siz maksimal darajada "mahalliy", ammo an\'anaviy bo\'lmagan narsani tatib ko\'rishni istasangiz, Kefsini o\'zingiz bilan olib, xuddi buxoroliklar qilganidek yo\'lda iste\'mol qiling. Va sous haqida unutmang!',
    img:'/img/food/kefsi.webp' 
  },
  { 
    id:9, 
    name:'Куза-шурбо', 
    name_en: 'Kuza Shurbo', 
    name_uz: 'Ko\'za sho\'rva',
    category:'soups', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Наваристая шурпа из молодой баранины с овощами, томлённая и подаваемая в глиняном кувшине (куза).', 
    desc_en: 'Rich lamb soup with vegetables, slow-cooked and served in a clay jug (kuza).',
    desc_uz: 'Yosh qo\'zi go\'shti va sabzavotlardan tayyorlangan, loy ko\'zada dimlangan va tortiladigan to\'yimli sho\'rva.',
    full: 'Куза-шурбо — это не просто суп, а настоящий кулинарный ритуал. Баранину, картофель, морковь, помидоры и болгарский перец закладывают в глиняный кувшин (куза) и томят в тандыре или на углях. Благодаря глиняной посуде мясо получается невероятно мягким, а бульон — насыщенным, ароматным и прозрачным. Кувшин плотно закрывают лепёшкой, чтобы пар и запахи не уходили. Когда блюдо готово, лепёшку снимают, и она пропитана вкуснейшим мясным соком. Это блюдо согревает, насыщает и создаёт ощущение уюта.', 
    full_en: 'Kuza Shurbo is not just a soup, but a true culinary ritual. Lamb, potatoes, carrots, tomatoes, and bell peppers are placed in a clay jug (kuza) and simmered in a tandoor or over coals. Thanks to the clay vessel, the meat becomes incredibly tender, and the broth is rich, aromatic, and clear. The jug is tightly covered with flatbread so that steam and aromas do not escape. When the dish is ready, the flatbread is removed, and it is soaked with the most delicious meat juice. This dish warms, satiates, and creates a feeling of comfort.',
    full_uz: 'Ko\'za sho\'rva — nafaqat sho\'rva, balki haqiqiy oshpazlik marosimidir. Qo\'zi go\'shti, kartoshka, sabzi, pomidor va bulg\'or qalampiri loy ko\'zaga solinadi va tandirda yoki cho\'g\'da dimlanadi. Loy idish tufayli go\'sht nihoyatda mayin, bulon esa to\'yimli, xushbo\'y va tiniq bo\'ladi. Ko\'za bug\' va hidlar chiqmasligi uchun non bilan mahkam yopiladi. Taom tayyor bo\'lgach, non olinadi va u eng mazali go\'sht sharbatiga to\'yingan bo\'ladi. Bu taom isitadi, to\'ydiradi va qulaylik hissini yaratadi.',
    tip: 'Пейте бульон прямо из кувшина маленькими глотками, как это делают местные. А лепёшку, которой было накрыто блюдо, обязательно съешьте — она пропиталась вкусом шурпы!', 
    tip_en: 'Drink the broth directly from the jug in small sips, as the locals do. And be sure to eat the flatbread that covered the dish — it is soaked with the taste of shurbo!',
    tip_uz: 'Bulonni xuddi mahalliy aholi qilganidek, to\'g\'ridan-to\'g\'ri ko\'zadan kichik yutumlarda iching. Va taom yopilgan nonni albatta yeng — u sho\'rva ta\'miga to\'yingan!',
    img:'/img/food/kuza_shurbo.webp' 
  },  
  { 
    id:10, 
    name:'Лагман', 
    name_en: 'Lagman', 
    name_uz: 'Lag\'mon',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Домашняя тянутая лапша с насыщенной мясной подливой, овощами и ароматными специями.', 
    desc_en: 'Homemade hand-pulled noodles with rich meat sauce, vegetables, and aromatic spices.',
    desc_uz: 'Uyda tayyorlangan qo\'lda tortilgan ugra, to\'yimli go\'shtli qayla, sabzavotlar va xushbo\'y ziravorlar bilan.',
    full: 'Бухарский лагман — это настоящее произведение искусства. Секрет кроется в лапше: её не режут, а вручную тянут из теста, благодаря чему она получается невероятно упругой и эластичной. Пока лапша варится, в казане готовят густую подливу (ваджу) из нарезанной кусочками баранины, томатов, болгарского перца, моркови и зелени. В конце добавляют специи — зиру, барбарис и острый перец. Лагман подают в глубокой пиале, выкладывая лапшу и щедро заливая её подливой. Это блюдо объединяет в себе сытность второго блюда и согревающую силу супа.', 
    full_en: 'Bukhara Lagman is a true work of art. The secret lies in the noodles: they are not cut, but hand-pulled from the dough, making them incredibly firm and elastic. While the noodles are cooking, a thick sauce (vadja) is prepared in a cauldron from diced lamb, tomatoes, bell peppers, carrots, and herbs. At the end, spices are added — cumin, barberry, and hot pepper. Lagman is served in a deep bowl, with the noodles placed and generously poured over with the sauce. This dish combines the heartiness of a main course and the warming power of a soup.',
    full_uz: 'Buxoro lag\'moni haqiqiy san\'at asaridir. Sir ugrada: u kesilmaydi, balki xamirdan qo\'lda tortiladi, shu tufayli u nihoyatda qattiq va elastik bo\'ladi. Ugra qaynayotganda, qozonda bo\'laklarga kesilgan qo\'zi go\'shti, pomidor, bulg\'or qalampiri, sabzi va ko\'katlardan quyuq qayla (vadju) tayyorlanadi. Oxirida ziravorlar — zira, barbaris va achchiq qalampir qo\'shiladi. Lag\'mon chuqur kosada, ugra ustiga qo\'yilgan va saxiylik bilan qayla bilan quyilgan holda tortiladi. Bu taom ikkinchi taomning to\'yimliligini va sho\'rvaning isituvchi kuchini birlashtiradi.',
    tip: 'Обязательно добавьте в лагман немного острого перца и уксуса, чтобы подчеркнуть вкус подливы. И ешьте его горячим, пока лапша не остыла — так она сохранит свою упругость!', 
    tip_en: 'Be sure to add a little hot pepper and vinegar to the lagman to emphasize the taste of the sauce. And eat it hot while the noodles are still warm — this way they will retain their firmness!',
    tip_uz: 'Qayla ta\'mini ta\'kidlash uchun lag\'monga bir oz achchiq qalampir va sirka qo\'shishni unutmang. Va uni ugra sovib qolmasdan issiq holda yeng — shunda u o\'zining qattiqligini saqlab qoladi!',
    img:'/img/food/lagman.webp' 
  },  
  { 
    id:11, 
    name:'Манты', 
    name_en: 'Manti', 
    name_uz: 'Manti',
    category:['meaty', 'pastry'], 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Крупные и сочные паровые пельмени с рубленым мясом, луком и специями.', 
    desc_en: 'Large and juicy steamed dumplings with minced meat, onions, and spices.',
    desc_uz: 'Maydalangan go\'sht, piyoz va ziravorlar bilan to\'ldirilgan yirik va sharbatli bug\'langan chuchvaralar.',
    full: 'Манты — это одно из самых любимых и сытных блюд узбекской кухни. Тонкое, но прочное тесто защищает сочную начинку из мелко рубленой баранины (или говядины) с большим количеством лука от пара, благодаря чему внутри сохраняется невероятный бульон. Готовят их на специальной решётке (мантоварке) на пару, поэтому они получаются нежными и диетическими. В Бухаре манты часто делают с добавлением курдючного жира для особой сочности и подают, щедро посыпав чёрным перцем и свежей зеленью.', 
    full_en: 'Manti is one of the most beloved and hearty dishes of Uzbek cuisine. The thin but sturdy dough protects the juicy filling of finely chopped lamb (or beef) with a large amount of onion from the steam, which keeps an incredible broth inside. They are cooked on a special rack (mantovarka) over steam, making them tender and dietary. In Bukhara, manti is often made with the addition of tail fat for extra juiciness and served generously sprinkled with black pepper and fresh herbs.',
    full_uz: 'Manti — o\'zbek oshxonasining eng sevimli va to\'yimli taomlaridan biri. Yupqa, ammo mustahkam xamir mayda to\'g\'ralgan qo\'zi go\'shti (yoki mol go\'shti) va ko\'p miqdorda piyozdan tayyorlangan sharbatli ichlikni bug\'dan himoya qiladi, shu tufayli ichida ajoyib bulon saqlanib qoladi. Ular maxsus panjara (mantovarka)da bug\'da pishiriladi, shuning uchun mayin va parhezli bo\'ladi. Buxoroda manti ko\'pincha alohida sharbatlilik uchun dumaloq yog\' qo\'shib tayyorlanadi va qora qalampir hamda yangi ko\'katlar sepilgan holda tortiladi.',
    tip: 'Ешьте манты руками, аккуратно надкусывая, чтобы не обжечься горячим соком внутри. Обязательно подавайте их со сметаной, катыком или томатным соусом — это подчеркнёт вкус мяса!', 
    tip_en: 'Eat manti with your hands, carefully biting into them so as not to burn yourself with the hot juice inside. Be sure to serve them with sour cream, yogurt, or tomato sauce — this will emphasize the taste of the meat!',
    tip_uz: 'Mantini qo\'llar bilan yeng, ichidagi issiq sharbat bilan kuyib qolmaslik uchun ehtiyotkorlik bilan tishlab oling. Ularni albatta smetana, qatiq yoki pomidor sousi bilan torting — bu go\'sht ta\'mini ta\'kidlaydi!',
    img:'/img/food/mantu.webp' 
  },
  { 
    id:12, 
    name:'Пельмени', 
    name_en: 'Pelmeni', 
    name_uz: 'Pelmeni',
    category:['meaty', 'pastry'], 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Маленькие, аккуратные пельмени с сочной бараниной, отваренные в наваристом бульоне.', 
    desc_en: 'Small, neat dumplings with juicy lamb, boiled in a rich broth.',
    desc_uz: 'To\'yimli bulonda qaynatilgan, sharbatli qo\'zi go\'shti bilan kichik, chiroyli pelmenlar.',
    full: 'В Бухаре пельмени — это не просто еда, а уютное домашнее блюдо. В отличие от мантов, они гораздо меньше по размеру, а тесто для них раскатывают тоньше. Начинка обычно состоит из рубленой баранины с луком и специями. Их отваривают в подсоленной воде или мясном бульоне, а затем подают прямо в глубоких пиалах вместе с горячим бульоном. Это согревающее и невероятно вкусное блюдо, которое идеально подходит для прохладного вечера. В Бухаре пельмени часто подают с кислым молоком (катыком) и зеленью, что придаёт им освежающий вкус.', 
    full_en: 'In Bukhara, pelmeni is not just food, but a cozy homemade dish. Unlike manti, they are much smaller in size, and the dough for them is rolled out thinner. The filling usually consists of minced lamb with onions and spices. They are boiled in salted water or meat broth and then served right in deep bowls along with the hot broth. This is a warming and incredibly delicious dish that is perfect for a cool evening. In Bukhara, pelmeni is often served with sour milk (katyk) and herbs, which gives them a refreshing taste.',
    full_uz: 'Buxoroda pelmenlar nafaqat ovqat, balki shinam uy taomidir. Mantidan farqli o\'laroq, ular ancha kichikroq va ular uchun xamir yupqaroq yoyiladi. Ichlik odatda piyoz va ziravorlar bilan maydalangan qo\'zi go\'shtidan iborat. Ular tuzli suvda yoki go\'sht bulonida qaynatiladi, so\'ngra issiq bulon bilan birga chuqur kosalarda tortiladi. Bu isituvchi va nihoyatda mazali taom bo\'lib, salqin oqshom uchun juda mos keladi. Buxoroda pelmenlar ko\'pincha qatiq va ko\'katlar bilan tortiladi, bu ularga tetiklantiruvchi ta\'m beradi.',
    tip: 'Попробуйте добавить в бульон с пельменями немного чёрного перца и свежей кинзы. А если хотите по-бухарски — обмакните пельмень в катык, это раскроет вкус мяса с новой стороны!', 
    tip_en: 'Try adding a little black pepper and fresh cilantro to the broth with pelmeni. And if you want it the Bukhara way — dip the pelmeni in katyk, this will reveal the taste of the meat from a new side!',
    tip_uz: 'Pelmenli bulonga bir oz qora qalampir va yangi kashnich qo\'shib ko\'ring. Va agar Buxoro uslubida xohlasangiz — pelmenni qatiqqa botiring, bu go\'sht ta\'mini yangi tomondan ochib beradi!',
    img:'/img/food/pelmen.webp' 
  },
  { 
    id:13, 
    name:'Шурбо', 
    name_en: 'Shurbo', 
    name_uz: 'Sho\'rva',
    category:'soups', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Наваристый и ароматный суп из молодой баранины с крупно нарезанными овощами.', 
    desc_en: 'Rich and aromatic soup made from young lamb with coarsely chopped vegetables.',
    desc_uz: 'Yosh qo\'zi go\'shti va yirik to\'g\'ralgan sabzavotlardan tayyorlangan to\'yimli va xushbo\'y sho\'rva.',
    full: 'Шурбо — это классика узбекской кухни и, пожалуй, самый популярный суп в Бухаре. Его готовят в казане на медленном огне: крупные куски баранины (часто на косточке) варятся вместе с картофелем, морковью, помидорами и целыми головками лука. Секрет насыщенного вкуса кроется в длительном томлении — мясо становится невероятно мягким, а бульон приобретает глубокий, золотистый цвет. В конце добавляют зиру, свежую зелень и лавровый лист. Это сытное первое блюдо, которое согревает и восстанавливает силы.', 
    full_en: 'Shurbo is a classic of Uzbek cuisine and perhaps the most popular soup in Bukhara. It is cooked in a cauldron over low heat: large pieces of lamb (often on the bone) are boiled together with potatoes, carrots, tomatoes, and whole heads of onions. The secret of the rich taste lies in long simmering — the meat becomes incredibly tender, and the broth acquires a deep, golden color. At the end, cumin, fresh herbs, and bay leaf are added. This is a hearty first course that warms and restores strength.',
    full_uz: 'Sho\'rva — o\'zbek oshxonasining klassikasi va, ehtimol, Buxorodagi eng mashhur sho\'rvadir. U qozonda sekin olovda tayyorlanadi: qo\'zi go\'shtining yirik bo\'laklari (ko\'pincha suyakli) kartoshka, sabzi, pomidor va butun piyoz boshlari bilan birga qaynatiladi. To\'yimli ta\'mning siri uzoq dimlashda — go\'sht nihoyatda mayin bo\'ladi, bulon esa chuqur, oltin rangga ega bo\'ladi. Oxirida zira, yangi ko\'katlar va dafna yaprog\'i qo\'shiladi. Bu isituvchi va kuch-quvvatni tiklovchi to\'yimli birinchi taomdir.',
    tip: 'Обязательно ешьте шурбо с горячей лепёшкой, макая её в бульон. А если хотите почувствовать себя местным, после супа выпейте пиалу горячего зелёного чая — это идеальное завершение трапезы.', 
    tip_en: 'Be sure to eat shurbo with hot flatbread, dipping it into the broth. And if you want to feel like a local, drink a bowl of hot green tea after the soup — it is the perfect end to the meal.',
    tip_uz: 'Sho\'rvani issiq non bilan yeng, uni bulonga botirib. Va agar o\'zingizni mahalliy aholidek his qilishni istasangiz, sho\'rvadan keyin bir piyola issiq ko\'k choy iching — bu ovqatning mukammal yakuni.',
    img:'/img/food/shurbo.webp' 
  },
  { 
    id:14, 
    name:'Халиса', 
    name_en: 'Khalisa', 
    name_uz: 'Xalisa',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Густая, сытная каша из пшеницы и нежной баранины, томлённая до однородности.', 
    desc_en: 'Thick, hearty porridge made of wheat and tender lamb, simmered until homogeneous.',
    desc_uz: 'Bug\'doy va mayin qo\'zi go\'shtidan tayyorlangan, bir xil holatga kelguncha dimlangan quyuq, to\'yimli bo\'tqa.',
    full: 'Халиса — это древнее ритуальное блюдо, которое в Бухаре традиционно готовят на большие праздники, свадьбы и в месяц Рамадан. Секрет кроется в долгом приготовлении: цельные зёрна пшеницы (или пшеничная крупа) и баранину варят вместе несколько часов, пока мясо полностью не разойдётся на волокна, а каша не станет вязкой и однородной. Чтобы добиться нужной консистенции, её долго и тщательно перемешивают специальной деревянной толкушкой. В конце добавляют соль и специи. Это невероятно сытное и питательное блюдо, которое дарит чувство тепла и насыщения.', 
    full_en: 'Khalisa is an ancient ritual dish, traditionally prepared in Bukhara for major holidays, weddings, and during the month of Ramadan. The secret lies in the long cooking process: whole wheat grains (or wheat groats) and lamb are boiled together for several hours until the meat completely falls apart into fibers and the porridge becomes viscous and homogeneous. To achieve the desired consistency, it is stirred long and thoroughly with a special wooden pestle. At the end, salt and spices are added. This is an incredibly hearty and nutritious dish that gives a feeling of warmth and satiety.',
    full_uz: 'Xalisa — Buxoroda katta bayramlar, to\'ylar va Ramazon oyida an\'anaviy ravishda tayyorlanadigan qadimiy marosim taomidir. Sir uzoq pishirishda: butun bug\'doy donalari (yoki bug\'doy yormasi) va qo\'zi go\'shti go\'sht to\'liq tolalarga ajralib ketguncha va bo\'tqa quyuq hamda bir xil bo\'lguncha bir necha soat birga qaynatiladi. Kerakli konsistensiyaga erishish uchun u maxsus yog\'och to\'qmoq bilan uzoq va sinchkovlik bilan aralashtiriladi. Oxirida tuz va ziravorlar qo\'shiladi. Bu nihoyatda to\'yimli va ozuqaviy taom bo\'lib, issiqlik va to\'qlik hissini beradi.',
    tip: 'Подавайте халису горячей, щедро полив топлёным маслом или добавив кусочек курдючного жира. Сверху можно посыпать корицей или чёрным перцем — это добавит приятный аромат.', 
    tip_en: 'Serve khalisa hot, generously poured with melted butter or with a piece of tail fat added. You can sprinkle cinnamon or black pepper on top — this will add a pleasant aroma.',
    tip_uz: 'Xalisani issiq holda, saxiylik bilan eritilgan yog\' quyib yoki bir bo\'lak dumaloq yog\' qo\'shib torting. Ustiga dolchin yoki qora qalampir sepishingiz mumkin — bu yoqimli hid qo\'shadi.',
    img:'/img/food/halisa.webp' 
  },
  { 
    id:15, 
    name:'Хоним', 
    name_en: 'Khonim', 
    name_uz: 'Xonim',
    category:['meaty', 'pastry'], 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Рулет из тонкого теста с сочной начинкой из мяса и тыквы, приготовленный на пару.', 
    desc_en: 'A steamed roll made of thin dough with a juicy filling of meat and pumpkin.',
    desc_uz: 'Go\'sht va qovoqdan tayyorlangan sharbatli ichlik bilan yupqa xamirdan tayyorlangan bug\'langan rulet.',
    full: 'Хоним — это бухарский вариант парового рулета, который часто называют «ленивыми мантами». Тонко раскатанное тесто щедро смазывают фаршем из рубленой баранины, лука и жёлтой тыквы. Затем тесто сворачивают в плотный рулет, защипывают края и готовят на пару в мантоварке. Благодаря тыкве начинка получается невероятно сочной и сладковатой, что идеально оттеняет вкус мяса. Готовый рулет нарезают на порционные куски и подают, полив кисломолочным соусом. Это сытное и красивое блюдо, которое украсит любой дастархан.', 
    full_en: 'Khonim is a Bukhara version of a steamed roll, often called "lazy manti." Thinly rolled dough is generously spread with a filling of minced lamb, onions, and yellow pumpkin. Then the dough is rolled into a tight roll, the edges are sealed, and it is steamed in a mantovarka. Thanks to the pumpkin, the filling turns out incredibly juicy and slightly sweet, which perfectly sets off the taste of the meat. The finished roll is cut into portions and served poured over with a fermented milk sauce. This is a hearty and beautiful dish that will decorate any dastarkhan.',
    full_uz: 'Xonim — buxoro uslubidagi bug\'langan rulet bo\'lib, uni ko\'pincha "dangasa manti" deb atashadi. Yupqa yoyilgan xamir maydalangan qo\'zi go\'shti, piyoz va sariq qovoqdan tayyorlangan qiyma bilan saxiylik bilan surtiladi. So\'ngra xamir qalin ruletga o\'raladi, chetlari yopiladi va mantovarkada bug\'da pishiriladi. Qovoq tufayli ichlik nihoyatda sharbatli va biroz shirin bo\'ladi, bu go\'sht ta\'mini mukammal ta\'kidlaydi. Tayyor rulet porsiyalarga bo\'linadi va qatiqli sous quyib tortiladi. Bu to\'yimli va chiroyli taom har qanday dasturxonga ziynat beradi.',
    tip: 'Подавайте хоним с катыком (кислым молоком) или сметаной — это сбалансирует вкус и добавит свежести. Ешьте горячим, пока тесто не остыло!', 
    tip_en: 'Serve Khonim with katyk (sour milk) or sour cream — this will balance the taste and add freshness. Eat it hot while the dough is still warm!',
    tip_uz: 'Xonimni qatiq yoki smetana bilan torting — bu ta\'mni muvozanatlaydi va tetiklik qo\'shadi. Xamir sovib qolmasdan issiq holda yeng!',
    img:'/img/food/xonim.webp' 
  },
  { 
    id:16, 
    name:'Тухумбарак', 
    name_en: 'Tuhumbarak', 
    name_uz: 'Tuxumbarak',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Нежные рулетики из тонких яичных блинчиков с сочной мясной начинкой, приготовленные на пару.', 
    desc_en: 'Delicate rolls made of thin egg pancakes with juicy meat filling, steamed.',
    desc_uz: 'Sharbatli go\'shtli ichlik bilan yupqa tuxumli quymoqlardan tayyorlangan, bug\'da pishirilgan mayin ruletlar.',
    full: 'Тухумбарак — это необычное и очень вкусное бухарское блюдо, название которого переводится как «яичный барак» (от слова «тухум» — яйцо). В отличие от обычных мантов, тесто здесь заменяют тонкие яичные блинчики. На каждый блинчик выкладывают фарш из рубленой баранины с луком, сворачивают в аккуратный рулетик и готовят на пару. Благодаря яичной оболочке блюдо получается невероятно нежным, а внутри сохраняется весь мясной сок. Это изысканное угощение, которое часто готовят на праздники и семейные торжества.', 
    full_en: 'Tuhumbarak is an unusual and very tasty Bukhara dish, the name of which translates as "egg barak" (from the word "tuhum" — egg). Unlike regular manti, the dough here is replaced by thin egg pancakes. Minced lamb with onions is placed on each pancake, rolled into a neat roll, and steamed. Thanks to the egg shell, the dish turns out incredibly tender, and all the meat juice is preserved inside. This is an exquisite treat that is often prepared for holidays and family celebrations.',
    full_uz: 'Tuxumbarak — nomi "tuxum barak" (tuxum so\'zidan) deb tarjima qilinadigan g\'ayrioddiy va juda mazali Buxoro taomidir. Oddiy mantidan farqli o\'laroq, bu yerda xamir o\'rnini yupqa tuxumli quymoqlar egallaydi. Har bir quymoqqa piyoz bilan maydalangan qo\'zi go\'shti qiymasi qo\'yiladi, chiroyli ruletga o\'raladi va bug\'da pishiriladi. Tuxum qobig\'i tufayli taom nihoyatda mayin bo\'ladi va ichida barcha go\'sht sharbati saqlanib qoladi. Bu bayramlar va oilaviy tantanalar uchun tez-tez tayyorlanadigan nafis taomdir.',
    tip: 'Подавайте тухумбарак горячим, щедро полив сметаной или катыком. Сверху можно посыпать свежей зеленью укропа или кинзы — это добавит блюду яркости и свежести!', 
    tip_en: 'Serve Tuhumbarak hot, generously poured with sour cream or katyk. You can sprinkle fresh dill or cilantro on top — this will add brightness and freshness to the dish!',
    tip_uz: 'Tuxumbarakni issiq holda, saxiylik bilan smetana yoki qatiq quyib torting. Ustiga yangi ukrop yoki kashnich ko\'katlarini sepishingiz mumkin — bu taomga yorqinlik va tetiklik qo\'shadi!',
    img:'/img/food/tuxumbarak.webp' 
  },
  { 
    id:17, 
    name:'Самса', 
    name_en: 'Samsa', 
    name_uz: 'Somsa',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Хрустящие треугольные пирожки из слоёного теста с сочной бараниной и луком, выпеченные в тандыре.', 
    desc_en: 'Crispy triangular pastries made of puff pastry with juicy lamb and onion, baked in a tandoor.',
    desc_uz: 'Tandirda pishirilgan, sharbatli qo\'zi go\'shti va piyozli, qatlamali xamirdan tayyorlangan qarsildoq uchburchak somsalar.',
    full: 'Бухарская самса — это настоящий символ уличной еды и гостеприимства. В отличие от других регионов, здесь её лепят небольшими, аккуратными треугольниками, а тесто раскатывают очень тонко, чтобы оно стало хрустящим. Начинка состоит из мелко рубленой баранины, большого количества лука и курдючного жира — именно жир делает самсу невероятно сочной. Выпекают её, прилепив к раскалённым глиняным стенкам тандыра. Благодаря этому тесто приобретает лёгкий дымный аромат, а внутри образуется горячий бульон. Это идеальный перекус, который можно взять с собой.', 
    full_en: 'Bukhara samsa is a true symbol of street food and hospitality. Unlike other regions, here it is molded into small, neat triangles, and the dough is rolled out very thinly so it becomes crispy. The filling consists of finely chopped lamb, a large amount of onion, and tail fat — it is the fat that makes samsa incredibly juicy. It is baked by sticking it to the hot clay walls of the tandoor. Thanks to this, the dough acquires a light smoky aroma, and hot broth forms inside. It is an ideal snack to take with you.',
    full_uz: 'Buxoro somsasi ko\'cha taomlari va mehmondo\'stlikning haqiqiy ramzidir. Boshqa hududlardan farqli o\'laroq, bu yerda u kichik, chiroyli uchburchaklar shaklida yasaladi va xamir qarsildoq bo\'lishi uchun juda yupqa yoyiladi. Ichidagi qiyma mayda to\'g\'ralgan qo\'zi go\'shti, ko\'p miqdorda piyoz va dumaloq yog\'dan iborat — aynan yog\' somsani nihoyatda sharbatli qiladi. U tandirning qizg\'in loy devorlariga yopishtirib pishiriladi. Shu tufayli xamir engil tutun hidiga ega bo\'ladi va ichida issiq bulon hosil bo\'ladi. Bu o\'zingiz bilan olib ketish uchun ideal gazak.',
    tip: 'Покупайте самсу только в местах, где её достают прямо из тандыра. Обязательно возьмите салфетку — сок внутри очень горячий! И не стесняйтесь просить самсу с пылу с жару — это самый вкусный вариант.', 
    tip_en: 'Buy samsa only from places where it is taken directly from the tandoor. Be sure to take a napkin — the juice inside is very hot! And do not hesitate to ask for freshly baked samsa — it is the most delicious option.',
    tip_uz: 'Somsani faqat tandirdan chiqqan joylardan sotib oling. Albatta salfetka oling — ichidagi sharbat juda issiq! Va qaynoq somsa so\'rashdan uyalmang — bu eng mazali variant.',
    img:'/img/food/samsa.webp' 
  },
  { 
    id:18, 
    name:'Атола', 
    name_en: 'Atola', 
    name_uz: 'Atola',
    category:'soups', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Густая, согревающая каша из просеянной муки, сваренная на молоке или воде.', 
    desc_en: 'Thick, warming porridge made from sifted flour, cooked in milk or water.',
    desc_uz: 'Elangan undan tayyorlangan, sut yoki suvda qaynatilgan quyuq, isituvchi bo\'tqa.',
    full: 'Атола — это древнее традиционное блюдо, которое в Бухаре готовят в холодное время года или во время поста. Это невероятно простая, но сытная каша, основа которой — мелко просеянная пшеничная мука. Её медленно варят, постоянно помешивая, на молоке (или воде), пока она не станет гладкой и шелковистой. Секрет кроется в идеальной консистенции: она должна быть не слишком жидкой, но и не крутой. Атолу часто подают с топлёным маслом, которое тает и создаёт на поверхности аппетитные золотистые лужицы. Это блюдо дарит невероятное чувство уюта и тепла.', 
    full_en: 'Atola is an ancient traditional dish prepared in Bukhara during the cold season or fasting. It is an incredibly simple but hearty porridge, the base of which is finely sifted wheat flour. It is slowly boiled, stirring constantly, in milk (or water) until it becomes smooth and silky. The secret lies in the perfect consistency: it should not be too liquid, but not too thick either. Atola is often served with melted butter, which melts and creates appetizing golden pools on the surface. This dish gives an incredible feeling of comfort and warmth.',
    full_uz: 'Atola — Buxoroda sovuq mavsumda yoki ro\'za paytida tayyorlanadigan qadimiy an\'anaviy taomdir. Bu nihoyatda oddiy, ammo to\'yimli bo\'tqa bo\'lib, uning asosini mayda elangan bug\'doy uni tashkil etadi. U silliq va ipakdek bo\'lgunga qadar sutda (yoki suvda) doimiy aralashtirib, sekin qaynatiladi. Sir ideal konsistensiyada: u juda suyuq ham, juda quyuq ham bo\'lmasligi kerak. Atolani ko\'pincha eritilgan yog\' bilan tortishadi, u erib, sirtda ishtahani ochuvchi oltin rang ko\'lmaklar hosil qiladi. Bu taom ajoyib qulaylik va iliqlik hissini beradi.',
    tip: 'Обязательно добавьте в горячую атолу кусочек сливочного или топлёного масла и немного сахара (или мёда). Ешьте её медленно, маленькой ложкой, наслаждаясь каждым глотком!', 
    tip_en: 'Be sure to add a piece of butter or melted butter and a little sugar (or honey) to the hot atola. Eat it slowly, with a small spoon, enjoying every sip!',
    tip_uz: 'Issiq atolaga bir bo\'lak sariyog\' yoki eritilgan yog\' va bir oz shakar (yoki asal) qo\'shishni unutmang. Uni sekin, kichik qoshiq bilan, har bir yutimdan zavqlanib yeng!',
    img:'/img/food/atola.webp' 
  },
  { 
    id:19, 
    name:'Чакка-чулоп', 
    name_en: 'Chakka-Chulop', 
    name_uz: 'Chakka-chulop',
    category:'soups', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Прозрачный, наваристый мясной бульон с нежными кусочками баранины и домашней лапшой.', 
    desc_en: 'Clear, rich meat broth with tender pieces of lamb and homemade noodles.',
    desc_uz: 'Mayin qo\'zi go\'shti bo\'laklari va uy ugra bilan tiniq, to\'yimli go\'sht buloni.',
    full: 'Чакка-чулоп — это традиционный бухарский суп, который в давние времена готовили пастухи и путники. Название происходит от способа нарезки: мясо и тесто для лапши режут очень мелко, практически «в крошку» (от слова «чакка» — мелочь). Баранину долго варят на медленном огне, чтобы бульон получился насыщенным и прозрачным, а затем добавляют тонкую домашнюю лапшу и зелень. Часто в бульон добавляют курдючный жир для особой сытности. Это блюдо невероятно согревает, восстанавливает силы и дарит ощущение домашнего тепла.', 
    full_en: 'Chakka-Chulop is a traditional Bukhara soup that was prepared by shepherds and travelers in ancient times. The name comes from the cutting method: meat and noodle dough are cut very finely, almost "into crumbs" (from the word "chakka" — small thing). The lamb is boiled for a long time over low heat so that the broth turns out rich and clear, and then thin homemade noodles and herbs are added. Often tail fat is added to the broth for extra richness. This dish incredibly warms, restores strength, and gives a feeling of home warmth.',
    full_uz: 'Chakka-chulop — qadimda cho\'ponlar va yo\'lovchilar tomonidan tayyorlangan an\'anaviy Buxoro sho\'rvasidir. Nomi kesish usulidan kelib chiqqan: go\'sht va ugra uchun xamir juda mayda, deyarli "maydalab" kesiladi ("chakka" so\'zidan — mayda narsa). Bulon to\'yimli va tiniq bo\'lishi uchun qo\'zi go\'shti uzoq vaqt sekin olovda qaynatiladi, so\'ngra yupqa uy ugrasi va ko\'katlar qo\'shiladi. Ko\'pincha alohida to\'yimlilik uchun bulonga dumaloq yog\' qo\'shiladi. Bu taom nihoyatda isitadi, kuch-quvvatni tiklaydi va uy iliqligi hissini beradi.',
    tip: 'Пейте чакка-чулоп очень горячим, прямо из пиалы. Если хотите сделать вкус ярче, добавьте щепотку чёрного перца и свежую зелень. И обязательно заешьте лепёшкой!', 
    tip_en: 'Drink Chakka-Chulop very hot, straight from the bowl. If you want to make the taste brighter, add a pinch of black pepper and fresh herbs. And be sure to eat it with flatbread!',
    tip_uz: 'Chakka-chulopni juda issiq holda, to\'g\'ridan-to\'g\'ri kosadan iching. Agar ta\'mni yorqinroq qilishni istasangiz, bir chimdim qora qalampir va yangi ko\'katlar qo\'shing. Va albatta non bilan iste\'mol qiling!',
    img:'/img/food/chakka_chulop.webp' 
  },
  { 
    id:20, 
    name:'Чебурек', 
    name_en: 'Cheburek', 
    name_uz: 'Cheburek',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Хрустящий пирожок из тончайшего теста с сочной мясной начинкой, обжаренный в масле.', 
    desc_en: 'Crispy turnover made of the thinnest dough with juicy meat filling, deep-fried.',
    desc_uz: 'Eng yupqa xamirdan tayyorlangan, sharbatli go\'shtli ichlik bilan yog\'da qovurilgan qarsildoq pirog.',
    full: 'Чебурек — это любимый многими фастфуд, который в Бухаре готовят с особым мастерством. Секрет идеального чебурека — в очень тонком тесте, через которое просвечивает начинка. Внутрь кладут рубленую баранину с луком и специями, а иногда добавляют немного бульона или жира, чтобы при жарке внутри образовался горячий сок. Жарят чебуреки в большом количестве раскалённого масла, поэтому они получаются золотистыми, пузырчатыми и невероятно хрустящими. Это блюдо нужно есть сразу, пока оно горячее, чтобы насладиться контрастом хрустящей корочки и сочной начинки.', 
    full_en: 'Cheburek is a fast food loved by many, which is prepared with special skill in Bukhara. The secret of a perfect cheburek is in a very thin dough through which the filling shines through. Minced lamb with onions and spices is placed inside, and sometimes a little broth or fat is added so that hot juice forms inside during frying. Chebureks are fried in a large amount of hot oil, so they turn out golden, bubbly, and incredibly crispy. This dish should be eaten immediately while it is hot to enjoy the contrast of the crispy crust and juicy filling.',
    full_uz: 'Cheburek — ko\'pchilik sevadigan fast-fud bo\'lib, Buxoroda alohida mahorat bilan tayyorlanadi. Ideal cheburekning siri juda yupqa xamirda, u orqali ichlik ko\'rinib turadi. Ichiga piyoz va ziravorlar bilan maydalangan qo\'zi go\'shti solinadi, ba\'zan qovurish paytida ichida issiq sharbat hosil bo\'lishi uchun bir oz bulon yoki yog\' qo\'shiladi. Chebureklar ko\'p miqdorda qizg\'in yog\'da qovuriladi, shuning uchun ular oltin rang, pufakchali va nihoyatda qarsildoq bo\'ladi. Bu taomni qarsildoq qobiq va sharbatli ichlik kontrastidan zavqlanish uchun issiqligida darhol iste\'mol qilish kerak.',
    tip: 'Возьмите чебурек в руки, аккуратно надкусите сбоку, чтобы выпустить горячий пар, и только потом ешьте. И будьте осторожны — сок внутри очень горячий, но именно в нём весь вкус!', 
    tip_en: 'Take the cheburek in your hands, carefully bite into the side to release the hot steam, and only then eat it. And be careful — the juice inside is very hot, but that is where all the flavor is!',
    tip_uz: 'Cheburekni qo\'lingizga oling, issiq bug\'ni chiqarish uchun yon tomondan ehtiyotkorlik bilan tishlab oling va shundan keyingina yeng. Va ehtiyot bo\'ling — ichidagi sharbat juda issiq, lekin butun ta\'m aynan shunda!',
    img:'/img/food/cheburek.webp' 
  },
  { 
    id:21, 
    name:'Чучвара', 
    name_en: 'Chuchvara', 
    name_uz: 'Chuchvara',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Маленькие, аккуратные пельмени с бараниной, которые подают в ароматном бульоне с зеленью.', 
    desc_en: 'Small, neat dumplings with lamb, served in aromatic broth with herbs.',
    desc_uz: 'Ko\'katlar bilan xushbo\'y bulonda tortiladigan, qo\'zi go\'shti bilan kichik, chiroyli chuchvaralar.',
    full: 'Чучвара — это бухарский вариант классических пельменей, но с своими особенностями. Тесто раскатывают очень тонко, а начинку делают из мелко рубленой баранины с луком, чтобы она была максимально сочной. Чучвару отваривают в подсоленном бульоне, а затем подают в глубоких пиалах вместе с горячим бульоном, щедро посыпав свежей зеленью. В Бухаре это блюдо часто подают на завтрак или в холодное время года, так как оно отлично согревает и насыщает. Это невероятно уютная и домашняя еда, которая объединяет в себе вкус супа и второго блюда.', 
    full_en: 'Chuchvara is a Bukhara version of classic dumplings, but with its own peculiarities. The dough is rolled out very thinly, and the filling is made of finely chopped lamb with onions to make it as juicy as possible. Chuchvara is boiled in salted broth and then served in deep bowls along with hot broth, generously sprinkled with fresh herbs. In Bukhara, this dish is often served for breakfast or during the cold season, as it warms and satiates perfectly. It is an incredibly cozy and homemade food that combines the taste of soup and a main course.',
    full_uz: 'Chuchvara — klassik pelmenlarning Buxoro varianti, ammo o\'ziga xos xususiyatlarga ega. Xamir juda yupqa yoyiladi, ichlik esa iloji boricha sharbatli bo\'lishi uchun mayda to\'g\'ralgan qo\'zi go\'shti va piyozdan tayyorlanadi. Chuchvara tuzli bulonda qaynatiladi, so\'ngra issiq bulon bilan birga chuqur kosalarda, saxiylik bilan yangi ko\'katlar sepilgan holda tortiladi. Buxoroda bu taom ko\'pincha nonushta uchun yoki sovuq mavsumda tortiladi, chunki u mukammal isitadi va to\'ydiradi. Bu sho\'rva va ikkinchi taom ta\'mini birlashtirgan nihoyatda shinam va uy taomidir.',
    tip: 'Попробуйте добавить в бульон с чучварой ложку катыка (кислого молока) — это придаст блюду нежную кислинку и сделает вкус ещё более ярким. И обязательно ешьте его горячим, пока тесто не размякло!', 
    tip_en: 'Try adding a spoonful of katyk (sour milk) to the broth with chuchvara — this will give the dish a delicate sourness and make the taste even brighter. And be sure to eat it hot while the dough has not softened!',
    tip_uz: 'Chuchvarali bulonga bir qoshiq qatiq qo\'shib ko\'ring — bu taomga nozik nordon ta\'m beradi va ta\'mni yanada yorqinroq qiladi. Va xamir yumshab qolmasdan uni issiq holda iste\'mol qilishni unutmang!',
    img:'/img/food/chuchvara.webp' 
  },
  { 
    id:22, 
    name:'Дулма', 
    name_en: 'Dulma', 
    name_uz: 'Do\'lma',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Сочные голубцы в виноградных листьях с начинкой из рубленой баранины, риса и специй.', 
    desc_en: 'Juicy stuffed grape leaves with a filling of minced lamb, rice, and spices.',
    desc_uz: 'Maydalangan qo\'zi go\'shti, guruch va ziravorlardan tayyorlangan ichlik bilan sharbatli uzum barglari.',
    full: 'Дулма — это бухарский вариант долмы, которую готовят из молодых виноградных листьев. Начинку делают из мелко рубленой баранины, риса, лука и большого количества свежей зелени. Листья винограда придают блюду лёгкую кислинку и тонкий аромат. Дулму аккуратно сворачивают в небольшие конвертики и томят в казане на медленном огне, часто вместе с костями или рёбрышками для наваристости. Это изысканное и очень сытное блюдо, которое в Бухаре традиционно готовят весной и летом, когда виноградные листья особенно нежные.', 
    full_en: 'Dulma is a Bukhara version of dolma, made from young grape leaves. The filling is made of finely chopped lamb, rice, onions, and a large amount of fresh herbs. Grape leaves give the dish a slight sourness and a subtle aroma. Dulma is carefully rolled into small envelopes and simmered in a cauldron over low heat, often together with bones or ribs for richness. This is an exquisite and very hearty dish, traditionally prepared in Bukhara in spring and summer when grape leaves are especially tender.',
    full_uz: 'Do\'lma — yosh uzum barglaridan tayyorlanadigan dolmaning Buxoro variantidir. Ichlik mayda to\'g\'ralgan qo\'zi go\'shti, guruch, piyoz va ko\'p miqdorda yangi ko\'katlardan tayyorlanadi. Uzum barglari taomga engil nordon ta\'m va nozik hid beradi. Do\'lma chiroyli kichik konvertlarga o\'raladi va qozonda sekin olovda, ko\'pincha to\'yimlilik uchun suyaklar yoki qovurg\'alar bilan birga dimlanadi. Bu nafis va juda to\'yimli taom bo\'lib, Buxoroda an\'anaviy ravishda bahor va yozda, uzum barglari ayniqsa mayin bo\'lganda tayyorlanadi.',
    tip: 'Подавайте дулму с катыком или сметаной — кисломолочный вкус идеально балансирует жирность баранины. И не выбрасывайте бульон, в котором она тушилась: полейте им голубцы, это самая вкусная часть блюда!', 
    tip_en: 'Serve dulma with katyk or sour cream — the fermented milk taste perfectly balances the fattiness of the lamb. And do not throw away the broth in which it was stewed: pour it over the stuffed leaves, this is the most delicious part of the dish!',
    tip_uz: 'Do\'lmani qatiq yoki smetana bilan torting — achitilgan sut ta\'mi qo\'zi go\'shtining yog\'liligini mukammal muvozanatlaydi. Va u dimlangan bulonni to\'kmang: uni do\'lma ustiga quying, bu taomning eng mazali qismi!',
    img:'/img/food/dulma.webp' 
  },
  { 
    id:23, 
    name:'Чакка', 
    name_en: 'Chakka', 
    name_uz: 'Chakka',
    category:'dairy', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Густой, освежающий кисломолочный продукт, похожий на густой йогурт или сметану.', 
    desc_en: 'Thick, refreshing fermented milk product, similar to thick yogurt or sour cream.',
    desc_uz: 'Quyuq yogurt yoki smetanaga o\'xshash quyuq, tetiklantiruvchi achitilgan sut mahsuloti.',
    full: 'Чакка — это традиционный бухарский кисломолочный продукт, который готовят из натурального молока путём сквашивания. По консистенции она напоминает очень густой йогурт или жирную сметану, а на вкус — слегка кисловатая и невероятно освежающая. В Бухаре чакку часто подают к плову, мантам или просто едят с горячей лепёшкой на завтрак. Она отлично утоляет жажду, нормализует пищеварение и придаёт блюдам нежную сливочную текстуру. Это настоящий символ домашней кухни и гостеприимства.', 
    full_en: 'Chakka is a traditional Bukhara fermented milk product made from natural milk by souring. In consistency, it resembles very thick yogurt or rich sour cream, and in taste, it is slightly sour and incredibly refreshing. In Bukhara, chakka is often served with pilaf, manti, or simply eaten with hot flatbread for breakfast. It perfectly quenches thirst, normalizes digestion, and gives dishes a delicate creamy texture. It is a true symbol of home cooking and hospitality.',
    full_uz: 'Chakka — tabiiy sutni achitish orqali tayyorlanadigan an\'anaviy Buxoro achitilgan sut mahsulotidir. Konsistensiyasi bo\'yicha u juda quyuq yogurt yoki yog\'li smetanaga o\'xshaydi, ta\'mi bo\'yicha esa biroz nordon va nihoyatda tetiklantiruvchidir. Buxoroda chakka ko\'pincha palov, manti bilan tortiladi yoki shunchaki nonushta uchun issiq non bilan iste\'mol qilinadi. U chanqoqni mukammal qondiradi, ovqat hazm qilishni normallashtiradi va taomlarga mayin qaymoqli tekstura beradi. Bu uy oshxonasi va mehmondo\'stlikning haqiqiy ramzidir.',
    tip: 'Попробуйте намазать чакку на свежую лепёшку и посыпать щепоткой соли или сахара — это самый простой и вкусный бухарский перекус. А если добавите её к горячему плову, она идеально сбалансирует жирность мяса!', 
    tip_en: 'Try spreading chakka on fresh flatbread and sprinkling it with a pinch of salt or sugar — this is the simplest and most delicious Bukhara snack. And if you add it to hot pilaf, it will perfectly balance the fattiness of the meat!',
    tip_uz: 'Chakkаni yangi nonga surtib, bir chimdim tuz yoki shakar sepib ko\'ring — bu eng oddiy va mazali Buxoro gazagi. Va agar uni issiq palovga qo\'shsangiz, u go\'shtning yog\'liligini mukammal muvozanatlaydi!',
    img:'/img/food/chakka.webp' 
  },
  { 
    id:24, 
    name:'Катлама', 
    name_en: 'Katlama', 
    name_uz: 'Qatlama',
    category:'pastry', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Слоёная лепёшка, обжаренная на масле до золотистой хрустящей корочки.', 
    desc_en: 'Layered flatbread fried in oil until golden and crispy.',
    desc_uz: 'Oltin rang qarsildoq qobiqqa qadar yog\'da qovurilgan qatlamali non.',
    full: 'Катлама — это традиционная узбекская лепёшка, которую готовят из тонко раскатанного теста, смазанного маслом (часто курдючным жиром или сливочным маслом) и свёрнутого в рулет. Затем рулет нарезают на куски и обжаривают на раскалённой сковороде или в казане. Благодаря такой технике катлама получается слоёной, воздушной и невероятно хрустящей снаружи, оставаясь мягкой внутри. В Бухаре её часто подают к чаю, супам или просто как самостоятельный перекус. Это сытная и очень вкусная выпечка, которая отлично дополняет любой приём пищи.', 
    full_en: 'Katlama is a traditional Uzbek flatbread made from thinly rolled dough greased with oil (often tail fat or butter) and rolled into a roll. Then the roll is cut into pieces and fried in a hot frying pan or cauldron. Thanks to this technique, katlama turns out layered, airy, and incredibly crispy on the outside while remaining soft inside. In Bukhara, it is often served with tea, soups, or simply as an independent snack. It is a hearty and very tasty pastry that perfectly complements any meal.',
    full_uz: 'Qatlama — yupqa yoyilgan, yog\' (ko\'pincha dumaloq yog\' yoki sariyog\') bilan surtilgan va ruletga o\'ralgan xamirdan tayyorlanadigan an\'anaviy o\'zbek nonidir. So\'ngra rulet bo\'laklarga kesiladi va qizg\'in tovada yoki qozonda qovuriladi. Bu texnika tufayli qatlama qatlamali, havodor va tashqarisi nihoyatda qarsildoq bo\'lib, ichkarisi yumshoq qoladi. Buxoroda u ko\'pincha choy, sho\'rvalar bilan yoki shunchaki mustaqil gazak sifatida tortiladi. Bu to\'yimli va juda mazali pishiriq bo\'lib, har qanday ovqatni mukammal to\'ldiradi.',
    tip: 'Ешьте катламу горячей, пока она хрустит! Можно намазать её сливочным маслом, сметаной или чаккой — получится идеальный бухарский завтрак. И обязательно запивайте её горячим зелёным чаем.', 
    tip_en: 'Eat katlama hot while it is crispy! You can spread it with butter, sour cream, or chakka — you get the perfect Bukhara breakfast. And be sure to wash it down with hot green tea.',
    tip_uz: 'Qatlamani qarsillab turganda issiq holda yeng! Uni sariyog\', smetana yoki chakka bilan surtishingiz mumkin — mukammal Buxoro nonushtasiga ega bo\'lasiz. Va uni albatta issiq ko\'k choy bilan yuvishni unutmang.',
    img:'/img/food/qatlama.webp' 
  },
  { 
    id:25, 
    name:'Каймак', 
    name_en: 'Kaymak', 
    name_uz: 'Qaymoq',
    category:'dairy', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Густые, нежные топлёные сливки с тонким сливочным ароматом, которые подают к чаю и лепёшкам.', 
    desc_en: 'Thick, tender clotted cream with a delicate creamy aroma, served with tea and flatbread.',
    desc_uz: 'Choy va non bilan tortiladigan, nozik qaymoqli hidli quyuq, mayin qaynatilgan qaymoq.',
    full: 'Каймак — это традиционный молочный деликатес, который в Бухаре готовят путём длительного томления свежего молока или сливок. В процессе нагрева на поверхности образуется плотная, румяная пенка, которую аккуратно снимают и собирают слоями. Именно эта пенка и есть каймак — она получается невероятно нежной, слегка сладковатой и тающей во рту. В Бухаре каймак часто подают на завтрак вместе с горячей лепёшкой или используют как дополнение к чаю. Это настоящий символ домашнего уюта и щедрости узбекского гостеприимства.', 
    full_en: 'Kaymak is a traditional dairy delicacy prepared in Bukhara by slowly simmering fresh milk or cream. During heating, a dense, ruddy skin forms on the surface, which is carefully removed and collected in layers. It is this skin that is kaymak — it turns out incredibly tender, slightly sweet, and melting in the mouth. In Bukhara, kaymak is often served for breakfast along with hot flatbread or used as an addition to tea. It is a true symbol of home comfort and the generosity of Uzbek hospitality.',
    full_uz: 'Qaymoq — Buxoroda yangi sut yoki qaymoqni uzoq vaqt dimlash orqali tayyorlanadigan an\'anaviy sut delikatesidir. Isitish jarayonida sirtda qalin, qizg\'ish qaymoq hosil bo\'ladi, u ehtiyotkorlik bilan olinadi va qatlamlarga yig\'iladi. Aynan shu qaymoq — kaymak bo\'lib, u nihoyatda mayin, biroz shirin va og\'izda eriydi. Buxoroda qaymoq ko\'pincha nonushta uchun issiq non bilan tortiladi yoki choyga qo\'shimcha sifatida ishlatiladi. Bu uy qulayligi va o\'zbek mehmondo\'stligi saxiyligining haqiqiy ramzidir.',
    tip: 'Намажьте каймак на свежую горячую лепёшку — это самый простой и невероятно вкусный бухарский завтрак. А если добавите немного мёда или варенья, получится идеальный десерт к зелёному чаю!', 
    tip_en: 'Spread kaymak on fresh hot flatbread — this is the simplest and most delicious Bukhara breakfast. And if you add a little honey or jam, you get the perfect dessert for green tea!',
    tip_uz: 'Qaymoqni yangi issiq nonga surting — bu eng oddiy va nihoyatda mazali Buxoro nonushtasidir. Va agar bir oz asal yoki murabbo qo\'shsangiz, ko\'k choy uchun mukammal desertga ega bo\'lasiz!',
    img:'/img/food/qaymoq.webp' 
  },
  { 
    id:26, 
    name:'Сумалак', 
    name_en: 'Sumalak', 
    name_uz: 'Sumalak',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Густой, сладкий весенний десерт из пророщенных зёрен пшеницы, который готовят только раз в году.', 
    desc_en: 'Thick, sweet spring dessert made from sprouted wheat grains, prepared only once a year.',
    desc_uz: 'Yiliga bir marta tayyorlanadigan, unib chiqqan bug\'doy donalaridan tayyorlangan quyuq, shirin bahorgi desert.',
    full: 'Сумалак — это не просто десерт, а настоящий символ весеннего праздника Навруз. Его готовят из пророщенных зёрен пшеницы, которые перемалывают и варят в огромном казане вместе с мукой и маслом. Процесс приготовления занимает более 12 часов, и всё это время его непрерывно помешивают. Секрет кроется в особом сладковатом вкусе, который получается без добавления сахара — за счёт ферментации проростков. Готовят сумалак всей махаллёй, часто с песнями и музыкой. Это блюдо дарит силу, здоровье и символизирует пробуждение природы.', 
    full_en: 'Sumalak is not just a dessert, but a true symbol of the spring holiday Navruz. It is made from sprouted wheat grains, which are ground and boiled in a huge cauldron along with flour and oil. The cooking process takes more than 12 hours, and all this time it is continuously stirred. The secret lies in the special sweetish taste that is obtained without adding sugar — due to the fermentation of the sprouts. Sumalak is prepared by the whole mahalla, often with songs and music. This dish gives strength, health, and symbolizes the awakening of nature.',
    full_uz: 'Sumalak — nafaqat desert, balki bahorgi Navro\'z bayramining haqiqiy ramzidir. U unib chiqqan bug\'doy donalaridan tayyorlanadi, ular maydalanadi va ulkan qozonda un va yog\' bilan birga qaynatiladi. Pishirish jarayoni 12 soatdan ko\'proq vaqt oladi va shu vaqt davomida u doimiy aralashtiriladi. Sir shakarsiz olinadigan maxsus shirin ta\'mda — unib chiqqan donalarning fermentatsiyasi tufayli. Sumalak butun mahalla bo\'lib, ko\'pincha qo\'shiq va musiqa bilan tayyorlanadi. Bu taom kuch-quvvat, sog\'liq beradi va tabiatning uyg\'onishini ramziy qiladi.',
    tip: 'Обязательно попробуйте сумалак, когда будете в Узбекистане весной. Его едят холодным или тёплым, запивая зелёным чаем. А если вам доведётся участвовать в его приготовлении — загадайте желание, считается, что оно обязательно сбудется!', 
    tip_en: 'Be sure to try sumalak when you are in Uzbekistan in spring. It is eaten cold or warm, washed down with green tea. And if you happen to participate in its preparation — make a wish, it is believed that it will definitely come true!',
    tip_uz: 'Bahorda O\'zbekistonda bo\'lganingizda sumalakni albatta tatib ko\'ring. U sovuq yoki iliq holda, ko\'k choy bilan ichiladi. Va agar uni tayyorlashda ishtirok etish nasib qilsa — tilak tilang, u albatta amalga oshishiga ishonishadi!',
    img:'/img/food/sumalak.webp' 
  },
  { 
    id:27, 
    name:'Халво', 
    name_en: 'Halvo', 
    name_uz: 'Halvo',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Рассыпчатая, невероятно ароматная халва из обжаренной муки, топлёного масла и сахара.', 
    desc_en: 'Crumbly, incredibly aromatic halva made from roasted flour, melted butter, and sugar.',
    desc_uz: 'Qovurilgan un, eritilgan yog\' va shakardan tayyorlangan uvoq, nihoyatda xushbo\'y holva.',
    full: 'Бухарская халва (халво) — это традиционная сладость, которую в Бухаре готовят с особым мастерством. В отличие от ореховой халвы, здесь основу составляет пшеничная мука, которую долго обжаривают на топлёном или растительном масле до появления глубокого золотистого цвета и орехового аромата. Затем в смесь добавляют сахарный сироп или мёд и тщательно перемешивают. Получается рассыпчатая, тающая во рту масса. Часто в неё добавляют орехи, кунжут или изюм для дополнительной текстуры. Это невероятно сытное и сладкое угощение, которое идеально подходит к зелёному чаю.', 
    full_en: 'Bukhara halva (halvo) is a traditional sweet prepared with special skill in Bukhara. Unlike nut halva, the base here is wheat flour, which is fried for a long time in melted or vegetable oil until a deep golden color and nutty aroma appear. Then sugar syrup or honey is added to the mixture and thoroughly mixed. The result is a crumbly, melting-in-the-mouth mass. Nuts, sesame seeds, or raisins are often added for extra texture. This is an incredibly hearty and sweet treat that goes perfectly with green tea.',
    full_uz: 'Buxoro holvasi — Buxoroda alohida mahorat bilan tayyorlanadigan an\'anaviy shirinlikdir. Yong\'oqli holvadan farqli o\'laroq, bu yerda asosni bug\'doy uni tashkil etadi, u chuqur oltin rang va yong\'oq hidiga ega bo\'lgunga qadar eritilgan yoki o\'simlik yog\'ida uzoq qovuriladi. So\'ngra aralashmaga shakar siropi yoki asal qo\'shiladi va yaxshilab aralashtiriladi. Natijada uvoq, og\'izda eriydigan massa hosil bo\'ladi. Qo\'shimcha tekstura uchun ko\'pincha unga yong\'oq, kunjut yoki mayiz qo\'shiladi. Bu nihoyatda to\'yimli va shirin taom bo\'lib, ko\'k choy bilan ideal mos keladi.',
    tip: 'Халво нужно есть маленькими кусочками, запивая горячим несладким чаем — так она раскрывает свой вкус и не кажется слишком приторной. Попробуйте добавить её в чай вместо сахара, как это делают местные!', 
    tip_en: 'Halvo should be eaten in small pieces, washed down with hot unsweetened tea — this way it reveals its taste and does not seem too cloying. Try adding it to tea instead of sugar, as the locals do!',
    tip_uz: 'Holvoni kichik bo\'laklarda, issiq shakarsiz choy bilan ichish kerak — shunda u o\'z ta\'mini ochadi va juda shirin bo\'lib ko\'rinmaydi. Uni mahalliy aholi qilganidek choyga shakar o\'rniga qo\'shib ko\'ring!',
    img:'/img/food/halvo.webp' 
  },
  { 
    id:28, 
    name:'Халвойтар', 
    name_en: 'Halvoytar', 
    name_uz: 'Halvoytar',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Плотная, ароматная халва с большим количеством грецких орехов и пряностей.', 
    desc_en: 'Dense, aromatic halva with a large amount of walnuts and spices.',
    desc_uz: 'Ko\'p miqdorda yong\'oq va ziravorlar bilan zich, xushbo\'y holva.',
    full: 'Халвойтар — это особая разновидность бухарской халвы, которую часто называют «халвой для гурманов». В отличие от классической мучной халвы, здесь основу составляют молотые орехи (чаще всего грецкие), которые смешивают с обжаренной мукой, топлёным маслом и сахарным сиропом. Благодаря орехам, десерт получается невероятно питательным, с ярко выраженным вкусом и лёгкой горчинкой. Часто в него добавляют кардамон или корицу для аромата. Это лакомство традиционно готовят к большим праздникам и подают дорогим гостям, так как оно считается символом достатка и щедрости.', 
    full_en: 'Halvoytar is a special variety of Bukhara halva, often called "halva for gourmets." Unlike classic flour halva, the base here is ground nuts (most often walnuts), which are mixed with roasted flour, melted butter, and sugar syrup. Thanks to the nuts, the dessert turns out incredibly nutritious, with a pronounced taste and a slight bitterness. Cardamom or cinnamon are often added for aroma. This delicacy is traditionally prepared for major holidays and served to dear guests, as it is considered a symbol of prosperity and generosity.',
    full_uz: 'Halvoytar — Buxoro holvasining alohida turi bo\'lib, uni ko\'pincha "gurmanlar uchun holva" deb atashadi. Klassik unli holvadan farqli o\'laroq, bu yerda asosni maydalangan yong\'oqlar (ko\'pincha yong\'oq) tashkil etadi, ular qovurilgan un, eritilgan yog\' va shakar siropi bilan aralashtiriladi. Yong\'oqlar tufayli desert nihoyatda to\'yimli, yorqin ta\'m va engil achchiq ta\'mga ega bo\'ladi. Xushbo\'ylik uchun unga ko\'pincha kardamon yoki dolchin qo\'shiladi. Bu shirinlik an\'anaviy ravishda katta bayramlarga tayyorlanadi va qimmatli mehmonlarga tortiladi, chunki u farovonlik va saxiylik ramzi hisoblanadi.',
    tip: 'Попробуйте халвойтар с крепким чёрным или зелёным чаем без сахара — ореховый вкус раскроется ещё ярче. И не ешьте его слишком много за раз: он очень сытный и калорийный, но невероятно вкусный!', 
    tip_en: 'Try halvoytar with strong black or green tea without sugar — the nutty taste will open up even brighter. And do not eat too much at once: it is very hearty and high in calories, but incredibly tasty!',
    tip_uz: 'Halvoytarni shakarsiz qora yoki ko\'k choy bilan tatib ko\'ring — yong\'oq ta\'mi yanada yorqinroq ochiladi. Va uni bir vaqtning o\'zida juda ko\'p iste\'mol qilmang: u juda to\'yimli va kaloriyali, ammo nihoyatda mazali!',
    img:'/img/food/halvoyitar.webp' 
  },
  { 
    id:29, 
    name:'Нишалло', 
    name_en: 'Nishallo', 
    name_uz: 'Nishallo',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Лёгкий, воздушный крем из взбитых яичных белков с сахаром и ароматными специями.', 
    desc_en: 'Light, airy cream made from whipped egg whites with sugar and aromatic spices.',
    desc_uz: 'Shakar va xushbo\'y ziravorlar bilan ko\'pirtirilgan tuxum oqlaridan tayyorlangan yengil, havodor krem.',
    full: 'Нишалло — это традиционный бухарский десерт, который готовят из яичных белков, взбитых с сахарным сиропом до состояния пышного, устойчивого крема. В процессе приготовления добавляют лимонную кислоту или сок, чтобы крем держал форму и имел приятную кислинку. Иногда для аромата добавляют ваниль или корицу. Нишалло получается невероятно лёгким, тающим во рту и совсем не приторным. В Бухаре его традиционно готовят на праздники, особенно на Навруз, и подают в красивых пиалах, украсив орехами или фруктами. Это настоящий символ весеннего обновления и радости.', 
    full_en: 'Nishallo is a traditional Bukhara dessert made from egg whites whipped with sugar syrup until a fluffy, stable cream is formed. During preparation, citric acid or juice is added so that the cream holds its shape and has a pleasant sourness. Sometimes vanilla or cinnamon is added for aroma. Nishallo turns out incredibly light, melting in the mouth, and not cloying at all. In Bukhara, it is traditionally prepared for holidays, especially Navruz, and served in beautiful bowls, decorated with nuts or fruits. It is a true symbol of spring renewal and joy.',
    full_uz: 'Nishallo — tuxum oqlarini shakar siropi bilan ko\'pirtirib, yumshoq, barqaror krem holatiga keltirib tayyorlanadigan an\'anaviy Buxoro desertidir. Tayyorlash jarayonida krem shaklini saqlab qolishi va yoqimli nordon ta\'mga ega bo\'lishi uchun limon kislotasi yoki sharbati qo\'shiladi. Ba\'zan xushbo\'ylik uchun vanil yoki dolchin qo\'shiladi. Nishallo nihoyatda yengil, og\'izda eriydigan va umuman shirin bo\'lmagan holda chiqadi. Buxoroda u an\'anaviy ravishda bayramlarda, ayniqsa Navro\'zda tayyorlanadi va chiroyli kosalarda, yong\'oq yoki mevalar bilan bezatilgan holda tortiladi. Bu bahorgi yangilanish va quvonchning haqiqiy ramzidir.',
    tip: 'Ешьте нишалло свежим, пока оно ещё воздушное. Подавайте его с горячим зелёным чаем — контраст нежного крема и терпкого чая создаёт идеальное сочетание. И обязательно попробуйте ложкой, а не вилкой, чтобы не нарушить текстуру!', 
    tip_en: 'Eat nishallo fresh while it is still airy. Serve it with hot green tea — the contrast of delicate cream and tart tea creates an ideal combination. And be sure to try it with a spoon, not a fork, so as not to disturb the texture!',
    tip_uz: 'Nishalloni havodor bo\'lganda yangi holda iste\'mol qiling. Uni issiq ko\'k choy bilan torting — mayin krem va achchiq choy kontrasti ideal kombinatsiyani yaratadi. Va teksturani buzmaslik uchun uni albatta vilka emas, qoshiq bilan tatib ko\'ring!',
    img:'/img/food/nishallo.webp' 
  },
  { 
    id:30, 
    name:'Пашмак-халво', 
    name_en: 'Pashmak Halvo', 
    name_uz: 'Pashmak holvo',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Воздушная, пористая халва, похожая на сладкую вату, которая буквально тает во рту.', 
    desc_en: 'Airy, porous halva, similar to cotton candy, that literally melts in your mouth.',
    desc_uz: 'Paxta shakariga o\'xshash, og\'izda tom ma\'noda eriydigan havodor, g\'ovak holva.',
    full: 'Пашмак-халво — это уникальная бухарская сладость, которая сильно отличается от привычной плотной халвы. Название переводится как «хлопковая халва» (от слова «пашмак» — хлопок), и это идеально описывает её текстуру. Её готовят путём сложного процесса вытягивания и многократного складывания сахарно-масляной карамельной массы. В результате получается невесомый, волокнистый десерт, который тает во рту при первом прикосновении. Это настоящий шедевр кондитерского искусства, который часто продают на базарах в виде больших, воздушных «облаков».', 
    full_en: 'Pashmak Halvo is a unique Bukhara sweet that is very different from the usual dense halva. The name translates as "cotton halva" (from the word "pashmak" — cotton), and this perfectly describes its texture. It is prepared through a complex process of stretching and repeatedly folding a sugar-butter caramel mass. The result is a weightless, fibrous dessert that melts in the mouth at the first touch. It is a true masterpiece of confectionery art, often sold in bazaars in the form of large, airy "clouds."',
    full_uz: 'Pashmak holvo — odatdagi zich holvadan juda farq qiladigan noyob Buxoro shirinligidir. Nomi "paxta holvasi" deb tarjima qilinadi ("pashmak" so\'zidan — paxta) va bu uning teksturasini mukammal tasvirlaydi. U shakar-yog\' karamel massasini cho\'zish va ko\'p marta buklashning murakkab jarayoni orqali tayyorlanadi. Natijada birinchi teginishdayoq og\'izda eriydigan vaznsiz, tolali desert hosil bo\'ladi. Bu qandolatchilik san\'atining haqiqiy durdonasi bo\'lib, ko\'pincha bozorlarda katta, havodor "bulutlar" shaklida sotiladi.',
    tip: 'Ешьте пашмак-халво осторожно, отламывая маленькие кусочки — она очень хрупкая и нежная. Лучше всего запивать её горячим чаем, чтобы насладиться контрастом текстур. И обязательно попробуйте её на бухарском базаре, где её готовят прямо при вас!', 
    tip_en: 'Eat Pashmak Halvo carefully, breaking off small pieces — it is very fragile and delicate. It is best to wash it down with hot tea to enjoy the contrast of textures. And be sure to try it at the Bukhara bazaar, where it is prepared right in front of you!',
    tip_uz: 'Pashmak holvoni ehtiyotkorlik bilan, kichik bo\'laklardan sindirib yeng — u juda mo\'rt va mayin. Teksturalar kontrastidan zavqlanish uchun uni issiq choy bilan ichish yaxshiroq. Va uni ko\'z oldingizda tayyorlaydigan Buxoro bozorida albatta tatib ko\'ring!',
    img:'/img/food/pashmak_halvo.webp' 
  },
  { 
    id:31, 
    name:'Набот', 
    name_en: 'Nabot', 
    name_uz: 'Nabot',
    category:'sweets', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Кристаллический тростниковый сахар с нежным ароматом, который подают к чаю вместо обычного песка.', 
    desc_en: 'Crystalline cane sugar with a delicate aroma, served with tea instead of regular granulated sugar.',
    desc_uz: 'Oddiy shakar o\'rniga choy bilan tortiladigan, nozik hidli kristall qamish shakari.',
    full: 'Набот — это традиционный восточный сахар, который в Бухаре готовят путём медленной кристаллизации тростникового сиропа. В результате получаются прозрачные или слегка янтарные кристаллы, похожие на крупный леденец, но с более выраженным вкусом. В него часто добавляют шафран, кардамон или лимон, чтобы придать напитку особый аромат. В Бухаре набот обязательно подают к зелёному чаю: считается, что он не только подслащивает напиток, но и помогает лучше раскрыть его вкус. Это не просто сахар, а важная часть чайной церемонии и гостеприимства.', 
    full_en: 'Nabot is a traditional Eastern sugar prepared in Bukhara by slow crystallization of cane syrup. The result is transparent or slightly amber crystals, similar to large rock candy, but with a more pronounced taste. Saffron, cardamom, or lemon are often added to give the drink a special aroma. In Bukhara, nabot is certainly served with green tea: it is believed that it not only sweetens the drink but also helps to better reveal its taste. It is not just sugar, but an important part of the tea ceremony and hospitality.',
    full_uz: 'Nabot — Buxoroda qamish siropini sekin kristallash orqali tayyorlanadigan an\'anaviy sharq shakaridir. Natijada shaffof yoki biroz qahrabo rangli, yirik kristallga o\'xshash, ammo yorqinroq ta\'mga ega kristallar hosil bo\'ladi. Ichimlikka alohida hid berish uchun unga ko\'pincha za\'faron, kardamon yoki limon qo\'shiladi. Buxoroda nabot ko\'k choy bilan albatta tortiladi: u nafaqat ichimlikni shirin qiladi, balki uning ta\'mini yaxshiroq ochishga yordam beradi deb ishoniladi. Bu shunchaki shakar emas, balki choy marosimi va mehmondo\'stlikning muhim qismidir.',
    tip: 'Не размешивайте набот в чае ложкой, а положите кристалл в пиалу и дайте ему немного подтаять — так вы почувствуете все нюансы аромата. И не бойтесь экспериментировать: набот отлично сочетается с мятой и чабрецом!', 
    tip_en: 'Do not stir nabot in tea with a spoon, but put the crystal in the bowl and let it melt a little — this way you will feel all the nuances of the aroma. And do not be afraid to experiment: nabot goes perfectly with mint and thyme!',
    tip_uz: 'Nabotni choyda qoshiq bilan aralashtirmang, kristallni kosaga soling va biroz erishiga yo\'l qo\'ying — shunda siz hidning barcha nozikliklarini his qilasiz. Va tajriba qilishdan qo\'rqmang: nabot yalpiz va kekik bilan juda yaxshi uyg\'unlashadi!',
    img:'/img/food/nabot.webp' 
  },
  { 
    id:32, 
    name:'Казы', 
    name_en: 'Kazy', 
    name_uz: 'Qazi',
    category:'meaty', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Домашняя колбаса из конины с курдючным жиром, вяленая или отварная, с насыщенным вкусом.', 
    desc_en: 'Homemade horse meat sausage with tail fat, cured or boiled, with a rich taste.',
    desc_uz: 'Dumaloq yog\' bilan ot go\'shtidan tayyorlangan uy kolbasasi, quritilgan yoki qaynatilgan, to\'yimli ta\'mga ega.',
    full: 'Казы — это традиционный кочевой деликатес, который в Бухаре считается особым угощением. Для его приготовления используют отборную конину и курдючный жир, которые набивают в натуральную кишку. Затем колбасу либо варят, либо вялят (чаще всего её едят именно в варёном виде, нарезая тонкими ломтиками). Мясо конины само по себе сладковатое и нежирное, а курдюк придаёт ему невероятную сочность и нежность. Казы — это очень сытное и питательное блюдо, которое традиционно подают на праздники, свадьбы и в честь дорогих гостей. Его вкус — это вкус настоящей степи и древних традиций.', 
    full_en: 'Kazy is a traditional nomadic delicacy considered a special treat in Bukhara. Selected horse meat and tail fat are used to prepare it, which are stuffed into a natural casing. Then the sausage is either boiled or cured (most often it is eaten boiled, cut into thin slices). Horse meat itself is slightly sweet and lean, while tail fat gives it incredible juiciness and tenderness. Kazy is a very hearty and nutritious dish traditionally served at holidays, weddings, and in honor of dear guests. Its taste is the taste of the true steppe and ancient traditions.',
    full_uz: 'Qazi — Buxoroda alohida taom hisoblanadigan an\'anaviy ko\'chmanchilar delikatesidir. Uni tayyorlash uchun tanlangan ot go\'shti va dumaloq yog\' ishlatiladi, ular tabiiy ichakka tiqiladi. So\'ngra kolbasa yo qaynatiladi, yo quritiladi (ko\'pincha u qaynatilgan holda, yupqa bo\'laklarga kesib iste\'mol qilinadi). Ot go\'shtining o\'zi biroz shirin va yog\'siz, dumaloq esa unga nihoyatda sharbatlilik va mayinlik beradi. Qazi bayramlarda, to\'ylarda va qadrli mehmonlar sharafiga an\'anaviy ravishda tortiladigan juda to\'yimli va ozuqaviy taomdir. Uning ta\'mi — haqiqiy dasht va qadimiy an\'analarning ta\'midir.',
    tip: 'Казы нарезают очень тонко и подают с горячей лепёшкой, маринованным луком и зеленью. Попробуйте запить её крепким бульоном или зелёным чаем — это идеальное сочетание для настоящего гурмана!', 
    tip_en: 'Kazy is cut very thinly and served with hot flatbread, pickled onions, and herbs. Try washing it down with strong broth or green tea — this is the ideal combination for a true gourmet!',
    tip_uz: 'Qazi juda yupqa kesiladi va issiq non, tuzlangan piyoz va ko\'katlar bilan tortiladi. Uni quyuq bulon yoki ko\'k choy bilan ichib ko\'ring — bu haqiqiy gurman uchun ideal kombinatsiya!',
    img:'/img/food/qazi.webp' 
  },
  { 
    id:33, 
    name:'Курут', 
    name_en: 'Kurut', 
    name_uz: 'Qurut',
    category:'dairy', 
    region:'Бухара', 
    region_en: 'Bukhara', 
    region_uz: 'Buxoro',
    desc: 'Солёные или сладкие шарики из сушёного кислого молока — настоящий гастрономический символ Бухары.', 
    desc_en: 'Salty or sweet dried sour milk balls — a true gastronomic symbol of Bukhara.',
    desc_uz: 'Quritilgan nordon sutdan tayyorlangan sho\'r yoki shirin sharchalar — Buxoroning haqiqiy gastronomik ramzi.',
    full: 'Курут — это древний способ сохранения молока, который в Бухаре превратился в самостоятельный деликатес. Готовят его из катыка (кислого молока): массу отжимают, скатывают в небольшие шарики и высушивают на солнце. В результате получается твёрдый, солоноватый продукт с ярким кисломолочным вкусом, который может храниться месяцами. В Бухаре курут бывает двух видов: белый (более мягкий и солёный) и тёмный (более сухой и острый). Местные жители едят его как закуску к чаю или пиву, добавляют в супы для вкуса, а сладкий курут (с добавлением сахара) подают как десерт. Это не просто еда, а часть культурного кода Бухары.', 
    full_en: 'Kurut is an ancient way of preserving milk, which in Bukhara has turned into an independent delicacy. It is made from katyk (sour milk): the mass is squeezed, rolled into small balls, and dried in the sun. The result is a hard, slightly salty product with a bright fermented milk taste that can be stored for months. In Bukhara, kurut comes in two types: white (softer and saltier) and dark (drier and sharper). Locals eat it as a snack with tea or beer, add it to soups for flavor, and sweet kurut (with added sugar) is served as a dessert. It is not just food, but part of the cultural code of Bukhara.',
    full_uz: 'Qurut — sutni saqlashning qadimiy usuli bo\'lib, Buxoroda mustaqil delikatesga aylandi. U qatiqdan tayyorlanadi: massasi siqiladi, kichik sharchalarga o\'raladi va quyoshda quritiladi. Natijada oylar davomida saqlanishi mumkin bo\'lgan, yorqin achitilgan sut ta\'miga ega qattiq, sho\'rroq mahsulot hosil bo\'ladi. Buxoroda qurut ikki xil bo\'ladi: oq (yanada yumshoq va sho\'r) va qora (yanada quruq va o\'tkir). Mahalliy aholi uni choy yoki pivo uchun gazak sifatida iste\'mol qiladi, ta\'m uchun sho\'rvalarga qo\'shadi, shirin qurut (shakar qo\'shilgan) esa desert sifatida tortiladi. Bu shunchaki ovqat emas, balki Buxoro madaniy kodining bir qismidir.',
    tip: 'Попробуйте курут двух видов: твёрдый солёный — как закуску, и сладкий — как десерт к чаю. Если он покажется слишком твёрдым, положите шарик в горячий чай на пару секунд — он станет мягче и раскроет свой вкус!', 
    tip_en: 'Try two types of kurut: hard salty — as a snack, and sweet — as a dessert for tea. If it seems too hard, put the ball in hot tea for a couple of seconds — it will become softer and reveal its taste!',
    tip_uz: 'Qurutning ikki turini tatib ko\'ring: qattiq sho\'r — gazak sifatida, va shirin — choy uchun desert sifatida. Agar u juda qattiq tuyulsa, sharchani bir necha soniya issiq choyga soling — u yumshoqroq bo\'ladi va ta\'mini ochadi!',
    img:'/img/food/qurut.webp' 
  }
];

const FOOD_FIRST_VISIBLE = 6;
const foodGrid = document.getElementById('foodGrid');
const showMoreFoodBtn = document.getElementById('showMoreFoodBtn');
const hideFoodBtn = document.getElementById('hideFoodBtn');

const modal = document.getElementById('foodModal');
const modalTitle = document.getElementById('modalTitle');
const modalRegion = document.getElementById('modalRegion');
const modalDesc = document.getElementById('modalDesc');
const modalTip = document.getElementById('modalTip');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

function renderFood(category = 'all') {
  const filtered = category === 'all' ? dishes : dishes.filter(d => {
    if (Array.isArray(d.category)) {
      return d.category.includes(category);
    }
    return d.category === category;
  });
  
  foodGrid.innerHTML = '';

  if (filtered.length === 0) {
    foodGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:.5;padding:40px">В этой категории пока нет блюд</p>';
    return;
  }

  filtered.forEach((d, index) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    if (index >= FOOD_FIRST_VISIBLE) card.classList.add('hidden');

    // --- ВОТ ТУТ ВЫБИРАЕМ ЯЗЫК ---
    let displayName = d.name;
    let displayRegion = d.region;
    let displayDesc = d.desc;
    let btnText = 'Узнать больше →';

    if (isEng) {
      displayName = d.name_en || d.name;
      displayRegion = d.region_en || d.region;
      displayDesc = d.desc_en || d.desc;
      btnText = 'Read more →';
    } else if (isUzb) {
      displayName = d.name_uz || d.name;
      displayRegion = d.region_uz || d.region;
      displayDesc = d.desc_uz || d.desc;
      btnText = 'Batafsil →';
    }

    card.innerHTML = `
      <img src="${d.img}" alt="${displayName}" loading="lazy">
      <div class="food-card-body">
        <h3>${displayName}</h3>
        <div class="food-region">📍 ${displayRegion}</div>
        <p>${displayDesc}</p>
        <button class="btn-detail" data-id="${d.id}">${btnText}</button>
      </div>
    `;
    foodGrid.appendChild(card);
  });

  attachFoodEvents();
  updateFoodButtons(filtered.length);
}

function updateFoodButtons(total) {
  const hiddenCount = total - FOOD_FIRST_VISIBLE;
  if (total <= FOOD_FIRST_VISIBLE) {
    showMoreFoodBtn.style.display = 'none';
    hideFoodBtn.style.display = 'none';
    return;
  }
  showMoreFoodBtn.style.display = 'inline-flex';
  hideFoodBtn.style.display = 'none';
  showMoreFoodBtn.textContent = `Показать ещё ${hiddenCount} блюд →`;
}

function attachFoodEvents() {
  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dish = dishes.find(d => d.id === Number(btn.dataset.id));
      if (!dish) return;

      // Выбираем язык для модального окна
      let displayName = dish.name;
      let displayRegion = dish.region;
      let displayFull = dish.full;
      let displayTip = dish.tip;
      let tipTitle = 'Совет туристу:';

      if (isEng) {
        displayName = dish.name_en || dish.name;
        displayRegion = dish.region_en || dish.region;
        displayFull = dish.full_en || dish.full;
        displayTip = dish.tip_en || dish.tip;
        tipTitle = 'Traveler tip:';
      } else if (isUzb) {
        displayName = dish.name_uz || dish.name;
        displayRegion = dish.region_uz || dish.region;
        displayFull = dish.full_uz || dish.full;
        displayTip = dish.tip_uz || dish.tip;
        tipTitle = 'Sayohatchi uchun maslahat:';
      }

      modalTitle.textContent = displayName;
      modalRegion.textContent = '📍 ' + displayRegion;
      modalDesc.textContent = displayFull;
      modalTip.innerHTML = `💡 <strong>${tipTitle}</strong> ${displayTip}`;
      modalImg.style.backgroundImage = `url('${dish.img}')`;
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
}

document.querySelectorAll('#foodTabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#foodTabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFood(btn.dataset.category);
  });
});

showMoreFoodBtn?.addEventListener('click', () => {
  document.querySelectorAll('.food-card.hidden').forEach((card, i) => {
    card.classList.remove('hidden');
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 25);
  });
  showMoreFoodBtn.style.display = 'none';
  hideFoodBtn.style.display = 'inline-flex';
});

hideFoodBtn?.addEventListener('click', () => {
  document.querySelectorAll('.food-card').forEach((card, i) => {
    if (i >= FOOD_FIRST_VISIBLE) card.classList.add('hidden');
  });
  hideFoodBtn.style.display = 'none';
  showMoreFoodBtn.style.display = 'inline-flex';
  document.querySelector('.food')?.scrollIntoView({ behavior: 'smooth' });
});

function closeFoodModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
modalClose?.addEventListener('click', closeFoodModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeFoodModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFoodModal(); });

renderFood('all');