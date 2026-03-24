$('[data-toggle-item] .list-item__head').on('click', function () {
    const $toggleItem = $(this).parent('.list-item');
    const $body = $toggleItem.find('.list-item__body');
    $body.slideToggle(300);
    $toggleItem.toggleClass('open');
});



const speakersSlider = new Swiper('.speakers-slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

const header = document.querySelector('.header');
window.addEventListener('scroll', (e) => {
    const pageYOffcet = window.pageYOffset;
    if (pageYOffcet >= header.clientHeight) {
        header.classList.add('shadow')
    } else {
        header.classList.remove('shadow')
    }
})



const partnersSlider = new Swiper('.partners-slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});


const player = new Plyr('#player', {
    controls: ['play-large']
});


// 1. Находим все блоки с выбором количества
const countBlocks = document.querySelectorAll('.form-template__items-count');

// 2. Перебираем каждый блок отдельно
countBlocks.forEach(block => {
    const minusBtn = block.querySelector('.calc__minus');
    const plusBtn = block.querySelector('.calc__plus');
    const plate = block.querySelector('.calc__plate');

    // Функция обновления (контекст ограничен текущим блоком 'block')
    const updateCount = (delta) => {
        let count = parseInt(plate.dataset.count) || 1;
        count += delta;

        if (count < 1) count = 1;

        plate.textContent = count;
        plate.dataset.count = count;

        // Визуальная блокировка минуса внутри текущего блока
        minusBtn.style.opacity = (count === 1) ? '0.3' : '1';
    };

    // Слушатели событий для кнопок конкретного блока
    minusBtn.addEventListener('click', () => updateCount(-1));
    plusBtn.addEventListener('click', () => updateCount(1));

    // Инициализация состояния (чтобы сразу применить стили для 1 шт)
    updateCount(0);
});