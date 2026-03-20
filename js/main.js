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