var markersColor = '#df2222';

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

	//TODO recalculate line position
	line.position();
	
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

}

//recolor markers and color controls
function recolorMarkers(inputColor,saveGlobal) {

	//check if color needs to be saved
	if (saveGlobal) {
		//update global color
		markersColor = inputColor;
	}
	
	//color selectors
	$('.paletteCtrl').each(function (){ 
		 $(this).css({'background-color' : $(this).attr( "data-selectedColor" )});
	});

	//change main indicator color
	$('#imageControlColor div').css({'background-color' : inputColor});

	//change start marker color
	$('#start div').css({'background-color' : inputColor});
	$('#start').css({'border' : '2px solid ' + inputColor});

	//change end marker color
	$('#end').css({'background-color' : inputColor + 'C0'});

	//TODO recolor lines
}


//Easter egg
function easterEgg() {
	recolorMarkers('#e9ca2c', true);
}

//TODO reset markers position
function resetMarkersPosition() {
	//reset start marker
	$('#start').css({
		'top' : 'calc(100% - 100px)',
		'left' : 'calc(50% - 100px)'
	});

	//reset end marker
	$('#end').css({
		'top' : 'calc(100% - 100px)',
		'left' : 'calc(50% + 100px)'
	});

	//TODO redraw line
	line.position();
}