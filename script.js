const body = $('body')
    btn = $('.header__burger'),
    menu =  $('.header__menu'),
    content = $('.content, .footer'),
    select = $('.select'),
    photo = $('.content__left'),
    header = $('.header'),
	scrollPrev = 0,
    title = $('.about__title').text(),

    popup = $('.popup'),
    parametrs = $('.parametrs__btn'),
    like = ('.parametrs__like');
    let unlock = true;
    const timeout = 800; // для transition

$(document).ready(function(){
    btn.click(function(event){
        $('.header__burger, .header__menu').toggleClass('active');
        body.toggleClass('lock');
    })
    content.click(
        function(event){
            if(menu.hasClass('active')){
                $('.header__burger, .header__menu').removeClass('active');
                body.removeClass('lock');
            }
        }
    )

    $('.validate').blur(function() {
        if($(this).val() != '') {
            let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test($(this).val())){
                $('.footer__btn').attr('disabled',false);
                $('.footer__inp').removeClass('error')
                $('.validate').removeClass('error');
            } else {
                $('.footer__inp').addClass('error')
                $('.validate').addClass('error')
                $('.footer__btn').attr('disabled',true);
            }
        } else {
            $('.validate').addClass('error')
            $('.footer__inp').addClass('error');
            $('.footer__btn').attr('disabled',true);
        }
    });

    select.click(function(event){
        $('.select__list, .select__head').toggleClass('open');
        body.toggleClass('lock');
    })
    select.on('click', '.select__item', function () {
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text()); 
        $('.select__list, .select__head').removeClass('open');
        $('.select__list').fadeOut();
    });
    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.select__list, .select__head').removeClass('open');
        }
    });

    photo.on('click', '.photo__item', function () {
        $(this).parent().prev().html($(this).html());
    });

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        if ( scrolled > 600 && scrolled > scrollPrev ) {
            header.addClass('out');
        } else {
            header.removeClass('out');
        }
	scrollPrev = scrolled;
    });

    body.on('click', '.parametrs__minus, .parametrs__plus', function(){
		let $row = $(this).closest('.parametrs__number');
		let $input = $row.find('.parametrs__text');
		let step = $row.data('step');
		let val = parseFloat($input.val());
		if ($(this).hasClass('parametrs__minus')) {
			val -= step;
		} else {
			val += step;
		}
		$input.val(val);
		$input.change();
		return false;
	});

	body.on('change', '.parametrs__text', function(){
		let $input = $(this);
		let $row = $input.closest('.parametrs__number');
		let step = $row.data('step');
		let min = parseInt($row.data('min',0));
		let max = parseInt($row.data('max',100));
		let val = parseFloat($input.val());
		if (isNaN(val)) {
			val = step;
		} else if (min && val < min) {
			val = min;	
		} else if (max && val > max) {
			val = max;	
		}
		$input.val(val);
	});


    body.on('click', '.parametrs__btn', function(e){ 
        let lot = $('.parametrs__text').val();
        
        $('.popup').addClass('open');
        $('.popup__title').html(`${title}`);
        $('.popup__text').html(`Tовар '${title}' в количестве ${lot} ед. добавлен в корзину`);
        $('.bag__lot').html(`<div class="add">${lot}</div>`)
        e.preventDefault();
    });

    body.on('click', '.parametrs__like', function(e){ 
        let lot = $('.parametrs__text').val();

        $('.popup').addClass('open');
        $('.popup__title').html(`${title}`);
        $('.popup__text').html(`Tовар '${title}' в количестве ${lot} ед. добавлен в избранное`);
        $('.favorite__lot').html(`<div class="add">${lot}</div>`);
        
    });

    if($('.popup').hasClass('open')){
        body.on('click', '.popup__body', function(e){
            $('.popup').removeClass('open');
            e.preventDefault();
        });
    }
})
