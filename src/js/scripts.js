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

	// Show html once page is loaded
	$('html').removeClass('hide');

	/********** Background Image to Fit Whole Page **********/
	$('#home').css('height', $(window).height());


	/********** Toggle Menu for Mobile Nav **********/
	$('.toggleMenu').click(function() {
		$('.mobileNav').toggleClass('mobileNavOpen');
		$(this).toggleClass('toggleMenuOpen');
	});	


	/********** Smooth Scrolling **********/
	$('a').click(function() {
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 900);
		return false;
	});


	/********** Sick Fadez While Scrolling **********/
	var lastScroll = 0;

	$(window).scroll(function() {
		var homeHeight = $(window).height();
		var currentScroll = $(this).scrollTop();

		// Parts from home fade out
		if (currentScroll < 200) {
			$('.showOnLg.logo').removeClass('logoColor2');
			$('.aboutMe').removeClass('hide');
		} else {
			$('.showOnLg.logo').addClass('logoColor2');
			$('.aboutMe').addClass('hide');
		}

		// Instructions for portfolio fade in, down nav arrow fades out, nav changes colour
		if (currentScroll < (homeHeight - 450)) {		
			$('.instructions').addClass('hide').removeClass('show');
			$('.navDown').removeClass('hide');
		} else {
			$('.instructions').addClass('show').removeClass('hide');
			$('.navDown').addClass('hide');
		}

		// Up nav arrow fades in
		if (currentScroll < (homeHeight + 50)) {
			$('.navUp').addClass('hide');
		} else {
			$('.navUp').removeClass('hide');
		}

		// Nav nudges
		if (currentScroll > lastScroll) { // scroll down
			$('.showOnLg.logo').addClass('moveLogoUp').addClass('logoColor2');
		} else {
			$('.showOnLg.logo').removeClass('moveLogoUp').removeClass('logoColor2');
		}

		lastScroll = currentScroll;
	});

	// nudge nav up if navUp arrow is clicked
	$('.navUp a').click(function() { 
		$('.showOnLg.logo').addClass('moveLogoUp');
	});


	/********** Fit Text **********/
	$('.showOnLg.logo').fitText(4);


	/********** Parallex scroll **********/
	var parallaxScroll = function($bgobj) {
		// scrollTop gets the current scroll value from the top i.e. how much the user has scrolled up
		// bgobj.data('speed') refers to the data-speed you assigned in the html
		// yPos = how much we scrolled up divided by data-speed. It's negative because we're going opposite direction of the user's scroll
		// e.g. if user scrolls 50px down, background scrolls 5px up
		//if ($(window).width() > 1635) {
		//	var yPos = -200 - ($window.scrollTop() / $bgobj.data('speed'));
		//} else {
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
		//}
		
		// Put together our final background position
		// 50% as its xPosition to keep horizontal position static and center
		var coords = '50% ' + yPos + 'px';

		// Move the background
		$bgobj.css({backgroundPosition: coords});
	};

	// Cache the Window object
	$window = $(window);
	
	$('section[data-type="background"]').each(function() {
		var $bgobj = $(this); // assigning the object

		$(window).scroll(function(){
			if ((!isMobile.any()) && ($(window).width() > 1635)) {
				parallaxScroll($bgobj);
			}
		});

		$(window).resize(function() {
			if ((!isMobile.any()) && ($(window).width() > 1635)) {
				parallaxScroll($bgobj);
			}
		});
	}); 
	
});

/********** Create HTML5 Element for IE **********/
document.createElement("section");