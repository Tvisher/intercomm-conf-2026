$('[data-toggle-item] .list-item__head').on('click', function () {
    const $toggleItem = $(this).parent('.list-item');
    const $body = $toggleItem.find('.list-item__body');
    $body.slideToggle(300);
    $toggleItem.toggleClass('open');
});



const swiper = new Swiper('.speakers-slider', {
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
