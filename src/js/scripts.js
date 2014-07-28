/********** Detect Device **********/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(document).ready(function() {
	// Background image to fit whole page
	$('#home').css('height', $(window).height());

	if (isMobile.any()) { 
		// show/hide parts permanently on mobile
		$('.bgDescLabel').hide();
		$('.aboutMe').show();
		$('.instructions').show();
		$('.toPortfolio').hide();
		$('.toHome').hide();

		$('.toggleMenu').click(function() {
			$('nav .hideOnMobile').slideToggle();
		});	

	} else { // if not mobile

		/********** Functions **********/
		var parallaxScroll = function($bgobj) {
			// scrollTop gets the current scroll value from the top i.e. how much the user has scrolled up
			// bgobj.data('speed') refers to the data-speed you assigned in the html
			// yPos = how much we scrolled up divided by data-speed. It's negative because we're going opposite direction of the user's scroll
			// e.g. if user scrolls 50px down, background scrolls 5px up
			if ($(window).width() > 1400) {
				var yPos = -125 - ($window.scrollTop() / $bgobj.data('speed'));
			} else {
				var yPos = -($window.scrollTop() / $bgobj.data('speed'));
			}
			
			// Put together our final background position
			// 50% as its xPosition to keep horizontal position static and center
			var coords = '50% ' + yPos + 'px';

			// Move the background
			$bgobj.css({backgroundPosition: coords});
		};

		
		/********** Media Queries **********/
		var mqBgrdImageBreak = window.matchMedia( "(min-width: 1400px)" );
		

		/********** Fade In On Load **********/
		$('.aboutMe').hide();
		$('nav').hide();
		$('.bgDescLabel').hide();
		$('.toPortfolio').hide();

		$('.aboutMe').delay(300).fadeIn(900);
		$('nav').delay(1300).fadeIn(1200);
		$('.bgDescLabel').delay(1300).fadeIn(1200);
		$('.toPortfolio').delay(1300).fadeIn(1200);


		/********** Parallex scroll **********/
		// Cache the Window object
		$window = $(window);
		
		$('section[data-type="background"]').each(function() {
			var $bgobj = $(this); // assigning the object

			$(window).scroll(function(){
				parallaxScroll($bgobj);
			});

			$(window).resize(function() {
				parallaxScroll($bgobj);
			});
		}); 


		/********** Sick Fadez While Scrolling **********/
		$(window).scroll(function() {
			// Fade background description label and abooutMe section in/out on scroll
			// Parts from the bottom of home fade out early on
			if ($(this).scrollTop() < 20) {
				$('.bgDescLabel').fadeIn('fast');
				$('.toPortfolio').fadeIn('fast');
			} else {
				$('.bgDescLabel').fadeOut();
				$('.toPortfolio').fadeOut('fast');
			}

			// Other parts from home fade out
			if ($(this).scrollTop() < 200) {
				$('.aboutMe').fadeIn('fast');
			} else {
				$('.aboutMe').fadeOut();
			}

			// Instructions for portfolio fade in 
			if ($(this).scrollTop() < 260) {
				$('.instructions').fadeOut('fast');
			} else {
				$('.instructions').fadeIn('fast');
			}

			// Arrow to top fades in
			if ($(this).scrollTop() < 1100) {
				$('.toHome').fadeOut('fast');
			} else {
				$('.toHome').fadeIn('fast');
			}
				
			// Change colour of nav	for different sections
			if ($(this).scrollTop() < 950) {
				$('nav').removeClass().addClass('lightColor');
			} else {
				$('nav').removeClass('lightColor').addClass('darkColor');
			}
		});

		/********** Smooth Scrolling **********/
		$('a').click(function() {
			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 900);
			return false;
		});

		/********** On hover, fade arrows **********/
		$('.toHome, .toPortfolio').hover(function() {
			$(this).fadeTo('fast', '0.5');
		}, function() {
			$(this).fadeTo('fast', '1');
		});
	}
});

/********** Create HTML5 Element for IE **********/
document.createElement("section");