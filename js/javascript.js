var UrlForAjax = window.location.protocol + "//" + window.location.hostname + "/";

var get_url      = window.location.href;     // Returns full URL (https://example.com/path/example.html)
var setUrlForAjax = window.location.protocol + '//' + window.location.hostname+ '/';


function isMobile(mobileWidth) {
	var windowWidth = window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth;
	return windowWidth < mobileWidth;
};



$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
      $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
      $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
      $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});



/* START: Loader */
loaded = 0;
$(window).on('load', function () {
	hideLoader();
	loaded = 1;
});

setTimeout(function () {
	if (!loaded) {
		hideLoader();
	}
}, 200);

function hideLoader() {
	$('#preload').fadeTo(500, 0, function() {
		$(this).remove();
		$(window).trigger('scroll');
	});

	// Start: Animations
	if(!isMobile(992)) {
		if ($('*[animated=""], *[animated="true"], *[animated="1"]').length) {
			$('*[animated=""], *[animated="true"], *[animated="1"]').each(function () {
				var animated = $(this);

				if (animated.attr('animation-tolerance') && animated.attr('animation-tolerance') != '') {
					var animation_tolerance = animated.attr('animation-tolerance');
				} else {
					var animation_tolerance = '100';
				}

				if (animated.attr('animation-delay') && animated.attr('animation-delay') != '') {
					var animation_delay = animated.attr('animation-delay');
				} else {
					var animation_delay = '50';
				}

				if (animated.attr('animation') && animated.attr('animation') != '') {
					var animation = animated.attr('animation');
				} else {
					var animation = 'fadeIn';
				}

				if (animated.attr('animation-reset') == 'true' || animated.attr('animation-reset') == 1 || animated.attr('animation-reset') == '') {
					var animation_reset = true;
				}

				animated.onScreen({
					container: window,
					direction: 'vertical',
					doIn: function() {
						animated.addClass(animation);
						animated.attr('animation-visible', true);
					},
					doOut: function() {
						if (animation_reset) {
							animated.removeClass(animation);
							animated.removeAttr('animation-visible');
						}
					},
					tolerance: animation_tolerance,
					throttle: animation_delay
				});
			});
		}
	}
	// End: Animations
}
/* END: Loader */



$(document).ready(function () {
    if($('#priceee').length) {
        var setHtmlForAppend = $('#priceee').html();
        
        $('.priceeeForAppend').each(function(){
            $(this).html(setHtmlForAppend);
        });
    }
});






//S: scrool stanga-dreapta la Blog/Vlog/eShop/Porto
$(function () {
  //pin scrooler
    $('.left-scroll').click(function (e) {
        e.preventDefault();
        var container = document.getElementById('scroll-div');
        sideScroll(container, 'left', 25, 150, 10);
    });
    $('.right-scroll').click(function (e) {
        e.preventDefault();
        var container = document.getElementById('scroll-div');
        sideScroll(container, 'right', 25, 150, 10);
    });
});

$(document).ready(function () {
    if($('#scroll-div .active').length) {
        //var distance = $( "#scroll-div .active" ).width();
        var distance = 0;
        $('#scroll-div a').each(function(){
            if( $(this).hasClass( "active" ) ) { //daca este cel activ, iesim din bula
                return false;
            }
            distance += $(this).outerWidth(); //masuram distanta div-urilor pana la cel activ
        });
        //alert(distance);
        
        var container = document.getElementById('scroll-div');
        sideScroll(container, 'right', 25, distance, 10);
    }
});

    
function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    var slideTimer = setInterval(function () {
        if (direction == 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }

    }, speed);
}
//E: scrool stanga-dreapta la Blog/Vlog/eShop/Porto


function startNewsletter(autoshow = false) {
	if (!$.cookie('visited')) {
		$.cookie('visited', 0, {
			path:'/',
			expires: 1
		});
	}
	
	var visited = $.cookie('visited'); // vizite="0"

	if (autoshow) {
		setTimeout(function() {
			if (visited < 2) {
				$('#modal-newsletter').modal('show');
				$.cookie('visited', 3, {
				path:'/',
				expires: 1
				});
			}
		}, autoshow);
	}

	if (visited <= 2) {
		visited++; // incrementeaza numarul de vizite
		$.cookie('visited', visited, {
			path:'/',
			expires: 1
		});
	}
	
	if (visited == 2) {
		setTimeout(function() {
			$('#modal-newsletter').modal('show');
		}, 500);
	}

	$('#modal-newsletter').on('shown.bs.modal', function (e) {
		$('#modal-newsletter').addClass('from-newsletter');
	});
}

$(document).ready(function () {
	/* START: Smooth Scroll */
	$('a[href*="#"]').not('.no-scroll').on('click', function () {
		var href = $.attr(this, 'href');
            href = href.split('#');
            href = '#' + href[1];
        
		var element_to_scroll = $("[data-anchor='" + href + "']");
		
		if (element_to_scroll.length) {
            $( ".close-menu" ).trigger( "click" ); //inchidem meniu Mobil
			$('html, body').stop().animate({
				scrollTop: $(element_to_scroll).offset().top - 100
			}, 300, 'linear', function () {
				window.location.hash = href;
			});
			return false;
		}
	});
	/* END: Smooth Scroll */
    
    $(window).trigger('scroll');

});


// S: Hide menu BLOG+VLOG+eShop+Porto on scroll
let oldValue = 0;
//Listening on the event
window.addEventListener('scroll', function(e){
    //activ doar dupa ce trece de el
    var scrollAmountFromTop = $(window).scrollTop();
    
    //BLOG
    if($('#floating-blogNav').length) {
        var blogNavMobile = 0;                  if($('.mobile').length) { blogNavMobile = $('.mobile').outerHeight(); }
        var blogNav = 0;                        if($('header').length) { blogNav = $('header').outerHeight(); }
        var blogNavSubnav = 0;                   if($('#floating-blogNav').length) { blogNavSubnav = $('#floating-blogNav').outerHeight() + 80; }
        var blogBanner = 0;                     if($('.banner').length) { blogBanner = $('.banner').outerHeight(); }
        var blogTotalSpace = blogNav + blogBanner + blogNavMobile + 200;

        if (scrollAmountFromTop > blogTotalSpace) {
            // Get the new Value
            var pageOffset = window.pageYOffset;
            if (pageOffset < 0) {
                pageOffset = 0;
            }
            newValue = pageOffset;

            if(oldValue - newValue < 0){
                $('#floating-blogNav').removeClass('show').css({"top": "inherit"});
                $('.blog-sidebar').css({"top": ""});
            } else if(oldValue - newValue > 0){
                if(isMobile(992)) {
                    $('#floating-blogNav').addClass('show').css({"top": blogNavMobile+"px"});
                } else {
                    $('#floating-blogNav').addClass('show').css({"top": blogNav+"px"});
                    $('.blog-sidebar').css({"top": blogNavSubnav+"px"});
                }
            }

            oldValue = newValue;

        } else {
            $('#floating-blogNav').removeClass('show').css({"top": "inherit"});
            $('.blog-sidebar').css({"top": ""});
        }
    }
    
    //VLOG
    if($('#floating-vlogNav').length) {
        
        var vlogNavMobile = 0;                  if($('.mobile').length) { vlogNavMobile = $('.mobile').outerHeight(); }
        var vlogNav = 0;                        if($('header').length) { vlogNav = $('header').outerHeight(); }
        var vlogNavSubnav = 0;                   if($('#floating-vlogNav').length) { vlogNavSubnav = $('#floating-vlogNav').outerHeight() + 80; }
        var vlogBanner = 0;                     if($('.banner').length) { vlogBanner = $('.banner').outerHeight(); }
        var vlogTotalSpace = vlogNav + vlogBanner + vlogNavMobile + 200;

        if (scrollAmountFromTop > vlogTotalSpace) {
            // Get the new Value
            var pageOffset = window.pageYOffset;
            if (pageOffset < 0) {
                pageOffset = 0;
            }
            newValue = pageOffset;

            if(oldValue - newValue < 0){
                $('#floating-vlogNav').removeClass('show').css({"top": "inherit"});
                $('.vlog-sidebar').css({"top": ""});
            } else if(oldValue - newValue > 0){
                if(isMobile(992)) {
                    $('#floating-vlogNav').addClass('show').css({"top": vlogNavMobile+"px"});
                } else {
                    $('#floating-vlogNav').addClass('show').css({"top": vlogNav+"px"});
                    $('.vlog-sidebar').css({"top": vlogNavSubnav+"100px"});
                }
            }

            oldValue = newValue;

        } else {
            $('#floating-vlogNav').removeClass('show').css({"top": "inherit"});
            $('.vlog-sidebar').css({"top": ""});
        }
        
    }
    
    //eShop
    if($('#floating-eShopNav').length) {
        var eShopNavMobile = 0;                  if($('.mobile').length) { eShopNavMobile = $('.mobile').outerHeight(); }
        var eShopNav = 0;                        if($('header').length) { eShopNav = $('header').outerHeight(); }
        var eShopNavSubnav = 0;                   if($('#floating-eShopNav').length) { eShopNavSubnav = $('#floating-eShopNav').outerHeight() + 80; }
        var eShopBanner = 0;                     if($('.banner').length) { eShopBanner = $('.banner').outerHeight(); }
        var eShopTotalSpace = eShopNav + eShopBanner + eShopNavMobile + 200;

        if (scrollAmountFromTop > eShopTotalSpace) {
            // Get the new Value
            var pageOffset = window.pageYOffset;
            if (pageOffset < 0) {
                pageOffset = 0;
            }
            newValue = pageOffset;

            if(oldValue - newValue < 0){
                $('#floating-eShopNav').removeClass('show').css({"top": "inherit"});
                $('.eShop-sidebar').css({"top": ""});
            } else if(oldValue - newValue > 0){
                if(isMobile(992)) {
                    $('#floating-eShopNav').addClass('show').css({"top": eShopNavMobile+"px"});
                } else {
                    $('#floating-eShopNav').addClass('show').css({"top": eShopNav+"px"});
                    $('.eShop-sidebar').css({"top": eShopNavSubnav+"px"});
                }
            }

            oldValue = newValue;

        } else {
            $('#floating-eShopNav').removeClass('show').css({"top": "inherit"});
            $('.eShop-sidebar').css({"top": ""});
        }
    }
    
    //PORTO
    if($('#floating-portoNav').length) {
        var portoNavMobile = 0;                  if($('.mobile').length) { portoNavMobile = $('.mobile').outerHeight(); }
        var portoNav = 0;                        if($('header').length) { portoNav = $('header').outerHeight(); }
        var portoNavSubnav = 0;                   if($('#floating-portoNav').length) { portoNavSubnav = $('#floating-portoNav').outerHeight() + 80; }
        var portoBanner = 0;                     if($('.banner').length) { portoBanner = $('.banner').outerHeight(); }
        var portoTotalSpace = portoNav + portoBanner + portoNavMobile + 200;

        if (scrollAmountFromTop > portoTotalSpace) {
            // Get the new Value
            var pageOffset = window.pageYOffset;
            if (pageOffset < 0) {
                pageOffset = 0;
            }
            newValue = pageOffset;

            if(oldValue - newValue < 0){
                $('#floating-portoNav').removeClass('show').css({"top": "inherit"});
                $('.porto-sidebar').css({"top": ""});
            } else if(oldValue - newValue > 0){
                if(isMobile(992)) {
                    $('#floating-portoNav').addClass('show').css({"top": portoNavMobile+"px"});
                } else {
                    $('#floating-portoNav').addClass('show').css({"top": portoNav+"px"});
                    $('.porto-sidebar').css({"top": portoNavSubnav+"px"});
                }
            }

            oldValue = newValue;

        } else {
            $('#floating-portoNav').removeClass('show').css({"top": "inherit"});
            $('.porto-sidebar').css({"top": ""});
        }
    }
    
                      
});
// E: Hide menu BLOG+VLOG+eShop+Porto on scroll





/* Start: Multiple GCaptcha */
if (typeof gsitekey !== 'undefined') {
	var CaptchaCallback = function() {
		$('.g-recaptcha').each(function(index, el) {
			var widgetId = grecaptcha.render(el, {'sitekey' : gsitekey});
			$(this).attr('data-widget-id', widgetId);
		});
	};


	$(window).on('resize', function () {
		scaleCaptcha();
	});
	
	/* START: Resize GCaptcha */
	function scaleCaptcha(elementWidth) {
		var reCaptchaWidth = 304;
		var containerWidth = $('.g-recaptcha').parent().width();
		if (containerWidth == 0) {
			var containerWidth = 304;
		}
		if(reCaptchaWidth > containerWidth) {
			var captchaScale = containerWidth / reCaptchaWidth;
			$('.g-recaptcha').css({
				'transform':'scale(' + captchaScale + ')'
			});
		}
	}
	scaleCaptcha();
	/* END: Resize GCaptcha */

}
/* End: Multiple GCaptcha */

$(window).on('load', function () {
	/* Start: Smooth Scroll */
	if (window.location.hash) {
		$('html, body').animate({
			scrollTop: $(window.location.hash).offset().top - 130
		}, 500, 'swing');
	}
	/* End: Smooth Scroll */
});



// S: blog search
$('.searchBlog').click(function(e){
    //e.preventDefault();
    $('.searchBlog').hide();
    $('.searchBlog_close').show();
    $('#searchBlog_view').slideDown();
});

$('.searchBlog_close').click(function(e){
    e.preventDefault();
    $('.searchBlog').show();
    $('.searchBlog_close').hide();
    $('#searchBlog_view').slideUp();
});
// E: blog search


// S: vlog search
$('.searchVlog').click(function(e){
    //e.preventDefault();
    $('.searchVlog').hide();
    $('.searchVlog_close').show();
    $('#searchVlog_view').slideDown();
});

$('.searchVlog_close').click(function(e){
    e.preventDefault();
    $('.searchVlog').show();
    $('.searchVlog_close').hide();
    $('#searchVlog_view').slideUp();
});
// E: vlog search

// S: eShop search
$('.searcheShop').click(function(e){
    //e.preventDefault();
    $('.searcheShop').hide();
    $('.searcheShop_close').show();
    $('#searcheShop_view').slideDown();
});

$('.searcheShop_close').click(function(e){
    e.preventDefault();
    $('.searcheShop').show();
    $('.searcheShop_close').hide();
    $('#searcheShop_view').slideUp();
});
// E: eShop search

// S: Porto search
$('.searchPorto').click(function(e){
    //e.preventDefault();
    $('.searchPorto').hide();
    $('.searchPorto_close').show();
    $('#searchPorto_view').slideDown();
});

$('.searchPorto_close').click(function(e){
    e.preventDefault();
    $('.searchPorto').show();
    $('.searchPorto_close').hide();
    $('#searchPorto_view').slideUp();
});
// E: Porto search


// S: Blog+Vlog progress bar
$('.show-sidebar').on('click', function() {
	if ($(this).hasClass('active')) {
			$('body').removeClass('overflow-hidden');
			$('.blog-sidebar').stop().css('margin-right', '-300px');
            $('.vlog-sidebar').stop().css('margin-right', '-300px');
			$('.sidebar-overlay').stop().fadeOut();
			$(this).removeClass('active');
	} else {
		$('body').addClass('overflow-hidden');
		$('.blog-sidebar').stop().css('margin-right', 0);
        $('.vlog-sidebar').stop().css('margin-right', 0);
		$('.sidebar-overlay').stop().fadeIn();
		$(this).addClass('active');

	}
});

$('.sidebar-overlay').on('click', function() {
	$('.show-sidebar').trigger('click');
});

function showReadProgress(tracked, prepend, offset=0) {
	var t = document.querySelector(tracked),
		e = void 0,
		i = void 0;
	if (t) {
		$(prepend).prepend('<div class="progress-bar"><div></div></div>');


		var s = window.innerHeight,
			n = function () {
				return t.clientHeight + s / 2
			},
			o = function () {
				return n() - s
			},
			r = document.querySelector('.progress-bar > div'),
			a = o(),
			h = function () {
				e = (window.scrollY - t.offsetTop) / a * 100, i = e < 0 ? 0 : e, r.style.width = i + "%"
			},
			l = function () {
				h(), a = o()
			};
		window.addEventListener("scroll", function (t, e) {
			var i = !1;
			return function () {
				i || (t(), i = !0, setTimeout(function () {
					i = !1
				}, e))
			}
		}(h, 100)), window.addEventListener("scroll", function (t, e) {
			var i = void 0;
			return function () {
				clearTimeout(i), i = setTimeout(function () {
					t()
				}, e || 200)
			}
		}(h, 200)), window.addEventListener("resize", l, !0)

		$(window).scroll();

	}
}
$(window).on('load', function () {
	showReadProgress('.scroll-tracker', 'body');
});
// E: Blog progress bar

$(function() {
	// S: Mobile Menu
	var $header = $('.header-mobile'),
		$btnMenu = $('.menu-mobile'),
		$hideMenu = $('.hide-menu, .close-menu');

	$btnMenu.on('click', function () {
		$('body').addClass('overflow-hidden');
		$header.toggleClass('active');

		if ($header.hasClass('active')) {
			$hideMenu.addClass('active');
		}
		else {
			$hideMenu.removeClass('active');
		}
	});
	$hideMenu.on('click', function () {
		$header.removeClass('active');
		$hideMenu.removeClass('active');
		$('body').removeClass('overflow-hidden');
	});

	$('.menu-item-has-children', '.main-menu').on('click', ' > a', function (e) {
		var ww = $(window).width();

		if (ww <=991) {
			var $parent = $(e.target).closest('.menu-item-has-children');
			e.preventDefault();
			$('>.sub-menu', $parent).slideToggle(400);
		}
	});
	// E: Mobile Menu
    
    // S: Mobile Menu USER
	var $headerUser = $('.header-mobile-user'),
		$btnMenuUser = $('.menu-mobile-user'),
		$hideMenuUser = $('.hide-menu, .close-menu-user');

	$btnMenuUser.on('click', function () {
		$('body').addClass('overflow-hidden');
		$headerUser.toggleClass('active');

		if ($headerUser.hasClass('active')) {
			$hideMenuUser.addClass('active');
		}
		else {
			$hideMenuUser.removeClass('active');
		}
	});
	$hideMenuUser.on('click', function () {
		$headerUser.removeClass('active');
		$hideMenuUser.removeClass('active');
		$('body').removeClass('overflow-hidden');
	});
	// E: Mobile Menu USER
});

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip()
	
	// S: Blog search
	/*$('.show-search').on('click', function () {
		$('.search-wrapper').fadeIn(function() {
			$('body').addClass('overflow-hidden');
			$(this).find('input').focus();
		});
	});
	$('.hide-search').on('click', function () {
		$('body').removeClass('overflow-hidden');
		$('.search-wrapper').fadeOut(function() {

		});
	});

	var timeout = null;
	function doDelayedSearch(searchValue) {
		if (timeout) {  
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			$('.search-results').fadeOut(100);
			if (searchValue.length >=3) {
				$.ajax({
					type: 'POST',
					url: UrlForAjax + 'blog/_liveDiverse.php',
					data: '&action=liveSearch&search=' + searchValue,
					dataType: "JSON",
					error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					},
					success: function (data) {
						$('.search-results').html(data['html']);
						$('.search-results').fadeIn(100);
					}
				});
			}
		}, 500);
	}

	$('.search-wrapper input').on('input', function () {
		var value = $(this).val();
		doDelayedSearch(value);
	});*/
	// E: Blog search
	
	// S: Adauga statistica
	if ($('[data-addstat]').length) {
		$('[data-addstat]').on('click', function() {
			var type 	= $(this).data('addstat'),
				root 	= $(this).data('root'),
				root_id = parseInt($(this).data('rootid'));

			if (type && root && root_id) {
				$.ajax({
					type: 'POST',
					url: UrlForAjax + '_liveDiverse.php',
					data: '&action=addStat&type=' + type + '&root=' + root + '&root_id=' + root_id,
					error: function (xhr, ajaxOptions, thrownError) {
						//alert(xhr.status);
						//alert(thrownError);
					},
					success: function (data) {
						//alert('success');
					}
				});
			}
		});
	}
	// E: Adauga statistica

	if ($('.justified-gallery').length) {
		$(document).ready(function() {
			var viewportWidth = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
	
			function rowHeight() {
				if (viewportWidth <= 360) {
					var rowHeight = 200;
				} else if ((viewportWidth > 360) && (viewportWidth <= 576)) {
					var rowHeight = 200;
				} else if ((viewportWidth > 576) && (viewportWidth <= 768)) {
					var rowHeight = 200;
				} else if ((viewportWidth > 768) && (viewportWidth <= 992)) {
					var rowHeight = 200;
				} else {
					var rowHeight = 200;
				}

				return rowHeight;
			}
			
	
			$('.justified-gallery').justifiedGallery({
				rowHeight: rowHeight(),
				captions: false,
				margins: 10,
				selector:'a:not(.caption-item)',
			}).on('jg.complete', function() {

			}).on('jg.resize', function() {

			});
		});
	}

	if ($('.gallery, .justified-gallery').length) {
		$('.gallery, .justified-gallery').each(function() {
			$(this).find(".photoswipe-item").jqPhotoSwipe({
				forceSingleGallery: true
			});
		});
	}

	// S: FlipClock
	if ($('.slide-countdown').length) {
		$('.slide-countdown').each(function() {
			var thisCountdown = $(this);
			var startTime = thisCountdown.attr('data-time');
			thisCountdown.FlipClock(startTime, {
				countdown: true,
				clockFace: 'DailyCounter',
				callbacks: {
					stop: function() {
						thisCountdown.parent().slideUp(500, function() {
							$(this).remove();
						});
						//location.reload();
					}
				}
			});
		});
	}
	// E: FlipClock
	
	/* S: Politici Modal */
	$("a.modal-terms").on("click", function(e) {
		e.preventDefault();
		var link = $(this).attr("href") + " #modal-body";

		$('#modal-terms .modal-body').load(link, function() {
			$('#modal-terms').modal('show');
		});
	});
	/* E: Politici Modal */

	/* S: Video Modal */
	$(".video-thumb").on("click", function(e) {
		e.preventDefault();
		var link = $(this).attr("data-link");
		var title = $(this).attr("data-title");

		$('#modal-video').find('.modal-title').text(title);
		$('#modal-video').find('iframe').attr('src', link);
		$('#modal-video').modal('show');
	});
	$('#modal-video').on('hidden.bs.modal', function () {
		$(this).find('iframe').attr('src', '');
	});
	/* E: Video Modal */
    
    
    /* S: Newsletter Modal */
    if ($('#modal-newsletter').length) {
		startNewsletter();
	}
    /* E: Newsletter Modal */

	/* START: Numbers */
	if ($('.numbers').length) {
		$('.numbers').each(function(){
			$(this).onScreen({
				container: window,
				direction: 'vertical',
				doIn: function() {
					$(this).find('.increase-number').not('.triggered').each(function () {
						$(this).addClass('triggered').prop('Counter', 0).animate({
							Counter: $(this).text()
						}, {
							duration: 5000,
							easing: 'swing',
							step: function (now) {
								$(this).text(Math.ceil(now));
							}
						});
					});
				},
				doOut: function() {},
				tolerance: 0,
				throttle: 50
			});
		});
	}
	/* END: Numbers */

	$('.search-show').on('click', function() {
		$(this).addClass('invisible');
		$('.search-form').fadeIn(300).addClass('active').find('input[name="search"]').focus();
	});

	$(document).mouseup(function(e) {
		var container = $('.search-form');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.removeClass('active').fadeOut(300);
			$('.search-show').removeClass('invisible');
		}
	});

	$('.proiecte-carousel').each(function() {
		new Swiper($(this).find('.swiper-container'), {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 30,
			loop: true,
			simulateTouch: false,
			pagination: {
				clickable: true,
				el: $(this).find('.swiper-pagination'),
				type: 'bullets',
			},
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			breakpoints: {
				768: {
					spaceBetween: 20,
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				400: {
					spaceBetween: 20,
					slidesPerView: 1,
					slidesPerGroup: 1,
				}
			}
		});
	});

	$('.carouselCu3').each(function() {
		new Swiper($(this).find('.swiper-container'), {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 40,
			slidesToScroll: 1,
			autoplay: {
                delay: 5000,
            },
            speed: 500,
			loop: true,

			pagination: {
                clickable: true,
				el: '.swiper-pagination',
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				768: {
					slidesPerView: 2,
                    slidesPerGroup: 2,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 2,
					slidesPerGroup: 2,
                    spaceBetween: 10,
				}
			}
		});
	});
    
    $('.carouselCu3si1m').each(function() {
		new Swiper($(this).find('.swiper-container'), {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 40,
			slidesToScroll: 1,
			autoplay: {
                delay: 5000,
            },
            speed: 500,
			loop: true,

			pagination: {
                clickable: true,
				el: '.swiper-pagination',
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				768: {
					slidesPerView: 1,
                    slidesPerGroup: 1,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 1,
					slidesPerGroup: 1,
                    spaceBetween: 10,
				}
			}
		});
	});
    
    
    $('.carouselCu2').each(function() {
		new Swiper($(this).find('.swiper-container'), {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 50,
			slidesToScroll: 1,
			autoplay: {
                delay: 5000,
            },
            speed: 500,
			loop: true,

			pagination: {
				clickable: true,
				el: $(this).find('.swiper-pagination'),
				type: 'bullets',
			},
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			breakpoints: {
				992: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				}
			}
		});
	});
    
    
    
    $('.carouselCu2_LP').each(function() {
		new Swiper($(this).find('.swiper-container'), {
			  slidesPerView: 2,
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: true,
              loopFillGroupWithBlank: true,
              autoHeight: true, //enable auto height
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              breakpoints: {
                768: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
              }
		});
	});
    

	if ($('.logo-carousel .swiper-container').length) {
		new Swiper('.logo-carousel .swiper-container', {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: '.logo-carousel .swiper-button-next',
				prevEl: '.logo-carousel .swiper-button-prev',
			},
			breakpoints: {
				992: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
				576: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				}
			}
		});
	}
	
	$('.navbar-toggler-icon').html('<i class="fa fa-bars"><i>').on('click', function () {
		if ($(this).find('.fa').hasClass('fa-bars')) {
			$(this).find('.fa').removeClass('fa-bars').addClass('fa-times');
		} else {
			$(this).find('.fa').removeClass('fa-times').addClass('fa-bars');
		}
	});

	/* Start: Back To Top */
	$('#back-to-top').on('click', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 500, 'swing');
	});
	
	if ($(document).scrollTop() > ($(document).height() - $(window).height()  - 600)) {
		$('#back-to-top, .show-sidebar').addClass('show');
		$('.scroll-down').fadeOut();
	} else {
		$('#back-to-top, .show-sidebar').removeClass('show');
		$('.scroll-down').fadeIn();
	}
	/* End: Back To Top */

	/* Start: Smooth Scroll */
	$('a[href^="#"]').on('click', function () {
		var href = $.attr(this, 'href');

		$('html, body').animate({
			scrollTop: $(href).offset().top - 0
		}, 500, 'swing', function () {
			//window.location.hash = href;
		});

		return false;
	});

	/*
	$('.scroll-down').on('click', function () {
		$('html,body').animate({
			scrollTop: $("#content").offset().top
		}, 'slow');
	});
	*/
	/* End: Smooth Scroll */

	/* Start: Form */
	$(document).on('submit', '.HDForm', function (e) {
		e.preventDefault();
		var thisForm = this;

		$(thisForm).find('button[type="submit"]').prop('disabled', 'disabled');

		$(thisForm).find(':input[data-req="yes"]:visible:not(:button):not(:submit):not(:reset):not(:hidden)[data-req=yes]').each(function () { //caut fiecare input din formularul respectiv
			var thisField = formValidateIndv(this);
			$(thisForm).find(':input[data-req="yes"]:visible[name=' + thisField['name'] + ']').removeClass('valid invalid').addClass(thisField['class']);
		});

		$.ajax({
			type: 'POST',
			url: UrlForAjax + 'functions/HDForm.php',
			data: '&action=checkIfValid&invalid=' + $(thisForm).find(':input:visible[data-req=yes].invalid').length,
			dataType: "JSON",
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			},
			success: function (data) {
				
				//alert(JSON.stringify(data));
				if (data['val'] == true) { // formularul este valid
					$(thisForm).find('button[type="submit"]').prop('disabled', false);
					$(thisForm).find(':input:visible[data-req="yes"]:not(:button):not(:submit):not(:reset):not(:hidden)').each(function () {
						$(this).removeClass('valid');
					});
					if ($(thisForm).attr('data-target') == 'external') {
						submitForm(thisForm); //without refresh
					} else {
						HTMLFormElement.prototype.submit.call($(thisForm)[0]); //refresh page
					}
					
				} else { // formularul nu este valid
					if (data['msg']) {
						showResultMessage(data);
					}
					$(thisForm).find('button[type="submit"]').prop('disabled', false);
				}
			}
		});
	});

	var timer = null;
	$(document).on("change paste", '.HDForm :input[data-req="yes"]:visible:not(:button):not(:submit):not(:reset):not(:hidden)', function (e) {
		var thisElement = this;
		var thisField;
		clearTimeout(timer);
		timer = setTimeout(function () {
			thisField = formValidateIndv(thisElement);
			$(thisElement).closest("form.HDForm").find(':input[data-req="yes"]:visible[name=' + thisField['name'] + ']').removeClass('valid invalid').addClass(thisField['class']);
		}, 500)
	});

	function formValidateIndv(input) {
		var fileValidation = "";
		if ($(input).attr('type') == 'file') {
			if ($(input)[0].files[0]) {
				fileValidation += '&filename=' + $(input).val().match(/[^\/\\]+$/);
				fileValidation += '&filesize=' + ($(input)[0].files[0].size / 1024 / 1024).toFixed(2);
				fileValidation += '&fileextension=' + /[^.]+$/.exec($(input).val().match(/[^\/\\]+$/));
			}
		}

		return $.ajax({
			type: 'POST',
			url: UrlForAjax + 'functions/HDForm.php',
			data: '&action=validate&name=' + $(input).attr('name') + '&value=' + $(input).val() + '&req=' + $(input).attr('data-req') + '&type=' + $(input).attr('data-type') + '&range=' + $(input).attr('data-type-range') + fileValidation,
			async: false,
			dataType: "JSON"
		}).responseJSON;
	}

	function submitForm(form) {
		$.ajax({
			type: $(form).attr('method'),
			url: $(form).attr('action'),
			data: $(form).serializefiles(),
			processData: false,
			contentType: false,
			dataType: "JSON",
			success: function (data) {
				//alert(JSON.stringify(data));

				if (!data['error']) {
					if (data['redirect']) {
						window.location = data['redirect'];
						return 0;
					}

					$(form).find('input, textarea').not(':checkbox').not(':submit').not(':hidden').val('');
				}
				if (data['msg']) {
					showResultMessage(data);
				}

				if (typeof gsitekey !== 'undefined') {
					if (data['reset_captcha']) {
						grecaptcha.reset($(form).find('.g-recaptcha').attr('data-widget-id'));
					}
				}
				setTimeout( function() {
					$(form).find('button[type="submit"]').prop('disabled', false);
				}, 500);
			}
		});
	}

	(function ($) {
		$.fn.serializefiles = function () {
			var obj = $(this);
			/* ADD FILE TO PARAM AJAX */
			var formData = new FormData();
			$.each($(obj).find("input[type='file']"), function (i, tag) {
				$.each($(tag)[0].files, function (i, file) {
					formData.append(tag.name, file);
				});
			});
			var params = $(obj).serializeArray();
			$.each(params, function (i, val) {
				formData.append(val.name, val.value);
			});
			return formData;
		};
	})(jQuery);
	/* End: Form */
});

/* S: SCROLLBAR WIDTH */
function getScrollBarWidth () {
	return window.innerWidth - document.documentElement.clientWidth;
}
/* E: SCROLLBAR WIDTH */

/* Start: Alert */
// S: Bootstrap modal in modal
var scrollbarWidth = getScrollBarWidth();
$(document).on('click', '.modal .close', function (e) {
	e.preventDefault();
	
	$(this).closest('.modal').modal('hide');
});

$(document).on('show.bs.modal', '.modal', function (e) {
	var zindex = parseInt($('.modal.show').css('z-index'));
	if (zindex) {
		$(this).css('z-index', zindex + 1);
	}

	$(this).find('.close').removeAttr('data-dismiss');
	if (!$('body').hasClass('modal-open-custom')) {
		$('body').css('padding-right', scrollbarWidth + 'px').addClass("modal-open-custom");
	}
});

$(document).on('hidden.bs.modal', '.modal', function (e) {
	if (!$('.modal.show').length) {
		$('body').removeClass("modal-open-custom").removeAttr('style');
		$(this).removeAttr('style');
	} else {
		$('body').addClass('modal-open').css('padding-right', scrollbarWidth + 'px');
	}
});
// E: Bootstrap modal in modal

/* Start: Alert */
function showResultMessage(dataJSON) {
	//alert(JSON.stringify(dataJSON))
	$.ajax({
		type: 'POST',
		url: UrlForAjax + 'functions/showResultMessage.php',
		data: '&data=' + JSON.stringify(dataJSON),
		success: function (data) {
			$("#form-alert").remove();
			$(".modal-backdrop").remove();

			$('body').append(data);
            
            if ($('#form-alert').attr('data-msgtype') == "alert-success") {
				if ($('#modal-newsletter').hasClass('from-newsletter')) {
					$('#modal-newsletter').removeClass('from-newsletter');
					$('#modal-newsletter').modal('hide');
				}
			}

			if ($('#modal-newsletter').hasClass('from-newsletter')) {
				$('#modal-newsletter').modal('hide');
			}

			$('#form-alert').modal('show');

			if ($('#form-alert').attr('data-autoclose') == "yes") {
				setTimeout(function () {
					$('#form-alert').modal('hide');
				}, 5000);
			};

			$("#form-alert").on("click", function() {
				$('#form-alert').modal('hide');
			});

			$('#form-alert').on('hidden.bs.modal', function () {
				if ($(this).attr('data-refresh')=="yes") {
					location.reload();
				} else {
					$(this).remove();
				};
				$("#form-alert").remove();
				$(".modal-backdrop").remove();
                if ($('#modal-newsletter').hasClass('from-newsletter')) {
					$('#modal-newsletter').modal('show');
				}
			});  
		}
	});
}
/* End: Alert */

$(window).on('scroll', function () {
	/* Start: Back To Top */
	if ($('#back-to-top').length) {
		if ($(document).scrollTop() > ($(document).height() - $(window).height()  - 600)) {
			$('#back-to-top, .show-sidebar').addClass('show');
			$('.scroll-down').fadeOut();
		} else {
			$('#back-to-top, .show-sidebar').removeClass('show');
			$('.scroll-down').fadeIn();
		}
	}
	/* End: Back To Top */

	
	if ($('body').hasClass('t3-header')) {
		if ($(this).scrollTop() >= $('body').position().top + 50) {
			$('header').addClass('fixed color-menu');
		} else if ($(this).scrollTop() <= $('body').position().top + 25) {
			$('header').removeClass('fixed color-menu');
		}
	} else {
		if ($(this).scrollTop() >= $('body').position().top + 150) {
			$('header').addClass('fixed');
		} else if ($(this).scrollTop() <= $('body').position().top + 100) {
			$('header').removeClass('fixed');
		}
	}
});

$(window).on('resize', function () {
	$(this).scroll();
});




// S: Slick Slide with video
if ($('.main-slider').length) {
	var slideWrapper = $(".main-slider"),
		iframes = slideWrapper.find('.embed-player'),
		lazyImages = slideWrapper.find('.slide-image'),
		lazyCounter = 0;

	// POST commands to YouTube or Vimeo API
	function postMessageToPlayer(player, command) {
		if (player == null || command == null) return;
		player.contentWindow.postMessage(JSON.stringify(command), "*");
	}

	// When the slide is changing
	function playPauseVideo(slick, control) {
		var currentSlide, slideType, startTime, player, video;

		currentSlide = slick.find(".slick-current");
		slideType = currentSlide.attr("class").split(" ")[1];
		player = currentSlide.find("iframe").get(0);
		startTime = currentSlide.data("video-start");

		if (slideType === "vimeo") {
			switch (control) {
				case "play":
					if ((startTime != null && startTime > 0) && !currentSlide.hasClass('started')) {
						currentSlide.addClass('started');
						postMessageToPlayer(player, {
							"method": "setCurrentTime",
							"value": startTime
						});
					}
					postMessageToPlayer(player, {
						"method": "play",
						"value": 1
					});
					break;
				case "pause":
					postMessageToPlayer(player, {
						"method": "pause",
						"value": 1
					});
					break;
			}
		} else if (slideType === "youtube") {
			switch (control) {
				case "play":
					postMessageToPlayer(player, {
						"event": "command",
						"func": "mute"
					});
					postMessageToPlayer(player, {
						"event": "command",
						"func": "playVideo"
					});
					break;
				case "pause":
					postMessageToPlayer(player, {
						"event": "command",
						"func": "pauseVideo"
					});
					break;
			}
		} else if (slideType === "video") {
			video = currentSlide.children("video").get(0);
			if (video != null) {
				if (control === "play") {
					video.play();
				} else {
					video.pause();
				}
			}
		}
	}

	// Resize player
	function resizePlayer(iframes, ratio) {
		if (!iframes[0]) return;
		var win = $(".main-slider"),
			width = win.width(),
			playerWidth,
			height = win.height(),
			playerHeight,
			ratio = ratio || 16 / 9;

		iframes.each(function () {
			var current = $(this);
			if (width / ratio < height) {
				playerWidth = Math.ceil(height * ratio);
				current.width(playerWidth).height(height).css({
					left: (width - playerWidth) / 2,
					top: 0
				});
			} else {
				playerHeight = Math.ceil(width / ratio);
				current.width(width).height(playerHeight).css({
					left: 0,
					top: (height - playerHeight) / 2
				});
			}
		});
	}

	// DOM Ready
	$(function () {
		// Initialize
		slideWrapper.on("init", function (slick) {
			slick = $(slick.currentTarget);
			setTimeout(function () {
				playPauseVideo(slick, "play");
			}, 1000);
			resizePlayer(iframes, 16 / 9);
		});
		slideWrapper.on("beforeChange", function (event, slick) {
			slick = $(slick.$slider);
			playPauseVideo(slick, "pause");
		});
		slideWrapper.on("afterChange", function (event, slick) {
			slick = $(slick.$slider);
			playPauseVideo(slick, "play");
		});
		slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
			lazyCounter++;
			if (lazyCounter === lazyImages.length) {
				lazyImages.addClass('show');
				// slideWrapper.slick("slickPlay");
			}
		});

		//start the slider
		slideWrapper.slick({
			infinite: true,
			fade: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 12000,
			lazyLoad: "progressive",
			speed: 600,
			cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
			responsive: [
				{
					breakpoint: 1270,
					settings: {
						arrows: false,
					}
				}
			]
		});
	});

	// Resize event
	$(window).on("resize.slickVideoPlayer", function () {
		resizePlayer(iframes, 16 / 9);
	});
}
// E: Slick Slive with video 

// S: Bootstrap dropdown toggle on hover
function toggleDropdown (e) {
	const _d = $(e.target).closest('.dropdown'),
		_m = $('.dropdown-menu', _d);
	setTimeout(function(){
		const shouldOpen = e.type !== 'click' && _d.is(':hover');
		_m.toggleClass('show', shouldOpen);
		_d.toggleClass('show', shouldOpen);
		$('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
	}, e.type === 'mouseleave' ? 300 : 0);
}

$('body')
	.on('mouseenter mouseleave','.dropdown',toggleDropdown)
	.on('click', '.dropdown-menu a', toggleDropdown);
// E: Bootstrap dropdown toggle on hover

// S: Detect if submenu outside viewport
$('.dropdown-item .dropdown-toggle').on('mouseover', function() {
	var jqueryelem = $(this).parent().find('.dropdown-submenu');
	var elem = jqueryelem[0];
	var bounding = elem.getBoundingClientRect();
	if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
		jqueryelem.css({'left': 'auto', 'right': '100%'});
	}
});
// E: Detect if submenu outside viewport

// S: Blog+Vlog
$('.show-comment-form').click(function(){
	$('.comment-form-principal').stop().slideToggle(200);
});
$('.comment-form-principal form').submit(function(e){
	//e.preventDefault();
	//var idArticol = $('#comments-list').attr('data-idArticol');
	var formSerialize = $(this).serialize();
	$.ajax({
		type: 'POST',
		url: UrlForAjax+'_liveDiverse.php',
		data: formSerialize,
		dataType:"JSON",
		success: function(data) {
			/*if (data['msg_type'] == 'positive') {
				$('.comment-form-principal form').find("textarea[name=comentariu]").val("");
			}*/
			showResultMessage(data);
		}
	});
	return false;
});
/*
$(document).on('click', 'a.show-comments-toggle', function() {
	$(this).parent().parent().find('.comments').stop().slideToggle();
});
*/
$(document).on('click', 'a.add-comment-toggle', function() {
	/* Start: reCaptcha ajax comment */
	if (typeof gsitekey !== 'undefined') {
		$(this).parent().parent().find('.g-recaptcha').each(function(index, el) {
			var widgetId = grecaptcha.render(el, {'sitekey' : gsitekey});
			$(this).attr('data-widget-id', widgetId);
		});
	}
	/* End: reCaptcha ajax comment */

	$(this).parent().parent().find('.add-comment').stop().slideToggle(200);
});
$(document).on('submit', '.comment-form', function(e){
	//e.preventDefault();
	/*if ($("#comments-list-blog").length) {
        var idArticol = $('#comments-list-blog').attr('data-idarticol');
    } 
    if ($("#comments-list-vlog").length) {
        var idArticol = $('#comments-list-vlog').attr('data-idarticol');
    }*/
    
    
	var formSerialize = $(this).serialize()
	$.ajax({
		type: 'POST',
		url: UrlForAjax+'_liveDiverse.php',
		data: formSerialize,
		dataType:"JSON",
		success: function(data) {
			/*if (data['msg_type'] == 'positive') {
				$('.comment-form').find("textarea[name=comentariu]").val("");
			}*/
			showResultMessage(data);
		}
	});
	return false;
});

$(document).on('click','input[name="notif_reply"], input[name="notif_all"]', function(e) {
	var review_add_email = $(this).parent().parent().parent().find('.review-add-email');
	var all_checks = $(this).parent().parent().find('input[type="checkbox"]');
	if ($(this).is(":checked")) {
		review_add_email.slideDown(200);
	} else {
		var box_is_checked = 0;
		all_checks.each( function() {
			if ($(this).is(":checked")) {
				box_is_checked = 1;
				return false;
			}
		});
		if (!box_is_checked) {
			review_add_email.slideUp(200);
		}
	}
});
$(document).on('click', '#comments-list-blog .paginare a',  function() {
	$('html,body').animate({scrollTop: $('#comments-list-blog').offset().top - 175}, 200);
	$('#comments-list-blog').hide().parent().addClass("not-loaded").find('.page-preloader-cover').fadeIn(500);
	$('#comments-list-blog').load(this.href, function() {
		$(this).fadeIn(500).parent().removeClass("not-loaded").find('.page-preloader-cover').fadeOut(500);
	});
	
	return false;
});
$(document).on('click', '#comments-list-vlog .paginare a',  function() {
	$('html,body').animate({scrollTop: $('#comments-list-vlog').offset().top - 175}, 200);
	$('#comments-list-vlog').hide().parent().addClass("not-loaded").find('.page-preloader-cover').fadeIn(500);
	$('#comments-list-vlog').load(this.href, function() {
		$(this).fadeIn(500).parent().removeClass("not-loaded").find('.page-preloader-cover').fadeOut(500);
	});
	
	return false;
});
$(window).on("load", function() {
	if ($("#comments-list-blog").length) {
		var idArticol= $("#comments-list-blog").attr('data-idarticol');
		$('#comments-list-blog').load(UrlForAjax + 'blog/blog-comments.php?idArticol=' + idArticol, function() {
		});
	}
    if ($("#comments-list-vlog").length) {
		var idArticol= $("#comments-list-vlog").attr('data-idarticol');
		$('#comments-list-vlog').load(UrlForAjax + 'video/vlog-comments.php?idArticol=' + idArticol, function() {
		});
	}
});
// E: Blog+Vlog








//S: ONLY NUMBER IMPUT
function onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
//E: ONLY NUMBER IMPUT

/* S: INFINIT SCROLL */
if($('#incarcaMaiMultWrapp').length) {
	var ajaxLoadInfinit = $('#incarcaMaiMultWrapp').attr('data-infinit');

	if ($('.pageGroup[data-end-page="true"]').length) {
		$('#incarcaMaiMult').hide();
	}

	if (typeof ajaxLoadInfinit !== "undefined") {
		$(window).scroll(function loadProducts() {
			var lastScrollTop = 0;
			var containerHeight = $('#incarcaMaiMultWrapp').parent().height();
			var containerStart = $('#incarcaMaiMultWrapp').parent().offset().top;
			var containerEnd = containerStart + containerHeight;
			var windowHeight = $(window).height();
			var windowStart = $(document).scrollTop();
			var windowEnd = windowStart + windowHeight;
			var bottomLimit = (containerEnd - windowHeight)+containerStart;
			var get_page = $('#incarcaMaiMult').attr('data-page');
			$('.pageGroup').each(function() {
				var Top = $(this).offset().top;
				var Bottom = $(this).offset().top + $(this).height();
				if(windowStart>=Top && windowStart<=Bottom){
					var thisPage = parseInt($(this).attr('data-page'));
					var nextPage = thisPage + 1;
					if($('.pageGroup[data-page="'+ nextPage +'"]').length==0){//next
						if(!$('#incarcaMaiMult').hasClass('loading')){
							$('#incarcaMaiMult').addClass('loading');
							$.ajax({
								type: 'GET',
								url: window.location,
								data:  {viewAll: '1', jsActive: '1', pagina: nextPage},
								dataType: "JSON",
								success: function(data) {							
									if (data['data']) {
										$(data['data']).insertAfter($('.category').find('.pageGroup[data-page="' + thisPage + '"]') );
										$('#incarcaMaiMult').attr('data-page', nextPage);
										$('#incarcaMaiMult').removeClass('loading');

										initiateLightbox();
										initiateTooltip($('.pageGroup[data-page=' + nextPage + ']'));

										if ($('.pageGroup[data-end-page="true"]').length) {
											$('#incarcaMaiMult').hide();
										}
									} else {
										$('#incarcaMaiMultWrapp').removeClass('loading').fadeOut(500);
									}						 		
								}
							});
						}
					}
					var pagina = getUrlVars()["pagina"];
					if(pagina!=$(this).attr('data-page')) {
						history.replaceState({path: window.location.href,scrollTop: $(window).scrollTop()}, null, updateQueryStringParameter(window.location.href, 'pagina', $(this).attr('data-page')));
						return false;
					}
				}
			});
		});
	}

	$("#incarcaMaiMult").not(".loading").on("click", function() {
		var nextPage = parseInt($(this).attr('data-page')) + 1;
		$('#incarcaMaiMult').addClass('loading');
		history.replaceState({path: window.location.href, scrollTop: $(window).scrollTop()}, null, updateQueryStringParameter(window.location.href, 'pagina', nextPage));
		$.ajax({
			type: 'GET',
			url: window.location,
			data:  {viewAll:'1',jsActive:'1', pagina:nextPage },
			dataType:"JSON",
			success: function(data) {
				if (data['data']) {
					$(data['data']).insertBefore( $('.category').find('#insertBeforeClear') );
					
					initiateLightbox();
					initiateTooltip($('.pageGroup[data-page=' + nextPage + ']'));

					$('#incarcaMaiMult').attr('data-page', nextPage);
					$('#incarcaMaiMult').removeClass('loading');
					if ($('.pageGroup[data-end-page="true"]').length) {
						$('#incarcaMaiMult').hide();
					}
				} else {
					$('#incarcaMaiMultWrapp').removeClass('loading').fadeOut(500);	 
				}					 		
			}
		});
	});

	// Scroll To pentru click pe link-uri
	$(document).on("click", ".pageGroup .product-box", function() {
		var scrollToProductIDV = $(this).find(".idpv").find("a").attr('data-idpv');
        
		var currentPage = $(this).closest(".pageGroup").attr('data-page');
        
		// Afecteaza istoricul browserului modificand pagina curenta
		history.replaceState({path: window.location.href,scrollTop: $(window).scrollTop()}, null, updateQueryStringParameter(window.location.href, 'pagina', currentPage + "#scroll-to-" + scrollToProductIDV));
	})
	// Scroll To pentru click pe link-uri
    
    // Scroll To pentru click in quickview
	/*$(document).on("click", ".showQuickView", function() {
		var scrollToProductID = $(this).closest('#JSappendQuickView').find(".addToBag").attr('data-idpv');
		var currentPage = $('.addToBag[data-idpv="' + scrollToProductID + '"]').closest(".pageGroup").attr('data-page');
		// Afecteaza istoricul browserului modificand pagina curenta
		history.replaceState({path: window.location.href,scrollTop: $(window).scrollTop()}, null, updateQueryStringParameter(window.location.href, 'pagina', currentPage + "#scroll-to-" + scrollToProductID));
	})*/
	// Scroll To pentru click in quickview

	// Scroll pe produs on window load
	//$(window).on("load", function() {
        //alert(window.location.hash);
		if (window.location.hash.includes("scroll-to-")) {
			if ($(window).width() < 1100) {
				var offsetMeniu = 60;
			} else {
				var offsetMeniu = 70;
			}
            
			var scrollToProductIDV = window.location.hash.replace("#scroll-to-", '');
			var scrollToProduct = $(".idpv a[data-idpv='" + scrollToProductIDV +"']").closest(".product-box");
            //alert(scrollToProduct.offset());
            
			if (scrollToProduct.length) {
				$('html, body').animate({
					'scrollTop': scrollToProduct.offset().top - offsetMeniu
				}, 1, 'swing');
			}
		}
		//console.log('Hash-ul este: ' + window.location.hash);
	//});
	// Scroll pe produs on window load
}
/* E: INFINIT SCROLL */





/* S: URL FUNCTIONS - pt. categorie, memorare pagina si scroll pana la produs*/
function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
	  return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
	  return uri + separator + key + "=" + value;
	}
  }
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
/* E: URL FUNCTIONS */





function updateProductDetails(JS_idProdus,JS_av) {
	$.ajax({
		type: 'GET',
		url: setUrlForAjax+'eshop/product-include.php',
		data: '&JS_idProdus='+JS_idProdus+'&JS_av='+JS_av+'&JS_update=1&JS_on=1',
		beforeSend: function() {
			loading();
		},
		success: function(data) {
			loading(false);
			$('#JSappendPDetails').html(data);

			markVariant();
            eshop_rezervaInMag();
	
			initiateProductImagesCarousel();
			initiateLightbox();
			activateProductDetailsButtons();
		}
	});
}

function activateProductDetailsButtons() {
	if ($('.customVatiante').length === 0 ) {
		if($('.addToBag').length){
			$('.addToBag').addClass('active');
		}
	} else {
		if ($('.switch').length) {
			var numberOfSelects = $('.customVatiante').length;
			var numberOfSelectedItems = 0;
			$('.switch.selected ').each(function( ) {
				if(!$(this).hasClass('inactive')){
					numberOfSelectedItems++;
				}
			});
			if(numberOfSelects == numberOfSelectedItems){
				$('.addToBag').addClass('active');
			}
		}else if($('.dropdownSelector').length){
			var numberOfSelects = $('.customVatiante').length;
			var numberOfSelectedItems = 0;
			$('.dropdown-selector-droplist-option.selected ').each(function( ) {
				if(!$(this).hasClass('inactive')){
					numberOfSelectedItems++;
				}
			});
			if(numberOfSelects == numberOfSelectedItems){
				$('.addToBag').addClass('active');
			}
		}
	}
}
if ($('#productDetailsPrice').length){
	activateProductDetailsButtons();
}



// S: Photoswipe
function initiateLightbox() {
	$('.gallery-fancybox').fancybox({
		loop: true,
		/*transitionEffect : "circular",*/
		selector: '.gallery-item',
		backFocus: false,
		youtube: {
			controls : 1,
			showinfo : 0
		},
		buttons: [
			"zoom",
			"fullScreen",
			"thumbs",
			"close",
			'share'
		]
	});

	$('.single-gallery-item-fancybox').fancybox({
		youtube : {
			controls : 1,
			showinfo : 0
		},
		buttons: [
			"zoom",
			"fullScreen",
			"close"
		]
	});
}
initiateLightbox();
// E: Photoswipe



function initiateTooltip(element = $('body')) {
	element.find('[data-toggle="tooltip"]').tooltip();
}



// S: Filtre
$(document).on("click", '#sideBarForm .filter-item', function(e) {
	/*var checkbox = $(this).find('input:checkbox');
	if (checkbox.length) { 
        if (checkbox.is(":checked")) {
            $(this).toggleClass('active');
            checkbox.prop("checked", false);
        } else {
            $(this).toggleClass('active');
            checkbox.prop("checked", true);
        }

		$('#sideBarForm').submit();
		return false;
	}*/
    $('#sideBarForm').submit();
});

$(document).on("click", '.filter-toggle', function(e) {
    e.preventDefault();
    var htmlToAppend = $(".side-filter").html();
    var htmlToAppendCheck = $("#offcanvasCatFilter .offcanvas-body").html();
    
    //if(htmlToAppendCheck == '-') {
        $("#offcanvasCatFilter .offcanvas-body").html('');
        $("#offcanvasCatFilter .offcanvas-body").append( htmlToAppend );
        //$(".side-filter").html(''); //reset  
    //}
});

$(document).ready(function(){
    if ($("#filtreShop").length) {
        
        $.ajax({
            type: 'GET',
            url: get_url,
            data:"&JS_onS=1",
            success: function(data) {

                $('div[id^="filtreShop"]').html(data);

            }
        });
        
    }
});
// E: Filtre




// S: Quickview
//detectam daca apasa BACK din browser 
//si daca exista quickview deschis -? il inchidem..
window.onload=function(){
    State=0;

    $("#modal-quickview").on("show.bs.modal",function(){
        path=window.location.pathname+window.location.search;
        history.pushState("hide",null,path);
        history.pushState("show",null,path);
        State="show";
    })
    .on("hidden.bs.modal",function(){
        if(!!State)
            history.go(State=="hide"?-1:-2);
    });

    setTimeout(function(){// fix old webkit bug
        window.onpopstate=function(e){
            State=e.state;
            if(e.state=="hide"){
                $("#modal-quickview").modal("hide");
            }
        };
    },999);
};




$(document).on('click', '.showQuickView ', function(e) {
    e.preventDefault();
	var data = $(this).data();
    var quickViewLinkSett = data['link'];
	var modal = $('#modal-quickview');
	var modal_body = $('#modal-quickview').find('.modal-body');

	$.ajax({
		type: 'GET',
		url: setUrlForAjax+'eshop/product-quickview.php',
		data:'&idv=' + data['idv'] + '&JS_idProdus=' + data['id'] + '&JS_on=1',
		beforeSend: function(data) {
			loading();
		},
		success: function(data) {
            
            $(".quickViewLinkAdd").attr({ href: quickViewLinkSett });
            
			loading(false);

			modal_body.html(data);
			
			activateProductDetailsButtons();

			initiateLightbox();

			initiateTooltip($('#modal-quickview'));

			modal.modal('show');

			markVariant('#modal-quickview');
            eshop_rezervaInMag();
		}
	});
});


function updateQuickviewDetails(JS_idProdus, JS_av) {
	var modal_body = $('#modal-quickview').find('.modal-body');

	$.ajax({
		type: 'GET',
		url: setUrlForAjax+'eshop/product-quickview.php',
		data: '&JS_idProdus='+JS_idProdus+'&JS_av='+JS_av + '&JS_on=1',
		beforeSend: function() {
			loading();
		},
		success: function(data) {
			loading(false);
			modal_body.html(data);

			initiateProductImagesCarousel();
			activateProductDetailsButtons();
			initiateLightbox();
			markVariant('#modal-quickview');
            eshop_rezervaInMag();
		}
	});
}

$(document).on('hidden.bs.modal', '#popup-play', function (e) {
	e.stopPropagation();
});
$(document).on('hidden.bs.modal', '#modal-quickview', function (e) {
	$(this).find('.modal-body').html('');
});
$(document).on('shown.bs.modal', '#modal-quickview', function (e) {
	initiateProductImagesCarousel();
});
// E: Quickview



// S: Alerta stoc
$(document).on("click", '.addToAStoc', function(e){
	e.preventDefault();
	if($('#alertaStoc').length != 0){
		$('#alertaStoc').remove();
	}
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_alerta-stoc.php',
		data:'&idProdus='+$(this).attr('data-id')+'&idVariant='+$(this).attr('data-idpv'),
		success: function(data) {
			$('body').append(data);
			
			$('#alertaStoc').modal('show');
		}
	});
	return false;
});

$(document).on('submit', '#alertaStocForm, #ProdusAlertaStocForm', function(e) {
	e.preventDefault();

	var thisForm = $(this);
	thisForm.find('.alert').remove();

	var idProdus = thisForm.find('input[name="idProdus"]').val();
	var idVariant = thisForm.find('input[name="idVariant"]').val();

	var emailInput = thisForm.find('input[name="email"]');
	var email = emailInput.val();
	
	var agreeTermsInput = thisForm.find('input[name="agreeTerms"]');
	var agreeTerms = 1;
	if (agreeTermsInput.is( ":checked" ) ) {
		agreeTerms = 1;
	}

	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		dataType:"JSON",
		data: '&action=produse_alerta_stoc&agreeTerms='+agreeTerms+'&idProdus='+idProdus+'&idVariant='+idVariant+'&email='+email,
		success: function(data) {
			if (data['error']) {
				thisForm.prepend('<div class="alert alert-danger">'+data['msg']+'</div>');
			} else {
				emailInput.val("");
				thisForm.prepend('<div class="alert alert-success">'+data['msg']+'</div>');
				setTimeout(function() {
					if ($('#alertaStoc').hasClass('show')) {
						$('#alertaStoc').modal('hide');
					} else {
						thisForm.find('.alert').slideUp(function() {
							$(this).remove();
						});
					}
				}, 10000); //inchidere automata
			}
		}
	});
	return false;
});

$('#alertaStoc').on('hidden.bs.modal', function () {
	$(this).remove();
});
// E: Alerta stoc






// S: Loading for ajax
function loading(start = true) {
	if (start) {
		$("body").addClass("loading").css('padding-right', scrollbarWidth + 'px').prepend('<div id="loader"><div class="custom-loader"></div></div>');
	} else {
		$("#loader").fadeOut(function() {
			$("body").removeClass("loading");
			$(this).remove();

			if (!$('.modal.show').length) {
				$("body").removeAttr("style");
			}
		});
	}
}
// E: Loading for ajax





// S: Wishlist
$(document).on("click", '.addToFavorites, .addToFavorites_byList',function(e){
	e.preventDefault;
	var thisElement = this;
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: '&action=produse_addDel_favorite&idProdus='+$(thisElement).attr('data-val'),
		success: function(data) {
			//loadFavorites();
            loadFavoritesNumbers();

			var allWishlistButtons = $('body').find('.addToFavorites_byList[data-val="'+$(thisElement).attr('data-val')+'"]');
			allWishlistButtons.each(function() {
				$(this).toggleClass('added')
			});

			if($(thisElement).hasClass('addToFavorites')){
				location.reload();
			}
		}
	});
	return false;
});

function loadFavoritesNumbers() {
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: '&action=produse_favorite_number',
		dataType:"JSON",
		success: function(data) {
			var badge = $('.jsHeadNoPfav')
			if (badge.length) {
				if (data > 0) {
                    badge.removeClass('d-none');
					badge.addClass('d-inline-block');
				} else {
                    badge.removeClass('d-inline-block');
					badge.addClass('d-none');
				}
				badge.html(data);
			}
		}
	});
}

function loadFavorites() {
	/*$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: '&action=produse_getHead_favorite',
		dataType:"JSON",
		success: function(data) {
			$('.side-wishlist .drawer-content').html(data['content']);

			var badge = $('.wishlist-toggle .fav-items')
			if (badge.length) {
				if (data['number'] > 0) {
					badge.removeClass('invisible');
				} else {
					badge.addClass('invisible');
				}
				badge.html(data['number']);
			}

			loadProductImage();
		}
	});*/
}
// E: Wishlist




/*scrool left-right */
$(document).ready(function(){
    new KeenSlider("#my-keen-slider-categories", {
        mode: "free",
        loop: false,
        slides: {
          origin: "center",
          perView: 1,
          spacing: 1,
        },
        breakpoints: {
            "(min-width: 375px)": {
                slides: { perView: 4, spacing: 1 },
            },
            "(min-width: 768px)": {
                slides: { perView: 5, spacing: 1 },
            },
            "(min-width: 992px)": {
                slides: { perView: 6, spacing: 1 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 8, spacing: 1 },
            },
        },
    })
    
    new KeenSlider("#my-keen-slider-categories-jos", {
        mode: "free",
        loop: false,
        slides: {
          origin: "center",
          perView: 1,
          spacing: 1,
        },
        breakpoints: {
            "(min-width: 375px)": {
                slides: { perView: 4, spacing: 1 },
            },
            "(min-width: 768px)": {
                slides: { perView: 5, spacing: 1 },
            },
            "(min-width: 992px)": {
                slides: { perView: 6, spacing: 1 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 8, spacing: 1 },
            },
        },
    })
});


/*scrool left-right */
$(document).ready(function(){
    new KeenSlider("#my-keen-slider-brandsWeek", {
        mode: "free",
        loop: false,
        slides: {
          origin: "center",
          perView: 1,
          spacing: 1,
        },
        breakpoints: {
            "(min-width: 375px)": {
                slides: { perView: 4, spacing: 1 },
            },
            "(min-width: 768px)": {
                slides: { perView: 5, spacing: 1 },
            },
            "(min-width: 992px)": {
                slides: { perView: 6, spacing: 1 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 8, spacing: 1 },
            },
        },
    })
});








// S: Variants
function initiateVariants(parent = '#JSappendPDetails') {
	$(document).on("click", parent + ' .customVatiante .switch',function(e){
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			$(this).children('input:radio').prop("checked", false)
		}else{
			$(this).parent().parent().find('.switch').removeClass('selected');
			$(this).addClass('selected');
			$(this).children('input:radio').prop("checked", true);
		}
		var JS_av ='',val,idatribut;
		$(parent).find('.customVatiante').each(function( index ) {
			val = $(this).find('.switch.selected input:radio').val();
			idatribut = $(this).find('.switch.selected input:radio').attr('data-idatribut');
			if( !isNaN(val) && !isNaN(idatribut) ){
				JS_av += idatribut+'-'+val+'|';
			}
		});

		JS_av = JS_av.slice(0, -1);
		if (parent == '#modal-quickview') {
			updateQuickviewDetails(parseInt($(parent).find('#JS_idProdus_val').attr('data-val')),JS_av);
		} else {
			updateProductDetails(parseInt($(parent).find('#JS_idProdus_val').attr('data-val')),JS_av);
		}

		return false;
	});
	
	$(document).on("click", parent + ' .customVatiante .dropdownSelector .dropdown-selected',function(e){
		$(this).parent().toggleClass('open');
	});
	
	$(document).on("click", parent + ' .customVatiante .dropdownSelector .dropdown-selector-droplist .dropdown-selector-droplist-option',function(e){
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
		$(this).parent().parent().parent().find('.dropdown-selected').addClass('selected-option').html($(this).html()).click();
		var JS_av ='',val,idatribut;
		$('.customVatiante').each(function( index ) {
			val = $(this).find('.dropdown-selector-droplist-option.selected').attr('data-value');
			idatribut = $(this).find('.dropdown-selector-droplist-option.selected').attr('data-idatribut');
			if( !isNaN(val) && !isNaN(idatribut) ){
				JS_av += idatribut+'-'+val+'|';
			}
		});

		JS_av = JS_av.slice(0, -1);
		if (parent == '#modal-quickview') {
			updateQuickviewDetails(parseInt($(parent).find('#JS_idProdus_val').attr('data-val')),JS_av);
		} else {
			updateProductDetails(parseInt($(parent).find('#JS_idProdus_val').attr('data-val')),JS_av);
		}

		return false;
	});
	
	$(document).mouseup(function (e){
		var container = $("#JSappendPDetails .customVatiante .dropdownSelector");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$(parent + ' .customVatiante .dropdownSelector.open .dropdown-selected').click();
		}
	});
	
	$(document).ready(function(e) {
		if($(parent + ' .customVatiante .dropdownSelector .dropdown-selector-droplist-option.selected').length){
			var thisSelected = $(parent + ' .customVatiante .dropdownSelector .dropdown-selector-droplist-option.selected');
			$(thisSelected).each(function(i) {
				$(this).parent().parent().parent().find('.dropdown-selected').addClass('selected-option').html($(this).html());
			});
		}
	});
    
}

function markVariant(parent = '#JSappendPDetails') {
	if($(parent + ' .customVatiante .dropdownSelector .dropdown-selector-droplist-option.selected').length){
		var thisSelected = $(parent + ' .customVatiante .dropdownSelector .dropdown-selector-droplist-option.selected');
		$(thisSelected).each(function(i) {
			$(this).parent().parent().parent().find('.dropdown-selected').addClass('selected-option').html($(this).html());
		});
	}
}

initiateVariants();
initiateVariants('#modal-quickview');

markVariant();
eshop_rezervaInMag();
// S: Variants



function eshop_rezervaInMag() {
    $(document).ready(function(e) {
        if ($("#rezervaInMag_append").length) {
            var codProdus = $(this).find('.only-product-code').text(); 
            //alert(codProdus);
            $.ajax({
                type: 'GET',
                url: setUrlForAjax+'eshop/product-ajax-inmag.php',
                data:"&JS_onS=1&codProdus="+codProdus,
                success: function(data) {
                    if(data) {
                        $('#rezervaInMag_append').html(data).removeClass("d-none").collapse('show'); 
                    }

                }
            });

        }
    });
}




// S: Features carousel
$('.features-carousel').each(function() {
	new Swiper($(this), {
		slidesPerView: '4',
		spaceBetween: 10,
		loop: true,
		autoplay: {
			delay: 3000,
		},
		breakpoints: {
			1200: {
				slidesPerView: '4',
			},
			992: {
				slidesPerView: '3',
			},
			768: {
				slidesPerView: '3',
			},
			576: {
				slidesPerView: '3',
			},
			324: {
				slidesPerView: '2',
			},
            0: {
				slidesPerView: '1',
			},
		},
		navigation: {
			nextEl: $(this).find('.swiper-button-next'),
			prevEl: $(this).find('.swiper-button-prev'),
		}
	});
});
// E: Features carousel

// S: Product image slider
function initiateProductImagesCarousel(selector = $('.product-images-slider').not('.swiper-container-initialized')) {
	selector.each(function() {

		var swiperInitOn = $(this);
		var mySwiper = new Swiper(swiperInitOn, {
			effect: 'fade',
			loop: true,
			fadeEffect: {
				crossFade: true
			},
			slidesPerView: 1,
			spaceBetween: 20,
			lazy: true,
			navigation: {
				nextEl: swiperInitOn.find('.swiper-button-next'),
				prevEl: swiperInitOn.find('.swiper-button-prev'),
			},
			pagination: {
				clickable: true,
				el: swiperInitOn.find('.swiper-pagination'),
				type: 'bullets',
			},
			init: false
		});

		var thumbs = swiperInitOn.parent().parent().find('.thumbs a').not('.not-slide');
		mySwiper.on('init slideChange', function () {
			var slideNr = mySwiper.activeIndex - 1;
			thumbs.removeClass('active').eq(slideNr).addClass('active');

			if (!thumbs.hasClass('active')) {
				thumbs.eq(0).addClass('active');
			}
		});

		mySwiper.init();

		thumbs.on('click', function() {
			var slideNr = $(this).index() + 1;
			mySwiper.slideTo(slideNr, 200, false);
		});
	});
}
initiateProductImagesCarousel();
// E: Product image slider




// S: Review
$('#reviewForm').submit(function(e){
	e.preventDefault;
	var idProdus = $('#JS_idProdus_val').attr('data-val');
	var formSerialize = $(this).serialize()
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: formSerialize+'&idProdus='+idProdus,
		dataType:"JSON",
		success: function(data) {
			if (data['msg_type'] == 'alert-success') {
				$('#reviewForm').find("textarea[name=comentariu]").val("");
                $('#review-form').slideUp(200);
			}
			showResultMessage(data);
		}
	});
	return false;
});

$(document).on('submit', '.comment-form', function(e) {
	e.preventDefault;
	var idProdus = $('#JS_idProdus_val').attr('data-val');
	var formSerialize = $(this).serialize()
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: formSerialize+'&idProdus='+idProdus,
		dataType:"JSON",
		success: function(data) {
			if (data['msg_type'] == 'alert-success') {
				$('.comment-form').find("textarea[name=comentariu]").val("");
                $('.comment-content-wrapper').slideUp(200);
			}
			showResultMessage(data);
		}
	});
	return false;
});


$(document).on('click','input[name="notif_reply"], input[name="notif_all"]', function(e) {
	var review_add_email = $(this).parent().parent().parent().find('.review-add-email');
	var all_checks = $(this).parent().parent().find('input[type="checkbox"]');
	if ($(this).is(":checked")) {
		review_add_email.slideDown(200);
	} else {
		var box_is_checked = 0;
		all_checks.each( function() {
			if ($(this).is(":checked")) {
				box_is_checked = 1;
				return false;
			}
		});
		if (!box_is_checked) {
			review_add_email.slideUp(200);
		}
	}
});

$(document).on('click', '#review-lista .pagination a',  function() {
	$('html,body').animate({scrollTop: $('#review-lista').offset().top - 175}, 200);
	$('#review-lista').hide().parent().addClass("not-loaded").find('.custom-loader-wrapper').fadeIn(500);
	$('#review-lista').load(this.href, function() {
		$(this).fadeIn(500).parent().removeClass("not-loaded").find('.custom-loader-wrapper').fadeOut(500);
	});
	return false;
});

$(window).on("load", function() {
	if ($("#reviewScroll").length) {
		var id_produs_details = $('#JS_idProdus_val').attr('data-val');
		$('#review-lista').load(setUrlForAjax + 'eshop/product-review-lista.php?idProdus=' + id_produs_details, function() {
			$(this).parent().removeClass("loading").find('.custom-loader-wrapper').fadeOut(500);
		});
	}
});
// E: Review






// S: Ajax Load Produse
$(window).on("load", function() {
	$('.ajax-product-slider[data-autoload]').each( function() {
		ajaxLoadProducts($(this));
	});
});

function ajaxLoadProducts(selector) {
	if (selector.length && !selector.hasClass('loaded')) {
		var data = selector.data();
		var hide = data['hide'] ? 1 : 0;
	
		var params = {
			idProdus: data['idprodus'] ? data['idprodus'] : 0,
			idCategorie: data['idcategorie'] ? data['idcategorie'] : 0,
			action: data['action'],
			type: data['type'] ? data['type'] : 0,
			limit: data['limit'] ? data['limit'] : 0,
			responsive: data['responsive'] ? data['responsive'] : 0
		};
	
		$.ajax({
			type: 'POST',
			url : setUrlForAjax + 'eshop/product-ajax-load.php',
			data: {data: JSON.stringify(params)},
			dataType: 'json',
			success: function(data) {
				selector.addClass('loaded');
				selector.html(data['html']);

				initiateLightbox();
				initiateTooltip(selector);
	            
                var wrapper = selector.closest(".ajax-product-slider-wrapper");
                //var carousel = wrapper.find('.swiper-container');
                var carousel = wrapper.find('.keen-slider-container');
                
				var loader = wrapper.find('.custom-loader-wrapper');
				var noProducts = wrapper.find('.no-ajax-products');
	
				if (hide && noProducts.length) {
					wrapper.fadeOut(500);
				} else {
					wrapper.removeClass('d-none loading')
					loader.delay(500).fadeOut(750);
				}
				
				if (data['carousel']) {
					initiateProductCarousel(carousel);
				}
			},
			error: function() {
			  console.log('Error!');
			}
		  });
	}
}
// E: Ajax Load Produse


// S: Product carousel
function initiateProductCarousel(selector = $('.product-carousel')) {
	selector.each(function() {
		var data = $(this).data();
        var keenSetID = data['slide'];
        
		var initial = data['initial'] ? data['initial'] : 2;
		var sm = data['sm'] ? data['sm'] : 3;
		var md = data['md'] ? data['md'] : 3;
		var lg = data['lg'] ? data['lg'] : 4;
		var xl = data['xl'] ? data['xl'] : 6;

		
        var slider = new KeenSlider("#"+keenSetID, {
            
            mode: "free-snap",
            loop: false,
            slides: {
              origin: "center",
              perView: 1.5,
              spacing: 10,
            },
            breakpoints: {
                "(min-width: 375px)": {
                    slides: { perView: sm, spacing: 10, origin: "center" },
                },
                "(min-width: 768px)": {
                    slides: { perView: md, spacing: 10, origin: "center" },
                },
                "(min-width: 992px)": {
                    slides: { perView: lg, spacing: 10, origin: "center" },
                },
                "(min-width: 1200px)": {
                    slides: { perView: xl, spacing: 10 },
                },
            },
            
        });
        
	});
}

initiateProductCarousel();
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

	var href = $(this).attr('href');
	var selector = $(href);
	var ajaxProductSlider = selector.find('.ajax-product-slider');

	if (ajaxProductSlider.length && !ajaxProductSlider.hasClass('.swiper-container-initialized')) {
		ajaxLoadProducts(ajaxProductSlider);
	}
})
// E: Product carousel



//S: dell all PRV
$(document).on("click", '#delAllPRV',function(e){
	e.preventDefault();
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse.php',
		data: '&action=produse_delAllPRV',
		dataType:"JSON",
		success: function(data) {
			showResultMessage(data);
		}
	});
});
//E: dell all PRV




// S: Add to bag
$(document).on('click', '.incrementCartProductQuantity', function() {
	var quantityInput = $(this).parent().parent().find('.cartProductQuantity');
    
    var multiplude = 1; //implicit 1
    if ( $(this).parent().find('.cartProductQuantity').attr('step') > 1 ) { //daca exista, punem noua valoare
        multiplude = parseInt($(this).parent().find('.cartProductQuantity').attr('step'));
    }
    
	if (quantityInput.length) {
		var qty = parseInt(quantityInput.val()) + multiplude;
		quantityInput.val(qty).change();
	}
});
$(document).on('click', '.decrementCartProductQuantity', function() {
	var quantityInput = $(this).parent().parent().find('.cartProductQuantity');
    
    var multiplude = 1; //implicit 1
    if ( $(this).parent().find('.cartProductQuantity').attr('step') > 1 ) { //daca exista, punem noua valoare
        multiplude = parseInt($(this).parent().find('.cartProductQuantity').attr('step'));
    }
    
	if (quantityInput.length) {
		var qty = parseInt(quantityInput.val()) - multiplude;
		if (qty) {
			quantityInput.val(qty).change();
		}
	}
});
$(document).on("click", '.addToBag.active',function(e) {
	e.preventDefault();
	var thisElement = this;
	var idProdusV = $(this).attr('data-idpv');
	var qty = 1;
    
    
    var multiplude = 1; //implicit 1
    if ($(thisElement).attr('data-multiplude') > 1) { //daca exista, punem noua valoare
        multiplude = parseInt($(this).attr('data-multiplude'));
    }
    
	
    if ($(thisElement).parent().find('.cartProductQuantity').length){
		qty = $(thisElement).parent().find('.cartProductQuantity').val();
	}
	
    //din lista de produse
    if($(thisElement).hasClass('fromListP')){
		qty = parseInt($(this).attr('data-qty'));
        //seteaza noua valoare -> incrementem urmatoarea apasare de Adauga in cos cu +X qty
        $(this).attr('data-qty', qty+multiplude);
	}
	
	
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
		data: '&action=cos_add&idProdusV='+idProdusV+'&qty='+qty,
		dataType:"JSON",

		beforeSend: function(data) {
			loading();
		},
		success: function(data) {
			loading(false);
			
			$(thisElement).parent().siblings('.addToCartQty').find('.cartProductQuantity').val(data['qty']);
            
            //in cart.php
            if ( $('#JSappendCart').length ) {
                showResultMessage(data);
                updateCart();
                
                //re-initializam in cos, produsele din slide (gen PRV)
                $('.ajax-product-slider').removeClass("loaded");
                ajaxLoadProducts( $('.ajax-product-slider') );
            
            } else { //in site
                loadBag(); 
                //$('#bs-canvas-CartHD').offcanvas('show');
                $( ".jsLoadBag" ).trigger( "click" );
                
                //daca e din QuickView
                if ( $('#modal-quickview').hasClass("show") ) {
                    //$( "#plationline" ).trigger( "click" ); //inchide QuickView
                    $("#modal-quickview").modal("hide");
                }
                
                //s: add messege in cart sidebar
                $('#sidebarCartMsg').html(data['msg']).removeClass("d-none").show();
                setTimeout(function () {
                    $('#sidebarCartMsg').slideUp().html('');
                }, 5000);
                //e: add messege in cart sidebar
                
            }
            
		}
	});
});
// E: Add to bag



// S: Cart
function updateCart() {
	$.ajax({
		type: 'GET',
		url: setUrlForAjax+'cart-include.php',
		data: '&JS_update=1',
		beforeSend: function(){
			$('#JSappendCart').append('<div id="section-loader" class="custom-loader-wrapper"><div class="custom-loader"></div></div>');
		},
		success: function(data) {

			$("#loading").fadeOut(function(){ $("body").removeClass("loading"); $(this).remove(); });
			$('#JSappendCart').html(data);

			//ajaxLoadProducts($('#JSappendCart .ajax-product-slider'));

			initiateTooltip($('#JSappendCart'));

			//loadProductImage();

			$('#section-loader').fadeOut(function() {
				$(this).remove();
			});

			loadBag();
            
		}
	});

}



$(document).on('change', "input[name^='cosCadouItemsMultiple']", function(e){
	$.ajax({
		type: 'POST',
		url: setUrlForAjax + "eshop/_liveDiverse-cos.php",
		data:  {action:'cos_cadou_multiple', cosCadouItemsMultiple:$(this).val(), cosCadouIdCampanie:$(this).attr('data-campanie'), cosCadouItemsMultipleQty:$(this).attr('data-qty')}
	});
});


$(document).on("submit", '#discountForm',function(e){
	e.preventDefault();
	var discount_code= $(this).find('input[name="discount_code"]').val();
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
		data: '&action=cos_discount_add&discount_code='+discount_code,
		dataType:"JSON",
		success: function(data) {
			updateCart();
			showResultMessage(data);
		}
	});
});


$(document).on("click", '.removeFromCart',function(e){
	e.preventDefault();
	if(!$(this).hasClass('removeExtra')){
		var idProdusV = $(this).attr('data-idpv');

		$.ajax({
			type: 'POST',
			url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
			data: '&action=cos_add&idProdusV='+idProdusV+'&qty=0',
			dataType:"JSON",
			success: function(data) {
				updateCart();
				showResultMessage(data);
			}
		});
	}else{
		if($(this).attr('data-remove')=='discount'){
			$.ajax({
				type: 'POST',
				url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
				data: '&action=cos_discount_dell',
				dataType:"JSON",
				success: function(data) {
					updateCart();
					showResultMessage(data);
				}
			});
		}
	}
});

$(document).on("change", '.cartProductQuantity:not(".not-instant")', function(e){
	e.preventDefault();
	var thisElement = this;
	var idProdusV = $(this).attr('data-idpv');
	var qty = parseInt($(this).parent().find('.cartProductQuantity').val());
	if(!$(thisElement).parent().hasClass('addToCartQty')){
		
		$.ajax({
			type: 'POST',
			url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
			data: '&action=cos_add&idProdusV='+idProdusV+'&qty='+qty,
			dataType:"JSON",
			success: function(data) {
				updateCart();
				showResultMessage(data);
			}
		});
	}
});
// E: Cart







// S: Side Cart
$('.jsLoadBag').on('click', function(e) {
	e.preventDefault();
	loadBag();
	//$(this).addClass('loaded');
});

function loadBag() {
	$.ajax({
		type: 'POST',
		url: setUrlForAjax+'eshop/_liveDiverse-cos.php',
		data: '&action=cos_getHead',
		dataType:"JSON",
		success: function(data) {
			$('#bs-canvas-CartHD .offcanvas-body').html(data['content']);
            $('#bs-canvas-CartHD #JScartTotalPno').html(data['Pnumber']);
            $('#bs-canvas-CartHD #JScartTotalP').html(data['Ptotal']);

            var badge = $('.jsHeadNoP')
			if (badge.length) {
				if (data['Pnumber'] > 0) {
                    badge.removeClass('d-none');
					badge.addClass('d-inline-block');
				} else {
                    badge.removeClass('d-inline-block');
					badge.addClass('d-none');
				}
				badge.html(data['Pnumber']);
			}
            
            initiateTooltip($('#bs-canvas-CartHD .offcanvas-body'));
		}
	});
}
// E: Side Cart






/* Start: CHECKOUT */
/*$(document).on("change", '.sideBInputWrapp input:radio',function(e){
	$(this).parent().parent().parent().find('.sideBInputWrapp').removeClass('checked');
	$(this).parent().parent().parent().find('.sideBInputWrapp input:radio:checked').parent().parent().addClass('checked');
});*/

$(document).ready(function(e) {
    //valabil doar la cos
	if ($('#form-checkout').length){
        //?
		$('#livrareJudet').change();
        
        //
        $("input[name='modTransport']").on('click', function() {
            if ($(this).val() == "prinCurierat") {
                $( "#curier-select" ).slideDown(200);
            } else {
                $( "#curier-select" ).slideUp(200);
            }
        });	

        //
        $("input[name='payment']").on('click', function() {
            if ($(this).val() == "plationline") {
                $( "#mobilpaytoken" ).slideDown(200);
            } else {
                $( "#mobilpaytoken" ).slideUp(200);
            }
        });
        
        
        //taxa urgenta
        //plata numai cu cardul
        $("input[name='taxaUrgenta']").on('click', function() {
            if ($(this).val() == "taxaUrgenta") {
                if ($('input[name="taxaUrgenta"]').prop('checked')!=true){ 
                    //show ramburs
                    $('input#ramburs').parent().parent().show();
                } else {
                    $('input#plationline').parent().parent().show();
                    $('input#plationline').prop("checked", true);
                    $('#mobilpaytoken').slideDown(200);
                    $('input#plationline').parent().parent().addClass('checked');

                    //hide ramburs
                    $('input#ramburs').parent().parent().fadeOut(1);
                    $('input#ramburs').prop("checked", false);
                    $('input#ramburs').parent().parent().removeClass('checked');
                }
                
            } else {
                //show ramburs
                $('input#ramburs').parent().parent().show();
            }
        });
        
        
        //taxa urgenta
        //afisare box produse
        $("input[name='taxaUrgenta']").on('click', function() {
            var taxaUrgentaProduse = $.trim($('#taxaUrgentaProduse').html());
            
            if (taxaUrgentaProduse){
                if($('input[name="taxaUrgenta"]:checked').val()=='taxaUrgenta'){
                    $('#taxaUrgentaProduse').slideDown(200);
                    
                    //bifa default prima optiune
                    if ($('input[name="taxaUrgentaPidv[]"]').prop('checked')!=true){ 
                        $('input[name="taxaUrgentaPidv[]"]').eq(0).prop("checked", true);
                        //updateNewTotalDc();
                        var taxaUrgentaVal = parseFloat($('#taxaUrgentaValFixedPer').val());
                        $("#taxaUrgentaVal").val(taxaUrgentaVal);
                    }
                    
                } else {
                    $('#taxaUrgentaProduse').slideUp(200);
                    $('input[name="taxaUrgentaPidv[]"]').prop("checked", false); //taxaUrgentaPidv[]
                }
            }
        });
        //daca se alege un produs sau mai multe - taxa este /produs
        $("input[name='taxaUrgentaPidv[]']").on('click', function() {
            var taxaUrgentaVal = parseFloat($('#taxaUrgentaValFixedPer').val());
            var count = $("input[name='taxaUrgentaPidv[]']:checked").length;
            var taxaUrgentaVal_NEW = taxaUrgentaVal * count;
            
            $("#taxaUrgentaVal").val(taxaUrgentaVal_NEW);
            updateNewTotalDc();
        });

        
    } //end IF
});


//GENERAL
$(document).on("change", 'select[name="tara"]', function(){
	if( $(this).val() == 'Romania' ) {
        $('select#judet').parent().show();
        $('input#judet_alta').parent().hide();
    } else {
        $('select#judet').parent().hide();
        $('input#judet_alta').parent().show();
    }
});
$(document).on("change", 'select[name="factTara"]', function(){
	if( $(this).val() == 'Romania' ) {
        $('select#factJudet').parent().show();
        $('input#factJudet_alta').parent().hide();
    } else {
        $('select#factJudet').parent().hide();
        $('input#factJudet_alta').parent().show();
    }
});
    
    
	


$(document).on("change", 'input[name="payment"], input[name="modTransport"], input[name="taxaUrgenta"]', function(){
	//console.log("Payment a fost schimbat! - "+$('input[name="payment"]:checked').val());
	updateNewTotalDc();
});

function updateNewTotalDc(){
	DB2JQTotal 				= parseFloat($('.DB2JQTotal').html());
	DB2JQDiscountExtraPO 	= Math.abs(parseFloat($('.DB2JQDiscountExtraPO').html()));
	DB2JQDiscount			= Math.abs(parseFloat($('.DB2JQDiscount').html()));
	DB2JQDiscountXplusY		= Math.abs(parseFloat($('.DB2JQDiscountXplusY').html()));
	cosDBTransport			= parseFloat($('.cosDBTransport').html());
    
	if(!DB2JQTotal)				DB2JQTotal = 0;
	if(!DB2JQDiscountExtraPO)	DB2JQDiscountExtraPO = 0;
	if(!DB2JQDiscount)			DB2JQDiscount = 0;
	if(!DB2JQDiscountXplusY)	DB2JQDiscountXplusY = 0;
	if(!cosDBTransport)			cosDBTransport = 0;
    
    //taxa urgenta
    DB2JQTaxaUrgenta_final = 0;
    if($('input[name="taxaUrgenta"]:checked').val()=='taxaUrgenta'){
        DB2JQTaxaUrgenta = parseFloat($('#taxaUrgentaVal').val());
        if(DB2JQTaxaUrgenta > 0) {
            DB2JQTaxaUrgenta_final = DB2JQTaxaUrgenta;
            $('.showIfTU').show();
            $(".showIfTU_val").html(DB2JQTaxaUrgenta_final);
        } else {
            DB2JQTaxaUrgenta_final = 0;
            $('.showIfTU').hide();
            $(".showIfTU_val").html(DB2JQTaxaUrgenta_final);
        }
    } else {
        DB2JQTaxaUrgenta_final = 0;
        $('.showIfTU').hide();
        $(".showIfTU_val").html(DB2JQTaxaUrgenta_final);
    }
    
    //extra discount plata online
	if($('input[name="payment"]:checked').val()=='plationline'){
		$('.showIfPO').show(); 
        
		totalVIEW = DB2JQTotal - DB2JQDiscountExtraPO - DB2JQDiscount - DB2JQDiscountXplusY + cosDBTransport + DB2JQTaxaUrgenta_final;
		$('.totaltotaltotal').html(parseFloat(totalVIEW).toFixed(2));
		//console.log('Plati online extra dc.');
	} else {
		$('.showIfPO').hide();
        
		totalVIEW = DB2JQTotal - DB2JQDiscount - DB2JQDiscountXplusY + cosDBTransport + DB2JQTaxaUrgenta_final;
		$('.totaltotaltotal').html(parseFloat(totalVIEW).toFixed(2));
	}
    
    
}

function cartCheckoutForm(){
	var modTransport = $('input[name="modTransport"]:checked').val();
	var livrareTara = $('#livrareTara').val();
	var livrareJudet = $('#livrareJudet').val();
	var payment = $('input[name="payment"]:checked').val();
    
	if(modTransport=='dinShowroom') {
		$('#date-livrare-ridicare').text($('#date-livrare-ridicare').data('text-ridicare'));
		$('#adauga-adresa-noua').text($('#adauga-adresa-noua').data('text-ridicare'));

		$('input#ramburs').parent().parent().fadeOut(1);
		$('input#numerar').parent().parent().show();
		$('input#card-magazin').parent().parent().show();
        
        if(payment) {
        } else {
            $( "#plationline" ).trigger( "click" ); //+ click PO
        }
        
        
	} else {
		$('#date-livrare-ridicare').text($('#date-livrare-ridicare').data('text-livrare'));
		$('#adauga-adresa-noua').text($('#adauga-adresa-noua').data('text-livrare'));

		$('input#card-magazin').parent().parent().hide();
		$('input#numerar').parent().parent().hide();
		$('input#ramburs').parent().parent().show();
		
        if(payment) {
        } else {
            $( "#plationline" ).trigger( "click" ); //+ click PO
        }
        
	}
    
    
    if(livrareTara != 'Romania'){
		$('input#dinShowroom').parent().parent().fadeOut(1);
		$('input#dinShowroom').prop("checked", false);
        
        $('select#livrareJudet').parent().hide();
        $('input#livrareJudet_alta').parent().show();
		
		$('input#prinCurierat').parent().parent().show();
		$('input#prinCurierat').prop("checked", true);
		//
		$('input#ramburs').parent().parent().fadeOut(1);
		$('input#ramburs').prop("checked", false);
		$('input#ramburs').parent().parent().removeClass('checked');
        
		$('input#ordinPlata').parent().parent().fadeOut(1);
		$('input#ordinPlata').prop("checked", false);
		$('input#ordinPlata').parent().parent().removeClass('checked');
        
		$('input#plationline').parent().parent().show();
		$('input#plationline').prop("checked", true);
		$('#mobilpaytoken').slideDown(200);
		$('input#plationline').parent().parent().addClass('checked');

	} else {
        $('select#livrareJudet').parent().show();
        $('input#livrareJudet_alta').parent().hide();
        
		$('input#dinShowroom').parent().parent().show();
		$('input#ramburs').parent().parent().show();
		$('input#ordinPlata').parent().parent().show();
		
		if(livrareJudet == "Bucuresti"){
			
		} else {
			
		}
		
	}
}



$(document).on('change', "input[name='modTransport'], #livrareJudet, #livrareTara", function(e){
	cartCheckoutForm();
	$.ajax({
		type: 'POST',
		url: setUrlForAjax + "eshop/_liveDiverse-cos.php",
		data: {action:'cos-seteazaTransport', judet:$('#livrareJudet').val() , type:$("input[name='modTransport']:checked").val(), tara:$('#livrareTara').val() },
		beforeSend: function(){
			$('#totalCosCheckoutWrapper').append('<div id="section-loader" class="custom-loader-wrapper"><div class="custom-loader"></div></div>');
		},
		success: function(data) {
			$.ajax({
				type: 'POST',
				url: setUrlForAjax + "eshop/_liveDiverse-cos.php",
				data:  {action:'cos-TransportAndTotal'},
				dataType:"JSON",
				success: function(data) {
					$("#totalCosCheckoutWrapper #section-loader").fadeOut(function(){ 
						$(this).remove(); 
						$('.cosDBTransport').html(data['transportValue']);
						$('.totaltotaltotal').html(data['totalValue']);
						//console.log('Total update');
						updateNewTotalDc();
					});			
				}
			});
		}
	});
});


//S: la Cos
$(document).on('change', "#livrareJudet, #livrareTara", function(e){
    //
    var inputName = $('#livrareLocalitatea').attr('name');
    var inputId = $('#livrareLocalitatea').attr('id');
    
    var set_dataAjaxParam = '&action=n_localitatiRo&tara='+$('#livrareTara').val()+'&judet='+$('#livrareJudet').val()+'&localitate='+$('#livrareLocalitatea').val()+  '&inputName='+inputName+'&inputId='+inputId+'';
    
    ajax_append('#livrareLocalitatea_div', set_dataAjaxParam, '_liveDiverse.php');
    
    //daca are datele salvate - revalidam..
    if ($('#form-checkout').length){
        setTimeout(function () {
            if ( $('.cartCheckoutRadioWidget:checked') && $('#livrareContent').css('display') == 'none' ) {
                if( $('#livrareLocalitatea').val() == '' || $('#livrareJudet').val() == '' || $('#livrareAdresa').val() == '' || $('#livrareTelefon').val() == '' || $('#livrareNume').val() == '') {
                    $( ".cartCheckoutRadioWidgetToggle" ).trigger( "click" );
                }
            }
        }, 1500); //asteptam deorece intra cu input predefinit si validam dupa prin nomenclator/DB
    } 
});

$(document).on('change', "#factJudet, #factTara", function(e){
    //
    var inputName = $('#factLocalitatea').attr('name');
    var inputId = $('#factLocalitatea').attr('id');
    
    var set_dataAjaxParam = '&action=n_localitatiRo&tara='+$('#factTara').val()+'&judet='+$('#factJudet').val()+'&localitate='+$('#factLocalitatea').val()+  '&inputName='+inputName+'&inputId='+inputId+'';
    
    ajax_append('#factLocalitatea_div', set_dataAjaxParam, '_liveDiverse.php');
    
    //daca are datele salvate - revalidam..
    if ($('#form-checkout').length){
        setTimeout(function () {
            if ( $('.cartCheckoutRadioWidget:checked') && $('#factContent').css('display') == 'none' ) {
                if( $('#factLocalitatea').val() == '' || $('#factJudet').val() == '' || $('#factAdresa').val() == '' || $('#factTelefon').val() == '' || $('#factNume').val() == '') {
                    $( ".cartCheckoutRadioWidgetToggle" ).trigger( "click" );
                }
            }
        }, 1500); //asteptam deorece intra cu input predefinit si validam dupa prin nomenclator/DB
    } 
});
//E: la Cos

//S: in Cont User
$(document).on('change', " select[name='tara'], select[name='judet'] ", function(e){
    if ($('#forJSuserAccount').length){
        var tara = $(this).parent().parent().find('select[name="tara"]').val();
        var judet = $(this).parent().parent().find('select[name="judet"]').val();
        var localitate = $(this).parent().parent().find('.localitatea_div').find('input,select').val();

        var whereAppend = $(this).parent().parent().find('.localitatea_div');
        var inputName = $(this).parent().parent().find('.localitatea_div').find('input,select').attr('name');
        var inputId = $(this).parent().parent().find('.localitatea_div').find('input,select').attr('id');

        //pt. datalist Localitati
        var set_dataAjaxParam = '&action=n_localitatiRo&tara='+tara+'&judet='+judet+'&localitate='+localitate+  '&inputName='+inputName+'&inputId='+inputId+'';
        ajax_append(whereAppend, set_dataAjaxParam, '_liveDiverse.php');
    }
});
//E: in Cont User


function ajax_append(whereAppend, set_dataAjaxParam, set_filePHP){
    if (whereAppend && set_dataAjaxParam) {
        $.ajax({
            type: 'POST',
            url: UrlForAjax + set_filePHP,
            data: set_dataAjaxParam,
            dataType:"html",
            success: function(data) {
                $(whereAppend).html('');
                $(whereAppend).html(data);
            },
        });
    } 
}




/*$(document).on('change', "input[name='factTip']", function(e){
	if($(this).val()=='persoanaJ'){
		$('.datePersJ').collapse('show');
	}else{
		$('.datePersJ').collapse('hide');
	}
});*/


$(document).on('change', " input[name='factTip'] , input[name='comandaCadou'] ", function(e){
	if( $("input[name='factTip']:checked").length || $("input[name='comandaCadou']:checked").length ){
		$('.datePersJ').collapse('show');
        //$( "#plationline" ).trigger( "click" ); //+ click PO
	}else{
		$('.datePersJ').collapse('hide');
	}
});


$(document).on('click', '.cartCheckoutRadioWidgetToggle', function(e){
	e.preventDefault();
	$(this).closest('.cartCheckoutRadioWidget').after($('#'+$(this).attr('data-id')));
	$('#'+$(this).attr('data-id')).stop().slideToggle();
});

$(document).on('change', '.cartCheckoutRadioWidget input:radio', function(){
	var ajaxData,ajaxInclude,ajaxIncludeData,thisName=$(this).attr('name'),ajaxTargetForm;
	switch(thisName){
		case 'livrareSelectDB':
			ajaxData = {action:'cos2-setSelectLivFactImplicit', id:$('input[name=livrareSelectDB]:checked').val(), tabel:'liv'};
			ajaxInclude = setUrlForAjax+'cart-checkout-includeLivrare.php';
			ajaxIncludeData = {JS_update:1,livrareSelectDB:$('input[name=livrareSelectDB]:checked').val(), tabel:'liv'};
			ajaxTarget = '#cartCheckoutDelivery';
			ajaxTargetForm = '#livrareContent';
		break;
		case 'facturareSelectDB':
			ajaxData = {action:'cos2-setSelectLivFactImplicit', id:$('input[name=facturareSelectDB]:checked').val(), tabel:'fact'};
			ajaxInclude = setUrlForAjax+'cart-checkout-includeFacturare.php';
			ajaxIncludeData = {JS_update:1,facturareSelectDB:$('input[name=facturareSelectDB]:checked').val(), tabel:'fact'};
			ajaxTarget = '#cartCheckoutBilling';
			ajaxTargetForm = '#facturareContent';
		break;
	}
	if(thisName=='livrareSelectDB' || thisName=='facturareSelectDB'){
		$.ajax({
			type: 'POST',
			url: setUrlForAjax + "eshop/_liveDiverse-cos.php",
			data:  ajaxData,
			beforeSend: function(){
				$(ajaxTarget).append('<div id="section-loader" class="custom-loader-wrapper"><div class="custom-loader"></div></div>');
			},
			success: function(data) {
				$.ajax({
					type: 'POST',
					url: ajaxInclude,
					data: ajaxIncludeData,
					success: function(data) {
						$(ajaxTarget+"Wrapper").html(data);

						$(ajaxTargetForm).css('display', 'none');

						$(ajaxTarget + " #section-loader").fadeOut(function() {
							$(this).remove(); 

							if($('input[name='+thisName+']:checked').val()=='alta'){
								//$(ajaxTargetForm).find(':input:not(:submit):not(select)').val('');
								$(ajaxTargetForm).find(':input:not(:submit)').val('');
								$('#livrareTara').val($('#livrareTara').data('selected')).change();

								$(ajaxTargetForm).slideDown(200);
							}

							$('#livrareTara').change();
                            
						});
					}
				});
			}
		});
	}
})
/* End: CHECKOUT */




//<!-- https://as-tx.github.io/bootstrap-off-canvas-sidebar/ -->
jQuery(document).ready(function($){
	var bsOverlay = $('.bs-canvas-overlay');
	$('[data-toggle="canvas"]').on('click', function(){
        var ctrl = $(this), 
			elm = ctrl.is('button') ? ctrl.data('target') : ctrl.attr('href');
		
        var set_class = 'mr-0';//right sidebar
            if( $(this).data('open') == 'left' ) { set_class = 'ml-0'; } //left sidebar
        $(elm).addClass(set_class);
		
        $(elm + ' .bs-canvas-close').attr('aria-expanded', "true");
		$('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "true");
		if(bsOverlay.length)
			bsOverlay.addClass('show');
		return false;
	});
	
	$('.bs-canvas-close, .bs-canvas-overlay').on('click', function(){
		var elm;
        if($(this).hasClass('bs-canvas-close')) {
			elm = $(this).closest('.bs-canvas');
			$('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "false");
		} else {
			elm = $('.bs-canvas')
			$('[data-toggle="canvas"]').attr('aria-expanded', "false");	
		}
		
        var set_class = 'mr-0';//right sidebar
            if( elm.hasClass('ml-0') ) { set_class = 'ml-0'; } //left sidebar
        elm.removeClass(set_class);
        
        
		$('.bs-canvas-close', elm).attr('aria-expanded', "false");
		if(bsOverlay.length)
			bsOverlay.removeClass('show');
		return false;
	});
});


