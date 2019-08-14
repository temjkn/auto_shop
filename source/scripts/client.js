$(document).ready( function() {

	$(".fancybox").fancybox();

	$('.b-plan__item').click( function(e) {
		e.preventDefault();
		$(this).parents('li').siblings('').children('.b-plan__item').removeClass('b-plan__item_active');
		$(this).parents('.b-plan__cell').siblings('.b-plan__tab-item').removeClass('js-act').eq( $(this).parents('li').index() ).addClass('js-act');
		$(this).addClass('b-plan__item_active');
	});

	if( $(window).width() > 992 ) {
		SetPosImageSlider();
	} else {
		SetPosImageSliderAuto();
	};

	$('table').each( function() {
		$(this).wrap('<div class=table-wrap></div>')
	});


	var $thumbsCarousel = $('.js-thumbs-carousel');

	$thumbsCarousel.owlCarousel({
		loop: false,
		autoplay: false,
		nav: true,
		dots: false,
		navText: [''],
		mouseDrag: false,
		margin: 10,
		responsive: {
			0: {
				items: 4
			},
			640: {
				items: 5
			},
			768: {
				items: 6
			},
			992: {
				items: 5
			}
		}
	});

	$('body').on('click', '.js-thumb-link', function(e) {
		e.preventDefault();
		var $this = $(this);

		if( !$this.hasClass('js-act') ) {
			var dataId = $this.attr('data-id');

			$this.addClass('js-act').parents('.owl-item').siblings('.owl-item')
			.find('.js-thumb-link').removeClass('js-act');

			var toIndex = $('[data-slide-id='+dataId+']').closest('.owl-item').index();

			$projectSlider.trigger("to.owl.carousel", [toIndex, 1, true]);
		};
	});	

	$('body').on('click', '.b-project-slider__wrap .owl-prev, .b-project-slider__wrap .owl-next', function(e) {
		setTimeout( function() {
			var dataId = $projectSlider.find('.owl-item.active').find('.b-project-slider__item').attr('data-slide-id');
			var toIndex = $('[data-id='+dataId+']').closest('.owl-item').index();
			$thumbsCarousel.trigger("to.owl.carousel", [ toIndex, 1, true]);
			$('[data-id='+dataId+']').addClass('js-act').parents('.owl-item').siblings('.owl-item')
			.find('.js-thumb-link').removeClass('js-act');
		});
	});

	$('body').on('click', '.js-show-full-text, .js-hide-full-text', function(e) {
		e.preventDefault();
		var $this = $(this);
		var dataText = $this.attr('data-text');

		$this.attr('data-text', $this.text());

		if( $this.hasClass('js-show-full-text') ) {
			$this.text( dataText ).removeClass('js-show-full-text').addClass('js-hide-full-text');
			$this.siblings('.b-hidden-wrap__inner').css({'max-height' : 'none'});
		} else if( $this.hasClass('js-hide-full-text')  ) {
			$this.text( dataText ).removeClass('js-hide-full-text').addClass('js-show-full-text');
			$this.siblings('.b-hidden-wrap__inner').css({'max-height' : ''});
		};

	});

	checkHiddenText();

});

function checkHiddenText() {
	$('.js-hidden-wrap').each( function() {
		var $this = $(this);
		var maxHeight = parseInt( $this.children('.b-hidden-wrap__inner').css('max-height') );

		if( maxHeight < $this.find('.b-hidden-wrap__inner-wrap').outerHeight() ) {
			$this.find('.js-show-full-text, .js-hide-full-text').css({'display' : ''});
		} else {
			$this.find('.js-show-full-text, .js-hide-full-text').css({'display' : 'none'});
		};

	});
};

var $projectSlider = $('.b-project-slider__wrap');

$(window).on('load', function() {

	$projectSlider.owlCarousel( {
	    items: 1,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    loop: false,
	    autoplay: false,
	    nav: true,
	    dots: false,
	    navText: ['', ''],
	    mouseDrag: false
	});

	if( $(window).width() < 993 ) {
		$('.b-advantages').toggleClass('owl-carousel');
		$('.b-advantages').owlCarousel( {
			loop:true,
			margin:10,
			nav:true,
			navText:[],
			dots:true,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				}
			}
		});
	};

	if( $(window).width() > 992 ) {
		var materialTextTop = $('.b-material-item__text.top');
		var materialTextBottom = $('.b-material-item__text.bottom');
		var materialCols = $('.js-material').find('.b-cols-5__col');

		setMaxHeight( materialTextTop );
		setMaxHeight( materialTextBottom );
		setMaxHeight( materialCols );

		setMaterialImgSize();
	} else {
		$('.js-material').find('.b-cols-5__col').css({'height' : 'auto'});
	};


	function setMaterialImgSize() {
		var items = materialCols.find('.b-material-item');
		var currHeight = $('.js-material').outerHeight();

		items.each( function() {

			var setHeight = currHeight - $(this).children('.b-material-item__text').outerHeight();
			$(this).children('.b-material-item__img-wrap').css({'height' : setHeight });

		});
	};

});

$(window).resize( function() {
	if( $(window).width() > 992 ) {
		SetPosImageSlider();
	} else {
		SetPosImageSliderAuto();
		$('.js-material').find('.b-cols-5__col').css({'height' : 'auto'});
	};

	checkHiddenText();
});

var leftPosOuter;
var leftPosInner;
var diffPos;
var startWidthSlider;

function SetPosImageSliderAuto() {
	if( $('.b-project-wrap').length ) {
		var sliderWrap = $('.b-project-wrap');
		sliderWrap.children('.b-project-wrap__left').css({'width' : 'auto' });
	};
};

function SetPosImageSlider() {
	if( $('.b-project-wrap').length ) {
		var sliderWrap = $('.b-project-wrap');
		leftPosOuter = $('.b-project-outer-wrap').offset().left;
		leftPosInner = sliderWrap.offset().left;
		if ($(window).width() < 993) {
			sliderWrap.children('.b-project-wrap__left').css({'width' : '100%' });
		}
		else{
			sliderWrap.children('.b-project-wrap__left').css({'width' : '50%' });
		}
		
		startWidthSlider = sliderWrap.children('.b-project-wrap__left').width();
		diffPos = leftPosInner - leftPosOuter;

		// sliderWrap.find('.b-project-wrap__left').css({'margin-left' : -diffPos });
		// if ($(window).width() < 993) {
		// 	sliderWrap.find('.b-project-wrap__left').css({'width' : startWidthSlider + 2*diffPos });
		// }
		// else{
		// 	sliderWrap.find('.b-project-wrap__left').css({'width' : startWidthSlider + diffPos });
		// }
	};
};

function setMaxHeight( items ) {
	var maxHeight = 0;

	items.each( function() {
		if( maxHeight <  $(this).outerHeight() ) {
			maxHeight = $(this).outerHeight();
		}
	});

	items.css({'height' : maxHeight });

};

$('#hamburger').click(function(){
	$(this).toggleClass('open');
	$('.b-hamburger').toggleClass('open');
	$('.b-mobile-menu').toggleClass('open');
	$('.l-common-wrap').toggleClass('opened-mobile-menu');
	$('.b-header').toggleClass('open');
	$('body').toggleClass('fix');

	
});




$.fn.imPopup = function() {
    var $this, id;
    $this = this;
    id = '';
    $this.on('click', function(e) {
        e.preventDefault();
        id = $(this).data('id');
        if ($(id).length) {
            var offset = window.innerWidth - $(window).width();
            $('body').css({
                overflow: 'hidden',
                paddingRight: offset
            });
        };
        return $(".im-popups " + id).addClass('_visible');
    });
    $('.im-popup .b-popup__close').click(function(e) {
        return e.preventDefault();
    });
    return $('.im-popup').on('click', function(e) {
        if (!$(e.target).hasClass('im-popup-inside') && !$(e.target).parents('.im-popup-inside').length || $(e.target).hasClass('b-popup__close')) {
            var id = '#' + $(this).attr('id');
            if ($('.im-popup._visible').length == 1) {
                setTimeout(function() {
                    $('body').css({
                        overflow: '',
                        paddingRight: ''
                    });
                }, 300);
            }
            return $(".im-popups " + id).removeClass('_visible');
        }
    });
};

$('.im-popup-link').imPopup();