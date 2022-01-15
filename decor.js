//transition from start screen to image view
function hideStartScreen() {
	//hide start screen container
	$('#startScreen').hide();

	//display image view bar
	$('#imageControlsBar').css({'display' : 'flex'});

	//display image view container
	$('#imageViewContainer').show();

	//scroll image view container to the top
	$([document.documentElement, document.body]).animate({
        scrollTop: $("#imageControlsBar").offset().top
    }, 1000);
}

//TODO Easter egg
function easterEgg() {
	//change background
	$('body').css({
		'background-color' : '#dce9f6'
	});

	//change hints color
	$('.formulaHints div').css({'color' : '#1a1b1d'});

	//change formula color
	$('#formulaImg').css({'filter' : 'invert()'});
}