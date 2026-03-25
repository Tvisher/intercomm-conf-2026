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


// const countBlocks = document.querySelectorAll('.form-template__items-count');
// countBlocks.forEach(block => {
//     const minusBtn = block.querySelector('.calc__minus');
//     const plusBtn = block.querySelector('.calc__plus');
//     const plate = block.querySelector('.calc__plate');
//     const updateCount = (delta) => {
//         let count = parseInt(plate.dataset.count) || 0;
//         count += delta;
//         if (count < 0) count = 0;
//         plate.textContent = count;
//         plate.dataset.count = count;
//         minusBtn.style.opacity = (count === 0) ? '0.3' : '1';
//     };
//     minusBtn.addEventListener('click', () => updateCount(-1));
//     plusBtn.addEventListener('click', () => updateCount(1));
//     updateCount(0);
// });






function initTimer() {
    const timerContainer = document.querySelector('.timer__nums');
    if (!timerContainer) return;

    const dateAttr = timerContainer.getAttribute('data-timer-date');
    const [day, month, year] = dateAttr.split('.').map(Number);

    const deadline = new Date(year, month - 1, day);

    const nodes = {
        days: timerContainer.querySelectorAll('.num')[0],
        hours: timerContainer.querySelectorAll('.num')[1],
        minutes: timerContainer.querySelectorAll('.num')[2],
    };

    function updateTimer() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            return;
        }

        // Расчеты времени
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);

        nodes.days.textContent = d.toString().padStart(2, '0');
        nodes.hours.textContent = h.toString().padStart(2, '0');
        nodes.minutes.textContent = m.toString().padStart(2, '0');
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

document.addEventListener('DOMContentLoaded', initTimer);


document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-modal-btn]')) {
        e.preventDefault();
        const modalType = target.closest('[data-modal-btn]').getAttribute('data-modal-btn');
        const currentModal = document.querySelector(`[data-modal-type=${modalType}]`);
        currentModal && currentModal.classList.add('show');
    }

    if (target.closest('.form-modal') && !target.closest('.form-modal__inner') || target.closest('.form-template__close')) {
        target.closest('.form-modal').classList.remove('show')
    }

    if (target.closest('.day-modal') && !target.closest('.day-modal__content') || target.closest('.day-modal__close')) {
        target.closest('.day-modal').classList.remove('show')
    }
})

const thanksModal = document.querySelector('.thanks-modal');

$(function () {
    $('.items-count__calc').each(function () {
        const $calc = $(this);
        const $minus = $calc.find('.calc__minus');
        const $plus = $calc.find('.calc__plus');
        const $plate = $calc.find('.calc__plate');

        $minus.on('click', function () {
            let count = parseInt($plate.attr('data-count'), 10) || 0;
            if (count > 0) {
                count--;
                $plate.attr('data-count', count).text(count);
            }
        });

        $plus.on('click', function () {
            let count = parseInt($plate.attr('data-count'), 10) || 0;
            count++;
            $plate.attr('data-count', count).text(count);
        });
    });

    $('.form-template').on('submit', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $modalParent = $(this).parents('.form-modal');
        let isValid = true;

        $form.find('input').removeClass('error');
        $form.find('.form-template__agree').removeClass('error');

        $form.find('input').each(function () {
            const $input = $(this);

            if ($input.attr('type') === 'checkbox' && $input.attr('name') === 'agree') {
                if (!$input.is(':checked')) {
                    isValid = false;
                    $input.closest('.form-template__agree').addClass('error');
                }
            }
            else if ($input.attr('type') === 'text' && $.trim($input.val()) === '') {
                isValid = false;
                $input.addClass('error');
            }
        });


        if (!isValid) return;


        let formData = {};
        $.each($form.serializeArray(), function (_, field) {
            formData[field.name] = field.value;
        });

        formData.formType = $form.attr('name');

        if (formData.formType === 'tickets') {
            formData.ticketStandartCount = $form.find('.calc__plate[data-ticket-type="standart"]').attr('data-count') || 0;
            formData.ticketTopCount = $form.find('.calc__plate[data-ticket-type="top"]').attr('data-count') || 0;
        }
        if (formData.formType === 'single-ticket') {
            formData.ticketCount = $form.find('.calc__plate').attr('data-count') || 0;
        }


        const $submitBtn = $form.find('.form-submit');
        const originalBtnText = $submitBtn.text();


        $submitBtn.text('Отправка...').prop('disabled', true);

        $.ajax({
            url: '/ajax/ajax.php',
            method: 'POST',
            data: formData,
            success: function (response) {
                alert('Заявка успешно отправлена!');
                $form[0].reset();
                $form.find('.calc__plate').attr('data-count', 0).text(0);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка AJAX:', error);
            },
            complete: function () {
                $submitBtn.text(originalBtnText).prop('disabled', false);
                $modalParent.length && $modalParent.removeClass('show');
                thanksModal.classList.add('show');
            }
        });
    });

    $('.form-template').on('input change', 'input', function () {
        const $input = $(this);
        $input.removeClass('error');
        if ($input.attr('type') === 'checkbox') {
            $input.closest('.form-template__agree').removeClass('error');
        }
    });
});