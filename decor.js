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


//Select marker color
function disaplayMarkersPalette(inputColor) {

	if ($('#markerColorPalette').css('display') == 'none') {
		//hide color control
		$('#imageControlColor').hide();

		//display palette
		$('#markerColorPalette').css({'display' : 'block'});
	
	} else {
		//hide palette
		$('#markerColorPalette').css({'display' : 'none'});
		
		//show color control
		$('#imageControlColor').show();
	}

	//check if color selected
	if (inputColor != null) {
		//change main indicator color
		$('#imageControlColor div').removeClass();
		$('#imageControlColor div').addClass(inputColor);

		//change start marker color
		$('#start div').removeClass();
		$('#start div').addClass(inputColor);
		$('#start').removeClass();
		$('#start').addClass(inputColor + 'Border');

		//change end marker color
		$('#end').removeClass();
		$('#end').addClass(inputColor);
	}

}


//TODO Easter egg
function easterEgg() {

}